import Container from "../../layouts/Container";

const reasons = [
  {
    title: "Verified Listings",
    desc: "Every property listed on Dormn goes through a moderation process. Our SuperAdmin team reviews pending listings to ensure quality, accuracy, and compliance before going live.",
    icon: "🛡️",
  },
  {
    title: "Premium Experience",
    desc: "We built Dormn with vibrant colors, clean whitespace, and modern typography. Bento Box-style image galleries make browsing PGs a genuinely enjoyable experience.",
    icon: "🎨",
  },
  {
    title: "Transparent Information",
    desc: "No hidden charges or misleading descriptions. Every listing displays clear pricing, detailed amenities, house rules, and nearby college proximity.",
    icon: "💎",
  },
  {
    title: "Role-Based Dashboards",
    desc: "Whether you're a Student searching for a home or an Owner managing properties, Dormn provides a dedicated, intuitive dashboard tailored to your needs.",
    icon: "⚡",
  },
  {
    title: "Secure & Private",
    desc: "Data is protected with industry-standard measures including bcrypt password hashing, JWT authentication, and strict DPDP Act 2023 compliance.",
    icon: "🔒",
  },
  {
    title: "Instant Communication",
    desc: "Stop waiting for callbacks. Integrated Call and WhatsApp buttons let you connect with property owners instantly, right from the listing page.",
    icon: "📞",
  },
];

const WhyChooseDormn = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-y border-gray-100">
      <Container max-w-6xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Why Students & Owners Trust Us
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            Why Choose Dormn?
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium max-w-xl mx-auto">
            Built from the ground up to revolutionize student and professional accommodation.
          </p>
        </div>

        {/* 2-Column Point-Wise Layout (3 on Left, 3 on Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reasons.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-4 sm:gap-5 rounded-3xl border-2 border-gray-100 bg-[#FAF9F5]/70 p-5 sm:p-7 transition-all duration-300 hover:border-[#E56A54]/30 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 border-2 border-orange-100 text-2xl">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#E56A54]">Feature 0{index + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#3A2935] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-600">
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

export default WhyChooseDormn;
