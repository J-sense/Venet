import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#191C2B] text-white font-inter text-xs select-none border-t border-[#1E2939]/40 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* ── FIVE-COLUMN LINK MATRIX ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 items-start">
          {/* Column 1: Brand Logo, Description & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-5 max-w-sm">
            <div className="w-[160px] h-auto">
              <img
                src="/vnet-logo.png" // Replace with your exact logo asset path
                alt="VNET Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Text fallback if image isn't loaded
                  e.currentTarget.style.display = "none";
                  const fallback = document.getElementById(
                    "brand-text-fallback",
                  );
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <div
                id="brand-text-fallback"
                className="hidden text-xl font-black font-sora tracking-tight"
              >
                V<span className="text-[#2B7FFF]">NET</span>
              </div>
            </div>

            <p className="text-[#99A1AF] leading-[1.7] text-[11px] font-normal">
              Your journey to wellness, mental health, and career growth. Nullam
              dictum aliquet accumsan porta lectus ridiculus in mattis. Your
              journey to wellness, mental health.
            </p>

            {/* Social Media Circular Links */}
            <div className="flex items-center gap-2.5 mt-2">
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (platform, i) => (
                  <a
                    key={i}
                    href={`#${platform}`}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2B7FFF] text-white hover:bg-[#0066FF] transition-colors duration-200"
                  >
                    {/* Inline platform font/SVG placeholders matching image_53eea4.png */}
                    <span className="text-[10px] uppercase font-bold scale-90">
                      {platform[0]}
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Column 2: Programs */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#2B7FFF] font-bold tracking-widest text-[10px] uppercase font-sora">
              Programs
            </h4>
            <ul className="flex flex-col gap-3 text-[#99A1AF]">
              <li>
                <a
                  href="#health-fitness"
                  className="hover:text-white transition-colors"
                >
                  Health & Fitness
                </a>
              </li>
              <li>
                <a
                  href="#mental-health"
                  className="hover:text-white transition-colors"
                >
                  Mental Health
                </a>
              </li>
              <li>
                <a
                  href="#career-coaching"
                  className="hover:text-white transition-colors"
                >
                  Career Coaching
                </a>
              </li>
              <li>
                <a
                  href="#life-coaching"
                  className="hover:text-white transition-colors"
                >
                  Life Coaching
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#2B7FFF] font-bold tracking-widest text-[10px] uppercase font-sora">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-[#99A1AF]">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#experts"
                  className="hover:text-white transition-colors"
                >
                  Our Experts
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="hover:text-white transition-colors"
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#2B7FFF] font-bold tracking-widest text-[10px] uppercase font-sora">
              Legal
            </h4>
            <ul className="flex flex-col gap-3 text-[#99A1AF]">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#disclaimer"
                  className="hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Metadata */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#2B7FFF] font-bold tracking-widest text-[10px] uppercase font-sora">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-[#99A1AF]">
              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-[#2B7FFF] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:privacy@vnet.com"
                  className="hover:text-white transition-colors break-all"
                >
                  privacy@vnet.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-[#2B7FFF] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-[#2B7FFF] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-tight">
                  123 Wellness St, San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── HORIZONTAL DIVIDER & BOTTOM RIGHTS ROW ── */}
        <div className="w-full border-t border-[#1E2939]/30 pt-8 flex items-center justify-center">
          <p className="text-[#99A1AF]/60 text-[11px] font-normal">
            &copy; 2026 VNET. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
