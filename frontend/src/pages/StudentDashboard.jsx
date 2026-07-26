import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BookOpen,
  Heart,
  User,
  Settings,
  Clock,
  CheckCircle,
  CreditCard,
  BedDouble,
  Users,
  ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  
  // NEW: State to hold the count of saved PGs
  const [savedPGsCount, setSavedPGsCount] = useState(0); 

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch both bookings and saved PGs simultaneously
      const [bookingsRes, savedRes] = await Promise.all([
        api.get("/bookings/my-bookings"),
        api.get("/pg/saved") // Calls the backend route we made in Phase 1
      ]);

      // --- Handle Bookings ---
      let bookings = bookingsRes.data?.bookings || bookingsRes.data || [];

      // Sorting Logic: Approved comes first, then sort by newest date
      bookings.sort((a, b) => {
        if (a.status === "approved" && b.status !== "approved") return -1;
        if (a.status !== "approved" && b.status === "approved") return 1;
        // If both are the same status, sort by newest booking date
        return new Date(b.booking_date) - new Date(a.booking_date);
      });

      setRecentBookings(bookings.slice(0, 5));

      setStats({
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        approved: bookings.filter((b) => b.status === "approved").length,
        rejected: bookings.filter((b) => b.status === "rejected").length,
      });

      // --- Handle Saved PGs ---
      if (savedRes.data && savedRes.data.success) {
        setSavedPGsCount(savedRes.data.total || 0);
      }

    } catch (error) {
      console.error("Student Dashboard Error:", error);
    }
  };

  const quickActions = [
    {
      title: "My Bookings",
      description: "Track requests and approvals",
      icon: BookOpen,
      link: "/my-bookings",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Saved PGs",
      description: "View your favourite listings",
      icon: Heart,
      link: "/saved-pgs", // Updated link for our next step!
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      title: "My Profile",
      description: "Manage personal information",
      icon: User,
      link: "#",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Settings",
      description: "Update account preferences",
      icon: Settings,
      link: "#",
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#3A2935] font-sans pb-12">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-8 md:mb-10 rounded-[2rem] border border-gray-100 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Portal</span>
          </div>
          <h1 className="text-3xl font-black md:text-5xl tracking-tight">
            My Dashboard
          </h1>
          <p className="mt-3 text-gray-500 max-w-2xl font-medium text-sm md:text-base">
            Manage your accommodation journey. Track bookings, complete payments, and connect with your PG owners seamlessly.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3">
          <div className="rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                <Clock size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Pending</p>
                <p className="text-3xl font-black text-[#3A2935]">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Approved</p>
                <p className="text-3xl font-black text-[#3A2935]">{stats.approved}</p>
              </div>
            </div>
          </div>

          {/* Spans full width on mobile if odd number, normal on desktop */}
          <div className="col-span-2 md:col-span-1 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5 h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                <Heart size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Saved PGs</p>
                {/* Dynamically displaying the saved PGs count */}
                <p className="text-3xl font-black text-[#3A2935]">{savedPGsCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 md:mt-12">
          <h2 className="mb-5 text-xl md:text-2xl font-black tracking-tight">Quick Actions</h2>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="group rounded-[1.5rem] border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#E56A54]/30 hover:shadow-md hover:-translate-y-1"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-colors group-hover:bg-[#E56A54] group-hover:text-white`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[#3A2935] flex items-center justify-between">
                    {item.title}
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#E56A54] transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity / Active Stays */}
        <div className="mt-10 md:mt-12 rounded-[2rem] border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Booking Status</h2>
            <Link to="/my-bookings" className="text-sm font-bold text-[#E56A54] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                <p className="text-sm font-bold text-gray-500">No booking activity yet.</p>
                <Link to="/explore" className="mt-3 inline-block rounded-xl bg-[#E56A54] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d65a45]">
                  Explore PGs
                </Link>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-[#FAF9F5] transition-all hover:border-gray-200 hover:shadow-sm"
                >
                  {/* Top Bar: Basic Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 bg-white">
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-[#3A2935]">
                        {booking.pg_name || booking.title || `Accommodation #${booking.pg_id}`}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        Requested on: {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : "Recently"}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                        booking.status === "approved"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : booking.status === "rejected"
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Detailed Breakdown if Approved */}
                  {booking.status === "approved" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-t border-gray-100 bg-[#FAF9F5]">
                      
                      {/* Payment Status Placeholder */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <CreditCard size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-gray-400">Payment</p>
                          <p className="text-sm font-semibold text-[#3A2935]">Pending</p>
                        </div>
                      </div>

                      {/* Bed / Room Placeholder */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                          <BedDouble size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-gray-400">Room / Bed</p>
                          <p className="text-sm font-semibold text-[#3A2935]">Assigning...</p>
                        </div>
                      </div>

                      {/* Roommate Placeholder */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-gray-400">Roommate</p>
                          <p className="text-sm font-semibold text-[#3A2935]">TBD</p>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;