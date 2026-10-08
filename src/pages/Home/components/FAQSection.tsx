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
        <SectionHeader
          titlePrimary="FAQ"
          subtitle="Quick Answers To Help You Get Started"
          titleAccent=""
        />

        {/* Accordion List Wrapper */}
        <div className="w-full max-w-[1040px] mx-auto flex flex-col gap-4 px-2 sm:px-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`w-full rounded-[16px] overflow-hidden backdrop-blur-sm
                  bg-gradient-to-b from-[#16203A]/60 to-[#0B1220]/60
                  border transition-colors duration-300
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.35)]
                  ${isOpen ? "border-blue-400/30" : "border-[#1E2939]/70"}`}
              >
                {/* Trigger Button Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 p-6 sm:px-8 text-left cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-inter tracking-wide leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {faq.question}
                  </span>

                  {/* Plus/Minus toggle in a glossy circle */}
                  <div
                    className="relative flex items-center justify-center w-8 h-8 shrink-0 rounded-full
                      bg-gradient-to-b from-white/10 to-white/[0.02]
                      border border-white/10
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.35)]"
                  >
                    <span
                      className={`absolute w-3.5 h-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                    <span
                      className={`absolute h-3.5 w-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : ""
                        }`}
                    />
                  </div>
                </button>

                {/* Collapsible Panel */}
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