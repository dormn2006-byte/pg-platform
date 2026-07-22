import Container from "../../layouts/Container";

const safetyFeatures = [
  {
    feature: "SuperAdmin Moderation",
    desc: "All new listings are reviewed by our admin team before going live on the platform.",
    icon: "🛡️",
  },
  {
    feature: "Image Validation",
    desc: "Uploaded images are processed and validated via Sharp & Multer to prevent malicious uploads.",
    icon: "🖼️",
  },
  {
    feature: "Secure Authentication",
    desc: "Passwords hashed with bcrypt (10 rounds). Sessions managed via stateless 7-day JWT tokens.",
    icon: "🔑",
  },
  {
    feature: "OTP Login",
    desc: "Optional 6-digit OTP authentication for users who prefer passwordless login security.",
    icon: "📱",
  },
  {
    feature: "Grievance Redressal",
    desc: "Dedicated Nodal Officer addressing complaints within 15 days as per IT Rules 2021.",
    icon: "⚖️",
  },
  {
    feature: "Data Protection",
    desc: "Full statutory compliance with the Digital Personal Data Protection Act, 2023.",
    icon: "🔒",
  },
];

const TrustAndSafety = () => {
  return (
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-100">
      <Container max-w-6xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Ecosystem Integrity
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            Platform Trust & Safety
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium max-w-xl mx-auto">
            Dormn takes platform integrity seriously. Here is how we keep the ecosystem safe for everyone:
          </p>
        </div>

        {/* 2-Column Point-Wise Layout (3 on Left, 3 on Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {safetyFeatures.map((item, index) => (
            <div
              key={item.feature}
              className="flex items-start gap-4 sm:gap-5 rounded-3xl border-2 border-gray-100 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-[#E56A54]/30 hover:shadow-md"
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl border border-orange-100">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-black text-[#E56A54]">Rule 0{index + 1}</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#3A2935]">
                  {item.feature}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustAndSafety;
