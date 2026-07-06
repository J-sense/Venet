import LegalHeader from "@/components/ui/legalHeeader";
import { AboutUsCTA } from "../About-us/components/AboutUsCTA";

export default function PrivacyMain() {
  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <LegalHeader
        bgColor="#0F172A"
        title="Privacy Policy"
        date="June 5, 2026"
      />

      <main className="max-w-4xl mx-auto px-6 py-16 text-[#E2E8F0] space-y-12">
        {/* Intro Box */}
        <div className="bg-[#0F172A] rounded-xl p-6 shadow-lg shadow-black/20">
          <p className="text-lg leading-relaxed text-[#94A3B8]">
            At vNET, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our platform.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            1. Information We Collect
          </h2>

          <h3 className="text-lg font-semibold text-white mt-6">
            Personal Information
          </h3>
          <p className="text-[#94A3B8]">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Name, email address, and account information</li>
            <li>Account credentials (username and password)</li>
            <li>Health and wellness information you provide in assessments</li>
            <li>Career goals and professional information</li>
            <li>Payment and billing information</li>
            <li>Communications with our support teams</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 pt-4">
            Automatically Collected Information
          </h3>
          <p className="text-[#94A3B8]">
            When you use our platform, we automatically collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>
              Device information (IP address, browser type, operating system)
            </li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Location data (with your permission)</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            2. How We Use Your Information
          </h2>
          <p className="text-[#94A3B8]">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Provide, maintain, and improve our services</li>
            <li>
              Generate personalized AI-powered roadmaps and recommendations
            </li>
            <li>Process your transactions and manage your subscription</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-[#94A3B8]">
            We do not sell your personal information. We may share your
            information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>
              <span className="font-semibold text-white">
                With Your Consent:
              </span>{" "}
              When you authorize us to share information.
            </li>
            <li>
              <span className="font-semibold text-white">
                Service Providers:
              </span>{" "}
              With third-party vendors who perform services on our behalf
              (payment processing, data analysis, cloud hosting).
            </li>
            <li>
              <span className="font-semibold text-white">Expert Coaches:</span>{" "}
              When you book a session, we share relevant information with the
              expert.
            </li>
            <li>
              <span className="font-semibold text-white">
                Legal Requirements:
              </span>{" "}
              When required by law or to protect rights and safety.
            </li>
            <li>
              <span className="font-semibold text-white">
                Business Transfers:
              </span>{" "}
              In connection with a merger, sale, or acquisition.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            4. Data Security
          </h2>
          <p className="text-[#94A3B8]">
            We implement appropriate technical and organizational measures to
            protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Restricted access to personal information</li>
            <li>Secure payment processing through verified providers</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            However, no method of transmission over the Internet is 100% secure.
            While we strive to protect your information, we cannot guarantee
            absolute security.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            5. Your Rights and Choices
          </h2>
          <p className="text-[#94A3B8]">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>
              <span className="font-semibold text-white">Access:</span> Request
              access to your personal information
            </li>
            <li>
              <span className="font-semibold text-white">Correction:</span>{" "}
              Request correction of inaccurate information
            </li>
            <li>
              <span className="font-semibold text-white">Deletion:</span>{" "}
              Request deletion of your personal information
            </li>
            <li>
              <span className="font-semibold text-white">Opt-Out:</span>{" "}
              Unsubscribe from marketing communications
            </li>
            <li>
              <span className="font-semibold text-white">
                Data Portability:
              </span>{" "}
              Request a copy of your data in a portable format
            </li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            To exercise these rights, please contact us at privacy@vNET.com.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="text-[#94A3B8]">
            We use cookies and similar technologies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our platform</li>
            <li>Improve our services</li>
            <li>Provide personalized content and recommendations</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            You can control cookies through your browser settings. Note that
            disabling cookies may limit your use of certain features.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            7. Children's Privacy
          </h2>
          <p className="text-[#94A3B8]">
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you believe we have collected information from a child, please
            contact us immediately.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            8. International Data Transfers
          </h2>
          <p className="text-[#94A3B8]">
            Your information may be transferred to and processed in countries
            other than your country of residence. We ensure appropriate
            safeguards are in place to protect your information in accordance
            with this Privacy Policy.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-[#94A3B8]">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. Your continued use of our
            services after changes are posted constitutes your acceptance of the
            updated Privacy Policy.
          </p>
        </section>

        {/* Section 10 & Contact */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            10. Contact Us
          </h2>
          <p className="text-[#94A3B8] text-[16px]">
            If you have questions or concerns about this Privacy Policy, please
            contact us:
          </p>

          <div className="bg-[#0F172A] rounded-xl p-6 md:p-8  shadow-lg space-y-4 mt-6">
            <div className="flex items-center gap-4 text-[#FAFAFA] text-[16px]">
              <svg
                className="w-5 h-5 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <span>privacy@vnet.com</span>
            </div>
            <div className="flex items-center gap-4 text-[#FAFAFA] text-[16px]">
              <svg
                className="w-5 h-5 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-4 text-[#FAFAFA] text-[16px]">
              <svg
                className="w-5 h-5 text-[#3B82F6] mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>123 Wellness St., San Francisco, CA 94103</span>
            </div>
          </div>
        </section>
      </main>
      <AboutUsCTA
        title="Ready to Start Your Journey?"
        description="Take the free assessment to get your personalized health & fitness program roadmap"
        buttonText="Start Free Assessment"
        bgClass="bg-[#1E3A8A]"
        bottomCurveColor="#191C2B"
        buttonTextClass="!text-[#1E3A8A]"
      />
    </div>
  );
}
