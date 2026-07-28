import { ShieldCheck, MessageSquare, CheckCircle, Zap, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../layouts/Container";

const HomeServiceTopics = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background Decorative Blur */}
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#93B733]/20 blur-[100px]" />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#93B733]/20 bg-white px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#93B733]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D3A1D]">
              Problem-Solving Housing Tech
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0D3A1D] sm:text-4xl md:text-5xl">
            Why Students & Owners <span className="text-[#93B733]">Trust Dormn</span>
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
            We solve the core pain points of student accommodation—eliminating uncertainty and bridging communication gaps.
          </p>
        </div>

        {/* Two Main Problem-Solving Topics */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          
          {/* Topic A: Verified Stays for Peace of Mind */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#93B733]/40 hover:shadow-xl sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#93B733]/15 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative z-10">
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#93B733]/20 bg-[#93B733]/10 text-[#93B733] shadow-sm transition-all duration-300 group-hover:bg-[#93B733] group-hover:text-white">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  SuperAdmin Quality Check
                </span>
              </div>

              {/* Title & Headline */}
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#93B733]">
                  Topic A • Verification Pipeline
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#0D3A1D] sm:text-3xl">
                  The End of Blind Booking: Verified Stays for Peace of Mind
                </h3>
              </div>

              {/* Problem Solved Highlight */}
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50/60 p-4 text-xs font-semibold leading-relaxed text-red-900 sm:text-sm">
                <span className="font-extrabold text-red-700">Problem Solved: </span> 
                Eliminates the anxiety of &quot;what you see is NOT what you get&quot; when booking PGs online, avoiding safety concerns and wasted in-person visits.
              </div>

              {/* Key Message Paragraph */}
              <p className="mt-5 text-sm font-medium leading-relaxed text-gray-600 sm:text-base sm:leading-7">
                Every listing on Dormn undergoes a rigorous verification process. We bridge the gap between digital listings and physical reality, ensuring amenities, room types (AC/Non-AC), and locations are exactly as described. This transforms a stressful search into a confident selection process.
              </p>

              {/* Feature Points */}
              <div className="mt-6 space-y-2.5">
                {[
                  "100% SuperAdmin multi-step verification pipeline",
                  "Accurate AC vs. Non-AC room specs & pricing transparency",
                  "Verified photos, exact location coordinates, and college proximity",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#93B733]" />
                    <span className="text-xs font-bold text-[#0D3A1D] sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-100">
              <Link
                to="/pgs"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#93B733] transition-all group-hover:gap-3 group-hover:text-[#82a32d]"
              >
                Browse Verified Listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Topic B: Seamless Living - Owners & Tenants */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#93B733]/40 hover:shadow-xl sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple-100/50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative z-10">
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-purple-100 bg-purple-50 text-purple-700 shadow-sm transition-all duration-300 group-hover:bg-[#0D3A1D] group-hover:text-white">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                  Instant Communication Hub
                </span>
              </div>

              {/* Title & Headline */}
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#93B733]">
                  Topic B • Inquiry & Management System
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#0D3A1D] sm:text-3xl">
                  Seamless Living: Bridging the Gap Between Owners & Tenants
                </h3>
              </div>

              {/* Problem Solved Highlight */}
              <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-xs font-semibold leading-relaxed text-amber-900 sm:text-sm">
                <span className="font-extrabold text-amber-700">Problem Solved: </span> 
                Removes communication bottlenecks between owners and students—preventing missed inquiries, delayed visit approvals, or middleman friction.
              </div>

              {/* Key Message Paragraph */}
              <p className="mt-5 text-sm font-medium leading-relaxed text-gray-600 sm:text-base sm:leading-7">
                Dormn isn&apos;t just a listing site; it&apos;s a communication hub. For students, it provides a direct line to owners via one-click contact &amp; instant booking tracking. For owners, it offers a streamlined dashboard to manage booking requests and tenant rosters effortlessly.
              </p>

              {/* Feature Points */}
              <div className="mt-6 space-y-2.5">
                {[
                  "Direct contact & request tracking for students",
                  "Streamlined owner dashboard for instant request approvals",
                  "Zero middleman friction from searching to staying",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 flex-shrink-0 text-[#93B733]" />
                    <span className="text-xs font-bold text-[#0D3A1D] sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#93B733] transition-all group-hover:gap-3 group-hover:text-[#82a32d]"
              >
                Start Direct Booking
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <PhoneCall className="h-3.5 w-3.5 text-[#93B733]" />
                Direct Owner Line
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HomeServiceTopics;
