const statusStyles = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const PGCard = ({
  image,
  name,
  location,
  status,
  rooms,
  price,
  students,
  updated,
  onView,
  onEdit,
  onDelete,
}) => {
  const safeImage =
    image ||
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200";

  const safeStatus =
    status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase();
  return (
    <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={safeImage}
          alt={name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

        <div className="absolute left-5 top-5">
          <span
            className={`rounded-full border px-4 py-2 text-xs font-bold backdrop-blur-xl ${statusStyles[safeStatus] || statusStyles.Pending}`}
          >
            {safeStatus}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              {name}
            </h2>

            <p className="mt-2 text-sm text-gray-200">
              {location}
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-xl">
            <p className="text-xs text-gray-200">Starting From</p>
            <h3 className="mt-1 text-lg font-black text-white">
              ₹{price || 0}/month
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-gray-500">Rooms</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">
              {rooms}
            </h3>
          </div>

          <div className="rounded-2xl bg-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-gray-500">Students</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">
              {students}
            </h3>
          </div>

          <div className="rounded-2xl bg-gray-100 p-4 text-center">
            <p className="text-xs font-medium text-gray-500">Updated</p>
            <h3 className="mt-2 text-sm font-bold text-gray-900">
              {updated}
            </h3>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onView}
            className="flex-1 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            View PG
          </button>

          <button
            onClick={onEdit}
            className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
