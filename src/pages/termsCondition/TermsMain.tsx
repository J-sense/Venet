import LegalHeader from "@/components/ui/legalHeeader";
import { AboutUsCTA } from "../About-us/components/AboutUsCTA";


export default function TermsMain() {
  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <LegalHeader
        bgColor="#0F172A"
        title="Terms & Conditions"
        date="June 5, 2026"
      />
      
      <main className="max-w-4xl mx-auto px-6 py-16 text-[#E2E8F0] space-y-12">
        {/* Intro Box */}
        <div className="bg-[#0F172A] rounded-xl p-6 shadow-lg shadow-black/20">
          <p className="text-lg leading-relaxed text-[#94A3B8]">
            Please read these Terms and Conditions carefully before using the vNET platform. By accessing or using our services, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
          <p className="text-[#94A3B8]">
            By creating an account, accessing, or using vNET's services, you agree to comply with and be bound by these Terms and Conditions, our Privacy Policy, and our Disclaimer. If you do not agree to these Terms, please do not use our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">2. Description of Services</h2>
          <p className="text-[#94A3B8]">vNET provides:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>AI-powered wellness and career development programs</li>
            <li>Personalized roadmaps and goal-tracking tools</li>
            <li>Access to verified expert coaches and consultants</li>
            <li>Educational content and resources</li>
            <li>Community support features</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">3. User Accounts</h2>
          
          <h3 className="text-lg font-semibold text-white mt-6">Account Creation</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You must provide accurate and complete information.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>You may not share your account with others.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 pt-4">Account Termination</h3>
          <p className="text-[#94A3B8]">
            We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct that we deem inappropriate or harmful to our platform or other users.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">4. Subscription and Payment</h2>
          
          <h3 className="text-lg font-semibold text-white mt-6">Subscription Plans</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Single program: $29.99/month</li>
            <li>Additional programs: $19.99/month each</li>
          </ul>
          <p className="text-[#94A3B8] mt-2">All subscriptions are billed monthly on a recurring basis.</p>

          <h3 className="text-lg font-semibold text-white mt-6 pt-4">Payment Terms</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Payment is due at the time of subscription.</li>
            <li>You authorize us to charge your payment method automatically each billing cycle.</li>
            <li>You are responsible for keeping your payment information current.</li>
            <li>Failed payments may result in service interruption.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 pt-4">Cancellation Policy</h3>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>You may cancel your subscription at any time from your dashboard.</li>
            <li>Cancellation takes effect at the end of the current billing period.</li>
            <li>You will retain access to paid features until the end of the billing period.</li>
            <li>No refunds are provided for partial months or unused services.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-6 pt-4">Refund Policy</h3>
          <p className="text-[#94A3B8]">
            All sales are final. We do not offer refunds for any subscription fees, in whole or in part. However, if you cancel, your account will remain active until the end of your current billing period.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">5. User Conduct</h2>
          <p className="text-[#94A3B8]">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Use the platform for any illegal or unauthorized purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit any harmful or malicious code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the platform or servers</li>
            <li>Harass, abuse, or harm other users or experts</li>
            <li>Impersonate any person or entity</li>
            <li>Collect or store personal data about other users</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">6. Intellectual Property</h2>
          <p className="text-[#94A3B8]">
            All content on the vNET platform, including text, graphics, logos, images, software, and AI-generated roadmaps, is the property of vNET or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, modify, or distribute any content without our express written permission.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">7. Expert Services</h2>
          <p className="text-[#94A3B8]">
            When you book a session with an expert Coach or Consultant through our platform, you acknowledge that the expert is an independent professional. vNET facilitates the connection but is not responsible for the quality, accuracy, or outcomes of expert services. Any disputes with experts should be resolved directly with the expert.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">8. Disclaimer of Warranties</h2>
          <p className="text-[#94A3B8] uppercase">
            THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">9. Limitation of Liability</h2>
          <p className="text-[#94A3B8] uppercase">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, vNET SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">10. Indemnification</h2>
          <p className="text-[#94A3B8]">
            You agree to indemnify and hold harmless vNET, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the platform or violation of these Terms.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">11. Governing Law</h2>
          <p className="text-[#94A3B8]">
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the platform shall be resolved in the courts located in San Francisco County, California.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">12. Changes to Terms</h2>
          <p className="text-[#94A3B8]">
            We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the platform after changes are posted constitutes your acceptance of the updated Terms.
          </p>
        </section>

        {/* Section 13 & Contact */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">13. Contact Information</h2>
          <p className="text-[#94A3B8] text-[16px]">
            If you have questions about these Terms, please contact us:
          </p>

          <div className="bg-[#0F172A] rounded-xl p-6 md:p-8 shadow-lg space-y-4 mt-6">
            <div className="flex items-center gap-4 text-[#FAFAFA] text-[16px]">
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>privacy@vnet.com</span>
            </div>
            <div className="flex items-center gap-4 text-[#FAFAFA] text-[16px]">
              <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-start gap-4 text-[#FAFAFA] text-[16px]">
              <svg className="w-5 h-5 text-[#3B82F6] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
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
