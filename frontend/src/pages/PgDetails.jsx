
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import {  useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { IMAGE_BASE_URL } from "../services/api";

// Function to load Razorpay SDK dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Amenity Icon Mapper for a cleaner UI
const getAmenityIcon = (name) => {
  const cleanName = String(name || "").toLowerCase().trim();
  const icons = {
    wifi: "📶",
    ac: "❄️",
    "ac rooms": "❄️",
    food: "🍽️",
    "food included": "🍽️",
    laundry: "🧺",
    parking: "🚗",
    "power backup": "⚡",
    security: "🛡️",
    "cctv security": "🛡️",
    gym: "🏋️",
    "attached bathroom": "🚿",
    housekeeping: "🧹",
    "ro water": "💧",
  };

  if (icons[cleanName]) return icons[cleanName];
  if (cleanName.includes("wifi")) return "📶";
  if (cleanName.includes("ac")) return "❄️";
  if (cleanName.includes("food") || cleanName.includes("meal")) return "🍽️";
  if (cleanName.includes("laundry")) return "🧺";
  if (cleanName.includes("parking")) return "🚗";
  if (cleanName.includes("power")) return "⚡";
  if (cleanName.includes("security") || cleanName.includes("cctv")) return "🛡️";
  if (cleanName.includes("gym")) return "🏋️";
  if (cleanName.includes("bath")) return "🚿";
  if (cleanName.includes("water")) return "💧";

  return "✨";
};

const formatImageUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  const clean = url.trim();
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("data:")) {
    return clean;
  }
  const cleanPath = clean.startsWith("/") ? clean : `/${clean}`;
  if (cleanPath.startsWith("/uploads/")) {
    return `${IMAGE_BASE_URL}${cleanPath}`;
  }
  return `${IMAGE_BASE_URL}/uploads${cleanPath}`;
};

const DEFAULT_DETAILS_FALLBACKS = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
];

