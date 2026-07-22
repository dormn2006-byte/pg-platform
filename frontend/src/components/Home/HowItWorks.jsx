import { Link } from "react-router-dom";
import Container from "../../layouts/Container";

const steps = [
  {
    step: "01",
    title: "Search & Discover",
    description:
      "Use our powerful dynamic search to explore PGs by city, area, gender preference (Boys/Girls/Unisex), room type (AC/Non-AC), and more. Discover Mode automatically surfaces trending locations and premium stays.",
    icon: "🔍",
    linkText: "Start Search",
    linkUrl: "/pgs",
  },
  {
    step: "02",
    title: "Explore & Compare",
    description:
      "Every listing includes high-quality gallery images, detailed descriptions, pricing, amenity tags, house rules, and Google Maps integration for exact locations. Compare options side by side effortlessly.",
    icon: "🏠",
    linkText: "View Stays",
    linkUrl: "/pgs",
  },
  {
    step: "03",
    title: "Request a Visit",
    description:
      "Submit a visit request directly through the platform. Attach an optional message for the property owner and track your request status (Pending, Accepted, Rejected) in real-time.",
    icon: "📅",
    linkText: "My Bookings",
    linkUrl: "/my-bookings",
  },
  {
    step: "04",
    title: "Connect Directly",
    description:
      "Need to speak with the owner before booking? Use our instant Call and WhatsApp buttons on every listing with pre-filled messages to reach out directly.",
    icon: "💬",
    linkText: "Contact Us",
    linkUrl: "/contact",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-y border-gray-100">
      <Container max-w-4xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Simple 4-Step Process
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium max-w-xl mx-auto">
            From search to booking, finding your next PG accommodation is smooth and transparent.
          </p>
        </div>

        {/* Point-Wise Vertical List */}
        <div className="space-y-4">
          {steps.map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border-2 border-gray-100 bg-[#FAF9F5]/70 p-6 sm:p-8 transition-all hover:border-[#E56A54]/30 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3A2935] text-white font-black text-sm mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="text-xl font-black text-[#3A2935]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-600 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <Link
                  to={item.linkUrl}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#3A2935] bg-white px-5 py-2.5 text-xs font-black text-[#3A2935] transition-all hover:bg-[#3A2935] hover:text-white"
                >
                  {item.linkText} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
