import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Send, CheckCircle2, ShieldCheck } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Explore PGs", path: "/pgs" },
  { name: "About Us", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact Support", path: "/contact" },
];

const legalAndOwnerLinks = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Student Portal", path: "/auth?role=student" },
  { name: "Owner Portal", path: "/auth?role=owner" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07130B] text-white font-sans">
      {/* Background Brand Glows */}
      <div className="absolute left-[-100px] top-[-100px] h-96 w-96 rounded-full bg-[#93B733]/15 blur-[100px] pointer-events-none" />
      <div className="absolute right-[-100px] bottom-[-100px] h-96 w-96 rounded-full bg-[#93B733]/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="https://i.ibb.co/TqtkM8HV/logo.jpg"
                alt="Dormn Logo"
                className="h-12 w-12 rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover:rotate-6"
              />
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Dormn
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest text-[#93B733]">
                  Next-Gen Housing Platform
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-300 font-medium max-w-sm">
              Simplifying student and professional accommodation discovery with verified PG listings, zero brokerage friction, and direct owner connections.
            </p>

            <div className="space-y-2 pt-1 text-xs font-semibold text-gray-300">
              <a
                href="https://wa.me/919667555201"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-[#93B733]"
              >
                <Phone size={16} className="text-[#93B733]" />
                <span>+91 96675 55201</span>
              </a>
              <a
                href="mailto:support@dormn.in"
                className="flex items-center gap-2.5 transition hover:text-[#93B733]"
              >
                <Mail size={16} className="text-[#93B733]" />
                <span>support@dormn.in</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                {
                  name: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  href: "https://twitter.com",
                  icon: (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 backdrop-blur-md transition-all hover:scale-110 hover:border-[#93B733]/40 hover:bg-[#93B733] hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#93B733]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 transition-all hover:text-[#93B733] hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Portals */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#93B733]">
              Legal &amp; Portals
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {legalAndOwnerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 transition-all hover:text-[#93B733] hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Subscribe to Email Updates */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#93B733]">
              Subscribe For Updates
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              Subscribe to get new updates of email, new PG listings, and exclusive student offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white placeholder-gray-400 outline-none backdrop-blur-md transition-all focus:border-[#93B733] focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#93B733] px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#82a32d] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-2 rounded-xl bg-[#93B733]/20 border border-[#93B733]/40 p-3 text-xs font-bold text-[#93B733]">
                <CheckCircle2 size={16} /> Subscribed successfully!
              </div>
            )}
          </div>

        </div>

        {/* Bottom Copyright Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400">
          <p>© 2026 Dormn. All rights reserved. Built for students &amp; property owners.</p>
          
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#93B733]/15 border border-[#93B733]/30 px-2.5 py-0.5 text-[11px] font-bold text-[#93B733]">
              <ShieldCheck size={13} /> Verified
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;