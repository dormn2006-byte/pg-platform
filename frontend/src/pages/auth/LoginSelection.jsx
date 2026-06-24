import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b17] text-white">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
      <div className="absolute right-[-100px] top-[120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] left-[25%] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-[#070b17]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-xl font-black shadow-lg shadow-pink-500/20">
              AS
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight md:text-2xl">
                Dormn
              </h1>
              <p className="text-xs text-gray-400">
                Next Gen Student Housing
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10"
          >
            Back Home
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-5 py-10 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Heading */}
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <p className="text-sm font-semibold text-cyan-200">
                Secure Access Portal
              </p>
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Choose Your
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}Experience
              </span>
            </h1>

           

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/login/owner')}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                PG Owner? Login Here →
              </button>
            </div>
          </div>

          {/* Selection Cards */}
          <div className="mx-auto max-w-2xl">
            {/* Student / Finder Card */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-cyan-500/10 opacity-80"></div>

              {/* Floating Glow */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-500/20 blur-3xl transition duration-700 group-hover:scale-125"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-3xl shadow-2xl shadow-pink-500/30 md:h-20 md:w-20 md:text-4xl">
                    🎓
                  </div>

                  <div className="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
                    PG Finder Portal
                  </div>
                </div>

                <h2 className="mt-8 text-2xl font-black tracking-tight sm:text-3xl md:text-5xl">
                  Find Your Perfect PG
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                  Discover premium student stays, compare room types, save
                  favorite PGs and book visits instantly.
                </p>

                {/* Features */}
                <div className="mt-6 grid gap-3">
                  {[
                    "Smart PG Discovery",
                    "Verified Listings",
                    "Live Room Availability",
                    "Wishlist & Booking",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-sm">
                        ✓
                      </div>

                      <p className="font-medium text-gray-200">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/login/user")}
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-6 py-3.5 font-bold shadow-xl shadow-pink-500/20 transition hover:scale-[1.02]"
                  >
                    Login as PG Finder
                  </button>

                  <button
                    onClick={() => navigate("/signup/user")}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginSelection;