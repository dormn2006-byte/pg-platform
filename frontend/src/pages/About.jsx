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
          pgs
            .map((pg) => pg.city)
            .filter(Boolean)
        );

        const owners = new Set(
          pgs
            .map((pg) => pg.owner_id)
            .filter(Boolean)
        );

        setStats([
          {
            number: `${pgs.length}+`,
            label: 'Verified PGs',
          },
          {
            number: `${pgs.length * 5}+`,
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

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-5 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="absolute left-[-100px] top-[-80px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute right-[-100px] top-[120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <Container className="relative grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl sm:px-5">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              <p className="text-xs font-semibold text-cyan-200 sm:text-sm">
                Revolutionizing Student Housing
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl md:mt-7 md:text-7xl">
              Building The Future Of
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Student Accommodation
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              PGVerse is a growing student accommodation platform powered by real PG listings, verified owners and live accommodation data from our platform database.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              We connect students with trusted PG owners through a secure ecosystem that enables discovery, comparison and booking of accommodations in multiple cities.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl"></div>

            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
                alt="Student PG"
                className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px] lg:h-[520px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="px-4 pb-12 sm:px-5 sm:pb-16 lg:px-8 lg:pb-20">
        <Container className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-center shadow-2xl backdrop-blur-2xl sm:p-5 md:rounded-[2rem] md:p-8"
            >
              <h3 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent sm:text-3xl md:text-5xl">
                {item.number}
              </h3>

              <p className="mt-2 text-xs text-gray-300 sm:text-sm md:mt-4 md:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* About Platform */}
      <section className="px-4 pb-14 sm:px-5 sm:pb-16 lg:px-8 lg:pb-24">
        <Container>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl sm:p-6 md:rounded-[3rem] md:p-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
                  What We Are Doing
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
                  Simplifying PG Search For Students
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                  Students often struggle while searching for trusted accommodation because information is scattered across multiple sources and frequently becomes outdated.
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                  PGVerse solves this by creating a centralized platform where students can explore verified accommodations with room photos, amenities, pricing, rules, location details and direct owner communication.
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                  Our platform is designed not only as a listing website but also as a complete management ecosystem for PG owners and administrators.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20">
                <img
                  src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"
                  alt="Student Accommodation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="px-5 pb-24 lg:px-8">
        <Container>
          <div className="mb-8 text-center md:mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Platform Highlights
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
              Why PGVerse Is Different
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl transition duration-300 hover:-translate-y-1 sm:p-6 md:rounded-[2.5rem] md:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-gradient-to-r from-pink-500/20 to-cyan-500/20 text-2xl sm:h-16 sm:w-16 sm:text-3xl md:h-20 md:w-20 md:rounded-[2rem] md:text-4xl">
                  {feature.icon}
                </div>

                <h3 className="mt-7 text-3xl font-black tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="px-5 pb-24 lg:px-8">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
              alt="PG Rooms"
              className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px] lg:h-[520px]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">
              Our Mission
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Safe, Smart & Transparent Student Living
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-300">
              We believe finding a PG should not feel stressful or confusing.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our mission is to create a trusted accommodation network where students can confidently explore and compare PGs with complete transparency.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              In the future, PGVerse will expand into smart booking systems, AI-powered recommendations, student communities and digital PG management solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* Future Vision */}
      <section className="px-5 pb-24 lg:px-8">
        <Container>
          <div className="rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl md:p-14">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Future Roadmap
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                What We Are Building Next
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                PGVerse is evolving into a complete smart accommodation ecosystem for students and PG owners.
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-center">
              <p className="text-cyan-200 font-medium">
                Current roadmap items will gradually move from planning to live platform features as PGVerse expands across more cities and owners.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {futureFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-cyan-400/30 hover:bg-white/5 sm:p-5 md:rounded-[2rem] md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-lg font-black text-white">
                      ✓
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {feature}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 pb-28 lg:px-8">
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 p-5 shadow-2xl backdrop-blur-2xl sm:p-8 md:rounded-[3rem] md:p-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Join The Platform
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl md:mt-5 md:text-6xl">
                Start Exploring Modern Student PGs Today
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-200 sm:text-base sm:leading-7 md:mt-7 md:text-lg md:leading-8">
                Whether you are a student searching for accommodation or a PG owner looking to grow your reach, PGVerse is built for you.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  to="/pgs"
                  className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-black text-black transition hover:scale-105 sm:w-auto sm:px-7 sm:py-4"
                >
                  Explore PGs
                </Link>

                
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
};

export default About;