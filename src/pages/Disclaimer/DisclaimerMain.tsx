import LegalHeader from "@/components/ui/legalHeeader";
import { AboutUsCTA } from "../About-us/components/AboutUsCTA";

export default function DisclaimerMain() {
  return (
    <div className="bg-[#030303] text-white min-h-screen">
      <LegalHeader title="Disclaimer" date="June 5, 2026" bgColor="#760000" />

      <main className="max-w-4xl mx-auto px-6 py-16 text-[#E2E8F0] space-y-12">
        {/* Intro Box (Warning) */}
        <div className="bg-[#78350F]/20 rounded-xl p-6 border border-[#B45309]/50 shadow-lg shadow-[#B45309]/5">
          <h3 className="text-xl font-bold text-[#F59E0B] mb-2">
            IMPORTANT: Please Read Carefully
          </h3>
          <p className="text-lg leading-relaxed text-[#D4D4D8]">
            vNET provides educational guidance and wellness recommendations
            based on common patterns and best practices. We do NOT provide
            medical diagnosis, medical treatment, mental health diagnosis, or
            professional medical advice. Always consult with qualified
            healthcare professionals for medical concerns.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            1. Not Medical Advice
          </h2>
          <p className="text-[#94A3B8]">
            <span className="font-semibold text-white">
              vNET is NOT a substitute for professional medical care.
            </span>{" "}
            Our platform provides:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Educational information and wellness guidance</li>
            <li>AI-generated recommendations based on common patterns</li>
            <li>General lifestyle and habit-building suggestions</li>
            <li>Career development and personal growth strategies</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">We do NOT provide:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Medical diagnosis or treatment</li>
            <li>Prescription of medications or medical procedures</li>
            <li>Mental health diagnosis or therapy</li>
            <li>Emergency medical services</li>
            <li>Professional medical advice specific to your condition</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            2. Consult Healthcare Professionals
          </h2>

          <div className="bg-[#7F1D1D]/20 rounded-xl p-6 border border-[#DC2626]/50 shadow-lg shadow-[#DC2626]/5 my-6">
            <h3 className="text-lg font-bold text-[#EF4444] mb-4 uppercase">
              You Must Consult With Your Healthcare Provider:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[#FCA5A5]">
              <li>Before starting any new exercise program</li>
              <li>Before making significant dietary changes</li>
              <li>If you have any medical conditions</li>
              <li>If you are taking medications</li>
              <li>If you are pregnant or nursing</li>
              <li>If you experience any unusual symptoms</li>
              <li>For any mental health concerns</li>
            </ul>
          </div>

          <p className="text-[#94A3B8]">
            Never disregard professional medical advice or delay seeking it
            because of something you read on vNET. If you think you may have a
            medical emergency, call your doctor or emergency services
            immediately.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            3. Mental Health Support
          </h2>
          <p className="text-[#94A3B8]">
            Our mental wellness programs provide stress management techniques,
            mindfulness practices, and general emotional wellbeing support.
            However, we are NOT a mental health treatment provider. If you are
            experiencing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Severe depression or anxiety</li>
            <li>Suicidal thoughts or self-harm urges</li>
            <li>Trauma that requires professional intervention</li>
            <li>Any mental health crisis</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            Please contact a licensed mental health professional immediately or
            call a crisis hotline:
          </p>

          <div className="bg-[#1E3A8A]/30 rounded-xl p-6 border border-[#3B82F6]/30 shadow-lg mt-4">
            <ul className="space-y-3 text-[#E0E7FF]">
              <li>
                <span className="font-bold text-white">
                  National Suicide Prevention Lifeline:
                </span>{" "}
                988
              </li>
              <li>
                <span className="font-bold text-white">Crisis Text Line:</span>{" "}
                Text "HELLO" to 741741
              </li>
              <li>
                <span className="font-bold text-white">Emergency:</span> Call
                911
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            4. AI-Generated Recommendations
          </h2>
          <p className="text-[#94A3B8]">
            Our platform uses artificial intelligence to generate personalized
            roadmaps and recommendations. These recommendations are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>
              Based on patterns from general wellness research and common best
              practices
            </li>
            <li>Generated using algorithms and data analysis</li>
            <li>
              Not reviewed by healthcare professionals for your specific
              situation
            </li>
            <li>Intended for educational and informational purposes only</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            AI systems can make errors. Always use your judgment and consult
            professionals when making important health decisions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            5. Expert Consultations
          </h2>
          <p className="text-[#94A3B8]">
            When you book sessions with expert coaches or consultants through
            our platform, please understand:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Experts are independent professionals, not vNET employees.</li>
            <li>
              We verify credentials but do not guarantee ongoing consultations.
            </li>
            <li>
              Expert advice is their professional opinion, not guaranteed
              outcomes.
            </li>
            <li>
              We are not liable for the quality or results of expert services.
            </li>
            <li>
              For medical or mental health concerns, experts are NOT a
              substitute for licensed healthcare providers.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            6. Individual Results May Vary
          </h2>
          <p className="text-[#94A3B8]">
            Success stories and testimonials on our platform represent
            individual experiences and results. Your results may differ based
            on:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>Your individual health conditions and circumstances</li>
            <li>Your commitment and consistency with the program</li>
            <li>Genetic factors and metabolism</li>
            <li>Environmental and lifestyle factors</li>
            <li>Access to professional support</li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            We make no guarantees about specific outcomes or results.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            7. No Doctor-Patient Relationship
          </h2>
          <p className="text-[#94A3B8]">
            Use of the vNET platform does NOT create a doctor-patient
            relationship, therapist-client relationship, or any professional
            healthcare relationship between you and vNET, our staff, or our
            platform. We are a technology and educational platform, not a
            healthcare provider.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            8. Information Accuracy
          </h2>
          <p className="text-[#94A3B8]">
            While we strive to provide accurate and up-to-date information, we
            make no representations or warranties regarding:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>The completeness or accuracy of information on our platform</li>
            <li>The currency of research or recommendations</li>
            <li>
              The suitability of any information for your specific situation
            </li>
          </ul>
          <p className="text-[#94A3B8] mt-4">
            Medical and wellness research evolves constantly. Information that
            was accurate when published may become outdated.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            9. External Links
          </h2>
          <p className="text-[#94A3B8]">
            Our platform may contain links to external websites or resources. We
            are not responsible for the content, accuracy, or practices of
            external sites. Accessing external links is at your own risk.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            10. Assumption of Risk
          </h2>
          <p className="text-[#94A3B8]">
            By using vNET, you acknowledge and accept that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
            <li>
              You are solely responsible for your health and wellness decisions
            </li>
            <li>
              You assume all risks associated with following our recommendations
            </li>
            <li>
              You will consult appropriate professionals before making health
              changes
            </li>
            <li>
              You understand the limitations of our services as described in
              this Disclaimer
            </li>
          </ul>
        </section>

        {/* Section 11 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            11. Changes to Disclaimer
          </h2>
          <p className="text-[#94A3B8]">
            We may update this Disclaimer from time to time. Continued use of
            our platform after changes are posted constitutes your acceptance of
            the updated Disclaimer.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            12. Contact Us
          </h2>
          <p className="text-[#94A3B8] text-[16px]">
            If you have questions about this Disclaimer:
          </p>

          <div className="bg-[#0F172A] rounded-xl p-6 md:p-8 shadow-lg space-y-4 mt-6">
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
            <div className="flex items-start gap-4 text-[#FAFAFA] text-[16px]">
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

        {/* Final Reminder Box (Warning) */}
        <div className="bg-[#78350F]/20 rounded-xl p-6 md:p-8 border border-[#B45309]/50 shadow-lg shadow-[#B45309]/5 mt-12">
          <h3 className="text-xl font-bold text-[#F59E0B] mb-2">
            Final Reminder
          </h3>
          <p className="text-lg leading-relaxed text-[#D4D4D8]">
            Your health and safety are paramount. When in doubt, always consult
            qualified healthcare professionals. vNET is here to support your
            wellness journey with educational tools and resources, but we cannot
            and do not replace professional medical care.
          </p>
        </div>
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
