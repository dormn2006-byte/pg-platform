import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroVisual from "./HeroVisual";
import Container from "../../layouts/Container";
import API from "../../services/api";

const HeroSection = () => {
  const [stats, setStats] = useState([
    { number: "10+", label: "Verified PGs" },
    { number: "100+", label: "Students Connected" },
    { number: "7+", label: "PG Owners" },
  ]);
  const [featuredPG, setFeaturedPG] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/pg/all");
        const pgs = res.data?.pgs || res.data?.data || res.data || [];

        if (Array.isArray(pgs) && pgs.length > 0) {
          setFeaturedPG(pgs[0]);
        }

        setStats([
          {
            number: `${pgs.length > 0 ? pgs.length : 10}+`,
            label: "Verified PGs",
          },
          {
            number: `${pgs.length > 0 ? Math.max(pgs.length * 5, 100) : 100}+`,
            label: "Students Connected",
          },
          {
            number: `${new Set(pgs.map((pg) => pg.owner_id)).size || 7}+`,
            label: "PG Owners",
          },
        ]);
      } catch (error) {
        console.error("Hero stats load failed:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');`}
      </style>

      <section className="relative overflow-hidden bg-[#FAF9F5] px-4 pb-12 pt-6 sm:px-5 sm:pb-16 sm:pt-8 md:px-8 md:pb-20 md:pt-12 lg:px-12">
        <Container className="relative grid items-center gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="z-10 mt-4 md:mt-0">
            
            {/* Top Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E56A54] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E56A54]"></span>
              </span>
              <p className="text-xs font-bold tracking-wide text-[#3A2935] sm:text-sm">
                Next-Gen Student Housing Ecosystem
              </p>
            </div>

            {/* Headline */}
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="mt-6 text-[2.75rem] font-black leading-[1.05] tracking-tight text-[#3A2935] sm:text-[3.75rem] md:mt-8 md:text-[4.5rem] md:leading-[1.05]"
            >
              Find Your Perfect <br />
              <span className="relative mt-2 inline-block">
                <span className="absolute inset-0 -rotate-2 rounded-2xl bg-[#E56A54]"></span>
                <span className="relative inline-block -rotate-2 px-4 py-1 text-white">
                  PG Stay
                </span>
              </span>
              <br />
              <span className="mt-2 inline-block">Effortlessly.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8 md:mt-8 md:max-w-2xl md:text-lg">
              Dormn connects students and professionals with verified, safe, and premium Paying Guest accommodations across India. Search, compare, and book your next stay — all in one place.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:mt-10">
              <Link
                to="/pgs"
                className="w-full rounded-2xl border-2 border-[#3A2935] bg-[#3A2935] px-8 py-4 text-center text-sm font-bold text-white shadow-[4px_4px_0px_#E56A54] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#E56A54] sm:w-auto md:text-base"
              >
                Search PGs Near You
              </Link>

              <Link
                to="/auth"
                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-sm font-bold text-[#3A2935] shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 sm:w-auto md:text-base"
              >
                List Your Property
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 md:mt-14 md:gap-5">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E56A54]/40 hover:shadow-md md:rounded-[2rem] md:p-6"
                >
                  <h3
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-2xl font-black text-[#3A2935] transition-colors group-hover:text-[#E56A54] sm:text-3xl md:text-4xl"
                  >
                    {item.number}
                  </h3>
                  <p className="mt-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual featuredPG={featuredPG} />
        </Container>
      </section>
    </>
  );
};

export default HeroSection;