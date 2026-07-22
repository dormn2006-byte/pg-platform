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
export const sendWelcomeEmail = async (to, name, role) => {
    const isOwner = role === 'owner';
    const subject = isOwner ? "Welcome to the Dormn Partner Community!" : "Welcome to Dormn – Find Your Next Home";
    
    const htmlContent = isOwner 
      ? `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #3A2935;">
          <h1 style="color: #E56A54; border-bottom: 2px solid #E56A54; padding-bottom: 10px;">Welcome to Dormn, ${name}!</h1>
          <p style="font-size: 16px;">We are delighted to have you as a property partner. You are now part of a network dedicated to connecting quality properties with deserving students.</p>
          
          <h3 style="color: #3A2935;">How to get started:</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Complete your Listing:</strong> High-quality photos and accurate descriptions help you get bookings 3x faster.</li>
            <li><strong>Set your Availability:</strong> Keep your calendar updated so students know when you have space.</li>
            <li><strong>Reach Out:</strong> Our support team is here for you. If you have any questions or need to verify your listing, just hit reply to this email.</li>
          </ul>
          
          <p style="margin-top: 30px;">Let’s make finding a room effortless for everyone.</p>
          <p>Best regards,<br><strong>The Dormn Team</strong></p>
        </div>
      `
      : `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #3A2935;">
          <h1 style="color: #E56A54; border-bottom: 2px solid #E56A54; padding-bottom: 10px;">Welcome to Dormn, ${name}!</h1>
          <p style="font-size: 16px;">Finding a home away from home shouldn't be stressful. We're here to make sure your stay is comfortable and your search is simple.</p>
          
          <h3 style="color: #3A2935;">What you can do now:</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Explore Listings:</strong> Browse thousands of verified PGs and hostels.</li>
            <li><strong>Save your Favorites:</strong> Keep track of your top choices.</li>
            <li><strong>Book with Confidence:</strong> We curate the best spaces so you don't have to worry about quality.</li>
          </ul>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://dormn.com/pgs" style="background-color: #E56A54; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Start Searching</a>
          </p>
          <p>If you have any trouble finding what you need, feel free to reply to this email!</p>
          <p>Warmly,<br><strong>The Dormn Team</strong></p>
        </div>
      `;
      
    return await sendEmail(to, subject, htmlContent);
  };

export const sendContactEmail = async ({ name, email, description }) => {
  const companyEmail = process.env.SUPPORT_EMAIL || process.env.SMTP_USER || "support@dormn.com";
  
  // 1. Mail to Support Team
  const adminSubject = `[Dormn Contact] New message from ${name}`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #3A2935; border: 1px solid #E56A54; border-radius: 16px;">
      <h2 style="color: #E56A54; margin-top: 0;">New Contact Form Inquiry</h2>
      <p style="font-size: 15px;"><strong>From:</strong> ${name}</p>
      <p style="font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #E56A54;">${email}</a></p>
      <div style="margin-top: 20px; padding: 16px; bg-color: #FAF9F5; background: #FAF9F5; border-radius: 12px; border-left: 4px solid #E56A54;">
        <p style="margin: 0; font-weight: bold; color: #3A2935;">Message / Description:</p>
        <p style="margin-top: 8px; line-height: 1.6; color: #4A5568; white-space: pre-wrap;">${description}</p>
      </div>
      <p style="font-size: 12px; color: #A0AEC0; margin-top: 24px;">This message was submitted via the Dormn Contact Us page.</p>
    </div>
  `;

  // Send to company support email (non-blocking errors)
  sendEmail(companyEmail, adminSubject, adminHtml).catch((err) => 
    console.error("Support notification email failed:", err)
  );

  // 2. Automated Confirmation Email to Customer
  const userSubject = `We've Received Your Message - Dormn Support`;
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #3A2935; border: 1px solid #E5E7EB; border-radius: 16px;">
      <h2 style="color: #E56A54; margin-top: 0;">Hello ${name},</h2>
      <p style="font-size: 15px; line-height: 1.6;">Thank you for contacting <strong>Dormn Support</strong>! We have received your request and our customer experience team is reviewing your message.</p>
      
      <div style="margin-top: 16px; padding: 16px; background: #FAF9F5; border-radius: 12px; border-left: 4px solid #E56A54;">
        <p style="margin: 0; font-size: 13px; font-weight: bold; color: #718096;">YOUR SUBMITTED MESSAGE:</p>
        <p style="margin-top: 6px; line-height: 1.5; color: #2D3748; font-style: italic;">"${description}"</p>
      </div>

      <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">Our support representatives typically respond within 12 to 24 hours. If your request is urgent, you can also reach us directly at <a href="mailto:support@dormn.com" style="color: #E56A54;">support@dormn.com</a>.</p>

      <p style="margin-top: 28px; font-size: 14px; color: #4A5568;">Warm regards,<br/><strong>The Dormn Customer Success Team</strong></p>
    </div>
  `;

  sendEmail(email, userSubject, userHtml).catch((err) =>
    console.error("Customer confirmation email failed:", err)
  );

  return true;
};