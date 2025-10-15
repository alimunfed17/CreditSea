/// <reference types="jest" />

import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import express from "express";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock the CreditReport module before importing
jest.unstable_mockModule("../src/models/CreditReport.js", () => ({
  CreditReport: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
  },
}));

// Import the router and CreditReport after mocking
const { default: router } = await import("../src/routes/reportRoutes.js");
const { CreditReport } = await import("../src/models/CreditReport.js");

const app = express();
app.use(express.json());
app.use("/api", router);

describe("CreditReport API", () => {
  const sampleXMLPath = path.join(__dirname, "sample.xml");

  beforeAll(() => {
    // Create a dummy XML file for testing
    fs.writeFileSync(
      sampleXMLPath,
      `<CreditReport><name>John Doe</name><score>750</score></CreditReport>`
    );
  });

  afterAll(() => {
    fs.unlinkSync(sampleXMLPath);
  });

  describe("POST /api/upload", () => {
    it("should return 400 if no file is uploaded", async () => {
      const res = await request(app).post("/api/upload");
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("No file uploaded");
    });

    it("should return 400 if file is not XML", async () => {
      const res = await request(app)
        .post("/api/upload")
        .attach("file", Buffer.from("dummy"), "test.txt");
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid file type. Only XML allowed.");
    });

    it("should parse XML and save report", async () => {
      const mockCreate = CreditReport.create as jest.MockedFunction<typeof CreditReport.create>;
      mockCreate.mockResolvedValue({
        _id: "123",
        name: "John Doe",
        score: 750,
      } as any);

      const res = await request(app)
        .post("/api/upload")
        .attach("file", sampleXMLPath);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("File uploaded and parsed successfully");
      expect(res.body.report).toHaveProperty("_id", "123");
    });
  });

  describe("GET /api/reports", () => {
    it("should return a list of reports", async () => {
      const mockFind = CreditReport.find as jest.MockedFunction<typeof CreditReport.find>;
      mockFind.mockReturnValue({
        sort: jest.fn().mockReturnValue([
          { _id: "123", name: "John Doe", score: 750 },
        ]),
      } as any);

      const res = await request(app).get("/api/reports");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("_id", "123");
    });
  });

  describe("GET /api/reports/:id", () => {
    it("should return 404 if report not found", async () => {
      const mockFindById = CreditReport.findById as jest.MockedFunction<typeof CreditReport.findById>;
      mockFindById.mockResolvedValue(null);

      const res = await request(app).get("/api/reports/999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Report not found");
    });

    it("should return report if found", async () => {
      const mockFindById = CreditReport.findById as jest.MockedFunction<typeof CreditReport.findById>;
      mockFindById.mockResolvedValue({
        _id: "123",
        name: "John Doe",
        score: 750,
      });

      const res = await request(app).get("/api/reports/123");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", "123");
      expect(res.body.name).toBe("John Doe");
    });
  });
});
