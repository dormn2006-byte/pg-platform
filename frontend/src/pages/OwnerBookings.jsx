import { useEffect, useState } from "react";
import api from "../services/api";
import { Filter, CheckCircle, Clock, XCircle, FileText, Check, X } from "lucide-react";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Local state for UI filtering
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Upgraded status styles for pills
  const statusStyles = {
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter((b) => b.status === "approved").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const rejectedBookings = bookings.filter((b) => b.status === "rejected").length;

  // Apply filter without hitting API again
  const filteredBookings = bookings.filter((b) => 
    statusFilter === "all" ? true : b.status === statusFilter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="text-sm font-bold text-gray-400">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 md:text-xs">
            Booking Management
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Booking Requests
          </h1>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Manage student visit requests, approvals, and schedules.
          </p>
        </div>

        {/* Space-Optimized Stats (2x2 on Mobile, 1x4 on Desktop) */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          <div className="rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 lg:p-6 backdrop-blur-sm transition hover:bg-white/10">
            <div className="flex items-center gap-2">
              <FileText className="text-gray-400" size={16} />
              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Total</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">{totalBookings}</h2>
          </div>

          <div className="rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 lg:p-6 backdrop-blur-sm transition hover:bg-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-400" size={16} />
              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Approved</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-400 mt-2">{approvedBookings}</h2>
          </div>

          <div className="rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 lg:p-6 backdrop-blur-sm transition hover:bg-white/10">
            <div className="flex items-center gap-2">
              <Clock className="text-amber-400" size={16} />
              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Pending</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">{pendingBookings}</h2>
          </div>

          <div className="rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5 lg:p-6 backdrop-blur-sm transition hover:bg-white/10">
            <div className="flex items-center gap-2">
              <XCircle className="text-rose-400" size={16} />
              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Rejected</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-rose-400 mt-2">{rejectedBookings}</h2>
          </div>
        </div>

        {/* Swipeable Status Filter Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="mr-1 shrink-0 text-gray-400" size={18} />
          
          <button 
            onClick={() => setStatusFilter("all")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "all" ? "bg-cyan-500 text-white shadow-md" : "bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            All Requests
          </button>
          <button 
            onClick={() => setStatusFilter("pending")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "pending" ? "bg-amber-500 text-white shadow-md" : "bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter("approved")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "approved" ? "bg-emerald-500 text-white shadow-md" : "bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setStatusFilter("rejected")}
            className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${statusFilter === "rejected" ? "bg-rose-500 text-white shadow-md" : "bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20"}`}
          >
            Rejected
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Optimized Booking Cards List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-gray-500" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">No requests found</h3>
            <p className="text-sm text-gray-400 mt-1">Try changing the status filter above.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-2">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-5"
              >
                {/* Card Header: Avatar, Name & Status */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-500 text-white flex items-center justify-center font-black text-xl shadow-inner">
                      {(booking.student_name || booking.full_name || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 text-lg sm:text-xl truncate">
                        {booking.student_name || booking.full_name || 'N/A'}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-500">Student</p>
                    </div>
                  </div>
                  <span className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider ${statusStyles[booking.status?.toLowerCase()] || statusStyles.pending}`}>
                    {booking.status || 'pending'}
                  </span>
                </div>

                {/* Inner Info Box */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100">
                  <div className="col-span-1">
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">PG Name</p>
                    <p className="font-bold text-slate-800 text-sm sm:text-base mt-1 truncate">
                      {booking.pg_name || booking.title || 'PG'}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Date</p>
                    <p className="font-bold text-slate-800 text-sm sm:text-base mt-1">
                      {booking.booking_date
                        ? new Date(booking.booking_date).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-slate-200/60 mt-1">
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Message</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {booking.message || 'Interested in booking a visit for this property.'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons (Thumb-friendly 50/50 split on mobile) */}
                {booking.status === 'pending' && (
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => updateStatus(booking.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 text-sm font-bold rounded-xl bg-emerald-500 text-white transition-transform hover:scale-[1.02] hover:bg-emerald-600 shadow-sm"
                    >
                      <Check size={18} /> Approve
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 text-sm font-bold rounded-xl bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100 border border-rose-200"
                    >
                      <X size={18} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;