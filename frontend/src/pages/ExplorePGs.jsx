import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PGCard from "../components/cards/PGCard";
import API from "../services/api";

const filters = ["All", "Boys", "Girls", "AC Room", "Non AC", "Sponsored"];

const SectionSlider = ({ title, subtitle, pgs }) => {
  if (!pgs || pgs.length === 0) return null;
  return (
    <div className="mb-14 animate-[fadeIn_0.5s_ease-out_forwards]">
      {/* Title container aligned with the slider's left padding */}
      <div className="mb-4 pl-5 sm:pl-6 lg:pl-10">
        <h2 className="text-[22px] sm:text-2xl md:text-3xl font-black text-[#3A2935] tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">{subtitle}</p>}
      </div>
      
      {/* Wrapper for scrolling, separated from flex logic to preserve right padding */}
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth [-webkit-overflow-scrolling:touch]">
        <div className="inline-flex gap-4 sm:gap-5 pl-5 pr-8 sm:pl-6 sm:pr-10 lg:pl-10 lg:pr-12 pb-6 snap-x snap-mandatory after:content-[''] after:flex-none after:w-4 sm:after:w-6 lg:after:w-8">
          {pgs.map((pg) => (
            <div 
              key={pg.id} 
              className="w-[44vw] min-w-[44vw] sm:w-[260px] sm:min-w-[260px] md:w-[300px] md:min-w-[300px] lg:w-[320px] lg:min-w-[320px] snap-start flex-shrink-0 transition-transform hover:-translate-y-1"
            >
              <PGCard pg={pg} />
            </div>
          ))}

          {/* View All Card */}
          <div className="w-[44vw] min-w-[44vw] sm:w-[260px] sm:min-w-[260px] md:w-[300px] md:min-w-[300px] lg:w-[320px] lg:min-w-[320px] snap-start flex-shrink-0 flex flex-col cursor-pointer transition-transform hover:scale-[0.98]">
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-gray-100 bg-gray-50 aspect-[4/3] mb-3">
               <span className="text-xs sm:text-sm font-bold text-[#3A2935]">View All</span>
               <span className="mt-2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-sm">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse" />
);

