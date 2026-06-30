import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";
import { Link } from "react-router";

import { defaultPrograms, type ProgramItem } from "../data/homeData";

interface ProgramsSectionProps {
  programs?: ProgramItem[];
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  programs = defaultPrograms,
}) => {
  return (
    <section className="relative w-full bg-[#000000] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* BLOB A — Top-right atmospheric flare */}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center gap-[60px]">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionHeader
            titlePrimary="Our"
            titleAccent="Programs"
            subtitle="Choose from our scientifically designed programs to match your goals"
          />
        </div>

        {/* Card Grid Wrapper */}
        <div className="relative w-full">
          {/* Outer spread background glow */}
          <div
            className="absolute inset-x-0 pointer-events-none z-0"
            style={{
              top: "-10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 1500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(24,92,166,0.38) 0%, rgba(21, 60, 124, 0.12) 55%, rgba(0,0,0,0) 25%)",
              filter: "blur(60px)",
            }}
          />

          {/* Mid ring background glow */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              maxWidth: 1100,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(15, 34, 54, 0.55) 0%, rgba(25, 41, 59, 0.62) 50%, rgba(90, 83, 83, 0) 72%)",
              filter: "blur(40px)",
            }}
          />

          {/* Core hotspot background glow */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              maxWidth: 480,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.70) 0%, rgba(24,92,166,0.35) 50%, rgba(0,0,0,0) 75%)",
              filter: "blur(28px)",
            }}
          />

          {/* Cards Display Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 items-stretch z-10">
            {programs.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ======================================================================
    PROGRAM CARD WITH INLINE BRAND ICON BADGES
====================================================================== */
const ProgramCard: React.FC<{ program: ProgramItem }> = ({ program }) => {
  return (
    <Link
      to={program.to}
      className="group flex flex-col overflow-hidden no-underline bg-gradient-to-br from-[#1D1D1D] via-[#131313] to-[#0A0A0A] rounded-[28.81px] shadow-[inset_0_0_0_1.2px_rgba(26,107,239,0.30)] transition-all duration-300 ease-in-out hover:shadow-[inset_0_0_0_1.2px_rgba(26,107,239,0.65),0_0_40px_rgba(11,96,189,0.28)] hover:-translate-y-1"
    >
      {/* Card Image Wrapper */}
      <div className="relative w-full overflow-hidden aspect-[362/268] rounded-[16px] bg-[#161616]">
        <img
          src={program.imageSrc}
          alt={program.title}
          className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/362x268/161616/333333?text=${encodeURIComponent(program.title)}`;
          }}
        />
        {/* Image bottom dissolve mask */}
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[#0D0D0D] to-transparent" />
      </div>

      {/* Card Body Wrapper */}
      <div className="flex-1 flex flex-col p-[28.81px]">
        {/* BRAND IDENTITY ICON BADGE LAYER */}

        {/* Title */}
        <div className="text-white transition-colors duration-300 group-hover:text-blue-400 font-['Inter'] font-bold text-[24.8px] leading-[34px]">
          {program.title}
        </div>

        {/* Description */}
        <div className="pt-[12px] font-['Inter'] font-normal text-[15px] leading-[24px] text-white/70 max-w-[302.48px] flex-1">
          {program.description}
        </div>

        {/* GLASSMORPHISM "LEARN MORE" BUTTON */}
        <div className="w-full h-[62px] rounded-full relative overflow-hidden backdrop-blur-[12px] backdrop-saturate-[1.6] bg-gradient-to-b from-white/[0.11] to-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.30)] transition-all duration-300 ease-in-out flex items-center justify-center mt-7 cursor-pointer select-none hover:backdrop-blur-[16px] hover:backdrop-saturate-[1.8] hover:from-blue-500/[0.22] hover:to-blue-500/[0.10] hover:shadow-[inset_0_1px_0_rgba(59,130,246,0.40),inset_0_-1px_0_rgba(59,130,246,0.10),0_4px_16px_rgba(59,130,246,0.18)] group/btn">
          <span className="font-['Inter'] font-semibold text-[17.5px] leading-[26px] text-[#3B82F6] transition-colors duration-300 ease-in-out relative z-10 group-hover/btn:text-white">
            Learn More
          </span>
        </div>
      </div>
    </Link>
  );
};
