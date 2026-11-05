import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // Example: Allow all requests if no origin is present (e.g., mobile apps)
      if (!origin) return callback(null, true);

      // Example: Check against a whitelist or database
      const whitelist = [
        "https://job-portal-frontend-lac-xi.vercel.app/",
        "http://localhost:5173",
        "https://krmu-frontend.vercel.app",
      ];
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (req, res) =>
  res.json({ message: "Job portal API is healthy" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
