import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const UserLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
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

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);

        navigate("/");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B14] px-3 py-3 md:px-5 md:py-6 text-white">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden bg-transparent lg:rounded-[2rem] lg:border lg:border-white/10 lg:bg-white/5 lg:shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-center overflow-hidden border-r border-white/10 p-12">
          <div>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Welcome to
              <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Dormn
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-300">
              Search verified PGs, compare options, book visits and connect directly with owners through one streamlined platform.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="font-bold text-white">🔍 Smart PG Discovery</h3>
              <p className="mt-2 text-sm text-gray-400">
                Search PGs by city, area, budget and room type.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="font-bold text-white">📅 Instant Visit Booking</h3>
              <p className="mt-2 text-sm text-gray-400">
                Connect with owners and schedule visits easily.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="font-bold text-white">✅ Verified Listings</h3>
              <p className="mt-2 text-sm text-gray-400">
                Browse trusted PGs with complete details and amenities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center justify-center p-2 sm:p-5 md:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-5 backdrop-blur-xl sm:p-7 md:p-10 lg:border lg:border-white/10 lg:shadow-2xl">
              <div className="mb-5 text-center">
                <div className="mx-auto hidden h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-3xl font-black shadow-xl shadow-pink-500/30 lg:flex">
                  P
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:mt-6">
                  User Login
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Access your Dormn account.
                </p>
              </div>

              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
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
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-pink-400"
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
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-cyan-400"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-end text-sm">
                  <button
                    type="button"
                    className="font-semibold text-pink-300 transition hover:text-pink-200"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-bold shadow-xl shadow-pink-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Logging In..." : "Login to Dormn"}
                </button>
              </form>

              <div className="mt-5 text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup/user"
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-4 pt-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
                  PG Owner Portal
                </p>
                <Link
                  to="/login/owner"
                  className="mt-3 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Login as PG Owner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;