import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
} from "../models/userModel.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      role,
      phone,
      profile_image,
    } = req.body;

    // Validation
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check Existing User
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const result = await createUser({
      full_name,
      email,
      password: hashedPassword,
      role,
      phone,
      profile_image,
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: result.insertId,
        email,
        role: role || "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: result.insertId,
        full_name,
        email,
        role: role || "student",
      },
    });
  } catch (error) {
    console.log("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find User
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};