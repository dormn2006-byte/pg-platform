import { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import FeaturedListings from "../components/Home/FeaturedListings";
import HomeServiceTopics from "../components/Home/HomeServiceTopics";
import FeaturesShowcase from "../components/Home/FeaturesShowcase";
import PublicLayout from "../layouts/PublicLayout";
import API from "../services/api";

const Home = () => {
  const [featuredPGs, setFeaturedPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    keyword: "",
    pgType: "",
    city: "", 
    area: "",
    landmark: "",
    minPrice: "",
    maxPrice: "30000",
  });
  
  const [activeFilters, setActiveFilters] = useState({
    keyword: "",
    pgType: "",
    city: "",
    area: "",
    landmark: "",
    minPrice: "",
    maxPrice: "30000",
  });

  const [dynamicOptions, setDynamicOptions] = useState({
    cities: [],
    areas: [],
    landmarks: []
  });

  const filteredPGs = featuredPGs.filter((pg) => {
    const keywordMatch =
      !activeFilters.keyword ||
      pg.title?.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
      pg.city?.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
      pg.address?.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
      pg.area?.toLowerCase().includes(activeFilters.keyword.toLowerCase());

    const typeMatch =
      !activeFilters.pgType ||
      pg.pg_type?.toLowerCase() === activeFilters.pgType.toLowerCase();

    const activeCity = activeFilters.city || activeFilters.location || "";
    const cityMatch =
      !activeCity ||
      pg.city?.toLowerCase() === activeCity.toLowerCase();

    const areaMatch =
      !activeFilters.area ||
      pg.area?.toLowerCase() === activeFilters.area.toLowerCase();

    const landmarkMatch =
      !activeFilters.landmark ||
      pg.nearby_college?.toLowerCase() === activeFilters.landmark.toLowerCase();

    const pgPrice = Number(pg.price || 0);
    const minPriceMatch = !activeFilters.minPrice || pgPrice >= Number(activeFilters.minPrice);
    const maxPriceMatch = !activeFilters.maxPrice || pgPrice <= Number(activeFilters.maxPrice);

    return keywordMatch && typeMatch && cityMatch && areaMatch && landmarkMatch && minPriceMatch && maxPriceMatch;
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        const [pgResponse, filterResponse] = await Promise.all([
          API.get("/pg/all"),
          API.get("/pg/filter-options")
        ]);

        const pgs = pgResponse.data?.pgs || pgResponse.data?.data || pgResponse.data || [];
        setFeaturedPGs(Array.isArray(pgs) ? pgs : []);

        if (filterResponse.data?.success) {
          setDynamicOptions({
            cities: filterResponse.data.data.cities || [],
            areas: filterResponse.data.data.areas || [],
            landmarks: filterResponse.data.data.colleges || [],
          });
        }

      } catch (error) {
        console.error("Home page data load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleHomeSearch = (searchFilters) => {
    setActiveFilters(searchFilters);
  };

  // ==========================================
  // NEW: CASCADING DROPDOWN LOGIC
  // Dynamically filters areas and landmarks based on the selected City!
  // ==========================================
  const availableAreas = filters.city
    ? [...new Set(featuredPGs.filter((pg) => pg.city?.toLowerCase() === filters.city.toLowerCase() && pg.area).map((pg) => pg.area))]
    : dynamicOptions.areas;

  const availableLandmarks = filters.city
    ? [...new Set(featuredPGs.filter((pg) => pg.city?.toLowerCase() === filters.city.toLowerCase() && pg.nearby_college).map((pg) => pg.nearby_college))]
    : dynamicOptions.landmarks;

  return (
    <PublicLayout>
      <HeroSection />

      <SearchSection
        filters={filters}
        setFilters={setFilters}
        onSearch={handleHomeSearch}
        availableCities={dynamicOptions.cities}
        // Pass the dynamically filtered lists down to the search bar
        availableAreas={availableAreas}           
        availableLandmarks={availableLandmarks}   
      />

      <FeaturedListings
        featuredPGs={filteredPGs}
        loading={loading}
      />

      <HomeServiceTopics />

      <FeaturesShowcase />
    </PublicLayout>
  );
};

export default Home;