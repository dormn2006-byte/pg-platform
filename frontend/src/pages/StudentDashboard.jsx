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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/bookings/my-bookings");

      const bookings = res.data?.bookings || res.data || [];

      setRecentBookings(bookings.slice(0, 5));

      setStats({
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        approved: bookings.filter((b) => b.status === "approved").length,
        rejected: bookings.filter((b) => b.status === "rejected").length,
      });
    } catch (error) {
      console.error("Student Dashboard Error:", error);
    }
  };

  const quickActions = [
    {
      title: "My Bookings",
      description: "Track booking requests and approvals",
      icon: BookOpen,
      link: "/my-bookings",
    },
    {
      title: "Saved PGs",
      description: "View your favourite PG listings",
      icon: Heart,
      link: "#",
    },
    {
      title: "Profile",
      description: "Manage your personal information",
      icon: User,
      link: "#",
    },
    {
      title: "Settings",
      description: "Update account preferences",
      icon: Settings,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050B1A] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-black md:text-5xl">
            Student Dashboard
          </h1>

          <p className="mt-3 text-gray-300 max-w-2xl">
            Manage your bookings, monitor approvals, explore PGs and keep track of your accommodation journey from one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-400" />
              <h3 className="text-lg font-bold">Pending Bookings</h3>
            </div>
            <p className="mt-4 text-4xl font-black text-yellow-400">{stats.pending}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" />
              <h3 className="text-lg font-bold">Approved Bookings</h3>
            </div>
            <p className="mt-4 text-4xl font-black text-green-400">{stats.approved}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Heart className="text-pink-400" />
              <h3 className="text-lg font-bold">Saved PGs</h3>
            </div>
            <p className="mt-4 text-4xl font-black text-pink-400">0</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-black">Quick Actions</h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black">Recent Activity</h2>

          <div className="mt-6 space-y-4">
            {recentBookings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-400">
                No booking activity found.
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <h4 className="font-semibold">
                      {booking.pg_name || booking.title || `PG #${booking.pg_id}`}
                    </h4>

                    <p className="text-sm text-gray-400">
                      {booking.booking_date
                        ? new Date(booking.booking_date).toLocaleString()
                        : "Recent Booking"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      booking.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {booking.status}
                  </span>
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