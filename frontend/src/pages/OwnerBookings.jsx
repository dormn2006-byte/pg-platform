import { useEffect, useState } from "react";
import api from "../services/api";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/owner-bookings");
      setBookings(res.data?.bookings || res.data || []);
    } catch (err) {
      console.error("Owner Bookings Error:", err);
      setError(err?.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await api.put(`/bookings/status/${bookingId}`, { status });
      fetchBookings();
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update booking status");
    }
  };

  const statusColor = (status) => {
    if (status === "approved") return "text-green-400";
    if (status === "rejected") return "text-red-400";
    return "text-yellow-400";
  };

  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter((b) => b.status === 'approved').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const rejectedBookings = bookings.filter((b) => b.status === 'rejected').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050B1A] text-white flex items-center justify-center">
        Loading booking requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B1A] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Booking Requests</h1>
        <p className="text-gray-400 mb-8">
          Manage student visit requests for your PGs.
        </p>

        <div className="grid gap-5 md:grid-cols-4 mb-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-gray-400 text-sm">Total Requests</p>
            <h2 className="text-4xl font-black mt-2">{totalBookings}</h2>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-gray-400 text-sm">Approved</p>
            <h2 className="text-4xl font-black text-green-400 mt-2">{approvedBookings}</h2>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-gray-400 text-sm">Pending</p>
            <h2 className="text-4xl font-black text-yellow-400 mt-2">{pendingBookings}</h2>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-gray-400 text-sm">Rejected</p>
            <h2 className="text-4xl font-black text-red-400 mt-2">{rejectedBookings}</h2>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            No booking requests found.
          </div>
        ) : (
          <div className="grid gap-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white flex items-center justify-center font-bold">
                      {(booking.student_name || booking.full_name || 'S').charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {booking.student_name || booking.full_name || 'N/A'}
                      </h3>
                      <p className="text-xs text-slate-500">Student</p>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <p className="text-xs text-slate-500">PG Name</p>
                    <p className="font-semibold text-slate-900">
                      {booking.pg_name || booking.title || 'PG'}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-medium text-slate-800 text-sm">
                      {booking.booking_date
                        ? new Date(booking.booking_date).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusColor(booking.status)}`}>
                      {(booking.status || 'pending').toUpperCase()}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex gap-2 justify-start md:justify-end">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'approved')}
                          className="px-3 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(booking.id, 'rejected')}
                          className="px-3 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>

                  <div className="md:col-span-12 bg-slate-50 rounded-xl p-3 text-sm text-slate-600 border border-slate-200">
                    {booking.message || 'Interested in booking a visit'}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;