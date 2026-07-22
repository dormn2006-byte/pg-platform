import { Link } from "react-router-dom";
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

            {/* Section 1: Introduction and Scope */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  1.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Introduction and Scope
                </h2>
              </div>
              
              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                Welcome to Dormn (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or the &quot;Platform&quot;). Dormn is a next-generation housing and Paying Guest (PG) accommodation management platform designed to streamline the process of finding, booking, and managing student and professional housing.
              </p>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                This Privacy Policy outlines how Dormn collects, uses, discloses, processes, and protects the personal data of our users (&quot;Data Principals&quot;) in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and other applicable Indian data protection laws.
              </p>

              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-4 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
                <strong>Assent & Consent Notice:</strong> By accessing or using the Dormn website, mobile applications, and associated services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please review our{" "}
                <Link to="/terms" className="text-[#E56A54] font-bold hover:underline">
                  Terms and Conditions
                </Link>{" "}
                or contact our support desk via{" "}
                <Link to="/contact" className="text-[#E56A54] font-bold hover:underline">
                  Contact Us
                </Link>.
              </div>
            </section>
            
            {/* Section 2: Types of Data We Collect */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  2.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Types of Data We Collect
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                To provide seamless and personalized services, Dormn collects various types of personal and non-personal data necessary for performing platform functions.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">👤</span> 2.1 Personal Identification Information
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Account Registration Data:</strong> When you sign up as a Student or Property Owner, we collect your full legal name, valid email address, and a secure password.</li>
                    <li><strong>Contact Information:</strong> You may optionally provide your mobile phone number to facilitate communication with property owners via WhatsApp or direct calling.</li>
                    <li><strong>Profile Imagery:</strong> Users have the option to upload a profile image, which is displayed across the platform.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span> 2.2 Property & Listing Data (For Owners)
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Property Details:</strong> Title, detailed description, rental price, number of available rooms, and house rules.</li>
                    <li><strong>Location Data:</strong> City, specific area, and Google Maps integration links to pinpoint the exact location of the PG.</li>
                    <li><strong>Amenities & Features:</strong> Details regarding gender restrictions (Boys/Girls/Unisex), room types (AC/Non-AC), and sponsored tags.</li>
                    <li><strong>Media Files:</strong> Up to 10 high-resolution profile and gallery images per property listing.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">📋</span> 2.3 Transactional and Interaction Data
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Booking Requests:</strong> When a student submits a &quot;Request a Visit&quot; on <Link to="/pgs" className="text-[#E56A54] font-bold hover:underline">Explore PGs</Link>, we process the timestamp, property ID, and attached message.</li>
                    <li><strong>Booking Lifecycle:</strong> Tracking request statuses (Pending, Accepted, Rejected) in the <Link to="/my-bookings" className="text-[#E56A54] font-bold hover:underline">My Bookings</Link> dashboard.</li>
                    <li><strong>Communication Logs:</strong> Records of inquiries submitted through our integrated Contact Us pipeline.</li>
                    <li><strong>Search Data:</strong> Search queries (keywords across city, area, and PG title) and Discover Mode filter tracking.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-[#3A2935] text-base mb-2 flex items-center gap-2">
                    <span className="text-lg">💻</span> 2.4 Technical and Device Data
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Authentication Tokens:</strong> JSON Web Tokens (JWT) for stateless, time-bound session security.</li>
                    <li><strong>Log Telemetry:</strong> Standard log data including IP address, browser type, operating system, and referring URLs.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: How We Collect and Process Data */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  How We Collect and Process Data
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">3.1 Direct Collection</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    Data is primarily collected directly from you when you register an account, create a property listing, submit a booking visit request, or fill out our contact form.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-2">3.2 Image Processing Pipeline</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed mb-2">
                    To ensure fast page loading times and optimal platform security, Dormn employs an automated image processing pipeline powered by the <strong className="text-[#3A2935]">sharp</strong> library and <strong className="text-[#3A2935]">multer</strong> middleware:
                  </p>
                  <ul className="space-y-1.5 text-xs font-medium text-gray-600 list-disc list-inside">
                    <li>The image is staged using secure form-data handling.</li>
                    <li>Images are automatically compressed and resized using the sharp engine.</li>
                    <li>The optimized version is stored securely, while high-resolution staging files are discarded to prevent Denial of Service (DoS) risks.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-1">3.3 Email and Communication Processing</h3>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    When you use our <Link to="/contact" className="text-[#E56A54] font-bold hover:underline">Contact Us</Link> pipeline, your inquiry is processed via <strong className="text-[#3A2935]">nodemailer</strong> and securely dispatched via SMTP to our support team. An automated receipt is emailed back to acknowledge your submission.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Use of Collected Data (Lawful Basis Table) */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  4.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Use of Collected Data & Legal Basis
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                We process collected data exclusively for specified, lawful, and transparent purposes under the DPDP Act 2023:
              </p>

              {/* Table / Card List */}
              <div className="space-y-3">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Account Creation & Security</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: Name, email, password, IP address, JWT tokens</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    Performance of Contract
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Property Discovery & Matching</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: Search queries, property details, location data</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    User Consent
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Facilitating Bookings</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: Booking requests, contact info, optional messages</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    Performance of Contract
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Platform & Email Communication</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: Email address (for inquiries & automated receipts)</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    User Consent
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Direct Owner Communication</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: Phone number (for WhatsApp & direct dialing)</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    User Consent
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#3A2935] text-sm">Fraud Prevention & Moderation</p>
                    <p className="text-xs font-medium text-gray-600">Data Used: User activity logs, IP address, listing details</p>
                  </div>
                  <span className="shrink-0 text-xs font-black text-[#E56A54] bg-[#E56A54]/10 px-3 py-1 rounded-full self-start sm:self-center">
                    Legitimate Interest / Legal Obligation
                  </span>
                </div>
              </div>
            </section>

            {/* Section 5: Data Sharing and Third-Party Disclosures */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  5.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Sharing & Third-Party Disclosures
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                Dormn does <strong>NOT</strong> sell, trade, or rent personal identification data to third parties. Controlled sharing occurs with trusted service providers to facilitate platform operations:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">📧</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">SMTP Service Providers</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      To deliver automated email receipts, contact notifications, and support communications securely.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">🗺️</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">Google Maps API</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      To display precise geographic location maps for listed PG accommodations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">💬</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">WhatsApp Integration</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      We generate pre-filled message links redirecting users to WhatsApp to contact owners directly. Dormn does not process actual chat content.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-100">
                  <span className="text-2xl shrink-0">⚖️</span>
                  <div>
                    <h3 className="font-bold text-[#3A2935] text-sm">Legal & Statutory Authorities</h3>
                    <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                      We reserve the right to disclose personal data when required by law, court order, or to protect public safety and platform security.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Data Security and Protection */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  6.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Security and Protection
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-bold text-[#3A2935] text-sm mb-2">Technical Guardrails (IT Act 2000 Compliance)</h3>
                  <ul className="space-y-2 text-xs font-medium text-gray-600 list-disc list-inside">
                    <li><strong>Authentication Security:</strong> All user passwords are cryptographically hashed using bcrypt algorithms before storage.</li>
                    <li><strong>Session Management:</strong> We utilize JWT-based authentication to maintain secure, stateless session management without storing sensitive data on servers.</li>
                    <li><strong>File Upload Security:</strong> Strict validation on file uploads accepting only multipart form data processed safely via Sharp to prevent malicious executions.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7: Data Retention Policy */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  7.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Data Retention Policy
                </h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                We retain personal data only for as long as necessary to fulfill legal, operational, and reporting requirements:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600 list-disc list-inside">
                <li><strong>Active Accounts:</strong> Personal data is retained as long as your account remains active.</li>
                <li><strong>Inactive Accounts:</strong> If an account remains inactive for a prolonged period, data is anonymized or deleted in compliance with the DPDP Act 2023.</li>
              </ul>
            </section>

            {/* Section 8: Rights of Data Principals */}
            <section className="rounded-[2rem] border-2 border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 border-2 border-orange-100 text-lg font-black text-[#E56A54]">
                  8.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Rights of Data Principals
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">Right to Access</p>
                  <p className="text-xs font-medium text-gray-600">Request access to the personal data we hold about you.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">Right to Correction</p>
                  <p className="text-xs font-medium text-gray-600">Request correction of inaccurate or misleading personal data.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">Right to Erasure</p>
                  <p className="text-xs font-medium text-gray-600">Request deletion of personal data subject to legal retention rules.</p>
                </div>

                <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                  <p className="font-bold text-[#3A2935] text-sm mb-1">Right to Grievance Redressal</p>
                  <p className="text-xs font-medium text-gray-600">Lodge a formal grievance if you believe data is being mishandled.</p>
                </div>
              </div>
            </section>

            {/* Section 9: Grievance Redressal Mechanism */}
            <section className="rounded-[2rem] border-2 border-orange-100 bg-orange-50/40 p-6 sm:p-10 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E56A54] text-lg font-black text-white">
                  9.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3A2935]">
                  Grievance Redressal Mechanism
                </h2>
              </div>

              <p className="text-gray-700 font-medium leading-relaxed mb-6 text-sm sm:text-base">
                In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Dormn has appointed a designated Grievance Officer:
              </p>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Designation</span>
                  <span className="text-sm font-black text-[#3A2935]">Data Protection & Grievance Officer</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Official Support Email</span>
                  <a href="mailto:grievance@dormn.com" className="text-sm font-bold text-[#E56A54] hover:underline">grievance@dormn.com</a>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Acknowledgement SLA</span>
                  <span className="text-sm font-bold text-[#3A2935]">Within 24 Hours</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Resolution SLA</span>
                  <span className="text-sm font-bold text-[#3A2935]">Within 15 Days</span>
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
