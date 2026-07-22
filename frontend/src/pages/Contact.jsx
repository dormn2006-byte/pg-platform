import { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";
import HeroVisual from "../components/Home/HeroVisual";
import API from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setStatus({
        loading: false,
        success: null,
        error: "Please fill out all fields before sending.",
      });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await API.post("/api/contact", formData);

      if (response.data?.success) {
        setStatus({
          loading: false,
          success: response.data.message || "Message sent successfully! We'll be in touch soon.",
          error: null,
        });
        setFormData({ name: "", email: "", description: "" });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: response.data?.message || "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus({
        loading: false,
        success: null,
        error:
          err.response?.data?.message ||
          "Network or server error while sending your message. Please verify your connection or try again later.",
      });
    }
  };

  return (
    <PublicLayout>
      <div className="bg-[#FAF9F5] font-sans selection:bg-[#E56A54] selection:text-white min-h-screen py-12 md:py-16">
        <Container>
          {/* Header Banner */}
          <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h1 className="text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
              We&apos;re Here to Help You Find & Manage <span className="text-[#E56A54]">Your Ideal Stay</span>
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
              Have questions about booking a PG, listing a property, or platform policies? Fill out the form below and our dedicated support team will reach out directly.
            </p>
          </div>

          {/* First Section: 2-Column Grid */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Home Page Image Card (HeroVisual Layout) */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroVisual
                featuredPG={{
                  city: "Prime Campus Location",
                  area: "Verified Student Housing",
                  available_rooms: 12,
                }}
              />
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-[#3A2935] sm:text-3xl">
                    Get in Touch with Us
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gray-500">
                    Send your inquiry directly to our support team email.
                  </p>
                </div>

                {/* Toast Alerts */}
                {status.success && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
                    <svg className="h-5 w-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold">Message Sent!</p>
                      <p className="text-xs font-medium mt-0.5 text-green-700">{status.success}</p>
                    </div>
                  </div>
                )}

                {status.error && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
                    <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold">Unable to Send</p>
                      <p className="text-xs font-medium mt-0.5 text-red-700">{status.error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-[#3A2935] mb-2">
                      Full Name <span className="text-[#E56A54]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full rounded-2xl border-2 border-gray-100 bg-[#FAF9F5]/50 py-3.5 pl-12 pr-4 text-sm font-bold text-[#3A2935] placeholder-gray-400 outline-none transition-all focus:border-[#E56A54] focus:bg-white focus:ring-4 focus:ring-[#E56A54]/10"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-[#3A2935] mb-2">
                      Email Address <span className="text-[#E56A54]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        required
                        className="w-full rounded-2xl border-2 border-gray-100 bg-[#FAF9F5]/50 py-3.5 pl-12 pr-4 text-sm font-bold text-[#3A2935] placeholder-gray-400 outline-none transition-all focus:border-[#E56A54] focus:bg-white focus:ring-4 focus:ring-[#E56A54]/10"
                      />
                    </div>
                  </div>

                  {/* Description Input */}
                  <div>
                    <label htmlFor="description" className="block text-xs font-extrabold uppercase tracking-wider text-[#3A2935] mb-2">
                      Description / Message <span className="text-[#E56A54]">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        name="description"
                        rows="6"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Please describe how we can assist you (e.g. PG room availability, owner partnership, refund status...)"
                        required
                        className="w-full min-h-[160px] rounded-2xl border-2 border-gray-100 bg-[#FAF9F5]/50 p-4 text-sm font-bold text-[#3A2935] placeholder-gray-400 outline-none transition-all focus:border-[#E56A54] focus:bg-white focus:ring-4 focus:ring-[#E56A54]/10"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#3A2935] bg-[#3A2935] py-4 px-6 text-sm font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_#E56A54] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#E56A54] hover:border-[#E56A54] hover:shadow-[1px_1px_0px_#3A2935] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status.loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Contact Info Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#E56A54]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E56A54]/10 text-[#E56A54] mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#3A2935]">Official Email</h3>
              <p className="mt-1 text-xs font-semibold text-gray-500">Drop us a line anytime for inquiries.</p>
              <a href="mailto:support@dormn.com" className="mt-3 inline-block text-sm font-black text-[#E56A54] hover:underline">
                support@dormn.com
              </a>
            </div>

            <div className="rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#E56A54]/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E56A54]/10 text-[#E56A54] mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#3A2935]">Support Hours</h3>
              <p className="mt-1 text-xs font-semibold text-gray-500">Available all 7 days of the week.</p>
              <p className="mt-3 text-sm font-black text-[#3A2935]">
                Monday – Sunday: 9 AM – 9 PM IST
              </p>
            </div>

            <div className="rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#E56A54]/30 hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E56A54]/10 text-[#E56A54] mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#3A2935]">Fast Response</h3>
              <p className="mt-1 text-xs font-semibold text-gray-500">Guaranteed swift assistance.</p>
              <p className="mt-3 text-sm font-black text-[#3A2935]">
                Within 12-24 Hours Max
              </p>
            </div>

          </div>
        </Container>
      </div>
    </PublicLayout>
  );
};

export default Contact;
