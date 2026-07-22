import Container from "../../layouts/Container";

const roadmapItems = [
  {
    title: "In-App Payments",
    desc: "Secure payment gateway integration (Razorpay/Stripe) for collecting security deposits and monthly rent directly.",
  },
  {
    title: "Reviews & Ratings",
    desc: "A verified feedback system allowing students to leave reviews and 1-5 star ratings on their past accommodations.",
  },
  {
    title: "AI-Based Recommendations",
    desc: "Smart suggestions based on student preferences, budget limits, and college proximity.",
  },
  {
    title: "Push Notifications",
    desc: "Real-time alerts for owners when a booking request arrives, and for students when approved.",
  },
  {
    title: "Live Room Availability",
    desc: "Real-time tracking of room availability and inventory across all listed PGs.",
  },
  {
    title: "Digital Rent Management",
    desc: "Track and manage monthly rent receipts and payment dues digitally.",
  },
  {
    title: "Smart Student Community",
    desc: "Connect with fellow students in your area for shared interests, study groups, and room sharing.",
  },
];

const RoadmapSection = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-y border-gray-100">
      <Container max-w-5xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Product Roadmap
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            Coming Soon
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium max-w-xl mx-auto">
            We are constantly improving Dormn. Here is what is on our product roadmap:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border-2 border-gray-100 bg-[#FAF9F5]/70 p-5 transition-all hover:border-[#E56A54]/30 hover:bg-white"
            >
              <div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E56A54] text-xs font-black text-white mb-3">
                  ✓
                </div>
                <h3 className="text-base font-extrabold text-[#3A2935]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-gray-600">
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

export default RoadmapSection;
