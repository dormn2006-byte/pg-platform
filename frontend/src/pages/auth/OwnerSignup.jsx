import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const OwnerSignup = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {                        
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "owner",
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);

        navigate("/owner/dashboard");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b17] text-white">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-100px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute right-[-100px] top-[180px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-150px] left-[25%] h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"></div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-[#070b17]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-xl font-black shadow-lg shadow-cyan-500/20">
              P
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight md:text-2xl">
                PGVerse
              </h1>
              <p className="text-xs text-gray-400">
                Owner Registration Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/auth")}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10"
          >
            Back
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-3 py-4 md:px-8 md:py-10">
        <div className="grid w-full max-w-7xl items-center gap-6 lg:gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="hidden lg:block">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 backdrop-blur-2xl">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <p className="text-sm font-semibold text-cyan-200">
                Join PGVerse Owner Network
              </p>
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Register Your
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                {" "}PG Business
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
              Create your owner account and start managing PG listings, room availability and student bookings from one dashboard.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white">
                Owner Account Benefits
              </h3>

              <ul className="mt-5 space-y-4 text-gray-300">
                <li>✓ Manage PG Listings</li>
                <li>✓ Track Student Bookings</li>
                <li>✓ Update Room Availability</li>
                <li>✓ Grow Your Property Visibility</li>
              </ul>
            </div>
          </div>

          {/* Signup Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:rounded-[3rem] md:border md:border-white/10 md:p-10">
            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-6 text-center">
                <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Owner Signup
                </div>
              </div>

              <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">
                Create Owner Account
              </h2>

              <p className="mt-3 text-center text-gray-400">
                Create your PGVerse owner account.
              </p>

              {/* Form */}
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Owner Name
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 backdrop-blur-xl transition focus:border-cyan-500/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 backdrop-blur-xl transition focus:border-cyan-500/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 backdrop-blur-xl transition focus:border-cyan-500/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 backdrop-blur-xl transition focus:border-cyan-500/40"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-6 py-4 font-bold shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Register Owner Account"}
                </button>
              </form>

              {/* Bottom */}
              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login/owner")}
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Login Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OwnerSignup;