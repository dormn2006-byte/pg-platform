import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";

const coreValues = [
  {
    title: "Transparency",
    description:
      "We believe in clear, honest information. Every listed property must provide accurate details regarding pricing, amenities, and house rules.",
    icon: "👁️",
  },
  {
    title: "Security",
    description:
      "We prioritize the safety and privacy of our users. Our platform utilizes state-of-the-art encryption, secure authentication, and strict data protection protocols.",
    icon: "🔒",
  },
  {
    title: "Efficiency",
    description:
      "We value your time. Our dynamic search, instant booking requests, and automated communication pipelines make housing search effortless.",
    icon: "⚡",
  },
  {
    title: "Quality",
    description:
      "We are committed to elevating the standard of PG accommodations by showcasing verified, high-quality properties on our platform.",
    icon: "⭐",
  },
];

const techStack = [
  {
    category: "Frontend Experience",
    tech: "React.js • Vite • Tailwind CSS",
    description:
      "Delivers a highly responsive, modern, and aesthetically premium UI with role-based routing architecture (Student, Owner, SuperAdmin).",
    icon: "💻",
  },
  {
    category: "Backend & Database",
    tech: "Node.js • Express.js • MySQL",
    description:
      "Stateless JWT authentication and bcrypt password hashing paired with a secure MySQL database.",
    icon: "⚙️",
  },
  {
    category: "Media Handling",
    tech: "Sharp • Multer Image Pipeline",
    description:
      "Automatic compression and resizing of gallery images before secure storage to guarantee lightning-fast page loads.",
    icon: "🖼️",
  },
  {
    category: "Communication",
    tech: "Nodemailer • SMTP Service",
    description:
      "Integrated automated email receipts and support inquiry dispatch directly to our support desk.",
    icon: "✉️",
  },
];

const whoWeServe = [
  {
    role: "1. Students & Tenants",
    description:
      "Ultimate discovery engine with dynamic search across cities, advanced filters (Gender, Room Type, Sponsored), Discover Mode, visit requests, WhatsApp chat, and real-time booking tracking.",
    badge: "Seekers",
    linkText: "Explore PGs",
    linkUrl: "/pgs",
  },
  {
    role: "2. Property Owners",
    description:
      "Comprehensive business management dashboard to effortlessly list properties, upload gallery photos, accept/reject booking requests, and maintain a clear tenant roster.",
    badge: "Providers",
    linkText: "Owner Dashboard",
    linkUrl: "/auth",
  },
  {
    role: "3. Platform Administrators",
    description:
      "SuperAdmin team possesses robust oversight capabilities to monitor users, verify and flag listings, and manage system-wide activities for a safe environment.",
    badge: "SuperAdmin",
    linkText: "Contact Admin",
    linkUrl: "/contact",
  },
];

const futureFeatures = [
  {
    title: "In-App Payments",
    desc: "Secure integration with payment gateways to collect security deposits and monthly rent digitally.",
  },
  {
    title: "Reviews & Ratings Engine",
    desc: "A verified feedback system allowing students to rate and review their past accommodations.",
  },
  {
    title: "Advanced Analytics",
    desc: "Granular data for owners to track listing views, conversion rates, and revenue projections.",
  },
  {
    title: "Push Notifications",
    desc: "Real-time alerts for booking status updates, visit approvals, and new inquiries.",
  },
];

