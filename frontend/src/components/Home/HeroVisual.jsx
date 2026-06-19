const HeroVisual = ({ featuredPG }) => {
  const imageUrl = featuredPG?.profile_image
    ? `http://localhost:8000/uploads/${featuredPG.profile_image}`
    : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop";
  return (
    <div className="relative mx-auto w-full max-w-[320px] overflow-hidden select-none sm:max-w-[340px] md:max-w-none">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-4 top-10 h-24 w-24 rounded-full bg-pink-500/35 blur-3xl md:-left-10 md:h-40 md:w-40"></div>
      <div className="pointer-events-none absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-cyan-500/35 blur-3xl md:-right-10 md:h-52 md:w-52"></div>

      {/* Main Showcase */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2.5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-300 md:rounded-[3rem] md:p-4">
        <img
          src={imageUrl}
          alt="Luxury Student PG"
          loading="eager"
          fetchPriority="high"
          className="h-[380px] w-full rounded-[1.75rem] object-cover md:h-[580px] md:rounded-[2.5rem]"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-transparent to-transparent"></div>

        {/* Floating Card 1 */}
        <div className="absolute left-3 top-3 max-w-[170px] sm:max-w-[200px] rounded-[1.5rem] border border-white/10 bg-black/50 p-4 backdrop-blur-2xl md:left-10 md:top-10 md:max-w-[240px] md:rounded-[2rem] md:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Verified Stay
          </p>

          <h3 className="mt-2 text-2xl font-black leading-tight text-white md:mt-3 md:text-3xl">
            Trusted Listings
          </h3>

          <p className="mt-3 text-xs leading-5 text-gray-200 md:mt-4 md:text-sm md:leading-6">
            Admin approved PGs with modern facilities and secure onboarding.
          </p>
        </div>

        {/* Floating Card 2 */}
        <div className="absolute bottom-20 right-3 max-w-[180px] sm:max-w-[220px] rounded-[1.5rem] border border-white/10 bg-black/50 p-4 backdrop-blur-2xl md:bottom-10 md:right-10 md:max-w-[260px] md:rounded-[2rem] md:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
            Fast Booking
          </p>

          <h3 className="mt-2 text-2xl font-black leading-tight text-white md:mt-3 md:text-3xl">
            Instant Approval
          </h3>

          <p className="mt-3 text-xs leading-5 text-gray-200 md:mt-4 md:text-sm md:leading-6">
            Connect directly with verified PG owners without confusion or delays.
          </p>
        </div>

        {/* Bottom Area Tag */}
        <div className="absolute bottom-3 left-3 right-3 rounded-[1.5rem] border border-white/10 bg-black/60 px-4 py-4 backdrop-blur-2xl md:bottom-8 md:left-8 md:right-auto md:rounded-[2rem] md:px-6 md:py-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Top Trending Area
          </p>

          <h3 className="mt-2 text-3xl font-black text-white md:text-4xl">
            {featuredPG?.city || featuredPG?.area || "Popular Location"}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4 md:gap-3">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-300 md:px-4 md:py-2 md:text-xs">
              {featuredPG?.available_rooms || 0}+ Rooms Available
            </span>

            <span className="rounded-full bg-pink-500/10 px-3 py-1.5 text-[11px] font-semibold text-pink-300 md:px-4 md:py-2 md:text-xs">
              Verified PG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;