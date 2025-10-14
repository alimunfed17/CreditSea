import express from "express";
import multer from "multer";
import fs from "fs";
import Report from "../models/Report.js";
import { parseXML } from "../utils/parseXML.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/upload
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    if (!file.originalname.endsWith(".xml"))
      return res.status(400).json({ message: "Invalid file type. Only XML allowed." });

    const xmlData = fs.readFileSync(file.path, "utf-8");
    const parsed = await parseXML(xmlData);

    const report = await Report.create(parsed);

    fs.unlinkSync(file.path);

    res.json({ message: "File uploaded and parsed successfully", report });
  } catch (error) {
    next(error);
  }
});

// GET /api/reports
router.get("/reports", async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    next(error);
  }
});

// GET /api/reports/:id
router.get("/reports/:id", async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    next(error);
  }
});

export default router;
