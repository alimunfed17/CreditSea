import express from "express";
import cors from "cors";
import morgan from "morgan";
import reportRoutes from "./routes/reportRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", reportRoutes);

// Error handler
app.use(errorHandler);

export default app; 
