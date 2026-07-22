import PublicLayout from "../layouts/PublicLayout";
import Container from "../layouts/Container";

const PrivacyPolicy = () => {
  return (
    <PublicLayout>
      <div className="bg-[#FAF9F5] font-sans selection:bg-[#E56A54] selection:text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-4xl mx-auto">
          
          {/* Header Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-5 py-2 mb-6 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E56A54] animate-pulse"></span>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#3A2935]">
                Statutory Compliance & Data Governance
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#3A2935] sm:text-5xl md:text-6xl mb-4">
              Privacy <span className="text-[#E56A54]">Policy</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Effective Date: July 22, 2026 • Compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act) & Information Technology Act, 2000.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">

            {/* Preamble & Definitions */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-[#3A2935] mb-4">
                Preamble & Legal Framework
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                Dormn Technologies ("we", "us", or "our") is committed to upholding the highest standards of data privacy, security, and transparency. As a designated <strong>Data Fiduciary</strong> operating under the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, this Privacy Policy details the exact mechanisms through which we collect, process, store, disclose, and safeguard personal data belonging to our users ("Data Principals").
              </p>
              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-4 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                <strong>Notice of Free & Specific Consent:</strong> By accessing the Dormn platform, registering an account, submitting booking requests, or listing a property, you explicitly grant free, specific, informed, unconditional, and unambiguous consent to processing your personal data in accordance with the terms laid down herein.
              </div>
            </section>
            
            {/* Section 1: Granular Data Collection */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Comprehensive Data Collection Architecture
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                We collect only such personal data as is strictly necessary to fulfill legitimate operational, security, and contractual requirements across our student accommodation ecosystem.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">👤</span> A. Student & Seeker Data
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Identity Data:</strong> Legal full name, primary email address, verified telephone number.</li>
                    <li><strong>Authentication Records:</strong> Cryptographically hashed passwords (salted via bcrypt with 10 rounds) and temporary 6-digit numeric OTPs.</li>
                    <li><strong>Interaction Records:</strong> Booking request history, inquiry messages, preferred cities/localities, and budget filter preferences.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span> B. Property Partner (Owner) Data
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Ownership Verification:</strong> Full name, contact credentials, emergency phone number, property title documentation.</li>
                    <li><strong>Listing & Spatial Data:</strong> Detailed PG address, city, area, nearby educational institutions/hubs, room counts, tariff structures, amenities checklist, custom rulebooks, and embedded Google Maps geolocation coordinates.</li>
                    <li><strong>Media Assets:</strong> Up to 10 high-resolution property/room photographs uploaded per listing for verification and showcase.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">💻</span> C. Technical & System Telemetry
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Network Identifiers:</strong> IP addresses, HTTP request headers, User-Agent strings, and session access timestamps.</li>
                    <li><strong>Token Management:</strong> JSON Web Tokens (JWT) stored in browser storage for session state preservation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Purposes of Processing */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Purposes of Personal Data Processing
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                In strict adherence to the DPDP Act 2023, data is processed exclusively for specified, lawful, and transparent purposes:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🔐 Identity Verification & Access Control</p>
                  <p className="text-xs font-medium text-gray-600">Verifying credentials via password authentication or cryptographically generated 5-minute OTPs.</p>
                </div>
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🏠 Matchmaking & Booking Logistics</p>
                  <p className="text-xs font-medium text-gray-600">Connecting student visit requests directly with property owners and tracking request lifecycle states.</p>
                </div>
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">✉️ Transactional Email Dispatch</p>
                  <p className="text-xs font-medium text-gray-600">Sending onboarding welcome emails, multi-factor OTPs, and login security alerts via secure SMTP.</p>
                </div>
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">🖼️ Media Processing & Performance</p>
                  <p className="text-xs font-medium text-gray-600">Automated image optimization (downscaling to 1600px, WebP conversion, MIME validation) via Sharp engine.</p>
                </div>
              </div>
            </section>

            {/* Section 3: Third-Party Disclosures & Service Providers */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Third-Party Integrations & Data Disclosures
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn does <strong>NOT</strong> sell, rent, trade, or monetize personal data under any circumstances. Controlled data sharing occurs solely with the following entities:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">📧</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">SMTP Gateway Services</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      Transactional notifications (verification codes, account alerts, onboarding receipts) are routed through encrypted SMTP mail servers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">🗺️</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">Mapping & Direct Messaging Integrations</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      Google Maps API is embedded to display precise geographic locations of PGs. Optional click-to-contact features link directly to external WhatsApp APIs with user consent.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">⚖️</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">Statutory & Judicial Disclosures</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      Data may be disclosed to law enforcement authorities, courts, or regulatory bodies pursuant to valid warrants, court orders, or statutory mandates under Section 91 of the Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Security Architecture & Retention */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  4.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Security Architecture & Retention Schedule
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-2">Technical Guardrails (IT Act 2000 Compliance)</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    We maintain reasonable security practices including:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Cryptographic Passwords:</strong> Passwords hashed with bcrypt (10 rounds). Plaintext passwords are never stored.</li>
                    <li><strong>Statutory OTP Lifespan:</strong> Verification OTPs expire strictly 5 minutes after issuance and are cleared upon verification.</li>
                    <li><strong>Session Security:</strong> Authenticated REST endpoints require 7-day cryptographic JWT bearer tokens.</li>
                    <li><strong>Upload Defense:</strong> Multer upload middleware enforces a 5MB payload limit and strict MIME validation (`jpeg|jpg|png|webp`).</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">Retention & Erasure Mandates</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Personal data is retained only for the duration required to fulfill operational services or statutory accounting/legal requirements. Upon account deletion requests, personal records are permanently erased unless retention is mandated by judicial order.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Statutory Rights of Data Principals */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  5.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Statutory Rights of Data Principals
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Under the DPDP Act 2023, registered Data Principals possess the following enforceable rights:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">1. Right to Access</p>
                  <p className="text-xs font-medium text-gray-600">Obtain a summary of personal data being processed and identities of processing entities.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">2. Right to Correction & Erasure</p>
                  <p className="text-xs font-medium text-gray-600">Request correction of inaccurate data, completion of incomplete entries, or erasure of personal records.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">3. Right of Grievance Redressal</p>
                  <p className="text-xs font-medium text-gray-600">File grievances regarding data handling with our designated Grievance Nodal Officer.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">4. Right to Nominate</p>
                  <p className="text-xs font-medium text-gray-600">Nominate any individual to exercise data principal rights in the event of death or incapacity.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Nodal Grievance Redressal Mechanism */}
            <section className="rounded-[2rem] border-2 border-orange-100 bg-orange-50/40 p-6 sm:p-10 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E56A54] text-lg font-black text-white">
                  6.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Statutory Grievance Redressal Mechanism
                </h2>
              </div>

              <p className="text-gray-700 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Pursuant to Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Dormn has appointed a designated <strong>Grievance Nodal Officer</strong>.
              </p>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Designation</span>
                  <span className="text-sm font-black text-[#3A2935]">Data Protection & Grievance Officer</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Official Email</span>
                  <a href="mailto:grievance@dormn.com" className="text-sm font-bold text-[#E56A54] hover:underline">grievance@dormn.com</a>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Acknowledgement SLA</span>
                  <span className="text-sm font-bold text-[#3A2935]">Within 24 Hours</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Resolution SLA</span>
                  <span className="text-sm font-bold text-[#3A2935]">Within 15 Calendar Days</span>
                </div>
              </div>
            </section>

          </div>
        </Container>
      </div>
    </PublicLayout>
  );
};

export default PrivacyPolicy;
