import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React, { useState } from "react";

import { faqsData as faqs } from "../data/homeData";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item active by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#030303] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* ── CENTRALIZED LINEAR BACKGROUND GLOW CHANNEL ── */}
      {/* Primary Track: Centered vertically down the middle of the accordion block */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[65%] h-full pointer-events-none z-0 opacity-95 filter blur-[110px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(16, 24, 40, 1) 40%, rgba(16, 24, 40, 1) 60%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      {/* Layer 2 Core: High-density blend center flare for extra pop */}
      <div
        className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[20%] h-[60%] pointer-events-none z-0 opacity-100 filter blur-[50px] mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(16, 24, 40, 1) 30%, rgba(16, 24, 40, 1) 70%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative max-w-[1440px] mx-auto flex flex-col gap-14 z-10">
        {/* Header Block */}

        <SectionHeader
          titlePrimary="FAQ"
          subtitle=" Quick Answers To Help You Get Started"
          titleAccent=""
        />

        {/* Accordion List Wrapper */}
        <div className="w-full max-w-[1040px] mx-auto flex flex-col gap-4 px-2 sm:px-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="w-full rounded-[16px] border border-[#1E2939]/70 bg-[#101828]/30 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-white/10"
              >
                {/* Trigger Button Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-6 p-6 sm:px-8 text-left transition-all duration-200"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-inter tracking-wide leading-snug">
                    {faq.question}
                  </span>
                  {/* Plus/Minus Sign Toggle Component */}
                  <div className="relative flex items-center justify-center w-6 h-6 shrink-0 text-white/60">
                    <span
                      className={`absolute w-4 h-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                    <span
                      className={`absolute h-4 w-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : ""
                        }`}
                    />
                  </div>
                </button>

                {/* Collapsible Panel Frame */}
                <div
                  className={`grid transition-all duration-300 ease-in-out border-t border-transparent ${isOpen
                    ? "grid-rows-[1fr] opacity-100 !border-[#1E2939]/50"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 sm:px-8 pt-2 pb-7 text-sm sm:text-base font-normal font-inter text-[#99A1AF] leading-[1.65]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
