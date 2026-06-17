

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
     fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings/my-bookings");

      setBookings(res.data?.bookings || res.data || []);
    } catch (err) {
      console.error("My Bookings Error:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to load your bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#050B1A] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-400 mb-8">
          Track all PG visit requests and booking approvals.
        </p>

        {loading && (
          <div className="text-center py-20 text-cyan-400">
            Loading bookings...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              No Bookings Yet
            </h2>
            <p className="text-gray-400 mb-6">
              Explore approved PGs and create your first booking request.
            </p>

            <Link
              to="/pgs"
              className="inline-flex px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold"
            >
              Explore PGs
            </Link>
          </div>
        )}

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {booking.pg_name || booking.title || "PG Booking"}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Owner: {booking.owner_name || "N/A"}
                  </p>

                  <p className="text-gray-400">
                    Booking Date: {new Date(
                      booking.booking_date || booking.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {(booking.status || "pending").toUpperCase()}
                  </span>
                </div>
              </div>

              {booking.message && (
                <div className="mt-4 p-4 bg-black/20 rounded-xl text-gray-300">
                  {booking.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;