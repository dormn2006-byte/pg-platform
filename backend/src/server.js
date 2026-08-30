import "dotenv/config";
import cluster from "cluster";
import os from "os";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"; // <-- 1. Import rate limiter
import "./config/testConnection.js";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pgRoutes from "./routes/pgRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary Master Process ${process.pid} is running`);
  console.log(`Forking server across ${numCPUs} CPU cores for high traffic handling...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Spawning a new worker replacement...`);
    cluster.fork();
  });

  // Auto-cancel paused bookings older than 30 minutes (runs every 5 min, only on primary)
  setInterval(async () => {
    try {
      const [result] = await pool.execute(
        `UPDATE bookings SET status = 'cancelled' WHERE status = 'paused' AND booking_date < NOW() - INTERVAL 30 MINUTE`
      );
      if (result.affectedRows > 0) {
        console.log(`[Auto-Cancel] Cancelled ${result.affectedRows} paused booking(s)`);
      }
    } catch (err) {
      console.error("[Auto-Cancel] Error:", err.message);
    }
  }, 5 * 60 * 1000);

} else {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // --- 2. DEFINE HIGH-TRAFFIC RATE LIMITERS ---
  
  // General Limiter: Max 200 requests per 15 minutes per IP for normal APIs
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200, 
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests from this IP, please try again later." }
  });

  // Strict Limiter: Max 10 requests per 15 minutes for Login/Signup to prevent brute force
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many login attempts. Please try again after 15 minutes." }
  });

  // Apply limiters to routes
  app.use("/api/", globalLimiter);
  app.use("/api/auth/login", authLimiter);
  app.use("/api/auth/register", authLimiter);
  app.use("/api/enrollments", enrollmentRoutes);

  // --- YOUR EXISTING ROUTES ---
  app.use("/api/auth", authRoutes);
  app.use("/api/pg", pgRoutes);
  app.use("/api/reviews", reviewRoutes);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(
    "/api/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  app.use("/api/bookings", bookingRoutes);
  app.use("/api/superadmin", superAdminRoutes);
  app.use("/api/payments", paymentRoutes);

  app.get("/debug/uploads", (req, res) => {
    const uploadPath = path.join(__dirname, "uploads");
    res.json({
      uploadPath,
      exists: fs.existsSync(uploadPath),
      files: fs.existsSync(uploadPath) ? fs.readdirSync(uploadPath) : [],
      workerPid: process.pid,
    });
  });

  app.get("/", (req, res) => {
    res.send("PG Platform Backend Running");
  });

  app.get("/test-upload-path", (req, res) => {
    res.json({
      uploadFolder: path.join(__dirname, "uploads"),
      workerPid: process.pid,
    });
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Worker process ${process.pid} started and running on port ${PORT}`);
  });
}