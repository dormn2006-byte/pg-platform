import { useEffect, useState } from "react";
import {
  Building2,
  Users,
  BookOpenCheck,
  Plus,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminCard from "../shared/AdminCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const ownerName = user?.full_name || user?.name || "Owner";

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const { data } = await api.get("/pg/owner/my-pgs");
        setPgs(data.pgs || []);
        const sortedPgs = [...(data.pgs || [])]
          .sort(
            (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
          )
          .slice(0, 5)
          .map((pg) => ({
            name: user?.full_name || "Owner",
            pg: pg.title,
            room: `${pg.available_rooms || 0} Rooms Available`,
            date: pg.created_at
              ? new Date(pg.created_at).toLocaleDateString()
              : "Recently Added",
          }));

        setRecentActivity(sortedPgs);
      } catch (error) {
        console.error("Dashboard PG Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerPGs();
  }, []);

  const totalPGs = pgs.length;
  const approvedPGs = pgs.filter((pg) => pg.status === "approved").length;
  const pendingPGs = pgs.filter((pg) => pg.status === "pending").length;
  const rejectedPGs = pgs.filter((pg) => pg.status === "rejected").length;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 md:text-sm">
              Dormn OWNER PANEL
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-black md:mt-3 md:text-5xl">
              Welcome Back, {ownerName} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:mt-4 md:text-base md:leading-7">
              Manage your PG listings, students, bookings and room availability
              from one modern dashboard.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/owner/bookings")}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-md md:px-6 md:py-4 sm:w-auto"
            >
              <BookOpenCheck size={20} />
              Booking Requests
            </button>

            <button
              onClick={() => navigate("/owner/add-pg")}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-5 py-3.5 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-md md:px-6 md:py-4 sm:w-auto"
            >
              <Plus size={20} />
              Add New PG
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Now Clickable! */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
        <div 
          onClick={() => navigate("/owner/my-pgs")}
          className="cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <AdminCard
            title="Total PGs"
            value={String(totalPGs)}
            subtitle={`${approvedPGs} Approved PGs`}
            icon={<Building2 size={28} />}
            color="from-cyan-500 to-blue-500"
          />
        </div>

        <div 
          onClick={() => navigate("/owner/my-pgs")}
          className="cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <AdminCard
            title="Approved PGs"
            value={String(approvedPGs)}
            subtitle="Approved Listings"
            icon={<Users size={28} />}
            color="from-pink-500 to-rose-500"
          />
        </div>

        <div 
          onClick={() => navigate("/owner/my-pgs")}
          className="cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <AdminCard
            title="Pending PGs"
            value={String(pendingPGs)}
            subtitle="Awaiting Approval"
            icon={<BookOpenCheck size={28} />}
            color="from-violet-500 to-indigo-500"
          />
        </div>

        <div 
          onClick={() => navigate("/owner/my-pgs")}
          className="cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <AdminCard
            title="Rejected PGs"
            value={String(rejectedPGs)}
            subtitle="Rejected Listings"
            icon={<IndianRupee size={28} />}
            color="from-emerald-500 to-green-500"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        
        {/* Recent PG Activity */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-black md:text-2xl">
                Recent PG Activity
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Recently created or updated PG listings
              </p>
            </div>

            <button
              onClick={() => navigate("/owner/my-pgs")}
              className="flex items-center gap-2 self-start text-sm font-semibold text-cyan-600 transition hover:gap-3 sm:self-auto"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500">No recent PG activity found.</p>
            ) : (
              recentActivity.map((booking, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-cyan-300 md:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-black md:text-lg break-words">
                        {booking.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5 break-words">
                        {booking.pg} • {booking.room}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <span className="shrink-0 rounded-lg bg-cyan-100 px-3 py-1.5 text-xs font-bold text-cyan-700 md:px-4 md:py-2">
                        {booking.date}
                      </span>
                      <button
                        onClick={() => navigate("/owner/my-pgs")}
                        className="rounded-lg border-2 border-black px-4 py-1.5 text-xs font-bold text-black transition hover:bg-black hover:text-white md:px-5 md:py-2 md:text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My PG Listings (Mobile Scroll Fixed) */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-black md:text-2xl">
              My PG Listings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your active and pending PGs
            </p>

            <button
              onClick={() => navigate("/owner/bookings")}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 hover:shadow-md"
            >
              View Booking Requests
            </button>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 mt-2">
            {loading ? (
              <p className="text-gray-500">Loading PGs...</p>
            ) : pgs.length === 0 ? (
              <p className="text-gray-500">No PGs found.</p>
            ) : (
              pgs.slice(0, 5).map((pg, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-cyan-300 md:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-black md:text-lg break-words leading-tight">
                        {pg.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 break-words">
                        {pg.city || pg.address}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                        pg.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : pg.status === "rejected"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {pg.status || "pending"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-sm font-bold text-gray-700">
                      {pg.available_rooms || 0} Rooms
                    </p>

                    <button
                      onClick={() => navigate("/owner/my-pgs")}
                      className="shrink-0 rounded-lg bg-black px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-80 md:px-5 md:py-2 md:text-sm"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;