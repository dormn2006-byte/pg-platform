import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const UserSignup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    full_name: "",
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

      const response = await api.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: "student",
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);

        navigate("/");
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B14] px-4 py-4 md:px-5 md:py-8 text-white">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute top-[40%] left-[45%] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid lg:grid-cols-2 lg:rounded-[2.5rem] lg:border lg:border-white/10">        
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-center overflow-hidden border-r border-white/10 p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <p className="text-sm font-semibold text-cyan-200">
                Join Dormn Community
              </p>
            </div>

            <h1 className="mt-8 text-5xl font-black tracking-tight">
              Create Your Account
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-gray-300">
              Join Dormn and start exploring verified student accommodations near your college.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white">
                Getting started takes less than a minute
              </h3>

              <ul className="mt-5 space-y-4 text-gray-300">
                <li>✓ Create your free student account</li>
                <li>✓ Discover verified PG listings</li>
                <li>✓ Compare rooms and amenities</li>
                <li>✓ Connect directly with PG owners</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center justify-center p-3 md:p-10">
          <div className="w-full max-w-md">
            <div className="rounded-[2rem] bg-black/20 p-5 shadow-2xl backdrop-blur-2xl sm:p-7 md:rounded-[2.5rem] md:border md:border-white/10 md:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto hidden h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-3xl font-black shadow-xl shadow-pink-500/30 lg:flex">
                  P
                </div>

                <h2 className="text-3xl font-black tracking-tight md:mt-6 md:text-4xl">
                  User Signup
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Create your Dormn account.
                </p>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-pink-400"
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
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-cyan-400"
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
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-400"
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
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-bold shadow-xl shadow-pink-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login/user"
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Login Here
                </Link>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  PG OWNER PORTAL
                </p>

                <Link
                  to="/signup/owner"
                  className="mt-4 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Signup as PG Owner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
  );
};

export default UserSignup;
