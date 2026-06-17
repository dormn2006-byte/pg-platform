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
  const ownerName = user?.full_name || user?.name || 'Owner';

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const { data } = await api.get("/pg/owner/my-pgs");
        setPgs(data.pgs || []);
        const sortedPgs = [...(data.pgs || [])]
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 5)
          .map((pg) => ({
            name: user?.full_name || 'Owner',
            pg: pg.title,
            room: `${pg.available_rooms || 0} Rooms Available`,
            date: pg.created_at
              ? new Date(pg.created_at).toLocaleDateString()
              : 'Recently Added',
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
  const approvedPGs = pgs.filter(pg => pg.status === "approved").length;
  const pendingPGs = pgs.filter(pg => pg.status === "pending").length;
  const rejectedPGs = pgs.filter(pg => pg.status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-[2rem] md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              PGVERSE OWNER PANEL
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-black md:mt-3 md:text-5xl">
              Welcome Back, {ownerName} 👋
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Manage your PG listings, students, bookings and room
              availability from one modern dashboard.
            </p>
          </div>

          {/* Quick Action */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/owner/bookings')}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] md:px-6 md:py-4 sm:w-auto"
            >
              <BookOpenCheck size={20} />
              Booking Requests
            </button>

            <button
              onClick={() => navigate('/owner/add-pg')}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] md:px-6 md:py-4 sm:w-auto"
            >
              <Plus size={20} />
              Add New PG
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
        <AdminCard
          title="Total PGs"
          value={String(totalPGs)}
          subtitle={`${approvedPGs} Approved PGs`}
          icon={<Building2 size={28} />}
          color="from-cyan-500 to-blue-500"
        />

        <AdminCard
          title="Approved PGs"
          value={String(approvedPGs)}
          subtitle="Approved Listings"
          icon={<Users size={28} />}
          color="from-pink-500 to-rose-500"
        />

        <AdminCard
          title="Pending PGs"
          value={String(pendingPGs)}
          subtitle="Awaiting Approval"
          icon={<BookOpenCheck size={28} />}
          color="from-violet-500 to-indigo-500"
        />

        <AdminCard
          title="Rejected PGs"
          value={String(rejectedPGs)}
          subtitle="Rejected Listings"
          icon={<IndianRupee size={28} />}
          color="from-emerald-500 to-green-500"
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Recent Bookings */}
        <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-[2rem] md:p-6">
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
              onClick={() => navigate('/owner/my-pgs')}
              className="flex items-center gap-2 self-start text-sm font-semibold text-cyan-600 transition hover:gap-3 sm:self-auto"
            >
              View All
              <ArrowRight size={16} />
            </button>
          
          </div>

          <div className="space-y-3">
  {recentActivity.length === 0 ? (
    <p className="text-gray-500">No recent PG activity found.</p>
  ) : (
    recentActivity.map((booking, index) => (
      <div
        key={index}
        className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:border-cyan-300 md:rounded-2xl md:p-5"
      >
        <div className="flex flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-black md:text-lg">
              {booking.name}
            </h3>

            <p className="truncate text-xs text-gray-600 md:text-sm">
              {booking.pg} • {booking.room}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="shrink-0 rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-bold text-cyan-700 md:px-4 md:py-2 md:text-xs">
              {booking.date}
            </span>

            <button className="rounded-lg border border-black px-2 py-1 text-[11px] font-semibold text-black transition hover:bg-black hover:text-white md:px-4 md:py-2 md:text-sm">
              View
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
        </div>

        {/* My PGs */}
        <div className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-[2rem] md:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-black md:text-2xl">
              My PG Listings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your active and pending PGs
            </p>

            <button
              onClick={() => navigate('/owner/bookings')}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 md:py-3"
            >
              View Booking Requests
            </button>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 scrollbar-hide lg:block lg:overflow-visible lg:px-0">
            {loading ? (
              <p className="text-gray-500">Loading PGs...</p>
            ) : pgs.length === 0 ? (
              <p className="text-gray-500">No PGs found.</p>
            ) : pgs.slice(0,5).map((pg, index) => (
              <div
                key={index}
                className="min-w-[65vw] max-w-[65vw] snap-center rounded-xl border border-gray-200 bg-gray-50 p-3 sm:min-w-[52vw] sm:max-w-[52vw] lg:mb-4 lg:min-w-0 lg:max-w-none lg:rounded-2xl lg:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-black md:text-xl">
                      {pg.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {pg.city || pg.address}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                      pg.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {pg.status || "pending"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-600 md:text-sm">
                    {pg.available_rooms || 0} Rooms
                  </p>

                  <button
                    onClick={() => navigate('/owner/my-pgs')}
                    className="shrink-0 rounded-lg bg-black px-3 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90 md:px-4 md:py-2 md:text-sm"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;