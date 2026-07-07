import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PGCard from "../components/cards/PGCard";
import API from "../services/api";

const filters = ["All", "Boys", "Girls", "AC Room", "Non AC", "Sponsored"];

const ExplorePGs = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState(
    searchParams.get("search") || searchParams.get("location") || ""
  );
  const [pgListings, setPgListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Data Fetching
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        const response = await API.get("/pg/all");
        setPgListings(response.data?.pgs || []);
      } catch (err) {
        console.error("Explore PG Error:", err);
        setError("Failed to load PG listings");
      } finally {
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

  // Filter Syncing
  useEffect(() => {
    setSearch(searchParams.get("search") || searchParams.get("location") || searchParams.get("city") || "");
    const type = searchParams.get("type");
    if (type === "Boys") setActiveFilter("Boys");
    else if (type === "Girls") setActiveFilter("Girls");
    else setActiveFilter("All");
  }, [searchParams]);

  // Search Logic
  const filteredPGs = useMemo(() => {
    return pgListings.filter((pg) => {
      const cityFilter = searchParams.get("city");
      const title = (pg.title || "").toLowerCase();
      const location = (`${pg.city || ""} ${pg.area || ""} ${pg.address || ""}`).toLowerCase();
      const matchesSearch = title.includes(search.toLowerCase()) || location.includes(search.toLowerCase());
      const matchesCity = !cityFilter || String(pg.city || "").toLowerCase().includes(cityFilter.toLowerCase());
      const pgType = String(pg.pg_type || "").toLowerCase();
      const featureFilter = searchParams.get("feature");

      if (featureFilter) {
        if (!String(pg.amenities || "").toLowerCase().includes(featureFilter.toLowerCase())) return false;
      }

      if (activeFilter === "All") return matchesSearch && matchesCity;
      if (activeFilter === "Sponsored") return matchesSearch && matchesCity && Boolean(pg.sponsored);
      if (activeFilter === "Boys") return matchesSearch && matchesCity && pgType.includes("boys");
      if (activeFilter === "Girls") return matchesSearch && matchesCity && pgType.includes("girls");
      if (activeFilter === "AC Room") return matchesSearch && String(pg.amenities || "").toLowerCase().includes("ac");
      if (activeFilter === "Non AC") return matchesSearch && !String(pg.amenities || "").toLowerCase().includes("ac");

      return matchesSearch;
    });
  }, [activeFilter, search, pgListings]);

  // Dynamic Frontend Grouping for "Discovery Mode"
  const jodhpurPGs = useMemo(() => pgListings.filter(pg => String(pg.city).toLowerCase().includes("jodhpur")), [pgListings]);
  const jaipurPGs = useMemo(() => pgListings.filter(pg => String(pg.city).toLowerCase().includes("jaipur")), [pgListings]);
  const premiumPGs = useMemo(() => pgListings.filter(pg => String(pg.amenities).toLowerCase().includes("ac")), [pgListings]);

  // Determine if we are in Discovery mode or Active Search mode
  const isDiscoverMode = search.trim() === "" && activeFilter === "All";

  // Reusable Slider Component for City Sections
  const SectionSlider = ({ title, subtitle, pgs }) => {
    if (!pgs || pgs.length === 0) return null;
    return (
      <div className="mb-14 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        <div className="mb-5 px-4 sm:px-6 lg:px-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#3A2935] tracking-tight md:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-sm font-medium text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-6 px-4 sm:px-6 lg:px-10 scrollbar-hide snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch]">
          {pgs.map((pg) => (
            <div key={pg.id} className="w-[85vw] min-w-[85vw] sm:w-[320px] sm:min-w-[320px] snap-start">
              <PGCard pg={pg} />
            </div>
          ))}
          {/* View All Card at end of slider */}
          <div className="w-[85vw] min-w-[85vw] sm:w-[320px] sm:min-w-[320px] snap-start flex flex-col cursor-pointer transition-transform hover:scale-[0.98]">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-gray-100 bg-gray-50 aspect-[20/19] mb-3">
               <span className="text-sm font-bold text-[#3A2935]">Explore more in this category</span>
               <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">→</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading || error) {
    return (
      <PublicLayout>
        <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F5] text-[#3A2935] text-lg font-bold">
          {error ? error : "Curating best stays..."}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <div className="bg-[#FAF9F5] min-h-screen font-sans pb-20">
        
        {/* 1. Sticky Search & Filter Bar (Airbnb Style) */}
        <section className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-xl pt-4 pb-2 px-4 sm:px-6 lg:px-10 border-b border-gray-200/60 shadow-sm transition-all duration-300">
          <div className="max-w-[850px] mx-auto mb-5">
            <div className="flex items-center bg-white border-2 border-gray-100 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)] transition-shadow duration-300 py-1.5 pl-6 pr-2">
              <input
                type="text"
                placeholder="Search by city, area, or PG name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow min-h-[46px] text-sm text-[#3A2935] outline-none placeholder:text-gray-400 font-bold bg-transparent"
              />
              <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#E56A54] text-white shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-2 px-2 items-center md:justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative whitespace-nowrap flex flex-col items-center gap-2 pb-2 text-sm font-bold transition-all duration-300 ${
                  activeFilter === filter
                    ? "text-[#3A2935] scale-105"
                    : "text-gray-400 hover:text-[#3A2935]"
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <span className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-[#E56A54] rounded-t-full transition-all"></span>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="pt-8">
          {/* 2. DISCOVERY MODE (Active when no search/filters are applied) */}
          {isDiscoverMode ? (
            <>
              {/* Dynamic City Sections */}
              <SectionSlider title="Trending in Jodhpur" subtitle="The most booked PGs in the Blue City this week." pgs={jodhpurPGs.length > 0 ? jodhpurPGs : pgListings.slice(0, 4)} />
              
              {/* Premium Promo Banner */}
              <div className="px-4 sm:px-6 lg:px-10 mb-14 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#3A2935] px-6 py-10 sm:px-12 sm:py-16 md:rounded-[3rem]">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E56A54]/30 blur-3xl"></div>
                  <div className="relative z-10 md:w-2/3 lg:w-1/2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E56A54]">Partner with Dormn</p>
                    <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl">Have a property? <br/>List it in minutes.</h3>
                    <p className="mt-4 text-sm font-medium text-gray-300 sm:text-base">Join hundreds of verified owners. Get instant bookings, verified students, and secure payouts.</p>
                    <Link to="/signup/owner" className="mt-8 inline-block rounded-xl bg-[#E56A54] px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
                      Become an Owner
                    </Link>
                  </div>
                </div>
              </div>

              <SectionSlider title="Premium AC Stays" subtitle="Comfortable, air-conditioned rooms for the summer." pgs={premiumPGs.length > 0 ? premiumPGs : pgListings.slice(4, 8)} />
              <SectionSlider title="Popular in Jaipur" subtitle="Top-rated accommodations in the Pink City." pgs={jaipurPGs.length > 0 ? jaipurPGs : pgListings.slice(0, 4)} />
            </>
          ) : (
            
            /* 3. ACTIVE SEARCH MODE (Grid View) */
            <section className="px-4 sm:px-6 lg:px-10 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-black text-[#3A2935]">
                  {filteredPGs.length > 0 ? `${filteredPGs.length} Stays found` : "No exact matches"}
                </h2>
                <button 
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                  className="text-sm font-bold text-[#E56A54] hover:underline"
                >
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
                {filteredPGs.length === 0 ? (
                  <div className="col-span-full py-20 text-center flex flex-col items-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-[#3A2935]">No PGs found</h3>
                    <p className="mt-2 text-sm text-gray-500">We couldn't find any stays matching your current filters. Try exploring other areas.</p>
                  </div>
                ) : (
                  filteredPGs.map((pg) => <PGCard key={pg.id} pg={pg} />)
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default ExplorePGs;