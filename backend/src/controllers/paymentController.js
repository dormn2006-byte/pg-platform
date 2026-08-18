import Razorpay from "razorpay";
import pool from "../config/db.js"; 
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================================
// 1. API: APPLY COUPON (For Frontend Preview)
// ==========================================
export const applyCoupon = async (req, res) => {
  try {
    const { code, original_amount } = req.body;

    // 1. Find the coupon
    const [coupons] = await pool.execute(
      `SELECT * FROM coupons WHERE code = ? AND is_active = TRUE`,
      [code]
    );

    if (coupons.length === 0) {
      return res.status(404).json({ success: false, message: "Invalid or inactive coupon code." });
    }

    const coupon = coupons[0];

    // 2. Security Checks
    if (new Date(coupon.expiry_date) < new Date()) {
      return res.status(400).json({ success: false, message: "This coupon has expired." });
    }
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ success: false, message: "This coupon usage limit has been reached." });
    }
    if (Number(original_amount) < Number(coupon.min_booking_amount)) {
      return res.status(400).json({ success: false, message: `Requires a minimum booking of ₹${coupon.min_booking_amount}.` });
    }

    // 3. Calculate Discount
    let discount = 0;
    if (coupon.discount_type === 'flat') {
      discount = Number(coupon.discount_value);
    } else if (coupon.discount_type === 'percentage') {
      discount = (Number(original_amount) * Number(coupon.discount_value)) / 100;
      if (coupon.max_discount_amount && discount > Number(coupon.max_discount_amount)) {
        discount = Number(coupon.max_discount_amount);
      }
    }

    let final_amount = Number(original_amount) - discount;

    // 🚨 RAZORPAY RULE: Amount can never be less than ₹1.00
    if (final_amount < 1) {
      final_amount = 1.00;
    }

    res.status(200).json({
      success: true,
      discount_applied: discount,
      final_amount: final_amount,
      message: "Coupon applied successfully!"
    });

  } catch (error) {
    console.error("Apply Coupon Error:", error);
    res.status(500).json({ success: false, message: "Failed to apply coupon." });
  }
};

// ==========================================
// 2. API: CREATE SECURE ORDER (Updated)
// ==========================================
export const createOrder = async (req, res) => {
  try {
    const { pg_id, owner_id, amount_in_rupees, coupon_code } = req.body;
    const user_id = req.user.id; 
    let final_amount = Number(amount_in_rupees);

    // If frontend sends a coupon, backend MUST re-verify it securely
    if (coupon_code) {
      const [coupons] = await pool.execute(`SELECT * FROM coupons WHERE code = ? AND is_active = TRUE`, [coupon_code]);
      
      if (coupons.length > 0) {
        const coupon = coupons[0];
        // Ensure it's valid
        if (new Date(coupon.expiry_date) >= new Date() && (!coupon.usage_limit || coupon.used_count < coupon.usage_limit)) {
          
          let discount = 0;
          if (coupon.discount_type === 'flat') discount = Number(coupon.discount_value);
          else if (coupon.discount_type === 'percentage') discount = (final_amount * Number(coupon.discount_value)) / 100;
          
          final_amount = final_amount - discount;
          
          // Force minimum ₹1.00
          if (final_amount < 1) final_amount = 1.00;
        }
      }
    }

    // Convert to Paise (Razorpay requirement)
    // Math.round prevents decimal errors like 100.0000001
    const amount_in_paise = Math.round(final_amount * 100); 

    const options = {
      amount: amount_in_paise,
      currency: "INR",
      receipt: `receipt_pg_${pg_id}_user_${user_id}`
    };

    const order = await razorpayInstance.orders.create(options);

    const [bookingResult] = await pool.execute(
      `INSERT INTO bookings (student_id, pg_id, owner_id, status, payment_status) VALUES (?, ?, ?, 'pending', 'pending')`,
      [user_id, pg_id, owner_id]
    );
    
    const booking_id = bookingResult.insertId;

    await pool.execute(
      `INSERT INTO payments (booking_id, user_id, pg_id, owner_id, razorpay_order_id, amount, status) VALUES (?, ?, ?, ?, ?, ?, 'created')`,
      [booking_id, user_id, pg_id, owner_id, order.id, final_amount] // Save the discounted amount in DB
    );

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      booking_id: booking_id
    });

  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to initialize payment" });
  }
};
export const verifyPayment = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = req.body;
  
      // 1. Create the expected signature using your Secret Key
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      // 2. Compare signatures to prevent fraud/tampering
      if (expectedSignature === razorpay_signature) {
        
        // 3. Update the Payments table to 'successful'
        await pool.execute(
          `UPDATE payments SET razorpay_payment_id = ?, razorpay_signature = ?, status = 'successful' WHERE razorpay_order_id = ?`,
          [razorpay_payment_id, razorpay_signature, razorpay_order_id]
        );
  
        // 4. Update the Bookings table to 'approved' and 'paid'
        await pool.execute(
          `UPDATE bookings SET status = 'approved', payment_status = 'paid' WHERE id = ?`,
          [booking_id]
        );
  
        res.status(200).json({ success: true, message: "Payment verified successfully!" });
      } else {
        // Signatures didn't match (Someone tried to fake a payment!)
        await pool.execute(
          `UPDATE payments SET status = 'failed' WHERE razorpay_order_id = ?`,
          [razorpay_order_id]
        );
        res.status(400).json({ success: false, message: "Payment verification failed. Invalid signature." });
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      res.status(500).json({ success: false, message: "Internal server error during verification." });
    }
  };