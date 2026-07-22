import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

const categories = [
  "All",
  "General Platform",
  "For Students & Tenants",
  "For Property Owners",
  "Privacy & Security",
];

const faqs = [
  // 1. General Platform Inquiries
  {
    category: "General Platform",
    question: "What is Dormn?",
    answer: (
      <span>
        Dormn is a next-generation housing and Paying Guest (PG) accommodation management platform. It connects students and professionals looking for safe, verified housing with property owners who manage PG accommodations. The platform provides a streamlined interface for searching, booking, and managing stays.
      </span>
    ),
  },
  {
    category: "General Platform",
    question: "Who can use Dormn?",
    answer: (
      <div>
        <p className="mb-2">The platform is designed for three distinct user groups:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong className="text-[#3A2935]">Students/Tenants:</strong> Individuals seeking PG accommodations.</li>
          <li><strong className="text-[#3A2935]">Property Owners:</strong> Individuals managing PGs who wish to list their properties and manage bookings.</li>
          <li><strong className="text-[#3A2935]">SuperAdmins:</strong> Internal Dormn administrators who oversee platform operations, verify listings, and ensure community safety.</li>
        </ul>
      </div>
    ),
  },
  {
    category: "General Platform",
    question: "Is Dormn a property management company?",
    answer: (
      <span>
        No. Dormn operates strictly as an intermediary platform under the Information Technology (Intermediary Guidelines) Rules, 2021. We do not own, operate, or manage physical properties listed on our site. We simply provide the digital infrastructure to connect seekers with providers.
      </span>
    ),
  },
  {
    category: "General Platform",
    question: "How does Dormn verify PG listings?",
    answer: (
      <span>
        Every PG goes through an admin approval process before becoming visible on the platform. Owners must upload room details, photos, and location information for verification.
      </span>
    ),
  },

  // 2. For Students and Tenants
  {
    category: "For Students & Tenants",
    question: "How do I search for a PG on Dormn?",
    answer: (
      <span>
        You can use our dynamic search feature on the{" "}
        <Link to="/pgs" className="text-[#E56A54] font-bold hover:underline">
          Explore PGs
        </Link>{" "}
        page to filter stays by city, area, gender restrictions (Boys/Girls/Unisex), room type (AC/Non-AC), and sponsored tags. You can also use &quot;Discover Mode&quot; to automatically surface trending locations and premium AC stays.
      </span>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "How do I book a PG?",
    answer: (
      <div>
        <p className="mb-2">On Dormn, the booking process begins with a &quot;Request a Visit&quot;:</p>
        <ol className="list-decimal pl-5 space-y-1.5 text-gray-600">
          <li>Navigate to the specific PG details page on <Link to="/pgs" className="text-[#E56A54] font-bold hover:underline">Explore PGs</Link>.</li>
          <li>Click the <strong className="text-[#3A2935]">&quot;Request a Visit&quot;</strong> button.</li>
          <li>You may attach an optional message for the owner.</li>
          <li>The property owner will receive the request and can either Accept or Reject it. You can track the status of your request in your <Link to="/my-bookings" className="text-[#E56A54] font-bold hover:underline">My Bookings</Link> dashboard.</li>
        </ol>
      </div>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "How do I contact a property owner?",
    answer: (
      <div>
        <p className="mb-2">We provide instant action buttons on every PG details page. You can either:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
          <li><strong className="text-[#3A2935]">Call:</strong> Initiate a direct phone call via your device&apos;s native dialer.</li>
          <li><strong className="text-[#3A2935]">WhatsApp:</strong> Click the button to open WhatsApp with a pre-filled message directed to the property owner&apos;s registered number.</li>
        </ul>
      </div>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "Is my booking guaranteed?",
    answer: (
      <span>
        Dormn facilitates the initial connection, but we do not guarantee the availability or final booking of any property. All final rental agreements, security deposits, and financial transactions are handled directly between the Student and the Property Owner.
      </span>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "Are girls and boys PGs separated?",
    answer: (
      <span>
        Yes. The platform provides separate categories and filters for boys PGs, girls PGs, and co-living accommodations.
      </span>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "Can students compare room types?",
    answer: (
      <span>
        Students can compare AC rooms, non-AC rooms, sharing options, amenities, and pricing before contacting owners.
      </span>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "Can I search PGs near colleges?",
    answer: (
      <span>
        Absolutely. Students can search PGs near universities, metro stations, coaching hubs, and popular student locations using our search bar.
      </span>
    ),
  },
  {
    category: "For Students & Tenants",
    question: "Will online booking be available later?",
    answer: (
      <span>
        Yes. Future versions of Dormn will include secure online booking systems and digital payment management.
      </span>
    ),
  },

  // 3. For Property Owners
  {
    category: "For Property Owners",
    question: "How do I list my PG on Dormn?",
    answer: (
      <span>
        Once you register as a Property Owner, you will gain access to the Owner Dashboard. From there, you can create a new listing by providing comprehensive details, including the title, description, price, available rooms, location specifics, amenities, and house rules.
      </span>
    ),
  },
  {
    category: "For Property Owners",
    question: "Can I upload images of my property?",
    answer: (
      <span>
        Yes. You can upload up to 10 high-resolution images per property listing. Our platform utilizes a secure image processing pipeline (powered by the sharp library) to automatically compress and optimize your images, ensuring fast loading times for prospective tenants.
      </span>
    ),
  },
  {
    category: "For Property Owners",
    question: "How do I manage incoming requests?",
    answer: (
      <span>
        When a student submits a &quot;Request a Visit,&quot; you will be notified through your Owner Dashboard. You can view the details and either Accept or Reject the request. You can also manage your current tenant roster directly from the dashboard.
      </span>
    ),
  },
  {
    category: "For Property Owners",
    question: "Can I update my listing details later?",
    answer: (
      <span>
        Absolutely. You can edit your property details, including pricing and amenities, at any time through your Owner Dashboard to ensure your listing remains accurate and attractive.
      </span>
    ),
  },
  {
    category: "For Property Owners",
    question: "Does Dormn support sponsored listings?",
    answer: (
      <span>
        Yes. PG owners can promote premium or sponsored listings for better visibility in explore pages and search results.
      </span>
    ),
  },

  // 4. Privacy, Security, and Support
  {
    category: "Privacy & Security",
    question: "Is my data secure on Dormn?",
    answer: (
      <span>
        We take security seriously. We utilize JSON Web Tokens (JWT) for stateless authentication and bcrypt to securely hash all user passwords. Furthermore, our image upload system is strictly validated to prevent malicious file executions.
      </span>
    ),
  },
  {
    category: "Privacy & Security",
    question: "How does Dormn protect my privacy?",
    answer: (
      <span>
        Our{" "}
        <Link to="/privacy" className="text-[#E56A54] font-bold hover:underline">
          Privacy Policy
        </Link>{" "}
        is strictly aligned with the Digital Personal Data Protection Act, 2023. We only collect data necessary for platform operations (e.g., search queries, booking requests). We do not sell your personal data to third parties.
      </span>
    ),
  },
  {
    category: "Privacy & Security",
    question: "What if I have a complaint or issue?",
    answer: (
      <span>
        If you have a grievance regarding data handling or platform operations, please contact our designated Grievance Officer via our{" "}
        <Link to="/contact" className="text-[#E56A54] font-bold hover:underline">
          Contact Us
        </Link>{" "}
        page. We are required by the IT Rules, 2021 to acknowledge all complaints within 24 hours and resolve them within 15 days.
      </span>
    ),
  },
  {
    category: "Privacy & Security",
    question: "How do I submit a general inquiry?",
    answer: (
      <span>
        Use our integrated{" "}
        <Link to="/contact" className="text-[#E56A54] font-bold hover:underline">
          Contact Us
        </Link>{" "}
        pipeline. Your inquiry will be securely dispatched via our SMTP system to our support team (<strong className="text-[#3A2935]">support@dormn.com</strong>), and you will receive an automated email receipt acknowledging your submission.
      </span>
    ),
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <PublicLayout>
      <div className="bg-[#FAF9F5] min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#E56A54] selection:text-white">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-5 py-2 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#E56A54] animate-pulse"></span>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#3A2935]">
              FREQUENTLY ASKED QUESTIONS
            </p>
          </div>

          <h1 className="text-3xl font-black text-[#3A2935] sm:text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">
            Everything you need to know about <span className="text-[#E56A54]">Dormn</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Welcome to the Dormn Help Center. Find answers regarding our platform, features, and policies. If you cannot find your answer here, feel free to visit our{" "}
            <Link to="/contact" className="text-[#E56A54] font-bold hover:underline">
              Contact Us
            </Link>{" "}
            page to submit an inquiry.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? "border-[#3A2935] bg-[#3A2935] text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#E56A54] hover:text-[#E56A54]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="rounded-[2rem] border-2 border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 sm:px-8 py-6 text-left"
                >
                  <h2 className="text-base sm:text-lg font-black text-[#3A2935] md:text-xl">
                    {faq.question}
                  </h2>

                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-100 bg-gray-50 transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-[#E56A54]/10 border-[#E56A54]/20 text-[#E56A54]" : "rotate-0 text-[#3A2935]"
                    }`}
                  >
                    <span className="text-xl font-bold">+</span>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-7 text-sm sm:text-base leading-relaxed text-gray-600 font-medium">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
};

export default FAQ;