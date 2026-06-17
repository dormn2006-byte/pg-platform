

import { useState } from "react";
import Navbar from "../components/Navbar";

const faqs = [
  {
    question: "How does PGVerse verify PG listings?",
    answer:
      "Every PG goes through an admin approval process before becoming visible on the platform. Owners must upload room details, photos and location information for verification.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/20",
  },
  {
    question: "Can I directly contact PG owners?",
    answer:
      "Yes. Students can directly contact PG owners through call, WhatsApp and visit booking options available on every PG details page.",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
  },
  {
    question: "Are girls and boys PGs separated?",
    answer:
      "Yes. The platform provides separate categories and filters for boys PGs, girls PGs and co-living accommodations.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/20",
  },
  {
    question: "Can PG owners manage bookings?",
    answer:
      "PG owners receive a dedicated dashboard where they can manage listings, bookings, students and room details.",
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
  },
  {
    question: "Will online booking be available later?",
    answer:
      "Yes. Future versions of PGVerse will include secure online booking systems and digital payment management.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
  },
  {
    question: "Can students compare room types?",
    answer:
      "Students can compare AC rooms, non-AC rooms, sharing options, amenities and pricing before contacting owners.",
    color: "from-yellow-500/20 to-yellow-500/5",
    border: "border-yellow-500/20",
  },
  {
    question: "Does PGVerse support sponsored listings?",
    answer:
      "Yes. PG owners can promote premium or sponsored listings for better visibility in explore pages and search results.",
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
  },
  {
    question: "Can I search PGs near colleges?",
    answer:
      "Absolutely. Students can search PGs near universities, metro stations, coaching hubs and popular student locations.",
    color: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/20",
  },
  {
    question: "Will PGVerse launch a mobile app?",
    answer:
      "Yes. Mobile applications for Android and iOS are part of our future roadmap for easier access and booking.",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/20",
  },
  {
    question: "Can owners upload multiple PG properties?",
    answer:
      "Yes. PG owners can manage multiple PGs from a single dashboard and track occupancy and students separately.",
    color: "from-teal-500/20 to-teal-500/5",
    border: "border-teal-500/20",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b1020] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 lg:px-8">
        <div className="absolute left-[-120px] top-[-100px] h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute right-[-120px] top-[100px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            <p className="text-sm font-semibold text-cyan-200">
              Frequently Asked Questions
            </p>
          </div>

          <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Everything You Need To Know About
            <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              PGVerse
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            Find answers related to PG listings, student accommodation, booking systems, owner dashboards and platform features.
          </p>
        </div>
      </section>

      {/* FAQ Cards */}
      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-[2.5rem] border ${faq.border} bg-gradient-to-br ${faq.color} backdrop-blur-2xl transition-all duration-500 hover:scale-[1.01]`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-8 py-7 text-left"
                >
                  <div>
                    <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                      {faq.question}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl font-light transition duration-500 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-8 pb-8 pt-6">
                      <p className="max-w-4xl text-lg leading-8 text-gray-200 md:text-xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FAQ;