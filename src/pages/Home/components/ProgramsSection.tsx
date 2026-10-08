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
      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center gap-[60px]">
        <SectionHeader
          titlePrimary="Our"
          titleAccent="Programs"
          subtitle="Choose from our scientifically designed programs to match your goals"
        />

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
    PROGRAM CARD (no hover effects)
====================================================================== */
const ProgramCard: React.FC<{ program: ProgramItem }> = ({ program }) => {
  return (
    <Link
      to={program.to}
      className="flex flex-col overflow-hidden no-underline rounded-[28.81px]
        bg-gradient-to-b from-[#1D1D1D] via-[#131313] to-[#0A0A0A]
        border border-[#1A6BEF]/30
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
    >
      {/* Card Image */}
      <div className="relative w-full overflow-hidden aspect-[362/268] rounded-[16px] bg-[#161616]">
        <img
          src={program.imageSrc}
          alt={program.title}
          className="block w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/362x268/161616/333333?text=${encodeURIComponent(program.title)}`;
          }}
        />
        {/* Bottom dissolve mask */}
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        {/* Inset edge overlay above the image */}
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none
            shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
        />
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-[28.81px]">
        <div className="text-white font-['Inter'] font-bold text-[24.8px] leading-[34px] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
          {program.title}
        </div>

        <div className="pt-[12px] font-['Inter'] font-normal text-[15px] leading-[24px] text-white/70 max-w-[302.48px] flex-1">
          {program.description}
        </div>

        {/* "Learn More" button */}
        <div
          className="w-full h-[62px] mt-7 rounded-full flex items-center justify-center select-none
            bg-gradient-to-b from-white/[0.11] to-white/[0.04]
            border border-white/10
            shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
        >
          <span className="font-['Inter'] font-semibold text-[17.5px] leading-[26px] text-[#3B82F6] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
            Learn More
          </span>
        </div>
      </div>
    </Link>
  );
};