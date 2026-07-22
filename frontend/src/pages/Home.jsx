import { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import FeaturedListings from "../components/Home/FeaturedListings";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseDormn from "../components/Home/WhyChooseDormn";
import TrustAndSafety from "../components/Home/TrustAndSafety";
import Testimonials from "../components/Home/Testimonials";
import RoadmapSection from "../components/Home/RoadmapSection";
import HomeCTA from "../components/Home/HomeCTA";
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
        const pgs = res.data?.pgs || res.data?.data || res.data || [];
        setFeaturedPGs(Array.isArray(pgs) ? pgs : []);
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

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Interactive Search & Filters */}
      <SearchSection
        filters={filters}
        setFilters={setFilters}
        onSearch={handleHomeSearch}
      />

      {/* 3. Featured Property Listings */}
      <FeaturedListings
        featuredPGs={filteredPGs}
        loading={loading}
      />

      {/* 4. Simple 4-Step How It Works */}
      <HowItWorks />

      {/* 5. Why Choose Dormn */}
      <WhyChooseDormn />

      {/* 6. Ecosystem & Feature Highlights */}
      <FeaturesShowcase />

      {/* 7. Platform Trust & Safety */}
      <TrustAndSafety />

      {/* 8. User Testimonials */}
      <Testimonials />

      {/* 9. Product Roadmap / Coming Soon */}
      <RoadmapSection />

      {/* 10. Call to Action Banner */}
      <HomeCTA />
    </PublicLayout>
  );
};

export default Home;