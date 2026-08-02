import { useState, useEffect, memo } from "react";
import { Star } from "lucide-react";
import Container from "../../layouts/Container";
import { CardStack } from "../ui/CardStack";

const reviewItems = [
  {
    id: 1,
    title: "Rahul Sharma",
    tag: "Amity University Student",
    description: "The zero brokerage policy is amazing! I found a great AC room in Sector 62 just 10 mins from my college. The photos were 100% accurate, no surprises when I visited.",
  },
  {
    id: 2,
    title: "Sneha Gupta",
    tag: "Software Engineer, Tech Park",
    description: "I was new to Noida and scared of getting scammed by brokers. Dormn made it so easy. The PG I booked is safe, clean, and exactly what was promised. Highly recommended!",
  },
  {
    id: 3,
    title: "Vikram Singh",
    tag: "JIIT Student",
    description: "Super fast and transparent process. I could contact the PG owner directly through the platform. The direct communication saved me a lot of hassle and money.",
  },
  {
    id: 4,
    title: "Priya Desai",
    tag: "Intern in Sector 62",
    description: "The filtering options are top-notch. I specifically wanted a Girls PG with food included, and Dormn found the perfect match for me within seconds.",
  },
  {
    id: 5,
    title: "Ankit Verma",
    tag: "Working Professional",
    description: "Finally, a platform that doesn't feel like a scam. The UI is incredibly smooth on mobile, making the entire search process effortless.",
  },
];

const ReviewsSection = () => {
  const [dimensions, setDimensions] = useState({ width: 420, height: 280 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: Math.min(window.innerWidth - 40, isMobile ? 320 : 420),
        height: isMobile ? 220 : 280,
      });
    };

    // Set initial size
    handleResize();

    let ticking = false;
    const throttledResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleResize();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", throttledResize);
    return () => window.removeEventListener("resize", throttledResize);
  }, []);

  return (
    <section className="bg-[#FAF9F5] px-4 py-24 sm:px-6 lg:px-8 border-y border-gray-100 [content-visibility:auto] [contain-intrinsic-size:1px_600px]">
      <Container className="max-w-[1440px] 2xl:max-w-[1600px]">
        {/* Header - Balanced and clean */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#93B733]/20 bg-[#93B733]/10 px-4 py-1.5 shadow-sm mb-4">
            <Star className="h-4 w-4 text-[#93B733] fill-[#93B733]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D3A1D]">
              Verified Reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0D3A1D] tracking-tight mb-3">
            What Our Students <span className="text-[#4E700F]">Say</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            Real experiences from students who found their perfect PG through Dormn.
          </p>
        </div>

        {/* 3D Interactive Review Cards Stack */}
        <div className="mx-auto mt-8 w-full max-w-4xl flex justify-center pb-16">
          <CardStack
            items={reviewItems}
            initialIndex={0}
            maxVisible={5}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
            // Keep it responsive by adjusting standard sizes
            cardWidth={dimensions.width}
            cardHeight={dimensions.height}
          />
        </div>
      </Container>
    </section>
  );
};

export default memo(ReviewsSection);
