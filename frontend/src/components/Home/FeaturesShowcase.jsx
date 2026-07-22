import Container from "../../layouts/Container";
import { featureSlides } from "../../data/homeData";

const FeaturesShowcase = () => {
  return (
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-100">
      <Container max-w-4xl>
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Student Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3A2935] tracking-tight mb-3">
            Why Students <span className="text-[#E56A54]">Love Us</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium max-w-xl mx-auto">
            Everything you need for a safe, verified, and hassle-free stay.
          </p>
        </div>

        {/* Point-Wise Vertical List (No Horizontal Scrolling) */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {featureSlides.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 sm:gap-5 rounded-3xl border-2 border-gray-100 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-[#E56A54]/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 border-2 border-orange-100 text-2xl">
                {feature.icon}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#E56A54]">Point 0{index + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#3A2935] tracking-tight mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesShowcase;