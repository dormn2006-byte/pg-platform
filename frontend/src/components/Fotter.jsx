import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Explore PGs", path: "/pgs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const pgLinks = [
  "Boys PG",
  "Girls PG",
  "AC Rooms",
  "Non AC Rooms",
  "Near Colleges",
  "Premium PGs",
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060b18] text-white">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"></div>
      <div className="absolute right-[-120px] bottom-[-120px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-5 sm:pt-14 md:pb-10 md:pt-20 lg:px-8">
        {/* Top Footer */}
        <div className="grid gap-6 border-b border-white/10 pb-6 md:grid-cols-2 md:gap-8 md:pb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-2xl font-black shadow-lg shadow-pink-500/20">
                P
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                  Dormn
                </h2>

                <p className="hidden text-sm text-gray-400 sm:block">
                  Next Gen Student Housing
                </p>
              </div>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-300">
              Discover verified PGs and student housing across India.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/10">
                📷
              </div>

              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/10">
                💼
              </div>

              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/10">
                🐦
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black sm:text-xl md:text-2xl">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-3 md:mt-7 md:gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base text-gray-300 transition hover:translate-x-1 hover:text-cyan-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-3 pt-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="text-sm text-gray-400">
              © 2026 Dormn • Student Housing Platform
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400 sm:gap-4 sm:text-sm md:justify-start md:gap-5">
            <Link to="/privacy" className="transition hover:text-cyan-300">
              Privacy Policy
            </Link>

            <Link to="/terms" className="transition hover:text-cyan-300">
              Terms & Conditions
            </Link>

            <Link to="/about" className="transition hover:text-cyan-300">
              About Platform
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;