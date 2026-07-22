import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";

const TermsConditions = () => {
  return (
    <PublicLayout>
      <div className="bg-[#FAF9F5] font-sans selection:bg-[#E56A54] selection:text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-4xl mx-auto">
          
          {/* Header Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-5 py-2 mb-6 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E56A54] animate-pulse"></span>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#3A2935]">
                Platform Governance & Rules
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#3A2935] sm:text-5xl md:text-6xl mb-4">
              Terms & <span className="text-[#E56A54]">Conditions</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These Terms and Conditions ("Terms") govern your use of the Dormn platform. By accessing or using Dormn, all users agree to be bound by these Terms and our compliance framework.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            
            {/* Section 2.1: User Roles and Responsibilities */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.1
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  User Roles and Responsibilities
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                Dormn connects Students and PG Owners. Users must accurately represent their identity and role during registration.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🎓</span>
                    <h3 className="font-bold text-[#3A2935] text-base">Students</h3>
                  </div>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Students may browse approved listings and submit booking requests. Students are responsible for verifying property conditions and details before finalizing any rental agreement.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏢</span>
                    <h3 className="font-bold text-[#3A2935] text-base">PG Owners</h3>
                  </div>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Owners must provide accurate, up-to-date information regarding their properties, including prices, amenities, and rules. Owners are solely responsible for managing bookings, communicating with students, and ensuring their properties meet all local municipal and safety regulations.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2.2: Platform Role and Liability */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.2
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Platform Role and Liability
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                Dormn operates as an intermediary platform under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">No Direct Liability for Listings</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    Dormn provides a space for Owners to list properties. We do not own, control, or endorse any listed PG or hostel. We are not liable for the accuracy of listings, the quality of accommodations, or any disputes arising from rental agreements.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">Verification Efforts</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    While Dormn employs a Super Admin moderation team to review pending listings, this review is primarily for platform compliance and does not constitute a guarantee of safety, legality, or habitability of the property.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">Indemnification</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    Users agree to indemnify and hold harmless Dormn from any claims, damages, or liabilities arising from their use of the platform or interactions with other users.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2.3 & 2.4: Prohibited Activities & Termination */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.3
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Prohibited Activities & Account Termination
                </h2>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-bold text-[#3A2935] mb-3 uppercase tracking-wider text-xs">
                  Prohibited Conduct:
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-3.5 text-xs font-semibold text-red-800">
                    <span>⚠️</span> Posting false, misleading, or fraudulent property listings.
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-3.5 text-xs font-semibold text-red-800">
                    <span>⚠️</span> Engaging in harassment, discrimination, or hate speech.
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-3.5 text-xs font-semibold text-red-800">
                    <span>⚠️</span> Bypassing platform security or auth mechanisms.
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-3.5 text-xs font-semibold text-red-800">
                    <span>⚠️</span> Uploading malicious files or exceeding size limits.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                <p className="font-bold text-[#3A2935] text-sm">Termination Rights</p>
                <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                  Dormn reserves the right to suspend or terminate user accounts at its sole discretion if a user violates these Terms, engages in fraudulent activities, or fails to comply with our moderation guidelines.
                </p>
              </div>
            </section>

            {/* Section 3: Legal Compliance & Grievance Redressal */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Grievance Redressal & Intermediary Obligations
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm flex items-center gap-2">
                    <span className="text-lg">📢</span> Grievance Redressal Mechanism
                  </p>
                  <p className="text-xs font-medium text-gray-700 mt-2 leading-relaxed">
                    As required by Indian IT Rules, Dormn maintains an official Grievance Redressal process. Any grievances submitted will be acknowledged within <strong>24 hours</strong> and resolved within <strong>15 days</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">Intermediary Obligations</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    Dormn maintains records of user-generated content and listings as mandated by legal authorities. Access to unlawful content will be disabled within 24 hours of receiving actual knowledge.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </Container>
      </div>
    </PublicLayout>
  );
};

export default TermsConditions;