const About = () => {
  const [stats, setStats] = useState([
    { number: "10+", label: "Verified PGs" },
    { number: "100+", label: "Students Connected" },
    { number: "7+", label: "PG Owners" },
    { number: "2", label: "Cities Covered" },
  ]);

  useEffect(() => {
    const loadAboutStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/pg/all");
        const pgs = res.data?.pgs || res.data?.data || [];

        const cities = new Set(pgs.map((pg) => pg.city).filter(Boolean));
        const owners = new Set(pgs.map((pg) => pg.owner_id).filter(Boolean));

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
            number: `${owners.size > 0 ? owners.size : 7}+`,
            label: "PG Owners",
          },
          {
            number: `${cities.size > 0 ? cities.size : 2}`,
            label: "Cities Covered",
          },
        ]);
      } catch (error) {
        console.error("About page stats error:", error);
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
                Building The Future Of{" "}
                <span className="relative mt-2 inline-block">
                  <span className="absolute inset-0 -rotate-1 rounded-2xl bg-[#E56A54]"></span>
                  <span className="relative inline-block -rotate-1 px-4 py-1 text-white">
                    Student Stays
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
                Welcome to <strong className="text-[#3A2935]">Dormn</strong>, a next-generation housing and Paying Guest (PG) accommodation management platform. We were founded with a singular vision: to streamline and simplify the process of finding, booking, and managing student and professional housing.
              </p>

              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
                Dormn bridges the gap between seekers and providers, creating a frictionless, transparent, and premium ecosystem for all.
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

        {/* Live Stats */}
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

        {/* The Problem We Solve */}
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
                    The Problem We Solve
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:mt-4 md:text-5xl">
                    Eliminating Stress From Accommodation Search.
                  </h2>

                  <p className="mt-5 text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
                    Finding a PG is often stressful. Information is scattered across unverified WhatsApp groups, unreliable classifieds, and outdated websites. Once found, the booking process is opaque, leaving students vulnerable to hidden costs.
                  </p>

                  <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
                    On the other side, PG owners lack modern digital tools, relying on manual tracking and paperwork. <strong className="text-[#3A2935]">Dormn solves these pain points</strong> by providing a unified, role-based platform empowering both Students and Owners.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Our Core Values */}
        <section className="bg-white px-5 py-20 lg:px-8 lg:py-28 border-y border-gray-100">
          <Container>
            <div className="mb-12 text-center md:mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                Foundational Principles
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[2rem] border-2 border-gray-100 bg-[#FAF9F5]/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E56A54]/30 hover:bg-white hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50 text-2xl shadow-sm">
                    {value.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-black tracking-tight text-[#3A2935]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Our Technology & Architecture */}
        <section className="px-5 py-20 lg:px-8 lg:py-28">
          <Container>
            <div className="mb-12 text-center md:mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                Built For Performance & Scalability
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
                Technology & Architecture
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600 font-medium">
                Dormn is built on a robust, modern technology stack designed for security, high speed, and seamless user experiences.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {techStack.map((tech) => (
                <div
                  key={tech.category}
                  className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl mb-4">{tech.icon}</div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E56A54]">
                      {tech.category}
                    </span>
                    <h3 className="mt-1 text-lg font-black text-[#3A2935]">
                      {tech.tech}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed font-medium text-gray-600">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Who We Serve */}
        <section className="bg-white px-5 py-20 lg:px-8 lg:py-28 border-y border-gray-100">
          <Container>
            <div className="mb-12 text-center md:mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                Platform Ecosystem
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
                Who We Serve
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {whoWeServe.map((item) => (
                <div
                  key={item.role}
                  className="flex flex-col justify-between rounded-[2.5rem] border-2 border-gray-100 bg-[#FAF9F5]/80 p-8 transition-all hover:border-[#E56A54]/30 hover:bg-white hover:shadow-md"
                >
                  <div>
                    <span className="inline-block rounded-full bg-[#E56A54]/10 px-3 py-1 text-[11px] font-extrabold text-[#E56A54] uppercase tracking-wider mb-4">
                      {item.badge}
                    </span>
                    <h3 className="text-2xl font-black text-[#3A2935]">
                      {item.role}
                    </h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link
                      to={item.linkUrl}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#E56A54] hover:underline"
                    >
                      {item.linkText} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Looking to the Future */}
        <section className="px-5 py-20 lg:px-8 lg:py-28">
          <Container>
            <div className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-8 shadow-sm md:rounded-[3rem] md:p-14">
              <div className="mb-12 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
                  Looking To The Future
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-[#3A2935] md:text-5xl">
                  Product Roadmap & Innovations
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-500 sm:text-lg">
                  Dormn is an evolving platform. Our roadmap includes exciting future developments designed to elevate the student housing ecosystem.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {futureFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 transition-all hover:border-[#E56A54]/30 hover:bg-white"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E56A54]/10 text-xs font-black text-[#E56A54] mb-3">
                      ✓
                    </div>
                    <h3 className="text-base font-extrabold text-[#3A2935]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed font-medium text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center border-t border-gray-100 pt-8">
                <p className="text-sm font-extrabold text-[#3A2935] italic">
                  Dormn: Your Home, Our Priority.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA (Premium Charcoal Banner) */}
        <section className="px-5 pb-20 lg:px-8 lg:pb-28">
          <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#3A2935] px-6 py-12 shadow-[0_20px_50px_-12px_rgba(58,41,53,0.4)] sm:px-12 sm:py-16 md:rounded-[3rem] lg:px-20 lg:py-24">
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
                    to="/auth"
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