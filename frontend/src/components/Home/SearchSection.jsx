import { useState } from "react";
import Container from "../../layouts/Container";
import { 
  Search, 
  MapPin, 
  Map, 
  Home, 
  GraduationCap, 
  IndianRupee,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const SearchSection = ({
  filters = {}, 
  setFilters,
  onSearch,
  availableCities = ["Jaipur", "Jodhpur", "Noida", "Delhi"],
  availableAreas = ["Sector 62", "Knowledge Park", "Mansarovar", "Koramangala"],
  availableLandmarks = ["Amity University", "MIT", "Infosys", "Metro Station"],
}) => {
  
  const [isExpanded, setIsExpanded] = useState(false);

  // Default slider values
  const minSliderLimit = 3000;
  const maxSliderLimit = 50000;
  
  // Safely parse current min/max limits
  const currentMin = Number(filters.minPrice) || minSliderLimit;
  const currentMax = Number(filters.maxPrice) || 30000; 

  // Manual Search Handler
  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        pgType: filters.pgType || "",
        city: filters.city || filters.location || "",
        area: filters.area || "",
        landmark: filters.landmark || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "30000",
      });
    }
  };

  // DUAL SLIDER HANDLERS
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), currentMax - 500);
    setFilters((prev) => ({ ...prev, minPrice: value.toString() }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), currentMin + 500);
    setFilters((prev) => ({ ...prev, maxPrice: value.toString() }));
  };

  const minPercent = ((currentMin - minSliderLimit) / (maxSliderLimit - minSliderLimit)) * 100;
  const maxPercent = ((currentMax - minSliderLimit) / (maxSliderLimit - minSliderLimit)) * 100;

  // Reusable styled wrapper
  const InputWrapper = ({ children, icon: Icon }) => (
    <div className="flex h-[54px] w-full items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 transition-all focus-within:border-[#E56A54] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#E56A54] shadow-sm">
      <Icon size={18} className="text-gray-400 flex-shrink-0" />
      {children}
    </div>
  );

  // Base classes for the select inputs
  const selectBaseClasses = "w-full bg-transparent text-sm outline-none font-medium appearance-none cursor-pointer";

  return (
    <>
      <style>{`
        .dual-range::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #E56A54;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          border: 2px solid white;
        }
        .dual-range::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          background: #E56A54;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          border: 2px solid white;
        }
      `}</style>

      <section className="relative z-20 -mt-8 px-4 sm:px-0 md:-mt-12 lg:-mt-16">
        <Container className="max-w-6xl">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-6 md:rounded-[2.5rem] md:p-8">
            
            {/* Mobile Header */}
            <div className="mb-5 flex items-center justify-between md:hidden">
              <div>
                <h3 className="text-lg font-black text-[#3A2935] tracking-tight">
                  Find Your PG
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-gray-500">
                  Select your preferences
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E56A54]/10 text-[#E56A54]">
                <Search size={18} />
              </div>
            </div>
            
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              
              {/* === ROW 1: PRIMARY FILTERS === */}
              
              <InputWrapper icon={Home}>
                <select
                  value={filters.pgType || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, pgType: e.target.value }))}
                  className={`${selectBaseClasses} ${!filters.pgType ? "text-gray-500" : "text-[#3A2935]"}`}
                >
                  <option value="" className="text-gray-500">All PG Types</option>
                  <option value="boys" className="text-[#3A2935]">Boys PG</option>
                  <option value="girls" className="text-[#3A2935]">Girls PG</option>
                  <option value="coed" className="text-[#3A2935]">COED PG</option>
                </select>
              </InputWrapper>

              <InputWrapper icon={MapPin}>
                <select
                  value={filters.city || filters.location || ""}
                  onChange={(e) => setFilters((prev) => ({ 
                    ...prev, 
                    city: e.target.value,
                    area: "",       // Automatically clear Area when city changes
                    landmark: ""    // Automatically clear Landmark when city changes
                  }))}
                  className={`${selectBaseClasses} ${!(filters.city || filters.location) ? "text-gray-500" : "text-[#3A2935]"}`}
                >
                  <option value="" className="text-gray-500">All Cities</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city} className="text-[#3A2935]">{city}</option>
                  ))}
                </select>
              </InputWrapper>

              <InputWrapper icon={Map}>
                <select
                  value={filters.area || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, area: e.target.value }))}
                  className={`${selectBaseClasses} ${!filters.area ? "text-gray-500" : "text-[#3A2935]"}`}
                >
                  <option value="" className="text-gray-500">All Areas / Sectors</option>
                  {availableAreas.map((area) => (
                    <option key={area} value={area} className="text-[#3A2935]">{area}</option>
                  ))}
                </select>
              </InputWrapper>

              {/* === SECONDARY FILTERS === */}
              
              <div className={`${isExpanded ? 'block' : 'hidden'} md:block col-span-1 lg:col-span-1`}>
                <InputWrapper icon={GraduationCap}>
                  <select
                    value={filters.landmark || ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, landmark: e.target.value }))}
                    className={`${selectBaseClasses} ${!filters.landmark ? "text-gray-500" : "text-[#3A2935]"}`}
                  >
                    <option value="" className="text-gray-500">Nearby Landmark / Univ</option>
                    {availableLandmarks.map((landmark) => (
                      <option key={landmark} value={landmark} className="text-[#3A2935]">{landmark}</option>
                    ))}
                  </select>
                </InputWrapper>
              </div>

              {/* === DUAL-RANGE BUDGET SLIDER === */}
              <div className={`${isExpanded ? 'flex' : 'hidden'} md:flex flex-col justify-center px-5 h-[54px] w-full rounded-2xl border border-gray-200 bg-gray-50 shadow-sm col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-2`}>
                <div className="flex justify-between items-center w-full mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <IndianRupee size={12} /> Budget Range
                  </span>
                  <span className="text-[#E56A54] text-xs font-black">
                    ₹{currentMin.toLocaleString()} - ₹{currentMax.toLocaleString()}{currentMax === maxSliderLimit ? '+' : ''}
                  </span>
                </div>
                
                <div className="relative w-full h-1.5 bg-gray-200 rounded-lg flex items-center">
                  <div 
                    className="absolute h-full bg-[#E56A54] rounded-lg opacity-80"
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                  ></div>

                  <input
                    type="range"
                    min={minSliderLimit}
                    max={maxSliderLimit}
                    step="500"
                    value={currentMin}
                    onChange={handleMinChange}
                    className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-20"
                  />

                  <input
                    type="range"
                    min={minSliderLimit}
                    max={maxSliderLimit}
                    step="500"
                    value={currentMax}
                    onChange={handleMaxChange}
                    className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-30"
                  />
                </div>
              </div>
            </div>

            {/* === BOTTOM ACTION ROW === */}
            <div className="mt-4 sm:mt-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
              
              <button
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded((prev) => !prev);
                }}
                className="flex items-center gap-1.5 text-[13px] font-bold text-gray-500 transition-colors hover:text-[#E56A54] md:hidden"
              >
                <SlidersHorizontal size={14} />
                {isExpanded ? "Show Fewer Filters" : "Budget & Landmark"}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <p className="hidden md:block text-[12px] font-medium text-gray-400">
                Select your preferences and click search to find matching PGs.
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex w-full md:w-auto h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#E56A54] px-10 text-sm font-black tracking-wide text-white shadow-[0_8px_20px_rgba(229,106,84,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d65a45] hover:shadow-[0_12px_25px_rgba(229,106,84,0.4)] active:scale-[0.98]"
              >
                Search Verified PGs
                <Search size={16} className="text-white/90" />
              </button>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
};

export default SearchSection;