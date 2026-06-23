import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/testConnection.js";
import authRoutes from "./routes/authRoutes.js";
import pgRoutes from "./routes/pgRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";


// deployment test
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pg", pgRoutes);
app.use("/uploads", express.static("src/uploads"));
app.use("/api/bookings", bookingRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.get("/", (req, res) => {
  res.send("PG Platform Backend Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});