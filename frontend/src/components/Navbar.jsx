import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef, useCallback, memo } from "react";
import { AuthContext } from "../context/AuthContext";
import { AudioContext } from "../context/AudioContext";
import MacOSDock from "./ui/mac-os-dock";
import { ChevronDown, LayoutDashboard, LogOut, Music, Pause, Play, SkipForward } from "lucide-react";

const DOCK_APPS = [
  { id: "/", name: "Home", icon: "/icons/home.webp" },
  { id: "/pgs", name: "Explore", icon: "/icons/explore.webp" },
  { id: "/blogs", name: "Blogs", icon: "/icons/blog.webp" },
  { id: "/about", name: "About Us", icon: "/icons/aboutus.webp" },
  { id: "/faqs", name: "FAQs", icon: "/icons/faq.webp" },
  { id: "/contact", name: "Contact", icon: "/icons/contact.webp" }
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const audioContext = useContext(AudioContext);

  const [hideMobileDock, setHideMobileDock] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const profileMenuRef = useRef(null);
  const mobileMusicRef = useRef(null);

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
            setHideMobileDock(true);
          } else if (currentY < lastScrollY.current - 5) {
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMusicRef.current && !mobileMusicRef.current.contains(e.target) && audioContext?.isOpen) {
        audioContext.setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [audioContext]);

  const handleAppClick = useCallback((appId) => navigate(appId), [navigate]);

  const getDashboardPath = useCallback(() => {
    if (!user) return "/";
    return user.role === "superadmin"
      ? "/superadmin/dashboard"
      : user.role === "owner"
      ? "/owner/dashboard"
      : "/student/dashboard";
  }, [user]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] 2xl:max-w-[1600px] h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          
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

          <div className="hidden lg:flex items-center justify-center flex-1 lg:max-w-lg xl:max-w-2xl mx-4">
            <MacOSDock
              apps={DOCK_APPS}
              onAppClick={handleAppClick}
              openApps={[location.pathname]}
            />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {audioContext && (
              <div className="lg:hidden relative" ref={mobileMusicRef}>
                <button
                  onClick={audioContext.toggleOpen}
                  aria-label={audioContext.isOpen ? "Close music player" : "Open music player"}
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border-2 transition-all duration-300 shadow-sm ${
                    audioContext.isPlaying 
                      ? "border-[#93B733] bg-[#93B733] text-white shadow-[#93B733]/30" 
                      : "border-gray-200/80 bg-white/90 text-[#93B733] hover:border-[#93B733]"
                  }`}
                  title="Background Music"
                >
                  <Music size={18} className={audioContext.isPlaying ? "animate-spin-slow" : ""} />
                </button>

                {audioContext.isOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 flex items-center gap-2.5 rounded-2xl border border-gray-200/90 bg-white/95 backdrop-blur-xl p-2.5 shadow-xl animate-[fadeIn_0.15s_ease-out_forwards] w-[240px] sm:w-[270px]">
                    <div className="flex-1 min-w-0 px-2 flex flex-col justify-center">
                      <p className="truncate text-xs font-black text-[#0D3A1D]">
                        {audioContext.playlist[audioContext.currentTrackIndex].split("/").pop().replace(".mp3", "")}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-500">
                        Playing {audioContext.currentTrackIndex + 1} of {audioContext.playlist.length}
                      </p>
                    </div>
                    <button
                      onClick={audioContext.togglePlay}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#93B733]/10 text-[#93B733] hover:bg-[#93B733] hover:text-white transition-colors"
                    >
                      {audioContext.isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                    <button
                      onClick={audioContext.nextTrack}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Next Track"
                    >
                      <SkipForward size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(prev => !prev)}
                  className="flex items-center gap-2.5 rounded-2xl border-2 border-gray-200/80 bg-white/90 px-3 py-1.5 shadow-sm hover:border-[#93B733]/40 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                  aria-label="User Profile Menu"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D3A1D] text-white font-black text-sm uppercase shadow-sm">
                    {user.name ? user.name.charAt(0) : (user.email ? user.email.charAt(0) : "U")}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-xs font-black text-[#0D3A1D] truncate max-w-[100px]">
                      {user.name || "My Account"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase text-[#4E700F]">
                      {user.role || "User"}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-xl p-2 shadow-xl z-50 animate-[fadeIn_0.15s_ease-out_forwards]">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-black text-[#0D3A1D] truncate">{user.name || "User Account"}</p>
                      <p className="text-[10px] font-semibold text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        navigate(getDashboardPath());
                      }}
                      className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-extrabold text-[#0D3A1D] hover:bg-[#93B733]/10 hover:text-[#4E700F] transition-all"
                    >
                      <LayoutDashboard className="h-4 w-4 text-[#93B733]" />
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-extrabold text-red-600 hover:bg-red-50 transition-all mt-1"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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

      <div className={`lg:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${hideMobileDock ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="pointer-events-auto">
          <MacOSDock
            apps={DOCK_APPS}
            onAppClick={handleAppClick}
            openApps={[location.pathname]}
          />
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);