import {
  createBooking,
  getStudentBookings,
  getOwnerBookings,
  updateBookingStatus,
} from "../models/bookingModel.js";

import { getPGById } from "../models/pgModel.js";

// Create Booking Request
export const createBookingController = async (req, res) => {
  try {
    const student_id = req.user.id;

    const {
      pg_id,
      message,
    } = req.body;

    // Validation
    if (!pg_id) {
      return res.status(400).json({
        success: false,
        message: "PG ID is required",
      });
    }

    // Get PG Details
    const pg = await getPGById(pg_id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    // Create Booking
    const result = await createBooking({
      student_id,
      pg_id,
      owner_id: pg.owner_id,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.log("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Student Bookings
export const getStudentBookingsController = async (
  req,
  res
) => {
  try {
    const student_id = req.user.id;

    const bookings = await getStudentBookings(student_id);

    return res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("Get Student Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Owner Booking Requests
export const getOwnerBookingsController = async (
  req,
  res
) => {
  try {
    const owner_id = req.user.id;

    const bookings = await getOwnerBookings(owner_id);

    return res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log("Get Owner Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Booking Status
export const updateBookingStatusController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    // Validation
    const allowedStatus = [
      "approved",
      "rejected",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    await updateBookingStatus({
      booking_id: id,
      status,
    });

    return res.status(200).json({
      success: true,
      message: `Booking ${status} successfully`,
    });
  } catch (error) {
    console.log("Update Booking Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
