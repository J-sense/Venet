import { StartFreeButton } from "@/components/assessment";
import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

export const CTASection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[740px] flex items-center justify-center bg-[#030303] overflow-hidden select-none py-20">
      {/* ── CINEMATIC BACKGROUND IMAGE LAYER ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/CTA.png"
          alt="Ready to Start Your Journey Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-transparent opacity-60" />
      </div>

      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center gap-6">
        <SectionHeader
          subtitle="Take the free assessment to get your personalized health & fitness program roadmap"
          titleAccent="Journey?"
          titlePrimary="Ready to Start Your "
        />
        <StartFreeButton
          text="Start Free Assessment"
          showIcon
          className="px-6 py-3.5 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto"
        />
      </div>

      {/* ── CURVED DIVIDER ── */}
      <div className="absolute -bottom-18 left-0 w-full z-20 pointer-events-none text-[#191C2B]">
        <svg
          className="w-full h-auto translate-y-[1px]"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ctaCurve" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#222638" />
              <stop offset="100%" stopColor="#191C2B" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ctaCurve)"
            d="M0,192L60,208C120,224,240,256,360,261.3C480,267,600,245,720,213.3C840,181,960,139,1080,144C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};