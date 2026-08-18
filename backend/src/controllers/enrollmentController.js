import pool from "../config/db.js";

export const submitEnrollment = async (req, res) => {
  try {
    const student_id = req.user.id;
    
    // Destructure the massive form payload sent from frontend
    const { 
        booking_id, pg_id, dob, homeAddress, hometown, pincode,
        parent1Name, parent1Relation, parent1Phone, parent2Name, parent2Relation, parent2Phone,
        guardianName, guardianRelation, guardianPhone,
        foodPreference, bloodGroup, allergies, medicalDetails,
        occupation, workplaceName, designation, // <-- New Fields
        collegeName, admissionYear, collegeIdNumber, courseName, courseYear,
        interests, suggestions
      } = req.body;

    const [existing] = await pool.execute(
      "SELECT id FROM enrollment_forms WHERE booking_id = ?", 
      [booking_id]
    );

    if (existing.length > 0) {
      // If it exists, Update it (Admin can update it)
      await pool.execute(
        `UPDATE enrollment_forms SET 
          dob=?, home_address=?, hometown=?, pincode=?, parent_1_name=?, parent_1_relation=?, parent_1_phone=?, 
          parent_2_name=?, parent_2_relation=?, parent_2_phone=?, guardian_name=?, guardian_relation=?, guardian_phone=?, 
          food_preference=?, blood_group=?, allergies=?, medical_details=?, 
          occupation=?, workplace_name=?, designation=?, 
          college_name=?, admission_year=?, college_id_number=?, course_name=?, course_year=?, interests=?, suggestions=?
         WHERE booking_id = ?`,
        [
          dob, homeAddress, hometown, pincode, parent1Name, parent1Relation, parent1Phone,
          parent2Name, parent2Relation, parent2Phone, guardianName, guardianRelation, guardianPhone,
          foodPreference, bloodGroup, allergies, medicalDetails, 
          occupation, workplaceName, designation,
          collegeName, admissionYear, collegeIdNumber, courseName, courseYear, interests, suggestions, booking_id
        ]
      );
      return res.status(200).json({ success: true, message: "Registration Form Updated Successfully!" });
    }

    // Otherwise, Insert new form
    await pool.execute(
        `INSERT INTO enrollment_forms 
        (booking_id, student_id, pg_id, dob, home_address, hometown, pincode, parent_1_name, parent_1_relation, parent_1_phone, parent_2_name, parent_2_relation, parent_2_phone, guardian_name, guardian_relation, guardian_phone, food_preference, blood_group, allergies, medical_details, occupation, workplace_name, designation, college_name, admission_year, college_id_number, course_name, course_year, interests, suggestions) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking_id, student_id, pg_id, dob, homeAddress, hometown, pincode, parent1Name, parent1Relation, parent1Phone,
          parent2Name, parent2Relation, parent2Phone, guardianName, guardianRelation, guardianPhone,
          foodPreference, bloodGroup, allergies, medicalDetails, 
          occupation, workplaceName, designation,
          collegeName, admissionYear, collegeIdNumber, courseName, courseYear, interests, suggestions
        ]
      );
  
      res.status(201).json({ success: true, message: "Registration Form Submitted Successfully!" });
    } catch (error) {
      console.error("Enrollment Submission Error:", error);
      res.status(500).json({ success: false, message: "Failed to submit enrollment form." });
    }
  };

export const getEnrollmentForOwner = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const { bookingId } = req.params;

    const [form] = await pool.execute(
      `SELECT e.*, p.title AS pg_title, p.address AS pg_address 
       FROM enrollment_forms e
       JOIN pgs p ON e.pg_id = p.id
       WHERE e.booking_id = ? AND p.owner_id = ?`,
      [bookingId, owner_id]
    );

    if (form.length === 0) {
      return res.status(404).json({ success: false, message: "Enrollment form not found." });
    }

    res.status(200).json({ success: true, enrollment: form[0] });
  } catch (error) {
    console.error("Fetch Enrollment Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch enrollment form." });
  }
};
// @route   GET /api/enrollments/owner-list
// @desc    Get all KYC forms for PGs owned by the logged-in user
// @access  Private (Owner)
export const getOwnerEnrollments = async (req, res) => {
    try {
      const owner_id = req.user.id;
  
      // FIX: Removed u.name from COALESCE to prevent the SQL compilation error
      const [enrollments] = await pool.execute(
        `SELECT 
          e.*, 
          COALESCE(u.full_name, 'Unknown Student') AS student_name, 
          u.email AS student_email,
          COALESCE(p.title, 'Unknown Property') AS pg_title
         FROM enrollment_forms e
         JOIN pgs p ON e.pg_id = p.id
         JOIN users u ON e.student_id = u.id
         WHERE p.owner_id = ?
         ORDER BY e.created_at DESC`,
        [owner_id]
      );
  
      res.status(200).json({ success: true, enrollments });
    } catch (error) {
      console.error("Fetch Owner Enrollments Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch tenant registrations." });
    }
  };
  export const updateEnrollmentStatus = async (req, res) => {
    try {
      const owner_id = req.user.id;
      const { enrollment_id, status } = req.body; // status should be 'verified' or 'rejected'
  
      // 1. Ensure the logged-in owner actually owns the PG associated with this form
      const [authCheck] = await pool.execute(
        `SELECT p.id FROM enrollment_forms e 
         JOIN pgs p ON e.pg_id = p.id 
         WHERE e.id = ? AND p.owner_id = ?`,
        [enrollment_id, owner_id]
      );
  
      if (authCheck.length === 0) {
        return res.status(403).json({ success: false, message: "Unauthorized to update this form." });
      }
  
      // 2. Update the status in the enrollment_forms table
      await pool.execute(
        `UPDATE enrollment_forms SET status = ? WHERE id = ?`,
        [status, enrollment_id]
      );
  
      res.status(200).json({ success: true, message: `Tenant status successfully updated to ${status}.` });
    } catch (error) {
      console.error("Update Status Error:", error);
      res.status(500).json({ success: false, message: "Failed to update tenant status." });
    }
  };