import { sendContactEmail } from "../utils/emailService.js";

export const handleContactSubmit = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    // Validation
    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all required fields (name, email, and description).",
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Process & dispatch email via Nodemailer service
    await sendContactEmail({ name, email, description });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully! Check your inbox for confirmation.",
    });
  } catch (error) {
    console.error("Contact Form Processing Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to process your message right now. Please try again later.",
    });
  }
};