const parseListField = (value) => {
  if (!value) return [];

  let list;
  if (typeof value === "string") {
    try {
      list = JSON.parse(value);
    } catch {
      list = value.split(",");
    }
  } else if (Array.isArray(value)) {
    list = value;
  } else {
    list = [value];
  }

  if (!Array.isArray(list)) list = [list];

  return list
    .map((item) =>
      typeof item === "string"
        ? item.replace(/[\]"']/g, "").trim()
        : String(item).trim()
    )
    .filter(Boolean);
};

const PgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");

  // Tracking the user's selected room type and price
  const [selectedRoom, setSelectedRoom] = useState({
    type: "Base",
    isAc: false,
    price: 0,
    label: "Starting Price",
  });

  // --- NEW: COUPON STATE ---
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Reset coupon if user changes room type to prevent mismatched discount values
  useEffect(() => {
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponError("");
  }, [selectedRoom.price]);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/pg/${id}`);
        const pgData = res.data?.pg;
        
        // Safely parse sharing options
        let parsedSharing = {};
        if (pgData?.sharing_options) {
           try {
             parsedSharing = typeof pgData.sharing_options === 'string' 
                ? JSON.parse(pgData.sharing_options) 
                : pgData.sharing_options;
           } catch (e) {
             console.error("Error parsing sharing options", e);
           }
        }
        if (pgData) {
          pgData.parsed_sharing = parsedSharing;
          setPg(pgData);

          // Set default price
          setSelectedRoom({
            type: "Base",
            isAc: false,
            price: Number(pgData.price) || 0,
            label: "Starting Price"
          });
        }
      } catch (err) {
        console.error("PG Details Error:", err);
        setError("Failed to load PG details");
      } finally {
        setLoading(false);
      }
    };

    fetchPG();
  }, [id]);

  const cleanAmenities = parseListField(pg?.amenities);
  const cleanRules = parseListField(pg?.rules);

  const galleryImages = (() => {
    if (!pg) return [];
    const rawList = [];

    // 1. Check pg.images (JSON string or Array)
    if (pg.images) {
      try {
        const parsed = typeof pg.images === "string" ? JSON.parse(pg.images) : pg.images;
        if (Array.isArray(parsed)) rawList.push(...parsed);
      } catch {
        rawList.push(pg.images);
      }
    }

    // 2. Check pg.gallery array
    if (Array.isArray(pg.gallery) && pg.gallery.length > 0) {
      pg.gallery.forEach((g) => {
        if (g?.image_url) rawList.push(g.image_url);
      });
    }

    // 3. Check pg.profile_image / pg.image
    if (pg.profile_image) rawList.push(pg.profile_image);
    if (pg.image) rawList.push(pg.image);

    const formatted = rawList.map(formatImageUrl).filter(Boolean);
    if (formatted.length > 0) return formatted;

    return DEFAULT_DETAILS_FALLBACKS;
  })();

  const displayActiveImage = galleryImages.includes(activeImage)
    ? activeImage
    : galleryImages[0];

  // Gallery Controls
  const showNextImage = () => {
    if (galleryImages.length <= 1) return;
    const currentIndex = galleryImages.indexOf(displayActiveImage);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setActiveImage(galleryImages[nextIndex]);
  };

  const showPreviousImage = () => {
    if (galleryImages.length <= 1) return;
    const currentIndex = galleryImages.indexOf(displayActiveImage);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setActiveImage(galleryImages[prevIndex]);
  };

  const handleCallOwner = () => {
    const phone = pg?.owner_phone || pg?.phone;
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      alert("Owner contact details are not available.");
    }
  };

  const handleBookVisit = async () => {
    try {
      await API.post("/bookings/create", {
        pg_id: Number(id),
        message: `Interested in booking a visit for ${selectedRoom.label}`,
        selected_room_type: selectedRoom.label,
        booked_price: selectedRoom.price,
      });
      alert("Booking request sent successfully!");
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error?.response?.data?.message || "Failed to create booking");
    }
  };


  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  // --- NEW: COUPON VERIFICATION LOGIC ---
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    // Auth Check
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to your account to apply a coupon.");
      return;
    }

    const roomPrice = selectedRoom.price || pg?.price;
    if (!roomPrice) {
      setCouponError("Please select a valid room first.");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const response = await API.post("/payments/apply-coupon", {
        code: couponCode.trim().toUpperCase(),
        original_amount: roomPrice
      });

      if (response.data.success) {
        setAppliedCoupon(couponCode.trim().toUpperCase());
        setDiscountAmount(response.data.discount_applied);
      }
    } catch (error) {
      console.error("Apply Coupon Error:", error);
      setCouponError(error?.response?.data?.message || "Invalid or expired coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // --- UPDATED RAZORPAY PAYMENT LOGIC ---
  const handlePayment = async () => {
    // Auth Check (Fixes 401 unhandled crash)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to your account to book this PG.");
      return;
    }

    const roomPrice = selectedRoom.price || pg?.price;
    
    if (!roomPrice) {
      alert("Please select a valid room type first.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    try {
      // Call backend to create order, passing coupon code securely
      const response = await API.post("/payments/create-order", {
        pg_id: Number(id),
        owner_id: pg.owner_id,
        amount_in_rupees: roomPrice,
        coupon_code: appliedCoupon // Tell backend to apply this coupon
      });
      
      const orderData = response.data;

      if (!orderData.success) {
        alert("Failed to initialize payment: " + orderData.message);
        return;
      }

      // Configure Razorpay Modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "Dormn Platform",
        description: `Booking for ${pg.title}`,
        order_id: orderData.order_id, 
        
        handler: async function (response) {
          try {
            // 1. Send the success IDs to our backend to securely lock it in the database
            const verifyRes = await API.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: orderData.booking_id 
            });

            if (verifyRes.data.success) {
              // 2. Redirect instantly to the new My PGs dashboard!
              navigate("/my-pgs"); 
            }
          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment completed, but verification failed. Please contact support.");
          }
        },
        
        prefill: {
          name: "Student", 
          email: "student@example.com", 
        },
        theme: {
          color: "#4F46E5" 
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment setup failed:", error);
      alert(error?.response?.data?.message || "Something went wrong setting up the payment.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#000000] font-sans selection:bg-[#93B733] selection:text-white pb-20">
        <Navbar />
        <section className="relative z-10 mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="flex flex-col gap-8">
              <div className="rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] p-3 shadow-sm md:rounded-[2.5rem]">
                <div className="h-[300px] md:h-[480px] w-full rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 sm:h-20 md:h-24 w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] dark:bg-[#000000] text-red-500 font-bold text-lg">
        {error || "PG Not Found"}
      </div>
    );
  }

  const currentRoomPrice = selectedRoom.price || pg?.price || 0;
  const finalDisplayPrice = appliedCoupon 
    ? Math.max(currentRoomPrice - discountAmount, 1) 
    : currentRoomPrice;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F5] dark:bg-[#000000] text-[#3A2935] dark:text-white font-sans selection:bg-[#93B733] selection:text-white pb-20">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <section className="relative z-10 mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          
          {/* LEFT SIDE: Details & Gallery */}
          <div className="flex flex-col gap-8">
            
            {/* Gallery (Bento Box Style) */}
            <div className="rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0d0d0d] p-2 shadow-sm md:rounded-[2.5rem] md:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-gray-200 dark:bg-gray-800">
                
                {/* Backside Shimmer Skeleton */}
                {!mainImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse z-0" />
                )}

                <img
                  src={displayActiveImage}
                  alt="PG"
                  onLoad={() => setMainImageLoaded(true)}
                  className={`h-[300px] w-full object-cover transition-all duration-700 hover:scale-105 md:h-[480px] ${
                    mainImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_DETAILS_FALLBACKS[0];
                    setMainImageLoaded(true);
                  }}
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={showPreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
                    >
                      ←
                    </button>

                    <button
                      onClick={showNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
                    >
                      →
                    </button>

                    <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                      {galleryImages.indexOf(displayActiveImage) + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-2 grid grid-cols-4 gap-2 md:mt-3 md:gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      displayActiveImage === img
                        ? "border-[#93B733] shadow-md opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="h-16 w-full object-cover sm:h-20 md:h-24"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_DETAILS_FALLBACKS[index % DEFAULT_DETAILS_FALLBACKS.length];
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* About / Header Section */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-lg bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700">
                  Verified Stay
                </span>

                {pg.sponsored && (
                  <span className="rounded-lg bg-[#93B733]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#93B733]">
                    Sponsored
                  </span>
                )}
                
                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  {pg.status || "Active"}
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-[#3A2935] md:text-5xl">
                {pg.title}
              </h1>

              <p className="mt-3 text-sm font-medium text-gray-500 md:text-base flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#93B733]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {`${pg.area || ""}, ${pg.city || ""}`}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold text-[#3A2935]">
                  <span className="text-[#93B733]">★</span> {pg.rating || "New"} Ratings
                </div>
                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold text-[#3A2935]">
                  <span className="text-xl">🏠</span> {String(pg.pg_type || "PG").toUpperCase()}
                </div>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-gray-600 md:text-base md:leading-8 whitespace-pre-line">
                {pg.description || "No description provided for this listing."}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10">
              <h2 className="text-2xl font-black text-[#3A2935]">What this place offers</h2>
              {cleanAmenities.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                  {cleanAmenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-200 hover:bg-gray-100"
                    >
                      <span className="text-xl">{getAmenityIcon(item)}</span>
                      <span className="capitalize">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm font-medium text-gray-400">
                  Standard amenities included.
                </p>
              )}
            </div>

            {/* Rules Section */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10">
              <h2 className="text-2xl font-black text-[#3A2935]">Rules & Policies</h2>
              {cleanRules.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {cleanRules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4 text-sm font-medium text-gray-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#93B733] flex-shrink-0"></span>
                      {rule}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm font-medium text-gray-400">
                  Standard house rules apply.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Booking & Actions */}
          <div className="space-y-6">
            
            {/* Sticky Container for right sidebar */}
            <div className="sticky top-[100px] space-y-6">
              
              {/* Pricing & Booking Card */}
              <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:rounded-[2.5rem] md:p-8">
                <div className="flex items-end justify-between border-b-2 border-gray-100 pb-6">
                  <div>
                    <h4 className="text-3xl font-black text-[#93B733]">
                      ₹{selectedRoom.price ? selectedRoom.price.toLocaleString() : Number(pg.price || 0).toLocaleString()}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">
                      {selectedRoom.label || "Per Month"}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-[#3A2935]">{String(pg.pg_type || "").toUpperCase()} PG</h3>
                    <p className="mt-1 text-xs font-medium text-gray-500">
                      Rooms Left: <span className="font-bold text-[#3A2935]">{pg.available_rooms || 0}</span>
                    </p>
                  </div>
                </div>

                {/* Dynamic Room Selection (Sharing Options) */}
                {pg.parsed_sharing && Object.keys(pg.parsed_sharing).length > 0 && (
                  <div className="mt-6 border-b-2 border-gray-100 pb-6">
                    <h3 className="font-bold text-xs text-gray-500 mb-3 uppercase tracking-wider">Select Room Type</h3>
                    <div className="space-y-3">
                      {Object.entries(pg.parsed_sharing).map(([type, options]) => {
                        if (!options?.available) return null;
                        
                        return (
                          <div key={type} className="grid grid-cols-2 gap-2">
                            {options.ac_price && (
                              <button
                                onClick={() => setSelectedRoom({
                                  type, isAc: true, price: Number(options.ac_price), label: `${type} Sharing (AC)`
                                })}
                                className={`p-3 text-left rounded-xl border-2 transition-all ${
                                  selectedRoom.type === type && selectedRoom.isAc 
                                  ? 'border-[#93B733] bg-[#93B733]/10' 
                                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                                }`}
                              >
                                <div className="text-xs font-bold capitalize text-[#3A2935]">{type}</div>
                                <div className="text-[10px] text-gray-400 mb-0.5">AC Room</div>
                                <div className="text-xs font-black text-[#93B733]">₹{Number(options.ac_price).toLocaleString()}</div>
                              </button>
                            )}
                            
                            {options.non_ac_price && (
                              <button
                                onClick={() => setSelectedRoom({
                                  type, isAc: false, price: Number(options.non_ac_price), label: `${type} Sharing (Non-AC)`
                                })}
                                className={`p-3 text-left rounded-xl border-2 transition-all ${
                                  selectedRoom.type === type && !selectedRoom.isAc 
                                  ? 'border-[#93B733] bg-[#93B733]/10' 
                                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                                }`}
                              >
                                <div className="text-xs font-bold capitalize text-[#3A2935]">{type}</div>
                                <div className="text-[10px] text-gray-400 mb-0.5">Non-AC Room</div>
                                <div className="text-xs font-black text-[#93B733]">₹{Number(options.non_ac_price).toLocaleString()}</div>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- NEW: COUPON SECTION --- */}
                <div className="mt-6 border-b-2 border-gray-100 pb-6">
                  <h3 className="font-bold text-xs text-gray-500 mb-3 uppercase tracking-wider">Have a Coupon?</h3>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                      <div>
                        <p className="text-xs font-bold text-green-700">{appliedCoupon} Applied!</p>
                        <p className="text-[10px] text-green-600 font-medium">You saved ₹{discountAmount.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { setAppliedCoupon(null); setDiscountAmount(0); setCouponCode(""); }} 
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={couponCode} 
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter code" 
                          className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-[#3A2935] focus:outline-none focus:border-indigo-500 uppercase transition"
                        />
                        <button 
                          onClick={handleApplyCoupon} 
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition hover:bg-gray-800 disabled:opacity-50"
                        >
                          {isApplyingCoupon ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && <p className="text-red-500 text-[10px] font-bold mt-1.5">{couponError}</p>}
                    </div>
                  )}
                </div>

                {/* --- UPDATED ACTION BUTTONS --- */}
                <div className="mt-6 space-y-3">
                  
                  {/* UPDATED RAZORPAY PAYMENT BUTTON (Shows Dynamic Price) */}
                  <button
                    onClick={handlePayment}
                    className="w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-indigo-700"
                  >
                    Book PG Now (Pay ₹{finalDisplayPrice.toLocaleString()})
                  </button>

                  <button
                    onClick={handleBookVisit}
                    className="w-full rounded-2xl bg-[#93B733] px-5 py-4 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#82a32d]"
                  >
                    Request a Visit
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => window.open(`https://wa.me/${pg?.owner_phone || pg?.phone}`, "_blank")}
                      className="w-full border-2 border-gray-200 bg-white py-3.5 rounded-xl text-xs font-bold text-[#3A2935] transition hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <span className="text-green-600 text-sm leading-none">✆</span> WhatsApp
                    </button>

                    <button
                      onClick={handleCallOwner}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3.5 text-xs font-bold text-[#3A2935] transition hover:bg-gray-50"
                    >
                      Call Owner
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-gray-500">
                  Owner Contact: <span className="font-bold text-[#3A2935]">{pg?.owner_phone || pg?.phone || "Not Available"}</span>
                </div>
              </div>

              {/* Map / Location Card */}
              <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-8">
                <h3 className="text-xl font-black text-[#3A2935]">Exact Location</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600">
                  {pg.address || `${pg.area || ""}, ${pg.city || ""}`}
                </p>

                {pg.google_map_link ? (
                  <a
                    href={pg.google_map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Open Google Maps
                  </a>
                ) : (
                  <div className="mt-5 rounded-xl border-2 border-gray-100 bg-gray-50 p-3.5 text-center text-sm font-bold text-gray-400">
                    Map location not provided
                  </div>
                )}
              </div>

              {/* Advertisement Space */}
              <div className="rounded-[2rem] border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-colors hover:border-gray-400">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Advertisement
                </p>
                <h3 className="mt-2 text-xl font-black text-[#3A2935]">
                  Promote Your PG
                </h3>
                <button className="mt-4 rounded-xl border-2 border-[#3A2935] bg-white px-5 py-2.5 text-xs font-bold text-[#3A2935] transition hover:bg-[#3A2935] hover:text-white">
                  Learn More
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PgDetails;
