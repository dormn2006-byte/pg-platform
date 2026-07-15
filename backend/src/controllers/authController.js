import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
} from "../models/userModel.js";
import crypto from "crypto";
import { sendOTPEmail, sendLoginAlert } from "../utils/emailService.js";

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


export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    // Verify user exists
    // const user = await getUserByEmail(email);
    // if (!user) return res.status(404).json({ success: false, message: "Account not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Update your database with the OTP (Implement this in userModel.js)
    // await updateUserOTP(user.id, otp, expiry);

    // Send the email
    await sendOTPEmail(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login User
// Make sure to import your email service at the top of the file
// import { sendLoginAlertEmail } from "../services/emailService.js";
// import { clearUserOTP } from "../models/userModel.js"; // Create this helper if you haven't

export const loginUser = async (req, res) => {
  try {
    // 1. Update destructuring to include 'otp'
    const { email, password, otp } = req.body;

    // 2. Validation: Require email AND either a password OR an otp
    if (!email || (!password && !otp)) {
      return res.status(400).json({
        success: false,
        message: "Email and either password or OTP are required",
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

    // 3. --- DUAL AUTHENTICATION LOGIC ---
    if (otp) {
      // METHOD A: OTP Verification
      const now = new Date();

      // Check if OTP matches and is not expired
      if (user.otp_code !== otp || new Date(user.otp_expiry) < now) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired OTP",
        });
      }

      // Clear the OTP from the database so it cannot be reused
      // NOTE: Make sure you have a function to do this, e.g., await clearUserOTP(user.id);

    } else if (password) {
      // METHOD B: Traditional Password Verification (Your exact original logic)
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
    }

    // Generate JWT Token (Your exact original logic)
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

    // 4. (Optional) Fire off the asynchronous login alert email
    // sendLoginAlertEmail(user.email, user.full_name).catch(console.error);

    // Return Response (Your exact original logic)
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