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
              <img 
                src="https://i.ibb.co/TqtkM8HV/logo.jpg" 
                alt="Dormn Logo" 
                className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-2xl object-cover" 
              />
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
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:scale-105 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
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