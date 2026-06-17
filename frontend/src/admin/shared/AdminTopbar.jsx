import { useMemo } from "react";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

const AdminTopbar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const ownerName =
    user?.full_name ||
    user?.name ||
    user?.username ||
    "Owner";

  const ownerInitial = ownerName?.charAt(0)?.toUpperCase() || "O";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b1a]/80 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 xl:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PG Dashboard
            </h1>
            <p className="text-sm text-gray-400">
              Manage your PGs, bookings and students
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl md:flex">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>

          {/* Notification */}
          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
            <Bell size={20} />

            <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-pink-500"></div>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-sm font-black text-white">
              {ownerInitial}
            </div>

            <div className="hidden text-left lg:block">
              <h3 className="text-sm font-bold text-white">
                {ownerName}
              </h3>
              <p className="text-xs text-gray-400">
                PG Owner Account
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-gray-400 lg:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;