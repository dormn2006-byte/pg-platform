import Container from "../../layouts/Container";


const SearchSection = ({
  filters,
  setFilters,
  onSearch,
}) => {

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        keyword: filters.keyword?.trim() || "",
        pgType: filters.pgType || "",
        location: filters.location || "",
      });
    }
  };
  const locations = ["Jaipur", "Jodhpur"];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative z-10 -mt-4 px-3 sm:px-0 md:-mt-6">
      <Container className="max-w-6xl">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-2xl sm:p-4 md:rounded-[2rem] md:p-6">
          <div className="mb-3 md:hidden">
            <h3 className="text-base font-bold text-white">
              Find Your Perfect PG
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Search by PG name, city, area or accommodation type.
            </p>
          </div>
          <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search PG, area, city or college"
              className="min-h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 sm:px-5 sm:py-4 sm:text-base"
              value={filters.keyword}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, keyword: e.target.value }))
              }
              onKeyDown={handleKeyDown}
            />

            <select
              value={filters.pgType}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, pgType: e.target.value }))
              }
              className="min-h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none sm:px-5 sm:py-4 sm:text-base"
            >
              <option value="">All PG Types</option>
              <option value="Boys">Boys PG</option>
              <option value="Girls">Girls PG</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              className="min-h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none sm:px-5 sm:py-4 sm:text-base"
            >
              <option value="">All Locations</option>
              {locations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="min-h-[52px] rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-[1.02] sm:px-6 sm:py-4 sm:text-base"
            >
              Search Verified PGs
            </button>
          </div>

          <div className="mt-3 text-center text-xs text-gray-400 sm:mt-4 sm:text-sm md:text-left">
            Filters on the homepage are applied locally to the Featured Listings section. Search by PG name, area, city, PG type, and location.
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchSection;