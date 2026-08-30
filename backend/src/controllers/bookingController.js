import {
  createBooking,
  getStudentBookings,
  getOwnerBookings,
  updateBookingStatus,
  getStudentIdByBooking,
  pauseOtherBookings,
} from "../models/bookingModel.js";

import { getPGById } from "../models/pgModel.js";
import pool from "../config/db.js";

// Create Booking Request
export const createBookingController = async (req, res) => {
  try {
    const student_id = req.user.id;

    const {
      pg_id,
      message,
      selected_room_type, // NEW: Capture the user's AC/Non-AC Sharing selection
      booked_price,       // NEW: Capture the specific price they agreed to
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
      selected_room_type, // NEW: Pass to database model
      booked_price,       // NEW: Pass to database model
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

    // Auto-pause: when a booking is approved, pause all other pending bookings by the same student
    if (status === "approved") {
      const studentId = await getStudentIdByBooking(id);
      if (studentId) {
        await pauseOtherBookings(studentId, id);
      }
    }

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

// Get all PGs booked by the logged-in student
export const getMyPgs = async (req, res) => {
  try {
    const student_id = req.user.id; // From the protect middleware

    // This SQL query is 100% aligned with your actual MySQL database columns
    const [bookings] = await pool.execute(
      `SELECT 
        b.id AS booking_id, 
        b.status AS booking_status, 
        b.payment_status, 
        b.booking_date, 
        b.selected_room_type,
        p.id AS pg_id, 
        p.title, 
        p.city, 
        p.area, 
        p.address,
        p.profile_image, 
        pay.amount AS amount_paid, 
        pay.razorpay_payment_id,
        pay.created_at AS payment_date
       FROM bookings b
       JOIN pgs p ON b.pg_id = p.id
       LEFT JOIN payments pay ON b.id = pay.booking_id AND pay.status = 'successful'
       WHERE b.student_id = ? AND (b.payment_status = 'paid' OR b.status = 'approved')
       ORDER BY b.booking_date DESC
       LIMIT 1`,
      [student_id]
    );

    res.status(200).json({ 
      success: true, 
      booking: bookings.length > 0 ? bookings[0] : null 
    });
  } catch (error) {
    console.error("Fetch My Pgs Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch your enrolled PG" });
  }
};

// Cancel Booking Request (Student can cancel their own pending bookings)
export const cancelBookingController = async (req, res) => {
  try {
    const student_id = req.user.id;
    const { id } = req.params;

    // Verify this booking belongs to the student and is still pending
    const [rows] = await pool.execute(
      `SELECT id, status FROM bookings WHERE id = ? AND student_id = ?`,
      [id, student_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or does not belong to you",
      });
    }

    if (rows[0].status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a booking that is already ${rows[0].status}`,
      });
    }

    await updateBookingStatus({
      booking_id: id,
      status: "cancelled",
    });

    return res.status(200).json({
      success: true,
      message: "Booking request cancelled successfully",
    });
  } catch (error) {
    console.log("Cancel Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};