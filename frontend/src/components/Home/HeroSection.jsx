import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroVisual from "./HeroVisual";
import Container from "../../layouts/Container";
import API from "../../services/api";

const HeroSection = () => {
  const [stats, setStats] = useState([
    { number: "0+", label: "Verified PGs" },
    { number: "0+", label: "Students" },
    { number: "0+", label: "Owners" },
  ]);
  const [featuredPG, setFeaturedPG] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/pg/all");

console.log("Hero PG Response:", res.data);

const pgs =
  res.data?.pgs ||
  res.data?.data ||
  res.data ||
  [];

console.log("Hero PGs:", pgs);

        if (Array.isArray(pgs) && pgs.length > 0) {
          setFeaturedPG(pgs[0]);
        }

        setStats([
          {
            number: `${pgs.length}+`,
            label: "Verified PGs",
          },
          {
            number: `${Math.max(pgs.length * 5, 20)}+`,
            label: "Students",
          },
          {
            number: `${new Set(pgs.map((pg) => pg.owner_id)).size}+`,
            label: "Owners",
          },
        ]);
      }catch (error) {
        console.error("Hero stats load failed:", error);
        console.error("Hero API Error:", error?.response?.data);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-4 sm:px-5 sm:pb-10 sm:pt-6 md:px-8 md:pb-16 md:pt-10 lg:px-12">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
      <div className="absolute right-[-120px] top-[80px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <Container className="relative grid items-center gap-8 sm:gap-10 md:gap-14 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl sm:px-4 md:px-5">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>

            <p className="text-xs font-semibold text-gray-200 sm:text-sm">
              Trusted Student Accommodation Platform
            </p>
          </div>

          <h1 className="mt-4 text-[2.9rem] font-black leading-[0.92] tracking-tight text-white sm:text-[3.6rem] md:mt-7 md:text-7xl md:leading-[0.95]">
            Find Your Dream
            <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              PG
            </span>
            <br />
            In Minutes.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:mt-7 md:max-w-2xl md:text-lg md:leading-8">
            Explore premium student stays, modern hostels and affordable PGs near top colleges and universities.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-10 md:gap-5">
            <Link
              to="/pgs"
              className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-6 py-3.5 text-center text-sm font-black text-white shadow-xl shadow-pink-500/20 transition duration-300 hover:scale-105 sm:w-auto md:px-8 md:py-4"
            >
              Explore Now
            </Link>

            <Link
              to="/signup/owner"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10 sm:w-auto md:px-8 md:py-4"
            >
              Become Owner
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 md:mt-12 md:flex md:flex-wrap md:gap-5">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] border border-white/10 bg-white/5 px-3 py-3 text-center shadow-2xl backdrop-blur-2xl md:rounded-[2rem] md:px-7 md:py-5"
              >
                <h3 className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl md:text-4xl">
                  {item.number}
                </h3>

                <p className="mt-1 text-[10px] text-gray-300 sm:text-xs md:mt-2 md:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual featuredPG={featuredPG} />
      </Container>
    </section>
  );
};

export default HeroSection;