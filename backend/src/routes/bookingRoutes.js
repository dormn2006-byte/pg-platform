

import express from "express";

import {
  createBookingController,
  getStudentBookingsController,
  getOwnerBookingsController,
  updateBookingStatusController,
} from "../controllers/bookingController.js";

import {
  protect,
  ownerOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Booking Request (Student)
router.post(
  "/create",
  protect,
  createBookingController
);

// Get Logged In Student Bookings
router.get(
  "/my-bookings",
  protect,
  getStudentBookingsController
);

// Get Owner Booking Requests
router.get(
  "/owner-bookings",
  protect,
  ownerOnly,
  getOwnerBookingsController
);

// Update Booking Status (Owner)
router.put(
  "/status/:id",
  protect,
  ownerOnly,
  updateBookingStatusController
);

export default router;