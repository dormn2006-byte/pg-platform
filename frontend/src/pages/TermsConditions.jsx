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
                Platform Governance & Legal Agreement
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#3A2935] sm:text-5xl md:text-6xl mb-4">
              Terms & <span className="text-[#E56A54]">Conditions</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Effective Date: July 22, 2026 • Governed under the Information Technology Act, 2000 & Information Technology (Intermediary Guidelines) Rules, 2021.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-8">

            {/* Preamble */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-[#3A2935] mb-4">
                Preamble & Binding Agreement
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                These Terms and Conditions ("Terms" or "Agreement") constitute a legally binding contract between Dormn Technologies ("Dormn", "Platform", "we", "us", or "our") and any individual or entity ("User", "you", "Student", or "Property Owner") accessing, browsing, registering, or interacting with the website, web application, APIs, or related services.
              </p>
              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-4 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                <strong>Express Assent:</strong> By creating an account, browsing listings, submitting visit booking requests, or listing student accommodation properties, you represent that you possess full legal capacity under the Indian Contract Act, 1872 and agree to be bound unconditionally by these Terms. If you do not agree, you must immediately cease accessing the Platform.
              </div>
            </section>
            
            {/* Section 1: User Roles and Responsibilities */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  User Classification & Operational Responsibilities
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn functions as an interactive digital marketplace facilitating discovery between Students/Seekers and PG Accommodation Owners. All users must accurately select their account persona during registration:
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🎓</span>
                      <h3 className="font-black text-[#3A2935] text-lg">1.1 Student & Seeker Obligations</h3>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside leading-relaxed">
                      <li><strong>Identity Authenticity:</strong> You must provide truthful identity and contact details during account registration.</li>
                      <li><strong>Inspection Duty:</strong> You acknowledge that visit requests submitted via the Platform do not constitute an executed tenancy agreement. You are solely responsible for physically inspecting properties, verifying amenities, and checking rental terms prior to monetary transactions.</li>
                      <li><strong>Conduct:</strong> You agree to abide by property rules set forth by owners when conducting physical visits or residing on premises.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🏢</span>
                      <h3 className="font-black text-[#3A2935] text-lg">1.2 Property Owner Obligations</h3>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside leading-relaxed">
                      <li><strong>Listing Accuracy:</strong> Property Owners warrant that all listed details (pricing, PG type, room availability, rules, amenities, and up to 10 photos) are current, truthful, and non-misleading.</li>
                      <li><strong>Statutory Compliance:</strong> Owners warrant that their PG or hostel properties comply with all local municipal, police registration, fire safety, and sanitation laws.</li>
                      <li><strong>Booking Governance:</strong> Owners are responsible for responding to student visit requests, maintaining room availability status, and executing rental contracts offline.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Intermediary Status & Liability Limitation */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Intermediary Status & Absolute Liability Exclusions
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn operates as an <strong>Intermediary</strong> under Section 2(1)(w) of the Information Technology Act, 2000 and claims Safe Harbor protections under Section 79 of the Information Technology Act, 2000.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">2.1 No Ownership or Direct Agency</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Dormn provides an online venue for Owners to advertise listings. Dormn does not own, lease, operate, manage, control, or endorse any listed PG or hostel. Dormn is not a party to any rental agreement, lease contract, or monetary deposit transaction established between students and owners.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">2.2 SuperAdmin Moderation Scope</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    While Dormn utilizes a SuperAdmin moderation workflow to review pending PG submissions prior to publication, such moderation is executed purely for platform compliance, format standardization, and basic data integrity. Admin approval does <strong>NOT</strong> constitute a legal certification, safety guarantee, structural audit, or endorsement of habitability.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">2.3 Limitation of Damages & Disclaimer</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    To the maximum extent permitted by applicable Indian law, Dormn, its directors, officers, and employees shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages, including property damage, personal injury, tenancy disputes, loss of security deposits, or misrepresentation arising out of or in connection with property visits or stays.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Prohibited Activities */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Prohibited Platform Activities
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Users are strictly prohibited from engaging in any conduct that compromises platform integrity, user safety, or legal compliance. Prohibited activities include:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Fraudulent Listings</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Publishing fake properties, misleading pricing, or unauthorized room photos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Security Exploitation</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Attempting to reverse-engineer JWT authentication, bypass roles, or forge credentials.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Malicious Uploads</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Uploading files containing executable scripts, malware, or exceeding 5MB Multer limits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Harassment & Discrimination</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Engaging in abusive messaging, hate speech, or unlawful discrimination during interactions.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Account Moderation & Termination */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  4.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Account Moderation & Right to Terminate
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                Dormn reserves the absolute right, exercisable at its sole discretion through SuperAdmin moderation mechanisms, to:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                <li>Reject, block, or permanently delete property listings that fail moderation criteria or receive user grievances.</li>
                <li>Suspend or terminate user accounts engaged in fraudulent activity, illegal acts, or breach of these Terms without prior notice.</li>
                <li>Report unlawful activity to law enforcement agencies in compliance with statutory intermediary obligations.</li>
              </ul>
            </section>

            {/* Section 5: Intellectual Property & Media License */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  5.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Intellectual Property & Media License
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                All platform branding, software code, UI design systems, graphics, and trademarks are the exclusive property of Dormn Technologies. By uploading property imagery to the Platform, Property Owners grant Dormn a worldwide, non-exclusive, royalty-free, perpetual license to host, display, downscale (to 1600px max width), convert to WebP format, and distribute such media solely for platform functionality and marketing purposes.
              </p>
            </section>

            {/* Section 6: Governance, Jurisdiction & Dispute Resolution */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  6.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Governing Law & Exclusive Jurisdiction
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                These Terms shall be governed by, construed, and enforced strictly in accordance with the laws of the Republic of India. Any disputes, claims, or legal proceedings arising out of or touching upon these Terms or platform usage shall be subject to the exclusive jurisdiction of competent courts in India.
              </p>
            </section>

            {/* Section 7: Grievance Officer & Intermediary Protocol */}
            <section className="rounded-[2rem] border-2 border-orange-100 bg-orange-50/40 p-6 sm:p-10 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E56A54] text-lg font-black text-white">
                  7.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Statutory Intermediary Notice & Contact
                </h2>
              </div>

              <p className="text-gray-700 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                If you become aware of any unlawful content, copyright infringement, or listing policy violation on Dormn, please submit a formal notice to our designated Nodal Grievance Officer:
              </p>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Legal Nodal Department</span>
                  <span className="text-sm font-black text-[#3A2935]">Grievance & Legal Compliance Cell</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Official Notice Email</span>
                  <a href="mailto:legal@dormn.com" className="text-sm font-bold text-[#E56A54] hover:underline">legal@dormn.com</a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Notice Response SLA</span>
                  <span className="text-sm font-bold text-[#3A2935]">Within 24 Hours</span>
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
