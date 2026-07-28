import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { IMAGE_BASE_URL } from "../services/api";

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

const PgDetails = () => {
  const { id } = useParams();

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

          if (pgData?.gallery?.length > 0) {
            setActiveImage(`${IMAGE_BASE_URL}/uploads/${pgData.gallery[0].image_url}`);
          } else if (pgData?.profile_image) {
            setActiveImage(`${IMAGE_BASE_URL}/uploads/${pgData.profile_image}`);
          } else {
            setActiveImage("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop");
          }
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

  // Robust Amenity Cleaning Logic
  const cleanAmenities = useMemo(() => {
    if (!pg?.amenities) return [];

    let list = [];

    if (typeof pg.amenities === "string") {
      try {
        list = JSON.parse(pg.amenities);
      } catch {
        list = pg.amenities.split(",");
      }
    } else if (Array.isArray(pg.amenities)) {
      list = pg.amenities;
    }

    if (!Array.isArray(list)) list = [list];

    return list
      .map((item) =>
        typeof item === "string"
          ? item.replace(/[\[\]"']/g, "").trim()
          : String(item).trim()
      )
      .filter(Boolean);
  }, [pg?.amenities]);

  // Robust House Rules Cleaning Logic
  const cleanRules = useMemo(() => {
    if (!pg?.rules) return [];

    let list = [];

    if (typeof pg.rules === "string") {
      try {
        list = JSON.parse(pg.rules);
      } catch {
        list = pg.rules.split(",");
      }
    } else if (Array.isArray(pg.rules)) {
      list = pg.rules;
    }

    if (!Array.isArray(list)) list = [list];

    return list
      .map((rule) =>
        typeof rule === "string"
          ? rule.replace(/[\[\]"']/g, "").trim()
          : String(rule).trim()
      )
      .filter(Boolean);
  }, [pg?.rules]);

  const galleryImages = useMemo(() => {
    if (!pg) return [];
    return pg.gallery && pg.gallery.length > 0
      ? pg.gallery.map((img) => `${IMAGE_BASE_URL}/uploads/${img.image_url}`)
      : [
          pg.profile_image
            ? `${IMAGE_BASE_URL}/uploads/${pg.profile_image}`
            : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
        ];
  }, [pg]);

  // Gallery Controls
  const showNextImage = () => {
    if (galleryImages.length <= 1) return;
    const currentIndex = galleryImages.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setActiveImage(galleryImages[nextIndex]);
  };

  const showPreviousImage = () => {
    if (galleryImages.length <= 1) return;
    const currentIndex = galleryImages.indexOf(activeImage);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] text-[#3A2935] text-lg font-bold">
        Loading PG Details...
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-bold text-lg">
        {error || "PG Not Found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F5] text-[#3A2935] font-sans selection:bg-[#93B733] selection:text-white pb-20">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          
          {/* LEFT SIDE: Details & Gallery */}
          <div className="flex flex-col gap-8">
            
            {/* Gallery (Bento Box Style) */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-2 shadow-sm md:rounded-[2.5rem] md:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                <img
                  src={activeImage || galleryImages[0]}
                  alt="PG"
                  className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[480px]"
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
                      {galleryImages.indexOf(activeImage) + 1} / {galleryImages.length}
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
                      activeImage === img
                        ? "border-[#93B733] shadow-md opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="h-16 w-full object-cover sm:h-20 md:h-24"
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

                <div className="mt-6 space-y-3">
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