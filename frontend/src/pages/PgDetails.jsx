import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

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

        console.log("PG API Response:", res.data);

        const pgData = res.data?.pg;

        console.log("PG Object:", pgData);

        setPg(pgData);

        if (pgData?.profile_image) {
          setActiveImage(`http://localhost:8000/uploads/${pgData.profile_image}`);
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
    return <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">Loading PG Details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-red-400">{error}</div>;
  }

  if (!pg) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-yellow-400">PG Not Found</div>;
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

  const galleryImages = [
    pg.profile_image
      ? `http://localhost:8000/uploads/${pg.profile_image}`
      : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
  ];
const handleBookVisit = async () => {
  try {
    await API.post("/bookings/create", {
      pg_id: Number(id),
      message: "Interested in booking a visit",
    });

    alert("Booking request sent successfully!");
  } catch (error) {
    console.error("Booking Error:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to create booking"
    );
  }
};

const handleWhatsAppOwner = () => {
  const phone = pg?.owner_phone || pg?.phone;

  if (!phone) {
    alert("Owner phone number not available");
    return;
  }

  const message = encodeURIComponent(
    `Hello, I am interested in ${pg?.title}. I found your PG on PGVerse.`
  );

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
    <div className="min-h-screen overflow-x-hidden bg-[#0b1020] text-white">
      {/* Background */}
      <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"></div>
      <div className="absolute right-[-100px] top-[200px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

      {/* Navbar */}
      <Navbar />
      

      {/* Main Layout */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT SIDE */}
          <div>
            {/* Gallery */}
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl">
              <img
                src={activeImage || galleryImages[0]}
                alt="PG"
                className="h-[280px] w-full object-cover md:h-[520px]"
              />

              <div className="grid grid-cols-4 gap-3 p-4 md:p-5">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      activeImage === img
                        ? "border-cyan-400"
                        : "border-white/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="h-20 w-full object-cover md:h-24"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300">
                  Verified
                </span>

                {pg.sponsored && (
                  <span className="rounded-full bg-pink-500/10 px-4 py-2 text-xs font-bold text-pink-300">
                    Sponsored
                  </span>
                )}

                <span className="rounded-full bg-green-500/10 px-4 py-2 text-xs font-bold text-green-300">
                  {pg.status}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                {pg.title}
              </h1>

              <p className="mt-4 text-lg text-gray-300">
                📍 {`${pg.area || ""}, ${pg.city || ""}`}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-xl">
                  📌 {pg.address || pg.city}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                  ⭐ {pg.rating} Ratings
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                  🏠 {pg.pg_type}
                </div>
              </div>

              <p className="mt-8 text-base leading-8 text-gray-300 md:text-lg">
                {pg.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <h2 className="text-3xl font-black">Amenities</h2>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {amenities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm font-medium text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <h2 className="text-3xl font-black">Rules & Policies</h2>

              <div className="mt-6 space-y-4">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-gray-300"
                  >
                    • {rule}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* Price Cards */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <h2 className="text-3xl font-black">Room Pricing</h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">{pg.pg_type?.toUpperCase()} PG</h3>
                      <p className="mt-2 text-sm text-gray-400">
                        Available Rooms: {pg.available_rooms || 0}
                      </p>
                    </div>

                    <h4 className="text-xl font-black text-cyan-300">
                      ₹{pg.price}/month
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 p-6 backdrop-blur-2xl md:p-8">
              <h2 className="text-3xl font-black">
                Interested?
              </h2>

              <p className="mt-4 leading-7 text-gray-300">
                Contact the PG owner directly or schedule a property visit.
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
  Owner Contact: {pg?.owner_phone || pg?.phone || "Not Available"}
</div>

              <div className="mt-8 space-y-4">
              <button
  onClick={handleBookVisit}
  className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-5 py-4 font-bold shadow-xl shadow-pink-500/20 transition hover:scale-[1.02]"
>
  Book Visit
</button>

                <button
  onClick={handleWhatsAppOwner}
  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
>
  WhatsApp Owner
</button>

                <button
  onClick={handleCallOwner}
  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
>
  Call Owner
</button>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <h3 className="text-2xl font-black">Location</h3>

              <p className="mt-3 text-gray-300">
                {pg.address || `${pg.area || ""}, ${pg.city || ""}`}
              </p>

              {pg.google_map_link ? (
                <a
                  href={pg.google_map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-5 py-4 font-bold text-white shadow-xl shadow-pink-500/20 transition hover:scale-[1.02]"
                >
                  📍 Open in Google Maps
                </a>
              ) : (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-gray-400">
                  Location not available
                </div>
              )}
            </div>

            {/* Ad Box */}
            <div className="rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Advertisement Space
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Promote Your PG Here
              </h3>

              <button className="mt-6 rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:scale-105">
                Run Sponsorship
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PgDetails;