import { Star } from "lucide-react";
import Container from "../../layouts/Container";

const ReviewsSection = () => {
  return (
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8 border-y border-gray-100">
      <Container className="max-w-7xl">
        {/* Header - Balanced and clean */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#93B733]/20 bg-[#93B733]/10 px-4 py-1.5 shadow-sm mb-4">
            <Star className="h-4 w-4 text-[#93B733] fill-[#93B733]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D3A1D]">
              Verified Reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0D3A1D] tracking-tight mb-3">
            What Our Students <span className="text-[#93B733]">Say</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Real experiences from students who found their perfect PG through Dormn.
          </p>
        </div>

        {/* Review Cards Grid (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="group flex flex-col rounded-[2rem] border border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#93B733]/60 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Profile Skeleton */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-50 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Stars Skeleton */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-200 fill-gray-200" />
                ))}
              </div>

              {/* Text Skeleton */}
              <div className="space-y-2.5 flex-1">
                <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
                <div className="h-3 w-11/12 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ReviewsSection;
