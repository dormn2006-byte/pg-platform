import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: parseInt(process.env.SMTP_PORT || "465") === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Dormn" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    return false;
  }
};

export const sendOTPEmail = async (to, otp) => {
  const subject = `${otp} is your Dormn Verification Code`;
  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #3A2935;">
      <h2 style="color: #E56A54;">Dormn Verification</h2>
      <p>Your one-time password (OTP) is:</p>
      <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; padding: 10px 0;">${otp}</div>
      <p style="font-size: 12px; color: #888;">Valid for 5 minutes.</p>
    </div>
  `;
  return await sendEmail(to, subject, htmlContent);
};

export const sendLoginAlert = async (to, name) => {
  const subject = "New Login Detected - Dormn";
  const htmlContent = `<p>Hi ${name}, a new login was detected on your account.</p>`;
  return await sendEmail(to, subject, htmlContent);
};