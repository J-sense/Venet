import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

export const CTASection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[740px] flex items-center justify-center bg-[#030303] overflow-hidden select-none py-20">
      {/* ── CINEMATIC BACKGROUND IMAGE LAYER ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/CTA.png" // Replace with your exact image path
          alt="Ready to Start Your Journey Background"
          className="w-full h-full object-cover"
        />
        {/* High-intensity dark overlay system to mirror image_53f2a1.png opacity */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-transparent opacity-60" />
      </div>

      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center gap-6">
        {/* Main Header Heading */}

        {/* Subtitle Text Description */}
        <p className="text-sm sm:text-base text-white/70 max-w-2xl font-inter font-normal tracking-wide leading-relaxed"></p>
        <SectionHeader
          subtitle="  Take the free assessment to get your personalized health & fitness
          program roadmap"
          titleAccent="Journey?"
          titlePrimary=" Ready to Start Your"
        />
        {/* Primary Call-to-Action Button */}
        <button className="mt-4 px-8 py-3.5 bg-[#2B7FFF] text-white font-bold font-inter text-sm rounded-full shadow-[0_4px_20px_rgba(43,127,255,0.3)] hover:bg-[#0066FF] hover:shadow-[0_4px_25px_rgba(43,127,255,0.45)] transition-all duration-200 active:scale-[0.98]">
          Start Free Assessment
        </button>
      </div>

      {/* ── PRECISION BOTTOM VECTOR WAVE MASK OVERLAY ── */}
      {/* Target fill color successfully mapped to matching #191C2B background spec */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none text-[#191C2B]">
        <svg
          className="w-full h-auto translate-y-[1px]"
          viewBox="0 0 1440 160"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,80 C320,150 580,20 960,110 C1240,175 1360,110 1440,80 L1440,160 L0,160 Z" />
        </svg>
      </div>
    </section>
  );
};
