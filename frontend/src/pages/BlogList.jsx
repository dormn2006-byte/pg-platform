import { Link } from "react-router-dom";
import Container from "../layouts/Container";
import PublicLayout from "../layouts/PublicLayout";
import SEOHead from "../components/common/SEOHead";
import { GraduationCap, Building2, ShieldCheck, MapPin, ArrowRight, Sparkles } from "lucide-react";

const guides = [
  {
    slug: "pg-near-amity-university-noida",
    title: "Best PGs Near Amity University Noida (Sector 125 & 126)",
    description: "Complete student guide: Walking distance stays, mess food reviews, late entry rules, and top verified Boys & Girls PGs.",
    category: "University Special",
    badgeColor: "bg-emerald-100 text-emerald-800",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1200&auto=format&fit=crop",
    readTime: "4 min read",
  },
  {
    slug: "pg-in-sector-62-noida",
    title: "Sector 62 Noida Living Guide for IT Professionals & Interns",
    description: "Stays near Stellar IT Park, Logix Cyber Park, and Noida Electronic City Metro. Power backup, single sharing & food plans.",
    category: "Corporate & Tech Hub",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    readTime: "5 min read",
  },
];

const BlogList = () => {
  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Noida Student & Professional Accommodation Guides | Dormn",
    "description": "Hand-crafted locality guides, university accommodation reviews, and tech park stay advice for Noida NCR.",
    "url": "https://dormn.com/blogs"
  };

  return (
    <PublicLayout>
      <SEOHead
        title="Noida Student & Corporate PG Guides | Dormn Guides"
        description="Explore custom guides for finding verified PGs in Noida near Amity University, Sector 62, Knowledge Park, and major corporate parks with zero brokerage."
        canonicalUrl="https://dormn.com/blogs"
        ogImage="https://dormn.com/logo.jpg"
        schema={hubSchema}
      />

      {/* Hero Banner */}
      <div className="bg-[#0D3A1D] text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#93B733]/10 rounded-full blur-3xl pointer-events-none"></div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#93B733]/20 text-[#93B733] text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-[#93B733]/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Hand-Crafted Noida Guides
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Local Stays & Neighbourhood Guides for Noida
            </h1>
            <p className="text-gray-300 mt-4 text-base sm:text-lg leading-relaxed">
              Tailored insights designed specifically for Amity students, Sector 62 corporate interns, and Knowledge Park scholars.
            </p>
          </div>
        </Container>
      </div>

      {/* Guides Grid */}
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.slug}
                className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${guide.badgeColor}`}>
                      {guide.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      <Icon className="w-4 h-4 text-[#E56A54]" />
                      <span>{guide.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-black text-[#0D3A1D] group-hover:text-[#E56A54] transition-colors leading-snug">
                      <Link to={`/blogs/${guide.slug}`}>{guide.title}</Link>
                    </h2>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0D3A1D]">Noida, UP</span>
                    <Link
                      to={`/blogs/${guide.slug}`}
                      className="inline-flex items-center gap-2 font-bold text-sm text-[#E56A54] group-hover:text-[#0D3A1D] transition-colors"
                    >
                      Explore Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </PublicLayout>
  );
};

export default BlogList;