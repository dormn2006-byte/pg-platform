import pool from "../config/db.js";

// Create New User
export const createUser = async ({
  full_name,
  email,
  password,
  role,
  phone,
  profile_image,
}) => {
  const query = `
    INSERT INTO users (
      full_name,
      email,
      password,
      role,
      phone,
      profile_image
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    email,
    password,
    role || "student",
    phone || null,
    profile_image || null,
  ];

  const [result] = await pool.execute(query, values);

  return result;
};

// Find User By Email
export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = ?
    LIMIT 1
  `;

  const [rows] = await pool.execute(query, [email]);

  return rows[0];
};

// Find User By ID
export const findUserById = async (id) => {
  const query = `
    SELECT * FROM users
    WHERE id = ?
    LIMIT 1
  `;

  const [rows] = await pool.execute(query, [id]);

  return rows[0];
};
