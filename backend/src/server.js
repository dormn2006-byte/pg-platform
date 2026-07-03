import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/testConnection.js";
import authRoutes from "./routes/authRoutes.js";
import pgRoutes from "./routes/pgRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import fs from "fs";


// deployment test
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pg", pgRoutes);import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Uploads folder:");
console.log(path.join(__dirname, "uploads"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/bookings", bookingRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.get("/debug/uploads", (req, res) => {

  const uploadPath = path.join(__dirname, "uploads");

  res.json({

    uploadPath,

    exists: fs.existsSync(uploadPath),

    files: fs.existsSync(uploadPath)

      ? fs.readdirSync(uploadPath)

      : [],

  });

});

app.get("/", (req, res) => {
  res.send("PG Platform Backend Running");
});
app.get("/test-upload-path", (req, res) => {
  res.json({
    uploadFolder: path.join(__dirname, "uploads"),
  });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});