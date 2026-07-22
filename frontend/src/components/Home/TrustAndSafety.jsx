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
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-y border-gray-100">
      <Container max-w-5xl>
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {safetyFeatures.map((item) => (
            <div
              key={item.feature}
              className="flex items-start gap-4 rounded-2xl border-2 border-gray-100 bg-[#FAF9F5]/80 p-5 transition-all hover:border-[#E56A54]/30 hover:bg-white"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl border border-orange-100">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#3A2935]">
                  {item.feature}
                </h3>
                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-600">
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
