import { Link } from "react-router-dom";
import Container from "../../layouts/Container";

const steps = [
  {
    number: "Step 1",
    title: "Search & Discover",
    description:
      "Use our powerful dynamic search to explore PGs by city, area, gender preference (Boys/Girls/Unisex), room type (AC/Non-AC), and more. Don't know where to start? Discover Mode automatically surfaces trending locations.",
    icon: "🔍",
    linkText: "Start Search",
    linkUrl: "/pgs",
  },
  {
    number: "Step 2",
    title: "Explore & Compare",
    description:
      "Every listing includes high-quality gallery images, detailed descriptions, pricing, amenity tags, house rules, and Google Maps integration for exact locations. Compare options side by side.",
    icon: "🏠",
    linkText: "View Stays",
    linkUrl: "/pgs",
  },
  {
    number: "Step 3",
    title: "Request a Visit",
    description:
      "Submit a visit request directly through the platform. Attach an optional message for the property owner and track your request status (Pending, Accepted, Rejected) in real-time.",
    icon: "📅",
    linkText: "My Bookings",
    linkUrl: "/my-bookings",
  },
  {
    number: "Step 4",
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
      <Container>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col justify-between rounded-[2rem] border-2 border-gray-100 bg-[#FAF9F5]/70 p-6 transition-all duration-300 hover:border-[#E56A54]/30 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-xl">
                    {step.icon}
                  </span>
                  <span className="rounded-full bg-[#3A2935] px-3 py-1 text-[10px] font-extrabold uppercase text-white tracking-wider">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#3A2935] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to={step.linkUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#E56A54] hover:underline"
                >
                  {step.linkText} →
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
