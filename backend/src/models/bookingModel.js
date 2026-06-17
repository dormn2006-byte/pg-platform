

import db from "../config/db.js";

// Create Booking
export const createBooking = async ({
  student_id,
  pg_id,
  owner_id,
  message,
}) => {
  const query = `
    INSERT INTO bookings (
      student_id,
      pg_id,
      owner_id,
      message
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    student_id,
    pg_id,
    owner_id,
    message,
  ]);

  return result;
};

// Get Student Bookings
export const getStudentBookings = async (student_id) => {
  const query = `
    SELECT
      bookings.*,
      pgs.title,
      pgs.city,
      pgs.area,
      pgs.price,
      pgs.profile_image,
      users.full_name AS owner_name,
      users.phone AS owner_phone
    FROM bookings
    JOIN pgs ON bookings.pg_id = pgs.id
    JOIN users ON bookings.owner_id = users.id
    WHERE bookings.student_id = ?
    ORDER BY bookings.booking_date DESC
  `;

  const [rows] = await db.execute(query, [student_id]);

  return rows;
};

// Get Owner Booking Requests
export const getOwnerBookings = async (owner_id) => {
  const query = `
    SELECT
      bookings.*,
      pgs.title,
      pgs.city,
      pgs.area,
      pgs.price,
      pgs.profile_image,
      users.full_name AS student_name,
      users.email AS student_email,
      users.phone AS student_phone
    FROM bookings
    JOIN pgs ON bookings.pg_id = pgs.id
    JOIN users ON bookings.student_id = users.id
    WHERE bookings.owner_id = ?
    ORDER BY bookings.booking_date DESC
  `;

  const [rows] = await db.execute(query, [owner_id]);

  return rows;
};

// Update Booking Status
export const updateBookingStatus = async ({
  booking_id,
  status,
}) => {
  const query = `
    UPDATE bookings
    SET status = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
    status,
    booking_id,
  ]);

  return result;
};