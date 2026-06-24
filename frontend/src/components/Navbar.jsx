import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Explore PGs",
    path: "/pgs",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "FAQs",
    path: "/faqs",
  },
  {
    name: "Contact",
    path: "/contact",
  },
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
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-xl font-black shadow-lg shadow-pink-500/30">
            P
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight text-white sm:text-xl md:text-2xl">
              Dormn
            </h1>

            <p className="hidden sm:block text-xs text-gray-400">
              Next Gen Student Housing
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
                className={`text-sm font-medium transition duration-200 hover:text-cyan-300 ${
                  isActive ? "text-cyan-300" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl transition hover:bg-white/10"
              >
                <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 font-bold text-white">
                  {userInitial}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="max-w-[120px] truncate text-sm font-semibold text-white">
                    {user.full_name || user.name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-white/10 bg-[#111827] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="border-b border-white/10 px-3 py-3">
                    <p className="truncate font-semibold text-white">
                      {user.full_name || user.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>

                  <Link
                    to="/student/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 block rounded-xl px-3 py-3 text-sm text-white hover:bg-white/5"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="mt-1 w-full rounded-xl px-3 py-3 text-left text-sm text-red-300 hover:bg-red-500/10"
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
                className="hidden rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10 md:flex"
              >
                Become Owner
              </Link>

              <Link
                to="/auth"
                className="rounded-2xl bg-white px-4 py-2.5 md:px-5 md:py-2.5 text-sm font-bold text-black transition hover:scale-105"
              >
                Sign In
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col px-4 py-4">
            {user && (
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">
                  {user.full_name || user.name}
                </p>
                <p className="text-sm text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-white transition hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/student/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-white hover:bg-white/5"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 rounded-xl bg-red-500/10 px-4 py-3 text-left text-red-300"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/signup/owner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-xl border border-white/10 px-4 py-3 text-white"
                >
                  Become Owner
                </Link>

                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-xl bg-white px-4 py-3 text-center font-semibold text-black"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;