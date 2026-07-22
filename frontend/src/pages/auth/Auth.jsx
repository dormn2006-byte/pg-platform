import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

// Highly reliable, aesthetic architectural and interior images
const bgImages = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1de2424855?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55dd1b36f73?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=600&q=80",
];

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Unified State for Modes
  const [authMode, setAuthMode] = useState("login");
  const [userRole, setUserRole] = useState("student");
  
  // Dual Auth Login States
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Unified Form Data
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

  // Request OTP Handler
  const handleRequestOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email address first to receive an OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.post("/auth/request-otp", { email: formData.email });
      
      if (response.data.success) {
        setOtpSent(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Unified Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (authMode === "login") {
        // Intercept standard submit if they need to request an OTP first
        if (loginMethod === "otp" && !otpSent) {
          await handleRequestOtp();
          return;
        }

        // Construct dynamic payload based on selected method
        const payload = {
          email: formData.email,
          ...(loginMethod === "password" ? { password: formData.password } : { otp })
        };

        const response = await api.post("/auth/login", payload);

        if (response.data.success) {
          const user = response.data.user;

          // Role verification logic
          if (userRole === "owner" && user.role !== "owner" && user.role !== "superadmin") {
            setError("Access denied. You do not have owner privileges.");
            setLoading(false);
            return;
          }

          login(user, response.data.token);

          if (user.role === "superadmin") {
            navigate("/superadmin/dashboard");
          } else if (user.role === "owner") {
            navigate("/owner/dashboard");
          } else {
            navigate("/");
          }
        }
      } else {
        // Registration Logic (100% untouched)
        const payload = {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: userRole,
        };

        if (userRole === "owner") {
          payload.phone = formData.phone;
        }

        const response = await api.post("/auth/register", payload);

        if (response.data.success) {
          login(response.data.user, response.data.token);

          if (userRole === "owner") {
            navigate("/owner/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          `${authMode === "login" ? "Login" : "Signup"} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-[#E56A54] selection:text-white bg-[#FAF9F5] overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. Mobile Vibrant Gradient Orbs */}
      <div className="absolute inset-0 z-0 block md:hidden overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#E56A54] blur-[80px]"></div>
        <div className="absolute top-[40%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-[#3A2935] blur-[100px]"></div>
        <div className="absolute -bottom-[10%] -left-[20%] w-[90vw] h-[90vw] rounded-full bg-[#E56A54] blur-[90px]"></div>
      </div>

      {/* 2. Desktop Image Grid & Darker Overlay */}
      <div className="absolute inset-0 z-0 hidden md:block overflow-hidden pointer-events-none bg-[#2A1B25]">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 p-3 opacity-[0.35]">
          {bgImages.map((src, idx) => (
            <div key={idx} className="aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-2xl">
              <img src={src} alt="bg-grid" className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Giant ZigZag "DORMN" Motif */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden opacity-30 md:opacity-20 mix-blend-overlay md:mix-blend-color-dodge">
        <span className="text-[22vw] md:text-[14vw] font-black text-[#E56A54] -rotate-6 -ml-[20vw] tracking-tighter leading-[0.75] select-none">DORMN</span>
        <span className="text-[25vw] md:text-[16vw] font-black text-[#3A2935] md:text-[#FAF9F5] rotate-3 ml-[15vw] tracking-tighter leading-[0.75] select-none">DORMN</span>
        <span className="text-[22vw] md:text-[14vw] font-black text-[#E56A54] -rotate-2 -ml-[10vw] tracking-tighter leading-[0.75] select-none">DORMN</span>
      </div>

      {/* Top Navbar */}
      <nav className="relative z-20 md:bg-transparent px-5 py-4 md:px-8 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/20 md:border-none">
        <div onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E56A54] text-lg font-black text-white shadow-lg shadow-[#E56A54]/30 transition-transform group-hover:scale-105">
            D
          </div>
          <h1 className="text-xl font-black tracking-tight text-[#3A2935] md:text-white transition-colors">Dormn</h1>
        </div>
        
        <button
          onClick={() => navigate("/")}
          className="text-sm font-bold text-[#3A2935] md:text-white/80 hover:text-[#E56A54] md:hover:text-white transition-colors"
        >
          Back Home
        </button>
      </nav>

      {/* Main Modal Container */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-4 md:p-6">
        
        {/* Centralized Premium Card */}
        <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="text-center px-6 pt-8 pb-5 border-b border-gray-100/80">
            <h2 className="text-xl font-black text-[#3A2935]">
              {authMode === "login" ? "Welcome Back" : "Create an Account"}
            </h2>
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col">
            
            {/* Segmented Control for Role */}
            <div className="flex rounded-xl bg-gray-100/80 p-1.5 mb-8 border border-gray-200/50">
              <button
                type="button"
                onClick={() => setUserRole("student")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-300 flex justify-center items-center gap-2 ${
                  userRole === "student" 
                    ? "bg-white text-[#3A2935] shadow-sm border border-gray-200" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserRole("owner")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-300 flex justify-center items-center gap-2 ${
                  userRole === "owner" 
                    ? "bg-white text-[#3A2935] shadow-sm border border-gray-200" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Property Owner
              </button>
            </div>

            {/* Dynamic Form */}
            <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
              
              {/* Full Name - Signup Only */}
              {authMode === "signup" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 pl-11 pr-5 py-4 text-sm font-semibold text-[#3A2935] outline-none placeholder:text-gray-400 transition focus:border-[#E56A54] focus:bg-white"
                    required
                  />
                </div>
              )}

              {/* Email - Always */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 pl-11 pr-5 py-4 text-sm font-semibold text-[#3A2935] outline-none placeholder:text-gray-400 transition focus:border-[#E56A54] focus:bg-white"
                  required
                />
              </div>

              {/* Dual Auth Switcher (Login Only) */}
              {authMode === "login" && (
                <div className="flex rounded-xl bg-gray-100/80 p-1 mb-2 border border-gray-200/50">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod("password"); setOtpSent(false); setError(""); }}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all duration-300 ${
                      loginMethod === "password" 
                        ? "bg-white text-[#3A2935] shadow-sm border border-gray-200" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod("otp"); setError(""); }}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all duration-300 ${
                      loginMethod === "otp" 
                        ? "bg-white text-[#3A2935] shadow-sm border border-gray-200" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Email OTP
                  </button>
                </div>
              )}

              {/* Phone - Owner Signup Only */}
              {authMode === "signup" && userRole === "owner" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 pl-11 pr-5 py-4 text-sm font-semibold text-[#3A2935] outline-none placeholder:text-gray-400 transition focus:border-[#E56A54] focus:bg-white"
                    required
                  />
                </div>
              )}

              {/* Password Input (Signup OR Login via Password) */}
              {(authMode === "signup" || (authMode === "login" && loginMethod === "password")) && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 pl-11 pr-5 py-4 text-sm font-semibold text-[#3A2935] outline-none placeholder:text-gray-400 transition focus:border-[#E56A54] focus:bg-white"
                    required={authMode === "signup" || loginMethod === "password"}
                  />
                </div>
              )}

              {/* OTP Input (Login via OTP - only visible after sending) */}
              {authMode === "login" && loginMethod === "otp" && otpSent && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 pl-11 pr-5 py-4 text-sm font-semibold text-[#3A2935] outline-none placeholder:text-gray-400 transition focus:border-[#E56A54] focus:bg-white tracking-widest"
                    required
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 flex items-start gap-2">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                  {error}
                </div>
              )}

              {/* Legal Note for Signup */}
              {authMode === "signup" && (
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed px-1">
                  We'll call or text you to confirm your number. Standard message and data rates apply. <Link to="/privacy" target="_blank" className="font-bold text-[#3A2935] underline cursor-pointer hover:text-[#E56A54] transition-colors">Privacy Policy</Link>
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-[#E56A54] px-6 py-4 text-sm font-black text-white shadow-[0_8px_20px_rgba(229,106,84,0.3)] transition-all hover:scale-[1.02] hover:bg-[#d65a45] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading 
                  ? "Processing..." 
                  : authMode === "login" 
                    ? (loginMethod === "otp" && !otpSent ? "Send OTP via Email" : "Log in securely") 
                    : "Agree and continue"
                }
              </button>

              {/* Forgot Password (Login Only via Password) */}
              {authMode === "login" && loginMethod === "password" && (
                <div className="mt-5 text-center">
                  <button type="button" className="text-xs font-bold text-[#3A2935] hover:text-[#E56A54] transition hover:underline">
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">or</span>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 mb-3">
                {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  setError(""); // Clear errors when switching modes
                  setOtpSent(false); // Reset OTP state
                  setOtp("");
                }}
                className="w-full rounded-2xl border-2 border-[#3A2935] bg-transparent px-6 py-4 text-sm font-black text-[#3A2935] transition hover:bg-gray-50 active:scale-[0.98]"
              >
                {authMode === "login" ? "Sign up for Dormn" : "Log in instead"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;