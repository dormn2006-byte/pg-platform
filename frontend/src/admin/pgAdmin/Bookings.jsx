import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Bookings = () => {
  const navigate = useNavigate();
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const { data } = await api.get("/pg/owner/my-pgs");
        setPgs(data.pgs || []);
      } catch (error) {
        console.error("Bookings Fetch Error:", error);
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
      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Booking Management
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
              PG Bookings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">
              Track all PG bookings, payment confirmations and student move-in schedules.
            </p>
          </div>

          <button className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total PGs</p>
          <h2 className="mt-3 text-4xl font-black text-gray-900">{totalPGs}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Approved PGs</p>
          <h2 className="mt-3 text-4xl font-black text-green-600">{approvedPGs}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pending PGs</p>
          <h2 className="mt-3 text-4xl font-black text-yellow-500">{pendingPGs}</h2>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Rejected PGs</p>
          <h2 className="mt-3 text-4xl font-black text-blue-600">{rejectedPGs}</h2>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            Loading PGs...
          </div>
        ) : pgs.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            No PGs Found
          </div>
        ) : (
          pgs.map((pg) => (
            <div
              key={pg.id}
              className="flex flex-col gap-5 rounded-[30px] border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:flex-row lg:items-center"
            >
              <div className="flex items-center gap-4 lg:w-[320px]">
                <img
                  src={pg.profile_image ? `http://localhost:8000/uploads/${pg.profile_image}` : "https://via.placeholder.com/150"}
                  alt={pg.title}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900">
                    {pg.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {pg.city}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {pg.available_rooms || 0} Rooms Available
                  </p>
                </div>
              </div>

              <div className="grid flex-1 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">PG Name</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{pg.title}</h3>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Price</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">₹{pg.price}</h3>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Status</p>
                  <span className={`mt-3 inline-flex rounded-full border px-4 py-2 text-xs font-bold ${pg.status === "approved" ? "bg-green-100 text-green-700 border-green-200" : pg.status === "rejected" ? "bg-red-100 text-red-700 border-red-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                    {pg.status}
                  </span>
                </div>

                <div className="rounded-2xl bg-gray-100 p-4">
                  <p className="text-xs font-medium text-gray-500">Created</p>
                  <h3 className="mt-2 text-sm font-bold text-gray-900">
                    {pg.created_at ? new Date(pg.created_at).toLocaleDateString() : "N/A"}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:w-[260px] lg:justify-end">
                <button
                  onClick={() => navigate(`/pg/${pg.id}`)}
                  className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  View PG
                </button>

                <button
                  onClick={() => navigate(`/owner/edit-pg/${pg.id}`)}
                  className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Edit PG
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;