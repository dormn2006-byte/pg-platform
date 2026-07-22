import { Link } from "react-router-dom";
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
              Effective Date: July 22, 2026 • Governed under the Information Technology Act, 2000 & Intermediary Guidelines Rules, 2021.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-8">

            {/* Section 1: Acceptance of Terms */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Acceptance of Terms
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                Welcome to Dormn (the &quot;Platform&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Dormn website, mobile applications, and related services. By accessing, browsing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our{" "}
                <Link to="/privacy" className="text-[#E56A54] font-bold hover:underline">
                  Privacy Policy
                </Link>. If you do not agree, you must immediately cease using the Platform.
              </p>

              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-4 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                <strong>Modification Reserve:</strong> Dormn reserves the right to modify these Terms at any time. Material changes will be communicated via a prominent notice on the Platform or through email notifications. Continued use of the Platform constitutes your acceptance of updated Terms.
              </div>
            </section>
            
            {/* Section 2: Description of Services */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Description of Services
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn is a digital intermediary platform designed to connect property owners with prospective tenants (students and professionals) seeking Paying Guest (PG) accommodations. The Platform provides:
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🎓 For Students & Tenants</p>
                  <p className="text-xs font-medium text-gray-600">A frictionless interface on <Link to="/pgs" className="text-[#E56A54] font-bold hover:underline">Explore PGs</Link> to search verified PGs using dynamic filters (location, amenities, gender restrictions), view details, and submit visit requests.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🏢 For Property Owners</p>
                  <p className="text-xs font-medium text-gray-600">A comprehensive management dashboard to list properties, upload gallery images (optimized via Sharp), manage incoming requests, and track tenant rosters.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🛡️ For Platform Administrators</p>
                  <p className="text-xs font-medium text-gray-600">SuperAdmin oversight capabilities to monitor users, verify listings, and manage system-wide activities.</p>
                </div>
              </div>
            </section>

            {/* Section 3: User Roles and Responsibilities */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  User Roles & Responsibilities
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 mb-6">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🎓</span>
                      <h3 className="font-black text-[#3A2935] text-base sm:text-lg">3.1 Students & Tenants</h3>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside leading-relaxed">
                      <li>Provide accurate and truthful information during registration and booking requests.</li>
                      <li>Utilize the &quot;Request a Visit&quot; feature for its intended purpose.</li>
                      <li>Understand that Dormn does not guarantee property availability or safety; conduct physical inspections prior to transferring funds.</li>
                      <li>Adhere to all house rules established by the Property Owner.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🏢</span>
                      <h3 className="font-black text-[#3A2935] text-base sm:text-lg">3.2 Property Owners</h3>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside leading-relaxed">
                      <li>Provide complete, accurate listing details (pricing, amenities, rooms, rules).</li>
                      <li>Ensure property complies with local municipal laws, zoning, and safety standards.</li>
                      <li>Promptly manage booking requests (Accept/Reject) via the owner dashboard.</li>
                      <li>Take full responsibility for rental agreements and security deposit transactions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                <h3 className="font-bold text-[#3A2935] text-sm mb-1">3.3 Role-Based Access Control (RBAC)</h3>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">
                  Dormn utilizes JSON Web Token (JWT) authentication to enforce strict Role-Based Access Control. Users must only access dashboard capabilities assigned to their registered role. Attempting to bypass security measures or impersonate another role is strictly prohibited and results in account termination.
                </p>
              </div>
            </section>

            {/* Section 4: Platform Liability & Intermediary Status */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  4.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Platform Liability & Intermediary Status
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn operates strictly as a digital intermediary under the Information Technology Act, 2000 and Information Technology (Intermediary Guidelines) Rules, 2021.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">No Direct Liability</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Dormn acts solely as a facilitator for discovery. We do not own, operate, or control the physical properties listed on the Platform. Financial transactions and tenancy contracts are executed directly between Students and Owners.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">Disclaimer of Warranties & Limitation of Liability</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    The Platform is provided on an &quot;as is&quot; basis without warranties of any kind. Dormn, its officers, and affiliates shall not be liable for any direct, indirect, or consequential damages resulting from property visits, tenancy disputes, or platform use.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Prohibited Activities */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  5.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Prohibited Activities
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Fraudulent Listings</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Posting false property information, unauthorized pricing, or non-existent amenities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Harassment & Abuse</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Using WhatsApp or call channels to harass, threaten, or abuse other users.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Platform Abuse & DoS</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Attempting to reverse-engineer, hack, bypass image processing, or launch Denial of Service (DoS) attacks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-red-50/60 border border-red-100 p-4">
                  <span className="text-lg">🚫</span>
                  <div>
                    <p className="font-bold text-red-900 text-xs sm:text-sm">Unlawful Content</p>
                    <p className="text-[11px] font-medium text-red-700 mt-0.5">Uploading or sharing content violating local, state, or national laws.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Intellectual Property & Account Termination */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  6.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Intellectual Property & Account Termination
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">Intellectual Property Rights</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    All software, React.js frontend architecture, Node.js backend, UI designs, and branding are the exclusive property of Dormn. By uploading imagery, Owners grant Dormn a non-exclusive, royalty-free license to host, display, and optimize content for platform operations.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">Account Termination</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Dormn reserves the right to suspend or permanently terminate user accounts violating these Terms, engaging in fraudulent activity, or compromising platform security.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Governing Law & Jurisdiction */}
            <section className="rounded-[2rem] border-2 border-orange-100 bg-orange-50/40 p-6 sm:p-10 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E56A54] text-lg font-black text-white">
                  7.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Governing Law & Jurisdiction
                </h2>
              </div>

              <p className="text-gray-700 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of competent courts in India.
              </p>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Legal Contact Support</span>
                  <p className="text-sm font-black text-[#3A2935]">Submit questions regarding these terms</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E56A54] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#d65a45]"
                >
                  Contact Support →
                </Link>
              </div>
            </section>

          </div>
        </Container>
      </div>
    </PublicLayout>
  );
};

export default TermsConditions;
