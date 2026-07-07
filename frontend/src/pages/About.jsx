import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";

const features = [
  {
    title: "Verified Listings",
    description:
      "Every PG listed on our platform goes through verification and approval before becoming visible to students.",
    icon: "🛡️",
  },
  {
    title: "Smart PG Discovery",
    description:
      "Students can discover PGs using filters like boys PG, girls PG, AC rooms, food availability, location and college distance.",
    icon: "🚀",
  },
  {
    title: "PG Owner Dashboard",
    description:
      "PG owners can manage listings, upload room photos, track bookings and monitor students directly from their dashboard.",
    icon: "🏢",
  },
  {
    title: "Future Ready Platform",
    description:
      "We are building a scalable student accommodation ecosystem with analytics, automation and secure admin approvals.",
    icon: "⚡",
  },
];

const futureFeatures = [
  "AI-based PG recommendations",
  "Verified roommate matching",
  "Live room availability tracking",
  "Digital rent and payment management",
  "Smart student community system",
  "Location and college based PG discovery",
];

const About = () => {
  const [stats, setStats] = useState([
    { number: '10+', label: 'Verified PGs' },
    { number: '100+', label: 'Students Connected' },
    { number: '7+', label: 'PG Owners' },
    { number: '2', label: 'Cities Covered' },
  ]);

  useEffect(() => {
    const loadAboutStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/pgs');
        const pgs = res.data?.pgs || [];

        const cities = new Set(
          pgs.map((pg) => pg.city).filter(Boolean)
        );

        const owners = new Set(
          pgs.map((pg) => pg.owner_id).filter(Boolean)
        );

        setStats([
          {
            number: `${pgs.length}+`,
            label: 'Verified PGs',
          },
          {
            number: `${Math.max(pgs.length * 5, 100)}+`, // Fallback to look good if DB is small
            label: 'Students Connected',
          },
          {
            number: `${owners.size}+`,
            label: 'PG Owners',
          },
          {
            number: `${cities.size}`,
            label: 'Cities Covered',
          },
        ]);
      } catch (error) {
        console.error('About page stats error:', error);
      }
    };

    loadAboutStats();
  }, []);

  return (
    <PublicLayout>
      <div className="bg-[#FAF9F5] font-sans selection:bg-[#E56A54] selection:text-white">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-5 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
          <Container className="relative grid items-center gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2">
            
            <div className="z-10">
              <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E56A54] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E56A54]"></span>
                </span>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#3A2935] sm:text-xs">
                  Revolutionizing Student Housing
                </p>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-[#3A2935] sm:text-5xl md:mt-8 md:text-6xl lg:text-[4.5rem]">
                Building The Future Of
                <span className="relative mt-2 inline-block">
                  <span className="absolute inset-0 -rotate-1 rounded-2xl bg-[#E56A54]"></span>
                  <span className="relative inline-block -rotate-1 px-4 py-1 text-white">
                    Student Stays
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
                Dormn is a growing student accommodation platform powered by real PG listings, verified owners, and live accommodation data.
              </p>

              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
                We connect students with trusted PG owners through a secure ecosystem that enables discovery, comparison, and booking across multiple cities.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl"></div>
              
              <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] md:rounded-[3rem]">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
                  alt="Student PG"
                  className="h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px] lg:h-[560px]"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="px-4 pb-12 sm:px-5 sm:pb-16 lg:px-8 lg:pb-24">
          <Container className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E56A54]/40 hover:shadow-md md:rounded-[2rem] md:p-8"
              >
                <h3 className="text-3xl font-black text-[#3A2935] transition-colors group-hover:text-[#E56A54] sm:text-4xl md:text-5xl">
                  {item.number}
                </h3>
                <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </Container>
        </section>

        {/* About Platform */}
        <section className="px-4 pb-14 sm:px-5 sm:pb-20 lg:px-8 lg:pb-28">
          <Container>
            <div className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm md:rounded-[3rem] md:p-14">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                
                <div className="order-2 overflow-hidden rounded-[2rem] border-4 border-gray-50 bg-gray-100 lg:order-1">
                  <img
                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"
                    alt="Student Accommodation"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="order-1 lg:order-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                    What We Are Doing
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:mt-4 md:text-5xl">
                    Simplifying PG Search For Students.
                  </h2>

                  <p className="mt-5 text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
                    Students often struggle while searching for trusted accommodation because information is scattered across multiple sources and frequently becomes outdated.
                  </p>

                  <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
                    Dormn solves this by creating a centralized platform where students can explore verified accommodations with room photos, amenities, pricing, rules, location details, and direct owner communication.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features */}
        <section className="bg-white px-5 py-20 lg:px-8 lg:py-28 border-y border-gray-100">
          <Container>
            <div className="mb-12 text-center md:mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                Platform Highlights
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
                Why Dormn Is Different
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 md:gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border-2 border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:bg-white hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] sm:p-8 md:p-10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50 text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl md:h-16 md:w-16">
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-tight text-[#3A2935]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="px-5 py-20 lg:px-8 lg:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#3A2935] md:text-5xl">
                Safe, Smart & Transparent Student Living.
              </h2>

              <p className="mt-6 text-lg font-medium leading-8 text-gray-600">
                We believe finding a PG should not feel stressful or confusing.
              </p>

              <p className="mt-4 text-lg font-medium leading-8 text-gray-600">
                Our mission is to create a trusted accommodation network where students can confidently explore and compare PGs with complete transparency.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-gray-100 shadow-md md:rounded-[3rem]">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
                alt="PG Rooms"
                className="h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px] lg:h-[500px]"
              />
            </div>
          </Container>
        </section>

        {/* Future Vision (Bento List) */}
        <section className="px-5 pb-20 lg:px-8 lg:pb-28">
          <Container>
            <div className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-8 shadow-sm md:rounded-[3rem] md:p-14">
              <div className="mb-12 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                  Future Roadmap
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-[#3A2935] md:text-5xl">
                  What We Are Building Next
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-gray-500 sm:text-lg">
                  Dormn is evolving into a complete smart accommodation ecosystem for students and PG owners.
                </p>
              </div>

              <div className="mb-10 rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-5 text-center">
                <p className="text-sm font-bold text-[#E56A54]">
                  Current roadmap items will gradually move from planning to live platform features as Dormn expands.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {futureFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 rounded-2xl border-2 border-gray-100 bg-gray-50 p-5 transition-colors hover:border-[#E56A54]/30 hover:bg-white"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E56A54]/10 text-sm font-black text-[#E56A54]">
                      ✓
                    </div>
                    <h3 className="text-sm font-bold text-[#3A2935] md:text-base">
                      {feature}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA (Premium Charcoal Banner) */}
        <section className="px-5 pb-20 lg:px-8 lg:pb-28">
          <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#3A2935] px-6 py-12 shadow-[0_20px_50px_-12px_rgba(58,41,53,0.4)] sm:px-12 sm:py-16 md:rounded-[3rem] lg:px-20 lg:py-24">
              {/* Decorative Background Elements */}
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#E56A54]/30 blur-[4rem]"></div>
              
              <div className="relative z-10 max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                  Join The Platform
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Start Exploring Modern Student PGs Today.
                </h2>

                <p className="mt-6 text-base font-medium leading-relaxed text-gray-300 sm:text-lg">
                  Whether you are a student searching for accommodation or a PG owner looking to grow your reach, Dormn is built for you.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10">
                  <Link
                    to="/pgs"
                    className="w-full rounded-2xl bg-[#E56A54] px-8 py-4 text-center text-sm font-bold tracking-wide text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#d65a45] sm:w-auto md:text-base"
                  >
                    Explore PGs
                  </Link>
                  <Link
                    to="/signup/owner"
                    className="w-full rounded-2xl border-2 border-gray-400 bg-transparent px-8 py-4 text-center text-sm font-bold tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto md:text-base"
                  >
                    Become an Owner
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </div>
    </PublicLayout>
  );
};

export default About;