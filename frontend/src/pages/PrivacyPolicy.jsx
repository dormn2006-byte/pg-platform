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
                Legal & Compliance Framework
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#3A2935] sm:text-5xl md:text-6xl mb-4">
              Privacy <span className="text-[#E56A54]">Policy</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy outlines how Dormn ("we", "us", or "our") collects, uses, stores, and protects the personal data of our users ("Data Principals") in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian laws.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            
            {/* Section 1: Data Collection & Processing */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.1
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Collection and Processing
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                As a Data Fiduciary, Dormn collects and processes personal data necessary to facilitate the connection between students and Paying Guest (PG) owners. We process data only with free, specific, informed, and unambiguous consent.
              </p>

              <div className="mb-6">
                <h3 className="text-base font-bold text-[#3A2935] mb-3 uppercase tracking-wider text-xs">
                  Categories of Data Collected:
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                    <p className="font-bold text-[#3A2935] text-sm">Identity Information</p>
                    <p className="text-xs font-medium text-gray-600 mt-1">Full name, email address, and optional phone number.</p>
                  </div>
                  <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                    <p className="font-bold text-[#3A2935] text-sm">Authentication Data</p>
                    <p className="text-xs font-medium text-gray-600 mt-1">Passwords (securely hashed using bcrypt) and One-Time Passwords (OTPs).</p>
                  </div>
                  <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                    <p className="font-bold text-[#3A2935] text-sm">Profile Data</p>
                    <p className="text-xs font-medium text-gray-600 mt-1">Optional profile images.</p>
                  </div>
                  <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                    <p className="font-bold text-[#3A2935] text-sm">Property Data (Owners)</p>
                    <p className="text-xs font-medium text-gray-600 mt-1">Title, type, price, address, city, area, nearby college, available rooms, amenities, rules, Google Maps links, and up to 10 property images per listing.</p>
                  </div>
                  <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 sm:col-span-2">
                    <p className="font-bold text-[#3A2935] text-sm">Interaction Data</p>
                    <p className="text-xs font-medium text-gray-600 mt-1">Booking requests, messages, and booking status histories.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#3A2935] mb-3 uppercase tracking-wider text-xs">
                  Purposes of Processing:
                </h3>
                <ul className="space-y-2 text-sm font-medium text-gray-600">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E56A54] shrink-0"></span>
                    To authenticate users securely via password or OTP.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E56A54] shrink-0"></span>
                    To facilitate property discovery, search, and booking requests.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E56A54] shrink-0"></span>
                    To send transactional emails (welcome, OTP, login alerts) via secure SMTP.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E56A54] shrink-0"></span>
                    To optimize and validate property images (resizing, WebP conversion) for platform performance.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: Data Sharing & Third-Party Integrations */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.2
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Sharing and Third-Party Integrations
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                We do not sell user data. Personal data is only shared or accessed by third parties to ensure essential platform functionality:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Service Providers</p>
                    <p className="text-xs font-medium text-gray-600 mt-0.5">SMTP providers for transactional email dispatch.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  <span className="text-xl">🌐</span>
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">External Platforms</p>
                    <p className="text-xs font-medium text-gray-600 mt-0.5">WhatsApp (for generating contact links to owners) and Google Maps (for location display).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  <span className="text-xl">⚖️</span>
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Legal Authorities</p>
                    <p className="text-xs font-medium text-gray-600 mt-0.5">When required by law, court order, or to protect our rights and user safety.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Data Security and Retention */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.3
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Security and Retention
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                Dormn implements reasonable security practices in accordance with the Information Technology Act, 2000:
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">Security Measures</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    All API endpoints are secured via JWT tokens. Passwords are hashed with 10 salt rounds using bcrypt. OTPs are cryptographically secure and expire within 5 minutes. Image uploads are strictly filtered by MIME type and size limits.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <p className="font-bold text-[#3A2935] text-sm">Data Retention & Deletion</p>
                  <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                    We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Users may request data deletion, which will be processed upon account termination or as mandated by the DPDP Act.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Rights of Data Principals */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.4
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Rights of Data Principals
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                Under the Digital Personal Data Protection Act, 2023 (DPDP Act), users have the right to:
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-center">
                  <span className="text-2xl mb-2 block">🔍</span>
                  <p className="font-bold text-[#3A2935] text-sm">Access Information</p>
                  <p className="text-xs font-medium text-gray-500 mt-1">Right to access details about personal data being processed.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-center">
                  <span className="text-2xl mb-2 block">✏️</span>
                  <p className="font-bold text-[#3A2935] text-sm">Correction & Erasure</p>
                  <p className="text-xs font-medium text-gray-500 mt-1">Right to request correction or deletion of inaccurate or incomplete data.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-center">
                  <span className="text-2xl mb-2 block">📩</span>
                  <p className="font-bold text-[#3A2935] text-sm">Grievance Redressal</p>
                  <p className="text-xs font-medium text-gray-500 mt-1">Right to register grievances with our appointed Grievance Officer.</p>
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
