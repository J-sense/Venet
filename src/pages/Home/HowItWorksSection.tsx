import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

interface StepItem {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const stepsData: StepItem[] = [
  {
    id: 1,
    title: "Take Free Assessment",
    description:
      "Complete our quick assessment to identify your goals and needs.",
    color: "#D017A0",
    icon: (
      <svg
        className="w-8 h-8" // Increased size slightly for better visibility
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5" // Increased stroke thickness for a bold, modern look
        strokeLinecap="round" // Adds rounded ends to lines
        strokeLinejoin="round" // Adds rounded corners to junctions
      >
        {/* Clipboard body */}
        <rect x="5" y="4" width="14" height="17" rx="2" ry="2" />
        {/* Clipboard top tab */}
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        {/* Centered Checkmark */}
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Get AI-Powered Roadmap",
    description:
      "Receive a personalized program with daily tasks and milestones.",
    color: "#0099FF",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Track Your Progress",
    description:
      "Complete tasks, upload proof, and monitor your journey in real-time.",
    color: "#00D084",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Earn Certificates",
    description: "Receive verified certificates upon program completion.",
    color: "#FF6B35",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Access Talent Portal",
    description:
      "Get matched with opportunities and connect with expert mentors.",
    color: "#7B5FFF",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z" />
      </svg>
    ),
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] py-20 px-4 overflow-hidden">
      {/* Blue gradient background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(0, 102, 255, 0.05) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          {/* Fitness watermark behind heading only */}
          <div className="absolute inset-0 flex items-center opacity-10 justify-center pointer-events-none -z-10">
            <div
              className="font-black text-white/30"
              style={{
                fontSize: "280px",
                lineHeight: "1",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              Fitness
            </div>
          </div>

          <SectionHeader
            titlePrimary="How It"
            titleAccent="Works"
            subtitle="Your journey from assessment to career success in 5 simple steps"
          />
        </div>

        {/* Steps */}
        {/* Steps */}
        <div className="space-y-12">
          {/* Steps */}
          <div className="space-y-12">
            {stepsData.map((step) => (
              <div
                key={step.id}
                className="relative flex gap-6 items-start p-6 rounded-2xl border border-white/5 backdrop-blur-sm transition-all bg-[#1D293D80] duration-300 hover:border-gray-700/50 overflow-hidden"
                style={{
                  // Radial gradient centered in the card
                  background:
                    "radial-gradient(circle at center, #0B60BD26, transparent 70%)",
                }}
              >
                {/* Icon circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-[3px] bg-gray-900/60"
                    style={{
                      borderColor: step.color,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    <div style={{ color: step.color }}>{step.icon}</div>

                    {/* Number badge */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-[3px] border-[#000000]"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, #a855f7)`,
                      }}
                    >
                      {String(step.id).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
