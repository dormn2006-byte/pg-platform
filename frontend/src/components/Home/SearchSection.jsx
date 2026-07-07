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
    <section className="relative z-10 -mt-6 px-3 sm:px-0 md:-mt-10 lg:-mt-14">
      <Container className="max-w-6xl">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-5 md:rounded-[2.5rem] md:p-8">
          
          {/* Mobile Heading */}
          <div className="mb-4 md:hidden">
            <h3 className="text-lg font-bold text-[#3A2935]">
              Find Your Perfect PG
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Search by PG name, city, area or accommodation type.
            </p>
          </div>
          
          <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search PG, area, city or college"
              className="min-h-[52px] w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#3A2935] outline-none transition-all placeholder:text-gray-400 focus:border-[#E56A54] focus:bg-white focus:ring-1 focus:ring-[#E56A54] sm:px-5 sm:py-4 sm:text-base"
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
              className="min-h-[52px] w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#3A2935] outline-none transition-all focus:border-[#E56A54] focus:bg-white focus:ring-1 focus:ring-[#E56A54] sm:px-5 sm:py-4 sm:text-base"
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
              className="min-h-[52px] w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#3A2935] outline-none transition-all focus:border-[#E56A54] focus:bg-white focus:ring-1 focus:ring-[#E56A54] sm:px-5 sm:py-4 sm:text-base"
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
              className="min-h-[52px] w-full rounded-2xl bg-[#E56A54] px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#d65a45] hover:shadow-lg sm:px-6 sm:py-4 sm:text-base"
            >
              Search Verified PGs
            </button>
          </div>

          <div className="mt-4 text-center text-[11px] text-gray-500 sm:mt-5 sm:text-xs md:text-left">
            Filters on the homepage are applied locally to the Featured Listings section. Search by PG name, area, city, PG type, and location.
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchSection;