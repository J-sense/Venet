import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

export const MissionSection: React.FC = () => {
  const stats = [
    {
      value: "10K+",
      label: "Active Users",
      textColor: "text-[#2B7FFF]",
      iconBg: "bg-[#2B7FFF]",
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      value: "5K+",
      label: "Certificates Issued",
      textColor: "text-[#D017A0]",
      iconBg: "bg-[#D017A0]",
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      value: "500+",
      label: "Expert Members",
      textColor: "text-[#00C950]",
      iconBg: "bg-[#00C950]",
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.121 14.121L19 19m-7-7h7m-7 4h3m-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      ),
    },
    {
      value: "95%",
      label: "Completion Rate",
      textColor: "text-[#FF4A22]",
      iconBg: "bg-[#FF4A22]",
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Center Middle Blue Gradient Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "800px",
          height: "600px",
          // Increased opacity from 15 (0F) to 30 (4D)
          background: "#0B60BD4D",
          borderRadius: "50%",
          // Slightly reduced blur makes the color "pop" more
          filter: "blur(120px)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1580px] mx-auto flex flex-col items-center gap-16">
        {/* Header Block */}
        <div className="flex flex-col items-center gap-3 text-center w-full">
          <SectionHeader
            titlePrimary="Our"
            titleAccent="Mission"
            subtitle="Turning Our Mission Into Your Growth"
          />
        </div>

        {/* Two-Column Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text & Stats */}
          <div className="flex flex-col gap-10">
            {/* Paragraphs */}
            <div className="space-y-6 text-[#D1D5DC] text-[19px] font-normal">
              <p>
                At VNET, we believe everyone deserves access to high-quality
                programs that can transform their health, mind, skills, and
                career. Our AI-powered platform creates personalized roadmaps
                that adapt to your unique journey.
              </p>
              <p className="text-[#99A1AF]">
                We combine cutting-edge technology with expert guidance to
                provide an unparalleled learning and growth experience. From day
                one to certification, we're with you every step of the way.
              </p>
            </div>

            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 p-6 rounded-2xl border border-[#1E2939] shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #101828 0%, #000000 100%)",
                  }}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-[10px] ${stat.iconBg}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`text-[28px] font-bold leading-none tracking-tight ${stat.textColor}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[13px] font-medium text-[#717680]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Growth Badge */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:mx-0">
            {/* Main Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5">
              <img
                src="/missionImg.png"
                alt="VNET Gym Environment"
                className="w-full h-full object-cover"
              />
              {/* Bottom shadow gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Growth Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4 px-5 py-4 bg-[#0A0C10]/95 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="w-11 h-11 flex items-center justify-center bg-[#00C950] rounded-xl">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg font-bold leading-tight">
                    Growth
                  </span>
                  <span className="text-[#888D96] text-[11px] font-medium mt-0.5">
                    Continuous Improvement
                  </span>
                </div>
              </div>

              {/* Floating dots (optional, to match original flair slightly) */}
              <div className="absolute top-[10%] right-[10%] w-2 h-2 bg-[#2B7FFF] rounded-full shadow-[0_0_8px_#2B7FFF]" />
              <div className="absolute top-[30%] left-[8%] w-1.5 h-1.5 bg-[#D017A0] rounded-full opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
