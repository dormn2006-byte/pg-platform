import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "PLATFORM",
    links: [
      { name: "Explore PGs", path: "/pgs" },
      { name: "My Bookings", path: "/my-bookings" },
    ],
  },
  {
    title: "PARTNERS",
    links: [
      { name: "List Your Property", path: "/auth" },
      { name: "Owner Dashboard", path: "/auth" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Contact Us", path: "/contact" },
      { name: "Help & FAQs", path: "/faqs" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "About Dormn", path: "/about" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Sign In / Register", path: "/auth" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#E56A54] text-[#3A2935] selection:bg-[#3A2935] selection:text-white">
      {/* Top Multi-Column Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">
        
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#3A2935]/20 pb-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3A2935] text-xl font-black text-white shadow-md">
              D
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#3A2935]">
                Dormn
              </h2>
              <p className="text-xs font-black uppercase tracking-wider text-[#3A2935]/80">
                Next Gen Student Housing Platform
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3A2935] text-white transition hover:bg-[#3A2935]/80 hover:scale-105"
            >
              📷
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3A2935] text-white transition hover:bg-[#3A2935]/80 hover:scale-105"
            >
              💼
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3A2935] text-white transition hover:bg-[#3A2935]/80 hover:scale-105"
            >
              🐦
            </a>
          </div>
        </div>

        {/* GitHub Column Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#3A2935]">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm font-extrabold text-[#3A2935]/90 transition-colors hover:text-[#3A2935] hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#3A2935]/20 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs font-extrabold text-[#3A2935]/90">
            © 2026 Dormn Inc. All rights reserved. • Built for Students & Property Partners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black text-[#3A2935]">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:underline">
              About Platform
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;