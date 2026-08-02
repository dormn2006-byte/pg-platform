import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import MacOSDock from "./ui/mac-os-dock";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Track scroll direction to hide/show mobile dock
  const [hideMobileDock, setHideMobileDock] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const atBottom = (window.innerHeight + currentY) >= (document.documentElement.scrollHeight - 50);

          if (currentY < 10 || atBottom) {
            setHideMobileDock(false);
          } else if (currentY > lastScrollY.current + 5) {
            // Scroll down: Hide dock
            setHideMobileDock(true);
          } else if (currentY < lastScrollY.current - 5) {
            // Scroll up: Show dock
            setHideMobileDock(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define dock apps for core navigation links
  const dockApps = [
    { id: "/", name: "Home", icon: "/icons/home.webp" },
    { id: "/pgs", name: "Explore", icon: "/icons/explore.webp" },
    { id: "/blogs", name: "Blogs", icon: "/icons/blog.webp" },
    { id: "/about", name: "About Us", icon: "/icons/aboutus.webp" },
    { id: "/faqs", name: "FAQs", icon: "/icons/faq.webp" },
    { id: "/contact", name: "Contact", icon: "/icons/contact.webp" }
  ];

  const handleAppClick = (appId) => {
    navigate(appId);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] 2xl:max-w-[1600px] h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          
          {/* Left Side: Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img
              src="/logo-sm.webp"
              alt="Dormn Logo"
              className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain transition-transform duration-300 group-hover:rotate-6"
            />
            <div>
              <h1 className="text-xl font-black tracking-tight text-[#0D3A1D] sm:text-2xl leading-none">
                Dormn
              </h1>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#4E700F] leading-none mt-1 sm:text-[11px]">
                Next Gen Housing
              </p>
            </div>
          </Link>

          {/* Center: MacOS Dock (Desktop only) */}
          <div className="hidden lg:flex items-center justify-center flex-1 lg:max-w-lg xl:max-w-2xl mx-4">
            <MacOSDock
              apps={dockApps}
              onAppClick={handleAppClick}
              openApps={[location.pathname]}
            />
          </div>

          {/* Right Side: Become Owner & Auth buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <Link
                  to={user.role === "superadmin" ? "/superadmin/dashboard" : user.role === "owner" ? "/owner/dashboard" : "/student/dashboard"}
                  className="rounded-2xl bg-[#0D3A1D] px-6 py-2.5 text-base font-extrabold text-white transition-all hover:bg-[#07130B] shadow-[0_4px_12px_rgba(13,58,29,0.15)]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="rounded-2xl border-2 border-red-200 bg-red-50 px-6 py-2.5 text-base font-extrabold text-red-600 transition-all hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?role=owner&mode=signup"
                  className="hidden sm:inline-flex rounded-2xl border-2 border-gray-200 bg-white px-6 py-2.5 text-base font-extrabold text-[#0D3A1D] transition-all hover:bg-gray-50 hover:border-gray-300"
                >
                  Become an Owner
                </Link>
                <Link
                  to="/auth"
                  className="rounded-2xl bg-[#0D3A1D] px-6 py-2.5 text-base font-extrabold text-white transition-all hover:bg-[#07130B] shadow-[0_4px_12px_rgba(13,58,29,0.15)]"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Floating MacOS Dock at Bottom (Mobile/Tablet only) */}
      <div className={`lg:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${hideMobileDock ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="pointer-events-auto">
          <MacOSDock
            apps={dockApps}
            onAppClick={handleAppClick}
            openApps={[location.pathname]}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;