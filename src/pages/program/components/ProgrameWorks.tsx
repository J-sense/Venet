"use client";

import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  borderColor: string;
  ringColor: string;
  badgeBg: string;
  icon: React.ReactNode;
  textPosition: "above" | "below";
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Take Free Assessment",
      description:
        "Complete our quick assessment to identify your goals and needs.",
      borderColor: "#8B5CF6",
      ringColor: "rgba(139,92,246,0.25)",
      badgeBg: "#7C3AED",
      textPosition: "below",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Get AI-Powered Roadmap",
      description:
        "Receive a personalized program with daily tasks and milestones.",
      borderColor: "#3B82F6",
      ringColor: "rgba(59,130,246,0.25)",
      badgeBg: "#1D4ED8",
      textPosition: "below",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Track Your Progress",
      description:
        "Complete tasks, upload proof, and monitor your journey in real-time.",
      borderColor: "#10B981",
      ringColor: "rgba(16,185,129,0.25)",
      badgeBg: "#059669",
      textPosition: "below",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            points="22 7 13.5 15.5 8.5 10.5 2 17"
          />
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            points="16 7 22 7 22 13"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Earn Certificates",
      description: "Receive verified certificates upon program completion.",
      borderColor: "#F97316",
      ringColor: "rgba(249,115,22,0.25)",
      badgeBg: "#EA580C",
      textPosition: "above",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <circle
            cx="12"
            cy="8"
            r="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 14l-2 7 6-3 6 3-2-7"
          />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Access Talent Portal",
      description:
        "Get matched with opportunities and connect with expert mentors.",
      borderColor: "#6366F1",
      ringColor: "rgba(99,102,241,0.25)",
      badgeBg: "#4F46E5",
      textPosition: "above",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          />
        </svg>
      ),
    },
  ];

  // Desktop node positions inside a 860×420 SVG viewBox
  const desktopPositions = [
    { cx: 110, cy: 310 }, // 01 — lowest (bottom-left)
    { cx: 270, cy: 235 }, // 02
    { cx: 430, cy: 235 }, // 03 — middle
    { cx: 590, cy: 170 }, // 04
    { cx: 750, cy: 105 }, // 05 — highest (top-right)
  ];

  return (
    <section className="w-full bg-[#030303] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How It <span className="text-blue-500">Works</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Your journey from assessment to career success in 5 simple steps
          </p>
        </div>

        {/* ── DESKTOP (lg+): SVG canvas with ascending snake path ── */}
        <div
          className="hidden lg:block relative w-full"
          style={{ height: "480px" }}
        >
          {/* Dashed curved path */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 860 420"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={`
                M ${desktopPositions[0].cx} ${desktopPositions[0].cy}
                C ${desktopPositions[0].cx + 90} ${desktopPositions[0].cy},
                  ${desktopPositions[1].cx - 90} ${desktopPositions[1].cy},
                  ${desktopPositions[1].cx} ${desktopPositions[1].cy}
                C ${desktopPositions[1].cx + 80} ${desktopPositions[1].cy},
                  ${desktopPositions[2].cx - 80} ${desktopPositions[2].cy},
                  ${desktopPositions[2].cx} ${desktopPositions[2].cy}
                C ${desktopPositions[2].cx + 90} ${desktopPositions[2].cy},
                  ${desktopPositions[3].cx - 90} ${desktopPositions[3].cy},
                  ${desktopPositions[3].cx} ${desktopPositions[3].cy}
                C ${desktopPositions[3].cx + 80} ${desktopPositions[3].cy},
                  ${desktopPositions[4].cx - 80} ${desktopPositions[4].cy},
                  ${desktopPositions[4].cx} ${desktopPositions[4].cy}
              `}
              stroke="#1E3A5F"
              strokeWidth="2"
              strokeDasharray="9 7"
              strokeLinecap="round"
            />
          </svg>

          {/* Step nodes */}
          {steps.map((step, i) => {
            const { cx, cy } = desktopPositions[i];
            const leftPct = (cx / 860) * 100;
            // Map SVG cy (0-420) to container px (0-480)
            const topPx = (cy / 420) * 480;
            const isAbove = step.textPosition === "above";

            return (
              <div
                key={step.number}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPx}px`,
                  transform: "translate(-50%, -50%)",
                  width: "155px",
                }}
              >
                {/* Text above icon */}
                {isAbove && (
                  <div className="mb-4 text-center">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                )}

                {/* Icon circle */}
                <div className="relative">
                  {/* Number badge */}
                  <div
                    className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.badgeBg }}
                  >
                    <span className="text-white text-[10px] font-bold leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Outer glow ring + border circle */}
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center relative z-10"
                    style={{
                      border: `2px solid ${step.borderColor}`,
                      backgroundColor: "#08080f",
                      boxShadow: `0 0 0 7px ${step.ringColor}`,
                    }}
                  >
                    {/* Inner colored circle */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: step.borderColor }}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Text below icon */}
                {!isAbove && (
                  <div className="mt-4 text-center">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── MOBILE / TABLET (<lg): Vertical timeline ── */}
        <div className="lg:hidden relative max-w-sm mx-auto mt-10 pl-2">
          {/* Dashed vertical line */}
          <div
            className="absolute left-[27px] top-8 bottom-8 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #1E3A5F 0px, #1E3A5F 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-5">
                {/* Circle */}
                <div className="relative shrink-0">
                  <div
                    className="absolute -top-1.5 -right-1.5 z-20 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.badgeBg }}
                  >
                    <span className="text-white text-[9px] font-bold leading-none">
                      {step.number}
                    </span>
                  </div>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      border: `2px solid ${step.borderColor}`,
                      backgroundColor: "#08080f",
                      boxShadow: `0 0 0 5px ${step.ringColor}`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: step.borderColor }}
                    >
                      <div className="scale-90">{step.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
