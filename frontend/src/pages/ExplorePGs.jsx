import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";
import API , { IMAGE_BASE_URL } from "../../services/api";

const filters = [
  "All",
  "Boys",
  "Girls",
  "AC Room",
  "Non AC",
  "Sponsored",
];

const ExplorePGs = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState(
    searchParams.get("search") || searchParams.get("location") || ""
  );
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
        console.error("Explore PG Error:", err);
        setError("Failed to load PG listings");
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  useEffect(() => {
    const searchValue =
  searchParams.get("search") ||
  searchParams.get("location") ||
  searchParams.get("city") ||
  "";

    setSearch(searchValue);

    const type = searchParams.get("type");

    if (type === "Boys") {
      setActiveFilter("Boys");
    } else if (type === "Girls") {
      setActiveFilter("Girls");
    } else {
      setActiveFilter("All");
    }
  }, [searchParams]);

  const filteredPGs = useMemo(() => {
    return pgListings.filter((pg) => {
      const cityFilter = searchParams.get("city");
      const title = (pg.title || "").toLowerCase();
      const location = (
        `${pg.city || ""} ${pg.area || ""} ${pg.address || ""}`
      ).toLowerCase();

      const matchesSearch =
      title.includes(search.toLowerCase()) ||
      location.includes(search.toLowerCase());
    
    const matchesCity =
      !cityFilter ||
      String(pg.city || "")
        .toLowerCase()
        .includes(cityFilter.toLowerCase());
    
    const pgType = String(pg.pg_type || "").toLowerCase();

      const featureFilter = searchParams.get("feature");

      if (featureFilter) {
        const amenitiesText = String(pg.amenities || "").toLowerCase();

        if (!amenitiesText.includes(featureFilter.toLowerCase())) {
          return false;
        }
      }

      if (activeFilter === "All") {
        return matchesSearch && matchesCity;
      }
      if (activeFilter === "Sponsored") {
        return (
          matchesSearch &&
          matchesCity &&
          Boolean(pg.sponsored)
        );
      }

      if (activeFilter === "Boys") {
        return (
          matchesSearch &&
          matchesCity &&
          pgType.includes("boys")
        );
      }

      if (activeFilter === "Girls") {
        return (
          matchesSearch &&
          matchesCity &&
          pgType.includes("girls")
        );
      }

      if (activeFilter === "AC Room") {
        return matchesSearch &&
          String(pg.amenities || "").toLowerCase().includes("ac");
      }

      if (activeFilter === "Non AC") {
        return matchesSearch &&
          !String(pg.amenities || "").toLowerCase().includes("ac");
      }

      return matchesSearch;
    });
  }, [activeFilter, search, pgListings]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[70vh] items-center justify-center text-cyan-400 text-xl font-bold">
          Loading PG Listings...
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="flex min-h-[70vh] items-center justify-center text-red-400 text-xl font-bold">
          {error}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-10 sm:px-5 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-14">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <Container className="relative">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl sm:px-5">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              <p className="text-xs font-semibold text-cyan-200 sm:text-sm">
                Verified Student Accommodation Marketplace
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl md:mt-6 md:text-7xl">
              Explore Premium
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                PG Spaces
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:mt-6 md:text-lg md:leading-8">
              Discover verified boys PGs, girls PGs, AC rooms, premium student stays and affordable co-living spaces near top colleges and universities.
            </p>
          </div>
        </Container>
      </section>

      {/* Search + Filters */}
      <section className="sticky top-[72px] z-30 border-b border-white/10 bg-[#0b1020]/90 px-3 py-3 backdrop-blur-2xl sm:px-5 sm:py-4 lg:px-8 lg:py-5">
        <Container>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-xl">
              <input
                type="text"
                placeholder="Search by college, area or PG name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full min-h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 sm:px-5 sm:py-4"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white"
                      : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Listings */}
      <section className="px-4 py-10 sm:px-5 sm:py-12 lg:px-8 lg:py-14">
        <Container>
          <div className="mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300 sm:text-sm">
                Available Listings
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl md:mt-2 md:text-5xl">
                {filteredPGs.length} PGs Found
              </h2>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 backdrop-blur-xl md:block">
              Sponsored listings appear on top for better visibility.
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-8 md:px-0 md:overflow-visible xl:grid-cols-3">
            {filteredPGs.length === 0 && (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-300">
                No approved PG listings found.
              </div>
            )}
            {filteredPGs.map((pg) => (
              <div
                key={pg.id}
                className="group w-[82vw] min-w-[82vw] max-w-[82vw] sm:w-[70vw] sm:min-w-[70vw] sm:max-w-[70vw] snap-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl transition duration-300 hover:-translate-y-1 md:w-auto md:min-w-0 md:max-w-none md:rounded-[2.5rem]"              >
<div className="relative h-[180px] overflow-hidden sm:h-[240px] md:h-[320px]">                  <img
                    src={
                      pg.profile_image
                        ? `${IMAGE_BASE_URL}/uploads/${pg.profile_image}`
                        : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={pg.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>

                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span className="rounded-full bg-black/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
                      {pg.pg_type || "PG"}
                    </span>

                    {Boolean(pg.sponsored) && (
                      <span className="rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 text-xs font-black text-white">
                        Sponsored
                      </span>
                    )}
                  </div>

                  <div className="absolute right-5 top-5 rounded-full bg-black/40 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur-xl">
                    ★ 4.8
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-500/10 px-4 py-2 text-xs font-medium text-pink-300">
                      WiFi
                    </span>

                    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300">
                      Food Included
                    </span>

                    <span className="rounded-full bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
                      {String(pg.amenities || "").toLowerCase().includes("ac") ? "AC Room" : "Room"}
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight sm:text-2xl md:text-3xl">
                    {pg.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-300 line-clamp-1">
                    {pg.area || pg.city || pg.address}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 sm:mt-8">
                    <div>
                      <p className="text-sm text-gray-400">
                        Starting From
                      </p>

                      <h4 className="mt-1 text-lg font-black text-cyan-300 sm:text-2xl md:text-3xl">
                        ₹{pg.price}/mo
                      </h4>
                    </div>

                    <Link
                      to={`/pg/${pg.id}`}
                      className="rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-3 py-2 text-xs font-bold text-white shadow-xl shadow-pink-500/20 transition hover:scale-105 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-sm"
                    >
                      View PG
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
};

export default ExplorePGs;