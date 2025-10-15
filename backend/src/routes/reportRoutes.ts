import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { parseXMLString, ParsedCreditReport } from "../utils/parseXML.js";
import { CreditReport } from "../models/CreditReport.js";

const router = express.Router();

// ✅ Use memory storage (no file system writes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload
router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      if (!file.originalname.endsWith(".xml")) {
        return res
          .status(400)
          .json({ message: "Invalid file type. Only XML allowed." });
      }

      // ✅ Parse XML directly from in-memory buffer
      const xmlContent = file.buffer.toString("utf-8");
      const parsed: ParsedCreditReport = await parseXMLString(xmlContent);

      // Save parsed data to DB
      const report = await CreditReport.create(parsed);

      res.json({ message: "File uploaded and parsed successfully", report });
    } catch (error) {
      console.error(error); // logs visible in Vercel dashboard
      next(error);
    }
  }
);

// GET /api/reports
router.get(
  "/reports",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reports = await CreditReport.find().sort({ createdAt: -1 });
      res.json(reports);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// GET /api/reports/:id
router.get(
  "/reports/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await CreditReport.findById(req.params.id);
      if (!report)
        return res.status(404).json({ message: "Report not found" });
      res.json(report);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
