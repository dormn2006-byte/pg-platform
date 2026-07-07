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
    <Link to={`/pg/${pg.id}`} className="group flex flex-col cursor-pointer">
      {/* Image Container (Airbnb Style Aspect Ratio) */}
      <div className="relative w-full aspect-[20/19] overflow-hidden rounded-2xl bg-gray-200 mb-3">
        <img
          src={imageUrl}
          alt={pg.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=900&auto=format&fit=crop";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite Heart Icon (Top Right) */}
        <button 
          onClick={(e) => e.preventDefault()} 
          className="absolute right-3 top-3 p-1.5 transition-transform hover:scale-110 active:scale-95"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="rgba(0, 0, 0, 0.4)" 
            stroke="white" 
            strokeWidth="1.5" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Badge (Top Left) */}
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-gray-900 shadow-sm backdrop-blur-md">
          {pg.pg_type || pg.type || "PG"}
        </div>
      </div>

      {/* Content Section (Below Image) */}
      <div className="flex flex-col gap-0.5 px-1">
        
        {/* Title and Rating Row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-[15px] leading-tight truncate">
            {pg.title}
          </h3>
          <div className="flex items-center gap-1 text-[14px] text-gray-900">
            <svg className="w-3.5 h-3.5 pb-[1px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span>4.8</span>
          </div>
        </div>

        {/* Location & Amenities */}
        <p className="text-[14px] text-gray-500 truncate">
          {location || "Location not available"}
        </p>
        <p className="text-[14px] text-gray-500 truncate">
          {amenities.slice(0, 3).join(" • ") || "Standard Amenities"}
        </p>

        {/* Price Row */}
        <div className="mt-1 flex items-center gap-1 text-[15px] text-gray-900">
          <span className="font-semibold">₹{Number(pg.price || 0).toLocaleString()}</span>
          <span className="font-normal text-gray-900">/ mo</span>
        </div>
        
      </div>
    </Link>
  );
};

export { PGCard };
export default PGCard;