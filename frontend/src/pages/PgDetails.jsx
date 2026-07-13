import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { IMAGE_BASE_URL } from "../services/api";

const PgDetails = () => {
  const { id } = useParams();

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop"
  );

  useEffect(() => {
    const fetchPG = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/pg/${id}`);
        const pgData = res.data?.pg;
        setPg(pgData);

        // Update: Using dynamic IMAGE_BASE_URL instead of hardcoded localhost
        if (pgData?.gallery?.length > 0) {
          setActiveImage(`${IMAGE_BASE_URL}/uploads/${pgData.gallery[0].image_url}`);
        } else if (pgData?.profile_image) {
          setActiveImage(`${IMAGE_BASE_URL}/uploads/${pgData.profile_image}`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] text-[#3A2935] text-lg font-bold">
        Loading PG Details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] text-red-500 font-bold text-lg">
        {error}
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] text-orange-500 font-bold text-lg">
        PG Not Found
      </div>
    );
  }

  const amenities = typeof pg.amenities === "string"
    ? pg.amenities.split(",").map((a) => a.trim())
    : Array.isArray(pg.amenities)
    ? pg.amenities
    : [];

  const rules = typeof pg.rules === "string"
    ? pg.rules.split(",").map((r) => r.trim())
    : Array.isArray(pg.rules)
    ? pg.rules
    : [];

  // Update: Using dynamic IMAGE_BASE_URL instead of hardcoded localhost
  const galleryImages =
    pg.gallery && pg.gallery.length > 0
      ? pg.gallery.map((img) => `${IMAGE_BASE_URL}/uploads/${img.image_url}`)
      : [
          pg.profile_image
            ? `${IMAGE_BASE_URL}/uploads/${pg.profile_image}`
            : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
        ];

  const showPreviousImage = () => {
    const currentIndex = galleryImages.indexOf(activeImage);
    const previousIndex = currentIndex <= 0 ? galleryImages.length - 1 : currentIndex - 1;
    setActiveImage(galleryImages[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = galleryImages.indexOf(activeImage);
    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setActiveImage(galleryImages[nextIndex]);
  };

  const handleBookVisit = async () => {
    try {
      await API.post("/bookings/create", {
        pg_id: Number(id),
        message: "Interested in booking a visit",
      });
      alert("Booking request sent successfully!");
    } catch (error) {
      console.error("Booking Error:", error);
      alert(error?.response?.data?.message || "Failed to create booking");
    }
  };

  const handleWhatsAppOwner = () => {
    const phone = pg?.owner_phone || pg?.phone;
    if (!phone) {
      alert("Owner phone number not available");
      return;
    }
    const message = encodeURIComponent(`Hello, I am interested in ${pg?.title}. I found your PG on Dormn.`);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const handleCallOwner = () => {
    const phone = pg?.owner_phone || pg?.phone;
    if (!phone) {
      alert("Owner phone number not available");
      return;
    }
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F5] text-[#3A2935] font-sans selection:bg-[#E56A54] selection:text-white">
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
                        ? "border-[#E56A54] shadow-md opacity-100"
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
                  <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#E56A54]">
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
                <svg className="w-4 h-4 text-[#E56A54]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {`${pg.area || ""}, ${pg.city || ""}`}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold text-[#3A2935]">
                  <span className="text-[#E56A54]">★</span> {pg.rating || "New"} Ratings
                </div>
                <div className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold text-[#3A2935]">
                  <span className="text-xl">🏠</span> {pg.pg_type || "PG Type"}
                </div>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-gray-600 md:text-base md:leading-8">
                {pg.description || "No description provided for this listing."}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10">
              <h2 className="text-2xl font-black text-[#3A2935]">What this place offers</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                {amenities.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-200 hover:bg-gray-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Section */}
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[2.5rem] md:p-10">
              <h2 className="text-2xl font-black text-[#3A2935]">Rules & Policies</h2>
              <div className="mt-6 space-y-3">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4 text-sm font-medium text-gray-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E56A54] flex-shrink-0"></span>
                    {rule}
                  </div>
                ))}
              </div>
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
                    <h4 className="text-3xl font-black text-[#E56A54]">
                      ₹{Number(pg.price || 0).toLocaleString()}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">Per Month</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-[#3A2935]">{pg.pg_type?.toUpperCase()} PG</h3>
                    <p className="mt-1 text-xs font-medium text-gray-500">
                      Rooms Left: <span className="font-bold text-[#3A2935]">{pg.available_rooms || 0}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleBookVisit}
                    className="w-full rounded-2xl bg-[#E56A54] px-5 py-4 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#d65a45]"
                  >
                    Request a Visit
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleWhatsAppOwner}
                      className="w-full rounded-xl border-2 border-green-100 bg-green-50 px-3 py-3.5 text-xs font-bold text-green-700 transition hover:bg-green-100"
                    >
                      WhatsApp
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
                    Map not available
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