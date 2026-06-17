import { useEffect, useState } from "react";
import { featureSlides } from "../../data/homeData";

const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) =>
        prev === featureSlides.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-5 sm:pb-16 md:px-8 md:pb-20 lg:pb-24">
      <div className="mb-6 text-center sm:mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-pink-300 sm:text-sm sm:tracking-[0.25em]">
          Why Students Love Us
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:mt-4 md:text-5xl">
          Everything You Need
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl sm:p-6 md:rounded-[3rem] md:p-10">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${featureSlides[activeFeature].color} opacity-70 transition-all duration-700`}
        ></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 sm:hidden">
            Feature Highlights
          </div>
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-[1.25rem] border ${featureSlides[activeFeature].border} bg-white/10 text-3xl shadow-2xl ${featureSlides[activeFeature].glow} backdrop-blur-2xl transition-all duration-700 sm:mb-6 sm:h-20 sm:w-20 sm:text-4xl md:h-24 md:w-24 md:rounded-[2rem] md:text-5xl`}
          >
            {featureSlides[activeFeature].icon}
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">
            {featureSlides[activeFeature].title}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-4 sm:text-base sm:leading-7 md:mt-6 md:text-xl md:leading-8">
            {featureSlides[activeFeature].description}
          </p>

          <div className="mt-5 flex items-center gap-2 sm:mt-8 sm:gap-3 md:mt-10">
            {featureSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`transition-all duration-500 ${
                  activeFeature === index
                    ? "h-2.5 w-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 sm:h-3 sm:w-14"
                    : "h-2.5 w-2.5 rounded-full bg-white/20 sm:h-3 sm:w-3"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;