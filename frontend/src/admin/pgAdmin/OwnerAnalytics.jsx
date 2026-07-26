import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  TrendingUp,
  Building2,
  Users,
  IndianRupee,
  PieChart,
  BarChart3,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award
} from "lucide-react";

const OwnerAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get("/pg/owner/analytics");
        if (res.data?.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-white">
        <div className="flex items-center gap-3 font-bold">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
          Calculating Property Analytics...
        </div>
      </div>
    );
  }

  const {
    totalPGs = 0,
    approvedPGs = 0,
    totalRooms = 0,
    totalStudents = 0,
    totalBookings = 0,
    estimatedMonthlyRevenue = 0,
    pgTypeBreakdown = { boys: 0, girls: 0, coed: 0 },
    bookingStats = { approved: 0, pending: 0, rejected: 0 },
    topPerformingPGs = []
  } = data || {};

  const totalTypes = (pgTypeBreakdown.boys + pgTypeBreakdown.girls + pgTypeBreakdown.coed) || 1;
  const boysPct = Math.round((pgTypeBreakdown.boys / totalTypes) * 100);
  const girlsPct = Math.round((pgTypeBreakdown.girls / totalTypes) * 100);
  const coedPct = Math.round((pgTypeBreakdown.coed / totalTypes) * 100);

  const totalBookingReqs = (bookingStats.approved + bookingStats.pending + bookingStats.rejected) || 1;
  const approvedReqPct = Math.round((bookingStats.approved / totalBookingReqs) * 100);
  const pendingReqPct = Math.round((bookingStats.pending / totalBookingReqs) * 100);
  const rejectedReqPct = Math.round((bookingStats.rejected / totalBookingReqs) * 100);

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 text-white sm:p-6 lg:p-8 font-sans">
      
      {/* Header Banner */}
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 md:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              <BarChart3 size={16} /> Performance Insights
            </div>
            <h1 className="text-3xl font-black md:text-4xl tracking-tight text-white">
              Property & Revenue Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Deep numerical breakdown of your accommodations, occupancy rates, and earnings.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <ShieldCheck size={20} className="text-emerald-400" />
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Active Properties</p>
              <p className="text-sm font-bold text-white">{approvedPGs} Approved / {totalPGs} Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Bento Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        
        {/* Revenue Metric */}
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Est. Monthly Revenue</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <IndianRupee size={20} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-black text-emerald-400">
            ₹{estimatedMonthlyRevenue.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp size={14} />
            <span>₹{(estimatedMonthlyRevenue * 12).toLocaleString()} projected yearly</span>
          </div>
        </div>

        {/* Total Students */}
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Tenants</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Users size={20} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-black text-white">{totalStudents}</p>
          <p className="mt-2 text-xs text-gray-400">
            Occupying across {totalRooms} listed rooms
          </p>
        </div>

        {/* Total Properties */}
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-blue-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Listings</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Building2 size={20} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-black text-white">{totalPGs}</p>
          <p className="mt-2 text-xs text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 size={12} /> {approvedPGs} Active & Approved
          </p>
        </div>

        {/* Total Requests */}
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Bookings</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <PieChart size={20} />
            </div>
          </div>
          <p className="mt-4 text-3xl font-black text-white">{totalBookings}</p>
          <p className="mt-2 text-xs text-amber-400 font-medium flex items-center gap-1">
            <Clock size={12} /> {bookingStats.pending} Awaiting response
          </p>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
        
        {/* CHART 1: Booking Conversion Distribution */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <PieChart className="text-cyan-400" size={20} />
            Booking Status Breakdown
          </h3>
          <p className="text-xs text-gray-400 mb-6">Ratio of approved vs pending vs rejected booking applications</p>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            <div className="relative h-44 w-44 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-800"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000"
                  strokeDasharray={`${approvedReqPct}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{approvedReqPct}%</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">Approval Rate</span>
              </div>
            </div>

            <div className="space-y-4 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-6 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-gray-300">Approved</span>
                </div>
                <span className="text-sm font-black text-white">{bookingStats.approved} ({approvedReqPct}%)</span>
              </div>

              <div className="flex items-center justify-between gap-6 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <span className="text-xs font-bold text-gray-300">Pending</span>
                </div>
                <span className="text-sm font-black text-white">{bookingStats.pending} ({pendingReqPct}%)</span>
              </div>

              <div className="flex items-center justify-between gap-6 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                  <span className="text-xs font-bold text-gray-300">Rejected</span>
                </div>
                <span className="text-sm font-black text-white">{bookingStats.rejected} ({rejectedReqPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: PG Category Portfolio */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
          <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <Building2 className="text-purple-400" size={20} />
            PG Type Portfolio
          </h3>
          <p className="text-xs text-gray-400 mb-6">Property classification by accommodation category</p>

          <div className="space-y-5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-blue-400">👦 Boys PG</span>
                <span className="text-white">{pgTypeBreakdown.boys} PGs ({boysPct}%)</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${boysPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-pink-400">👧 Girls PG</span>
                <span className="text-white">{pgTypeBreakdown.girls} PGs ({girlsPct}%)</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full transition-all duration-700" style={{ width: `${girlsPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-purple-400">🚹🚺 COED / Unisex PG</span>
                <span className="text-white">{pgTypeBreakdown.coed} PGs ({coedPct}%)</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${coedPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Property Performance Leaderboard */}
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="text-amber-400" size={20} />
              Top Revenue Generating PGs
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Ranked by current active tenant monthly payouts</p>
          </div>
        </div>

        <div className="space-y-3">
          {topPerformingPGs.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-2xl">
              No performance data available yet.
            </div>
          ) : (
            topPerformingPGs.map((pg, index) => (
              <div
                key={pg.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs ${
                    index === 0 ? "bg-amber-400 text-black" : index === 1 ? "bg-slate-300 text-black" : "bg-white/10 text-white"
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base">{pg.title}</h4>
                    <p className="text-xs text-gray-400">{pg.city || "Location set"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Tenants</p>
                    <p className="text-sm font-bold text-white">{pg.studentsCount} Students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Monthly Yield</p>
                    <p className="text-sm font-black text-emerald-400">₹{pg.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default OwnerAnalytics;