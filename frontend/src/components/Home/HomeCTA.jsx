import { Link } from "react-router-dom";
import Container from "../../layouts/Container";

const HomeCTA = () => {
  return (
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8">
      <Container max-w-5xl>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#3A2935] px-6 py-12 shadow-[0_20px_50px_-12px_rgba(58,41,53,0.4)] sm:px-12 sm:py-16 md:rounded-[3rem] lg:px-16 lg:py-20 text-center">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#E56A54]/30 blur-[4rem]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
              Start Your Journey
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>

            <p className="mt-4 text-sm sm:text-base font-medium leading-relaxed text-gray-300">
              Whether you&apos;re looking for your next PG or ready to list your property, Dormn is here to help.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/pgs"
                className="rounded-2xl bg-[#E56A54] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#d65a45]"
              >
                Find a PG
              </Link>
              <Link
                to="/auth"
                className="rounded-2xl border-2 border-gray-300 bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                List Your Property
              </Link>
              <Link
                to="/contact"
                className="rounded-2xl border-2 border-gray-400/50 bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeCTA;
