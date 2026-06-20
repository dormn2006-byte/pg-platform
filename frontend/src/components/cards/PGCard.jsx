import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../services/api";

const PGCard = ({ pg }) => {
  const imageUrl = pg?.profile_image
  ? `${IMAGE_BASE_URL}/uploads/${pg.profile_image}`
  : pg?.image;

  const location = [pg?.area, pg?.city].filter(Boolean).join(", ");

  let amenities = [];
  try {
    amenities = typeof pg?.amenities === "string"
      ? JSON.parse(pg.amenities)
      : pg?.amenities || [];
  } catch {
    amenities = [];
  }
  return (
<div
  className="
    group
    w-[92vw] min-w-[92vw] max-w-[92vw]
    sm:w-[320px] sm:min-w-[320px] sm:max-w-[320px]
    flex-shrink-0 overflow-hidden
    rounded-[1.75rem] md:rounded-[2.5rem]
    border border-white/10
    bg-white/5 shadow-2xl backdrop-blur-2xl
    transition duration-300 hover:-translate-y-1
    snap-start
    md:w-auto md:min-w-0 md:max-w-none
  "
>
      {/* Image Section */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden">
        <img
          src={imageUrl}
          alt={pg.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=900&auto=format&fit=crop";
          }}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>

        {/* Top Tags */}
        <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-5 sm:top-5 sm:gap-3">
          <span className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-xl sm:px-4 sm:py-2 sm:text-xs">
            {pg.pg_type || pg.type} PG
          </span>

          {pg.sponsored && (
            <span className="rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 px-3 py-1.5 text-[10px] font-black text-white shadow-lg shadow-pink-500/20 sm:px-4 sm:py-2 sm:text-xs">
              Sponsored
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-xl sm:right-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">
          ★ 4.5
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Amenities */}
        <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
          {amenities.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-[10px] font-medium text-cyan-300 sm:px-4 sm:py-2 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl">
          {pg.title}
        </h3>

        {/* Location */}
        <p className="mt-2 text-sm text-gray-300 sm:mt-3 sm:text-base">
          {location || "Location not available"}
        </p>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between gap-3 sm:mt-8 sm:gap-4">
          <div>
            <p className="text-sm text-gray-400">
              Starting From
            </p>

            <h4 className="mt-1 text-xl font-black text-cyan-300 sm:text-2xl md:text-3xl">
              ₹{Number(pg.price || 0).toLocaleString()}/month
            </h4>
          </div>

          <Link
            to={`/pg/${pg.id}`}
            className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-xl shadow-pink-500/20 transition duration-300 hover:scale-105 sm:px-6 sm:py-4 sm:text-sm"
          >
            View PG
          </Link>
        </div>
      </div>
    </div>
  );
};

export { PGCard };
export default PGCard;