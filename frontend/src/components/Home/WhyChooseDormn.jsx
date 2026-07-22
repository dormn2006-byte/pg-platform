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
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8">
      <Container>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-[#E56A54]/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 text-2xl mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-[#3A2935] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseDormn;
