import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import api, { IMAGE_BASE_URL } from "../../services/api";

const statusStyles = {
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  rejected: "bg-rose-100 text-rose-700 border-rose-200",
  blocked: "bg-gray-100 text-gray-700 border-gray-200",
};

const MyPGs = () => {
  const [pgPages, setPgPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchMyPGs = useCallback(async () => {
    try {
      console.log("Fetching owner PGs...");
      const { data } = await api.get("/pg/owner/my-pgs");
      console.log("Owner PG response:", data);
      setPgPages(data?.pgs || []);
    } catch (error) {
      console.error("Error fetching PGs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPGs();
  }, [fetchMyPGs]);

  const totalPages = pgPages.length;
  const approvedPages = pgPages.filter((pg) => pg.status === "approved").length;
  const pendingPages = pgPages.filter((pg) => pg.status === "pending").length;
  const rejectedPages = pgPages.filter((pg) => pg.status === "rejected").length;

  const filteredPGs = pgPages.filter((pg) => {
    const matchesSearch = pg.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : pg.status?.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">
            PG Pages Management
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            My PG Pages
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your uploaded properties, edit listings, and monitor approval statuses.
          </p>
        </div>

        <Link
          to="/owner/add-pg"
          className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-black px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] hover:shadow-lg"
        >
          + Add New PG
        </Link>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Pages</p>
          <h2 className="mt-2 text-3xl font-black text-gray-900 md:mt-3 md:text-4xl">{totalPages}</h2>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Approved</p>
          <h2 className="mt-2 text-3xl font-black text-emerald-600 md:mt-3 md:text-4xl">{approvedPages}</h2>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending</p>
          <h2 className="mt-2 text-3xl font-black text-amber-500 md:mt-3 md:text-4xl">{pendingPages}</h2>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Rejected</p>
          <h2 className="mt-2 text-3xl font-black text-rose-500 md:mt-3 md:text-4xl">{rejectedPages}</h2>
        </div>
      </div>

      {/* High-Visibility Search & Filter Bar */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search PG by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black placeholder:text-gray-400"
            />
          </div>

          <div className="relative sm:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-10 text-sm font-semibold text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading & Empty States */}
      {loading && (
        <div className="rounded-3xl bg-white py-12 text-center shadow-sm">
          <p className="text-sm font-bold text-gray-500">Loading your properties...</p>
        </div>
      )}

      {!loading && pgPages.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-16 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <MapPin className="text-gray-400" size={28} />
          </div>
          <h3 className="text-lg font-black text-gray-900">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500">Create your first PG listing to get started.</p>
        </div>
      )}

      {/* Optimized Desktop Grid & Mobile Stack Layout */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {!loading &&
          filteredPGs.map((pg) => (
            <div
              key={pg.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-xl"
            >
              {/* Image Hero Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={
                    pg.profile_image
                      ? `${IMAGE_BASE_URL}/uploads/${pg.profile_image}`
                      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={pg.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating Badges */}
                <div className="absolute left-3 top-3">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${
                      statusStyles[pg.status?.toLowerCase()] || statusStyles.pending
                    }`}
                  >
                    {pg.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                    ID: {pg.id}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="truncate text-xl font-black tracking-tight text-gray-900">
                  {pg.title}
                </h2>
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={14} className="shrink-0" />
                  <span className="truncate">{pg.area}, {pg.city}</span>
                </div>
              </div>

              {/* Card Actions (Bottom Sticky) */}
              <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/50 p-4">
                <button
                  onClick={() => navigate(`/pg/${pg.id}`)}
                  className="flex-1 rounded-xl bg-black py-2.5 text-[13px] font-bold text-white transition hover:opacity-80"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/owner/edit-pg/${pg.id}`)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-[13px] font-bold text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    const confirmed = window.confirm(`Are you sure you want to delete ${pg.title}?`);
                    if (confirmed) {
                      try {
                        await api.delete(`/pg/delete/${pg.id}`);
                        alert("PG deleted successfully");
                        fetchMyPGs();
                      } catch (error) {
                        console.error("Delete PG Error:", error);
                        alert(error?.response?.data?.message || "Failed to delete PG");
                      }
                    }
                  }}
                  className="flex-1 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-[13px] font-bold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPGs;