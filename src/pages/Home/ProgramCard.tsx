import React from "react";
import { Link } from "react-router";

interface ProgramItem {
  title: string;
  description: string;
  imageSrc: string;
  to: string;
  iconBg: string;
  iconPath: string; // SVG path data for inline render mapping
}

const defaultPrograms: ProgramItem[] = [
  {
    title: "Health & Fitness",
    description:
      "Personalized workout plans, nutrition guidance, and wellness tracking.",
    imageSrc: "/PrgrameImg.png",
    to: "/programs/fitness",
    iconBg: "bg-[#1B73E8]",
    iconPath:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Mental Health",
    description:
      "Mindfulness practices, stress management, and emotional well-being support.",
    imageSrc: "/PrgrameImg.png",
    to: "/programs/mental",
    iconBg: "bg-[#D017A0]",
    iconPath:
      "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Educational Services",
    description:
      "Skill development, certifications, and lifelong learning opportunities.",
    imageSrc: "/PrgrameImg.png",
    to: "/programs/education",
    iconBg: "bg-[#00C48C]",
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 14zm-6.16-3.422a12.083 12.083 0 00.665 6.479A11.952 11.952 0 015.84 10.578zM12 14v7a11.95 11.95 0 01-4.37-3.414A12.083 12.083 0 0012 14z",
  },
  {
    title: "Career Preparation",
    description:
      "Job readiness, interview prep, and professional development programs.",
    imageSrc: "/PrgrameImg.png",
    to: "/programs/career",
    iconBg: "bg-[#FF4A22]",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

interface ProgramsSectionProps {
  programs?: ProgramItem[];
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  programs = defaultPrograms,
}) => {
  return (
    <section className="relative w-full bg-[#000000] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* BLOB A — Top-right atmospheric flare */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 580,
          height: 580,
          top: -160,
          right: -140,
          borderRadius: "50%",
          background: "#185CA6",
          filter: "blur(190px)",
          opacity: 0.2,
        }}
      />

      {/* BLOB B — Bottom-left counter-balance */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 480,
          height: 480,
          bottom: -80,
          left: -100,
          borderRadius: "50%",
          background: "rgba(0, 122, 255, 0.18)",
          filter: "blur(160px)",
        }}
      />

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center gap-[60px]">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h2
            className="flex items-center justify-center flex-wrap gap-4 leading-none tracking-tight"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
            }}
          >
            <span className="text-white">Our</span>
            <span style={{ color: "#0B60BD" }}>Programs</span>
          </h2>
          <p
            className="text-white/70 max-w-2xl leading-relaxed"
            style={{
              fontSize: "clamp(16px, 2vw, 24px)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              lineHeight: "1.4",
            }}
          >
            Choose from our scientifically designed programs to match your goals
          </p>
        </div>

        {/* Card Grid Wrapper */}
        <div className="relative w-full">
          {/* Outer spread background glow */}
          <div
            className="absolute inset-x-0 pointer-events-none z-0"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "130%",
              maxWidth: 1500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(24,92,166,0.38) 0%, rgba(11,60,140,0.12) 55%, rgba(0,0,0,0) 75%)",
              filter: "blur(60px)",
            }}
          />

          {/* Mid ring background glow */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 1100,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(24,92,166,0.55) 0%, rgba(11,96,189,0.20) 50%, rgba(0,0,0,0) 72%)",
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
      className="group flex flex-col overflow-hidden no-underline"
      style={{
        background:
          "linear-gradient(135deg, #1D1D1D 0%, #131313 50%, #0A0A0A 100%)",
        borderRadius: 28.81,
        boxShadow: "inset 0 0 0 1.2px rgba(26, 107, 239, 0.30)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "inset 0 0 0 1.2px rgba(26,107,239,0.65), 0 0 40px rgba(11,96,189,0.28)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "inset 0 0 0 1.2px rgba(26, 107, 239, 0.30)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Card Image Wrapper */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "362 / 268",
          borderRadius: 16,
          background: "#161616",
        }}
      >
        <img
          src={program.imageSrc}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/362x268/161616/333333?text=${encodeURIComponent(program.title)}`;
          }}
        />
        {/* Image bottom dissolve mask */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0) 100%)",
          }}
        />
      </div>

      {/* Card Body Wrapper */}
      <div className="flex-1 flex flex-col" style={{ padding: 28.81 }}>
        {/* BRAND IDENTITY ICON BADGE LAYER */}
        <div
          className={`w-9 h-9 mb-4 flex items-center justify-center rounded-[10px] ${program.iconBg} text-white shadow-md`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={program.iconPath}
            />
          </svg>
        </div>

        {/* Title */}
        <div
          className="text-white transition-colors duration-300 group-hover:text-blue-400"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 24.8, // Slightly adjusted text layout to balance icon inclusion padding
            lineHeight: "34px",
          }}
        >
          {program.title}
        </div>

        {/* Description */}
        <div
          style={{
            paddingTop: 12,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: "24px",
            color: "rgba(255,255,255,0.70)",
            maxWidth: 302.48,
            flex: 1,
          }}
        >
          {program.description}
        </div>

        {/* GLASSMORPHISM "LEARN MORE" BUTTON */}
        <div
          className="w-full flex items-center justify-center mt-7 cursor-pointer select-none"
          style={{
            height: 62,
            borderRadius: 9999,
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(12px) saturate(1.6)",
            WebkitBackdropFilter: "blur(12px) saturate(1.6)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.30)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backdropFilter = "blur(16px) saturate(1.8)";
            el.style.WebkitBackdropFilter = "blur(16px) saturate(1.8)";
            el.style.background =
              "linear-gradient(180deg, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.10) 100%)";
            el.style.boxShadow =
              "inset 0 1px 0 rgba(59,130,246,0.40), inset 0 -1px 0 rgba(59,130,246,0.10), 0 4px 16px rgba(59,130,246,0.18)";
            const text = el.querySelector("span") as HTMLElement;
            if (text) text.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backdropFilter = "blur(12px) saturate(1.6)";
            el.style.WebkitBackdropFilter = "blur(12px) saturate(1.6)";
            el.style.background =
              "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 100%)";
            el.style.boxShadow =
              "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.30)";
            const text = el.querySelector("span") as HTMLElement;
            if (text) text.style.color = "#3B82F6";
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 17.5,
              lineHeight: "26px",
              color: "#3B82F6",
              transition: "color 0.3s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            Learn More
          </span>
        </div>
      </div>
    </Link>
  );
};
