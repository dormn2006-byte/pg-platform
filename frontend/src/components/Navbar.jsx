import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore PGs", path: "/pgs" },
  { name: "About", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const userInitial =
    user?.full_name?.charAt(0)?.toUpperCase() ||
    user?.name?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-[#E56A54] text-xl font-black text-white shadow-sm transition-transform duration-300 group-hover:rotate-6">
            D
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#3A2935] sm:text-2xl md:text-[1.6rem]">
              Dormn
            </h1>
            <p className="hidden text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:block">
              Next Gen Housing
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-bold transition-colors duration-300 ${
                  isActive ? "text-[#E56A54]" : "text-gray-500 hover:text-[#3A2935]"
                }`}
              >
                {link.name}
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E56A54]"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side (Auth & Mobile Toggle) */}
        <div className="flex items-center gap-3 md:gap-4">
          {user ? (
            <div className="relative flex items-center">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 rounded-2xl border-2 border-gray-100 bg-white p-1.5 pr-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3A2935] font-bold text-white">
                  {userInitial}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="max-w-[120px] truncate text-xs font-bold text-[#3A2935]">
                    {user.full_name || user.name}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {user.role}
                  </p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                  <div className="border-b border-gray-100 px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-bold text-[#3A2935]">
                      {user.full_name || user.name}
                    </p>
                    <p className="text-[10px] font-bold uppercase text-gray-400">
                      {user.role}
                    </p>
                  </div>

                  <Link
                    to="/student/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#3A2935]"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signup/owner"
                className="hidden rounded-xl border-2 border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#3A2935] transition-all hover:border-gray-300 hover:bg-gray-50 md:flex"
              >
                Become an Owner
              </Link>

              <Link
                to="/auth"
                className="rounded-xl border-2 border-[#3A2935] bg-[#3A2935] px-5 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0px_#E56A54] transition-all duration-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#E56A54] hover:border-[#E56A54] hover:shadow-[1px_1px_0px_#3A2935]"
              >
                Sign In
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#3A2935] transition-colors hover:bg-gray-200 lg:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white/95 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col p-4">
            {user && (
              <div className="mb-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
                <p className="font-bold text-[#3A2935]">
                  {user.full_name || user.name}
                </p>
                <p className="text-[10px] font-bold uppercase text-gray-500">
                  {user.role}
                </p>
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                      isActive ? "bg-[#E56A54]/10 text-[#E56A54]" : "text-gray-600 hover:bg-gray-50 hover:text-[#3A2935]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/student/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-gray-50 px-4 py-3 text-center text-sm font-bold text-[#3A2935]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/signup/owner"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-center text-sm font-bold text-[#3A2935]"
                  >
                    Become an Owner
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-[#3A2935] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;