import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  Building2,
  BookOpenCheck,
  Users,
  LogOut,
  X,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  {
    title: "Dashboard",
    path: "/owner/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add PG",
    path: "/owner/add-pg",
    icon: PlusSquare,
  },
  {
    title: "My PGs",
    path: "/owner/my-pgs",
    icon: Building2,
  },
  {
    title: "Bookings",
    path: "/owner/bookings",
    icon: BookOpenCheck,
  },
  {
    title: "Students",
    path: "/owner/students",
    icon: Users,
  },
];

const AdminSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const user =
    authContext?.user ||
    JSON.parse(localStorage.getItem("user") || "{}");

  const ownerName =
    user?.full_name ||
    user?.name ||
    user?.username ||
    "PG Owner";

  const ownerRole =
    user?.role ||
    "owner";

  const ownerInitial =
    ownerName?.charAt(0)?.toUpperCase() || "P";

  const isVerified =
    user?.is_verified ?? true;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login-selection");
  };

  return (
    <aside className="relative flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0b1020]/95 backdrop-blur-2xl">
      {/* Top Branding */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-xl font-black shadow-lg shadow-pink-500/20">
            P
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight">
              Dormn
            </h2>

            <p className="text-xs text-gray-400">
              PG Owner Panel
            </p>
          </div>
        </div>

        <button
          onClick={closeSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 xl:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* Owner Card */}
      <div className="mx-5 mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-lg font-black">
            {ownerInitial}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold">
              {ownerName}
            </h3>

            <p className="text-sm capitalize text-gray-400">
              {ownerRole}
            </p>
          </div>
        </div>

        <div
          className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
            isVerified
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
          }`}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isVerified
                ? "bg-emerald-400"
                : "bg-yellow-400"
            }`}
          />

          {isVerified
            ? "Verified Account"
            : "Pending Verification"}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-1 flex-col gap-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 text-white shadow-lg shadow-cyan-500/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon size={20} />
              </div>

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;