const ExplorePGs = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState(searchParams.get("search") || searchParams.get("location") || "");
  const [pgListings, setPgListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        const response = await API.get("/pg/all");
        setPgListings(response.data?.pgs || []);
      } catch (err) {
        setError("Failed to load PG listings");
      } finally {
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || searchParams.get("location") || searchParams.get("city") || "");
    const type = searchParams.get("type");
    if (type === "Boys") setActiveFilter("Boys");
    else if (type === "Girls") setActiveFilter("Girls");
    else setActiveFilter("All");
  }, [searchParams]);

  const filteredPGs = useMemo(() => {
    return pgListings.filter((pg) => {
      const cityFilter = searchParams.get("city");
      const title = (pg.title || "").toLowerCase();
      const location = (`${pg.city || ""} ${pg.area || ""} ${pg.address || ""}`).toLowerCase();
      const matchesSearch = title.includes(search.toLowerCase()) || location.includes(search.toLowerCase());
      const matchesCity = !cityFilter || String(pg.city || "").toLowerCase().includes(cityFilter.toLowerCase());
      const pgType = String(pg.pg_type || "").toLowerCase();
      const featureFilter = searchParams.get("feature");

      if (featureFilter && !String(pg.amenities || "").toLowerCase().includes(featureFilter.toLowerCase())) return false;
      
      const filterConditions = {
        All: true,
        Sponsored: Boolean(pg.sponsored),
        Boys: pgType.includes("boys"),
        Girls: pgType.includes("girls"),
        "AC Room": String(pg.amenities || "").toLowerCase().includes("ac"),
        "Non AC": !String(pg.amenities || "").toLowerCase().includes("ac"),
      };

      return matchesSearch && matchesCity && (filterConditions[activeFilter] ?? true);
    });
  }, [activeFilter, search, pgListings, searchParams]);

  const jodhpurPGs = useMemo(() => pgListings.filter(pg => String(pg.city).toLowerCase().includes("jodhpur")), [pgListings]);
  const jaipurPGs = useMemo(() => pgListings.filter(pg => String(pg.city).toLowerCase().includes("jaipur")), [pgListings]);
  const premiumPGs = useMemo(() => pgListings.filter(pg => String(pg.amenities).toLowerCase().includes("ac")), [pgListings]);

  const isDiscoverMode = search.trim() === "" && activeFilter === "All";

  return (
    <PublicLayout>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <div className="bg-[#FAF9F5] min-h-screen font-sans pb-20 selection:bg-[#E56A54] selection:text-white">
        
        {/* Sticky Search & Filter Bar */}
        <section className="sticky top-[68px] z-30 bg-[#FAF9F5]/95 backdrop-blur-xl pt-4 pb-2 border-b border-gray-200/60 shadow-[0_4px_15px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            {/* Search Bar - Outline style */}
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] py-1.5 px-1.5 pl-4 sm:pl-6 transition-all focus-within:border-gray-400 focus-within:shadow-md">
              <input
                type="text"
                placeholder="Search by city, area, or PG name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow min-h-[40px] text-[14px] sm:text-base font-medium text-gray-800 outline-none placeholder:text-gray-500 bg-transparent"
              />
              <button className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-[#E56A54] text-white shadow-sm hover:bg-[#d65a45] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Pills - Separated wrapper logic for right padding edge-case */}
          <div className="overflow-x-auto lg:overflow-visible scrollbar-hide">
  <div
    className="
      inline-flex
      lg:flex
      lg:w-full
      lg:justify-center
      gap-2.5
      sm:gap-3
      pl-4
      pr-8
      sm:pl-6
      sm:pr-10
      lg:px-0
      pb-2
    "
  >
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`flex-shrink-0 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-sm transition-all border ${
                      isActive 
                        ? "border-gray-900 bg-gray-50 text-gray-900 font-bold shadow-sm" 
                        : "border-gray-300 bg-white text-gray-600 font-medium hover:border-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="pt-8">
          {loading ? (
             <div className="px-5 sm:px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
             </div>
          ) : isDiscoverMode ? (
            <>
              <SectionSlider title="Trending in Jodhpur" subtitle="The most booked PGs in the Blue City this week." pgs={jodhpurPGs.length > 0 ? jodhpurPGs : pgListings.slice(0, 4)} />
              
              {/* Premium Promo Banner */}
              <div className="px-5 sm:px-6 lg:px-10 mb-14 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#3A2935] px-6 py-10 sm:px-12 sm:py-16 md:rounded-[3rem]">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E56A54]/30 blur-3xl"></div>
                  <div className="relative z-10 md:w-2/3 lg:w-1/2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E56A54]">Partner with Dormn</p>
                    <h3 className="mt-3 text-2xl font-black text-white sm:text-4xl md:text-5xl">Have a property? <br/>List it in minutes.</h3>
                    <p className="mt-4 text-sm font-medium text-gray-300 sm:text-base hidden sm:block">Join hundreds of verified owners. Get instant bookings, verified students, and secure payouts.</p>
                    <Link to="/signup/owner" className="mt-6 sm:mt-8 inline-block rounded-xl bg-[#E56A54] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
                      Become an Owner
                    </Link>
                  </div>
                </div>
              </div>

              <SectionSlider title="Premium AC Stays" subtitle="Comfortable, air-conditioned rooms for the summer." pgs={premiumPGs.length > 0 ? premiumPGs : pgListings.slice(4, 8)} />
              <SectionSlider title="Popular in Jaipur" subtitle="Top-rated accommodations in the Pink City." pgs={jaipurPGs.length > 0 ? jaipurPGs : pgListings.slice(0, 4)} />
            </>
          ) : (
            
            /* ACTIVE SEARCH MODE (Grid View) */
            <section className="px-5 sm:px-6 lg:px-10 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="mb-6 sm:mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  {filteredPGs.length > 0 ? `${filteredPGs.length} Stays found` : "No exact matches"}
                </h2>
                <button 
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                  className="text-xs sm:text-sm font-bold text-[#E56A54] hover:underline"
                >
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                {filteredPGs.length === 0 ? (
                  <div className="col-span-full py-20 text-center flex flex-col items-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-[#3A2935]">No PGs found</h3>
                    <p className="mt-2 text-sm text-gray-500">We couldn't find any stays matching your current filters. Try exploring other areas.</p>
                  </div>
                ) : (
                  filteredPGs.map((pg) => (
                    <div key={pg.id} className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-2xl">
                      <PGCard pg={pg} />
                    </div>
                  ))
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