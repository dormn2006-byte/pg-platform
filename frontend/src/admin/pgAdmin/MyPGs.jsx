import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const statusStyles = {
  approved: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
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
  const approvedPages = pgPages.filter(
    (pg) => pg.status === "approved"
  ).length;

  const pendingPages = pgPages.filter(
    (pg) => pg.status === "pending"
  ).length;

  const rejectedPages = pgPages.filter(
    (pg) => pg.status === "rejected"
  ).length;

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            PG Pages Management
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
            My PG Pages
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">
            Manage uploaded PG pages, edit listings and monitor approval status.
          </p>
        </div>

        <Link
          to="/owner/add-pg"
          className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          + Add New PG
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        <div className="rounded-[1.25rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-6">
          <p className="text-sm font-medium text-gray-500">Total Pages</p>
          <h2 className="mt-2 text-2xl font-black md:mt-3 md:text-4xl text-gray-900">{totalPages}</h2>
        </div>

        <div className="rounded-[1.25rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-6">
          <p className="text-sm font-medium text-gray-500">Approved</p>
          <h2 className="mt-2 text-2xl font-black md:mt-3 md:text-4xl text-green-600">{approvedPages}</h2>
        </div>

        <div className="rounded-[1.25rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-6">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <h2 className="mt-2 text-2xl font-black md:mt-3 md:text-4xl text-yellow-500">{pendingPages}</h2>
        </div>

        <div className="rounded-[1.25rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-6">
          <p className="text-sm font-medium text-gray-500">Rejected</p>
          <h2 className="mt-2 text-2xl font-black md:mt-3 md:text-4xl text-red-500">{rejectedPages}</h2>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search PG by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
          Loading PGs...
        </div>
      )}

      {!loading && pgPages.length === 0 && (
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
          No PGs found. Create your first PG using the Add New PG button.
        </div>
      )}

      <div className="px-1 text-xs font-medium text-gray-400 lg:hidden">Swipe horizontally to view all PGs →</div>

      {/* PG Pages List */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:block lg:overflow-visible lg:px-0">
        {!loading && filteredPGs.map((pg) => (
          <div
            key={pg.id}
            className="flex min-w-[88vw] snap-center flex-col gap-4 rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:min-w-[70vw] lg:mb-5 lg:min-w-0 lg:flex-row lg:items-center lg:gap-5 lg:rounded-[30px] lg:p-5"
          >
            {/* Image */}
            <div className="h-44 w-full overflow-hidden rounded-[20px] md:h-52 lg:h-40 lg:w-64 lg:rounded-[24px]">
              <img
                src={
                  pg.profile_image
                    ? `http://localhost:8000/uploads/${pg.profile_image}`
                    : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                }
                alt={pg.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-4 py-2 text-xs font-bold ${statusStyles[pg.status?.toLowerCase()] || statusStyles.pending}`}
                >
                  {pg.status?.toUpperCase()}
                </span>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                  PG ID: {pg.id}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
                {pg.title}
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Route Test ID: {pg.id}
              </p>

              <p className="mt-2 text-sm text-gray-500">{pg.area}, {pg.city}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/pg/${pg.id}`)}
                  className="rounded-2xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.02] md:px-5 md:py-3 md:text-sm"
                >
                  View Page
                </button>

                <button
                  onClick={() => {
                    console.log("Edit PG Clicked:", pg.id);
                    navigate(`/owner/edit-pg/${pg.id}`);
                  }}
                  className="rounded-2xl border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 md:px-5 md:py-3 md:text-sm"
                >
                  Edit Page
                </button>

                <button
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Delete ${pg.title}?`
                    );

                    if (confirmed) {
                      try {
                        await api.delete(`/pg/delete/${pg.id}`);

                        alert("PG deleted successfully");

                        fetchMyPGs();
                      } catch (error) {
                        console.error("Delete PG Error:", error);

                        alert(
                          error?.response?.data?.message ||
                          "Failed to delete PG"
                        );
                      }
                    }
                  }}
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 md:px-5 md:py-3 md:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPGs;