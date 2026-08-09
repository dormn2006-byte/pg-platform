import { getApprovedReviews, createReview, deleteReview } from "../models/reviewModel.js";
import { getAllReviewsForAdmin, updateReviewStatus } from "../models/reviewModel.js";

// Get all approved reviews for the homepage
export const fetchReviews = async (req, res) => {
  try {
    const reviews = await getApprovedReviews();
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    // 🛡️ CRITICAL SAFETY CHECK: Prevent the "undefined" crash
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required. Please log in to submit a review." 
      });
    }

    const userId = req.user.id; 
    const { rating, description } = req.body;

    if (!description) {
      return res.status(400).json({ success: false, message: "Review description is required" });
    }

    await createReview(userId, rating, description);
    res.status(201).json({ success: true, message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};
// --- SUPER ADMIN CONTROLLERS ---

export const fetchAdminReviews = async (req, res) => {
    try {
      const reviews = await getAllReviewsForAdmin();
      
      // 🔍 DEBUGGER: Look at your backend terminal when you open the admin page!
      console.log("🛠️ DEBUG - Reviews fetched from DB:", reviews);
  
      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error("❌ Admin Fetch Reviews Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch admin reviews", error: error.message });
    }
  };
  
  export const toggleReviewStatus = async (req, res) => {
    try {
      const { id, status } = req.body;
      await updateReviewStatus(id, status);
      res.status(200).json({ success: true, message: `Review marked as ${status}` });
    } catch (error) {
      console.error("Status Update Error:", error);
      res.status(500).json({ success: false, message: "Failed to update status" });
    }
  };
  
  export const removeReview = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteReview(id);
      res.status(200).json({ success: true, message: "Review deleted permanently" });
    } catch (error) {
      console.error("Delete Review Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete review" });
    }
  };