import { featureSlides } from "../../data/homeData";

const FeaturesShowcase = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header - Balanced and clean */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#3A2935] tracking-tight mb-3">
          Why Students <span className="text-[#E56A54]">Love Us</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium">
          Everything you need for a safe and hassle-free stay.
        </p>
      </div>

      {/* Horizontal Snap-Slider (Space Efficient) */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide [-webkit-overflow-scrolling:touch] cursor-grab active:cursor-grabbing">
        {featureSlides.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col min-w-[260px] sm:min-w-[300px] md:min-w-[320px] rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm snap-start transition-all duration-300 hover:border-[#E56A54]/30 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Zesty Icon with Hover Animation */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 border-2 border-gray-100 text-2xl group-hover:bg-[#E56A54] group-hover:text-white transition-all duration-300">
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-black text-[#3A2935] tracking-tight mb-2">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm font-medium leading-relaxed text-gray-500 line-clamp-3">
              {feature.description}
            </p>
            
            {/* Subtle Accent Line */}
            <div className="mt-auto pt-6">
               <div className="h-1 w-8 bg-gray-100 rounded-full group-hover:bg-[#E56A54] transition-colors duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesShowcase;