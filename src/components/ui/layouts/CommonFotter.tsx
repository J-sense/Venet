import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Separator } from "../separator";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#191C2B] text-white font-inter text-xs select-none border-t border-[#1E2939]/40 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* ── FIVE-COLUMN LINK MATRIX ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-4 items-start">
          {/* Column 1: Brand Logo, Description & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-5 max-w-sm">
            {/* মোবাইল স্ক্রিনে কন্টেইনার এবং লোগো যাতে রেসপন্সিভ হয় তার পরিবর্তন */}
            <div className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] ">
              <Link to="/" className="flex items-center flex-shrink-0 ">
                <img
                  src="/VNetLogo.png"
                  alt="VNET Logo"
                  // ক্লায়েন্টের ফিডব্যাক অনুযায়ী এখানে মোবাইল স্ক্রিনের জন্য রেসপন্সিভ সাইজিং ফিক্স করা হয়েছে
                  className="w-full h-auto max-w-full object-contain border border-zinc-800 transition-all duration-300 rounded-full"
                />
              </Link>
            </div>
            <p className="text-[#CBD5E1] leading-7 text-[14px] font-normal">
              Your journey to wellness, mental health, and career growth. Nullam
              dictum aliquet accumsan porta lectus ridiculus in mattis. Your
              journey to wellness, mental health.
            </p>
            {/* Social Media Circular Links */}
            <div className="flex items-center gap-3 mt-4">
              {/* Facebook */}
              <Link
                to="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2B7FFF] hover:bg-[#1a5ed9] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </Link>

              {/* Twitter / X */}
              <Link
                to="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2B7FFF] hover:bg-[#1a5ed9] transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </Link>

              {/* Instagram */}
              <Link
                to="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2B7FFF] hover:bg-[#1a5ed9] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </Link>

              {/* LinkedIn */}
              <Link
                to="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2B7FFF] hover:bg-[#1a5ed9] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[#0A66C2] font-semibold tracking-widest text-[13px] uppercase">
              Programs
            </h4>
            <ul className="flex flex-col gap-4 text-[#CBD5E1] text-[14px] font-normal">
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
          <div className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[#0A66C2] font-semibold tracking-widest text-[13px] uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-[#CBD5E1] text-[14px] font-normal">
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
          <div className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[#0A66C2] font-semibold tracking-widest text-[13px] uppercase">
              Legal
            </h4>
            <ul className="flex flex-col gap-4 text-[#CBD5E1] text-[14px] font-normal">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Metadata */}
          <div className="lg:col-span-2 flex flex-col gap-7">
            <h4 className="text-[#0A66C2] font-semibold tracking-widest text-[13px] uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-4 text-[#CBD5E1] text-[14px] font-normal">
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

        <div>
          <Separator className="bg-[#334155]" />
        </div>
        {/* ── HORIZONTAL DIVIDER & BOTTOM RIGHTS ROW ── */}
        <div className="w-full border-t border-[#1E2939]/30 flex items-center justify-center">
          <p className="text-[#717182] text-[14px] font-normal">
            &copy; 2026 VNET. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};