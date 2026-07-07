import { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import FeaturedListings from "../components/Home/FeaturedListings";
import FeaturesShowcase from "../components/Home/FeaturesShowcase";
import PublicLayout from "../layouts/PublicLayout";
import API from "../services/api";

const Home = () => {
  const [featuredPGs, setFeaturedPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    pgType: "",
    location: "",
  });
  const [activeFilters, setActiveFilters] = useState({
    keyword: "",
    pgType: "",
    location: "",
  });
  const filteredPGs = featuredPGs.filter((pg) => {
    const keywordMatch =
      !activeFilters.keyword ||
      pg.title?.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
      pg.city?.toLowerCase().includes(activeFilters.keyword.toLowerCase()) ||
      pg.address?.toLowerCase().includes(activeFilters.keyword.toLowerCase());

    const typeMatch =
      !activeFilters.pgType ||
      pg.pg_type?.toLowerCase() === activeFilters.pgType.toLowerCase();

    const cityMatch =
      !activeFilters.location ||
      pg.city?.toLowerCase() === activeFilters.location.toLowerCase();

    return keywordMatch && typeMatch && cityMatch;
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await API.get("/pg/all");

        console.log("Home PG API Response:", res.data);
        const pgs = res.data?.pgs || res.data?.data || res.data || [];

        console.log("Featured PGs:", pgs);
        console.log("API Response:", res.data);

        ///console.log("Approved PGs:", approvedPGs);
        setFeaturedPGs(Array.isArray(pgs) ? pgs : []);
      } catch (error) {
        console.error("Home page data load failed:", error);
        console.error("API Error Response:", error?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleHomeSearch = (searchFilters) => {
    setActiveFilters(searchFilters);
  };

  return (
    <PublicLayout>
      {/* Floating Background - mobile safe */}
      
      <HeroSection />

      <SearchSection
        filters={filters}
        setFilters={setFilters}
        onSearch={handleHomeSearch}
      />

      <FeaturedListings
        featuredPGs={filteredPGs}
        loading={loading}
      />

      <FeaturesShowcase />

    </PublicLayout>
  );
};

export default Home;