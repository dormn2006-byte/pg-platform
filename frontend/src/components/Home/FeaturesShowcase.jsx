import { featureSlides } from "../../data/homeData";
import { Rocket, ShieldCheck, Smartphone } from "lucide-react";

const iconMap = {
  instant: Rocket,
  verified: ShieldCheck,
  mobile: Smartphone,
};

const FeaturesShowcase = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header - Balanced and clean */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#0D3A1D] tracking-tight mb-3">
          Why Students <span className="text-[#93B733]">Love Us</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium">
          Everything you need for a safe and hassle-free stay.
        </p>
      </div>

      {/* Feature Cards Grid (Static / Non-sliding) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureSlides.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col rounded-[2rem] border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#93B733]/30 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Zesty Icon with Hover Animation */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 border-2 border-gray-100 group-hover:bg-[#93B733] transition-all duration-300 text-gray-500 group-hover:text-white">
              {(() => {
                const IconComponent = iconMap[feature.icon] || Rocket;
                return <IconComponent className="h-6 w-6 transition-colors duration-300" />;
              })()}
            </div>

            {/* Content */}
            <h3 className="text-lg font-black text-[#0D3A1D] tracking-tight mb-2">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm font-medium leading-relaxed text-gray-500 line-clamp-3">
              {feature.description}
            </p>
            
            {/* Subtle Accent Line */}
            <div className="mt-auto pt-6">
               <div className="h-1 w-8 bg-gray-100 rounded-full group-hover:bg-[#93B733] transition-colors duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesShowcase;