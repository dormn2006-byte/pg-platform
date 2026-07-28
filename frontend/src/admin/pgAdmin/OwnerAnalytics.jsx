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
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const OwnerAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI State for Leaderboard
  const [showAllLeaderboard, setShowAllLeaderboard] = useState(false);

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

  // Leaderboard Logic
  const visibleLeaderboard = showAllLeaderboard ? topPerformingPGs : topPerformingPGs.slice(0, 3);
  const remainingLeaderboardCount = topPerformingPGs.length - 3;

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 text-white sm:p-6 lg:p-8 font-sans space-y-5 lg:space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl lg:rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-5 md:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
              <BarChart3 size={14} /> Performance Insights
            </div>
            <h1 className="text-2xl font-black sm:text-3xl md:text-4xl tracking-tight text-white">
              Property & Revenue Analytics
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">
              Deep numerical breakdown of your accommodations, occupancy rates, and earnings.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Active Properties</p>
              <p className="text-xs sm:text-sm font-bold text-white">{approvedPGs} Approved / {totalPGs} Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Bento Grid (2x2 on Mobile, 1x4 on Desktop) */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        
        {/* Revenue Metric */}
        <div className="rounded-2xl lg:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 lg:p-6 backdrop-blur-xl transition hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-gray-400">Est. Revenue</span>
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl lg:rounded-2xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <IndianRupee size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
          <p className="mt-3 lg:mt-4 text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400 truncate">
            ₹{estimatedMonthlyRevenue.toLocaleString()}
          </p>
          <div className="mt-1.5 lg:mt-2 flex items-center gap-1.5 text-[10px] lg:text-xs text-emerald-400/80 font-medium">
            <TrendingUp size={12} className="shrink-0" />
            <span className="truncate">₹{(estimatedMonthlyRevenue * 12).toLocaleString()} /yr</span>
          </div>
        </div>

        {/* Total Students */}
        <div className="rounded-2xl lg:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 lg:p-6 backdrop-blur-xl transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-gray-400">Active Tenants</span>
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl lg:rounded-2xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Users size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
          <p className="mt-3 lg:mt-4 text-xl sm:text-2xl lg:text-3xl font-black text-white">{totalStudents}</p>
          <p className="mt-1.5 lg:mt-2 text-[10px] lg:text-xs text-gray-400 truncate">
            Across {totalRooms} listed rooms
          </p>
        </div>

        {/* Total Properties */}
        <div className="rounded-2xl lg:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 lg:p-6 backdrop-blur-xl transition hover:border-blue-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-gray-400">Listings</span>
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl lg:rounded-2xl bg-blue-500/10 text-blue-400 shrink-0">
              <Building2 size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
          <p className="mt-3 lg:mt-4 text-xl sm:text-2xl lg:text-3xl font-black text-white">{totalPGs}</p>
          <p className="mt-1.5 lg:mt-2 text-[10px] lg:text-xs text-emerald-400 font-medium flex items-center gap-1 truncate">
            <CheckCircle2 size={12} className="shrink-0" /> {approvedPGs} Approved
          </p>
        </div>

        {/* Total Requests */}
        <div className="rounded-2xl lg:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 lg:p-6 backdrop-blur-xl transition hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-gray-400">Bookings</span>
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-xl lg:rounded-2xl bg-purple-500/10 text-purple-400 shrink-0">
              <PieChart size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
          <p className="mt-3 lg:mt-4 text-xl sm:text-2xl lg:text-3xl font-black text-white">{totalBookings}</p>
          <p className="mt-1.5 lg:mt-2 text-[10px] lg:text-xs text-amber-400 font-medium flex items-center gap-1 truncate">
            <Clock size={12} className="shrink-0" /> {bookingStats.pending} Pending
          </p>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        
        {/* CHART 1: Booking Conversion Distribution */}
        <div className="rounded-3xl lg:rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:p-8 backdrop-blur-xl">
          <h3 className="text-lg lg:text-xl font-black text-white mb-1.5 flex items-center gap-2">
            <PieChart className="text-cyan-400" size={18} />
            Booking Breakdown
          </h3>
          <p className="text-[10px] lg:text-xs text-gray-400 mb-6">Ratio of approved vs pending vs rejected applications</p>

          <div className="flex flex-row items-center justify-between lg:justify-around gap-4 py-2">
            {/* Scaled down SVG for mobile */}
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 shrink-0 flex items-center justify-center">
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
                <span className="text-xl sm:text-2xl font-black text-white">{approvedReqPct}%</span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold text-emerald-400">Approval</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[140px] lg:max-w-none">
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-emerald-500 shrink-0"></div>
                  <span className="text-[10px] lg:text-xs font-bold text-gray-300">Approved</span>
                </div>
                <span className="text-xs lg:text-sm font-black text-white">{bookingStats.approved}</span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-amber-400 shrink-0"></div>
                  <span className="text-[10px] lg:text-xs font-bold text-gray-300">Pending</span>
                </div>
                <span className="text-xs lg:text-sm font-black text-white">{bookingStats.pending}</span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-rose-500 shrink-0"></div>
                  <span className="text-[10px] lg:text-xs font-bold text-gray-300">Rejected</span>
                </div>
                <span className="text-xs lg:text-sm font-black text-white">{bookingStats.rejected}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: PG Category Portfolio */}
        <div className="rounded-3xl lg:rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:p-8 backdrop-blur-xl">
          <h3 className="text-lg lg:text-xl font-black text-white mb-1.5 flex items-center gap-2">
            <Building2 className="text-purple-400" size={18} />
            PG Type Portfolio
          </h3>
          <p className="text-[10px] lg:text-xs text-gray-400 mb-6">Property classification by accommodation category</p>

          <div className="space-y-5 lg:space-y-6 pt-1">
            <div>
              <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1.5">
                <span className="text-blue-400 flex items-center gap-1.5">👦 Boys PG</span>
                <span className="text-white">{pgTypeBreakdown.boys} ({boysPct}%)</span>
              </div>
              <div className="h-2 lg:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${boysPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1.5">
                <span className="text-pink-400 flex items-center gap-1.5">👧 Girls PG</span>
                <span className="text-white">{pgTypeBreakdown.girls} ({girlsPct}%)</span>
              </div>
              <div className="h-2 lg:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full transition-all duration-700" style={{ width: `${girlsPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] lg:text-xs font-bold mb-1.5">
                <span className="text-purple-400 flex items-center gap-1.5">🚹🚺 COED / Unisex</span>
                <span className="text-white">{pgTypeBreakdown.coed} ({coedPct}%)</span>
              </div>
              <div className="h-2 lg:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${coedPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Property Performance Leaderboard (Smart Toggle on Mobile) */}
      <div className="rounded-3xl lg:rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:p-8 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-5 lg:mb-6">
          <div>
            <h3 className="text-lg lg:text-xl font-black text-white flex items-center gap-2">
              <Award className="text-amber-400" size={18} />
              Top Revenue Generating PGs
            </h3>
            <p className="text-[10px] lg:text-xs text-gray-400 mt-1">Ranked by current active tenant monthly payouts</p>
          </div>
        </div>

        <div className="space-y-3">
          {topPerformingPGs.length === 0 ? (
            <div className="p-6 lg:p-8 text-center text-[11px] lg:text-xs text-gray-500 border border-dashed border-white/10 rounded-2xl">
              No performance data available yet.
            </div>
          ) : (
            visibleLeaderboard.map((pg, index) => (
              <div
                key={pg.id}
                className="flex flex-row items-center justify-between gap-3 p-3 lg:p-4 rounded-2xl border border-white/5 bg-white/5 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex h-7 w-7 lg:h-8 lg:w-8 shrink-0 items-center justify-center rounded-xl font-black text-[10px] lg:text-xs ${
                    index === 0 ? "bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.3)]" : 
                    index === 1 ? "bg-slate-300 text-black" : 
                    index === 2 ? "bg-amber-700/50 text-amber-100" : 
                    "bg-white/10 text-white"
                  }`}>
                    #{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-xs lg:text-sm truncate">{pg.title}</h4>
                    <p className="text-[9px] lg:text-xs text-gray-400 truncate">{pg.city || "Location set"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-6 shrink-0 text-right">
                  <div className="hidden sm:block">
                    <p className="text-[9px] lg:text-[10px] font-bold uppercase text-gray-500 tracking-wider">Tenants</p>
                    <p className="text-xs lg:text-sm font-bold text-white mt-0.5">{pg.studentsCount}</p>
                  </div>
                  <div>
                    <p className="text-[9px] lg:text-[10px] font-bold uppercase text-gray-500 tracking-wider">Monthly</p>
                    <p className="text-xs lg:text-sm font-black text-emerald-400 mt-0.5">₹{pg.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View More / View Less Toggle Button */}
        {topPerformingPGs.length > 3 && (
          <button
            onClick={() => setShowAllLeaderboard(!showAllLeaderboard)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500/10 py-3 text-[11px] lg:text-xs font-bold text-cyan-400 transition hover:bg-cyan-500/20"
          >
            {showAllLeaderboard ? (
              <>View Less <ChevronUp size={14} /></>
            ) : (
              <>View {remainingLeaderboardCount} More <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>

    </div>
  );
};

export default OwnerAnalytics;