import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

export const MissionSection: React.FC = () => {
  const stats = [
    {
      value: "10K+",
      label: "Active Users",
      textColor: "text-[#2B7FFF]",
      gradient: "from-[#2B7FFF] to-[#00B8DB]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
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
      textColor: "text-[#AD46FF]",
      gradient: "from-[#AD46FF] to-[#F6339A]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
          />
        </svg>
      ),
    },
    {
      value: "500+",
      label: "Expert Mentors",
      textColor: "text-[#00C950]",
      gradient: "from-[#00C950] to-[#00BC7D]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
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
      textColor: "text-[#FF6900]",
      gradient: "from-[#FF6900] to-[#FB2C36]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
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
    <section className="relative w-full bg-[#030303] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* ── HIGH-INTENSITY LINEAR BACKGROUND SYSTEM (Using your specified colors) ── */}
      {/* Primary Ambient Backlight Track */}
      <div
        className="absolute left-[-15%] top-[20%] w-[130%] h-[480px] pointer-events-none z-0 transform -rotate-[12deg] opacity-90 filter blur-[100px] mix-blend-initial"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(16, 24, 40, 1) 35%, rgba(16, 24, 40, 1) 65%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      {/* Layer 2: Vivid Light Leak Core to give your specific colors an ultra-glowing presence */}
      <div
        className="absolute left-[-5%] top-[30%] w-[110%] h-[180px] pointer-events-none z-0 transform -rotate-[12deg] opacity-100 filter blur-[60px] mix-blend-plus-lighter"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(16, 24, 40, 1) 40%, rgba(16, 24, 40, 1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}

      {/* Header Block */}
      <div className="flex flex-col items-center gap-5 text-center w-full">
        <SectionHeader
          titlePrimary="Our"
          titleAccent="Mission"
          subtitle="Turning our mission into your growth"
        />

        {/* Two-Column Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Container: Text Descriptions & Stats Deck */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            {/* Paragraph Text */}
            <div className="space-y-6 text-base sm:text-lg lg:text-[21.6px] font-normal leading-[1.65] font-inter">
              <p className="text-[#D1D5DC]">
                At vNET, we believe everyone deserves access to high-quality
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

            {/* Quad Stats Matrix Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 p-7 bg-gradient-to-br from-[#101828]/80 to-black/90 backdrop-blur-sm rounded-[19.2px] border border-[#1E2939]/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Icon Frame */}
                  <div
                    className={`w-11 h-11 p-2 flex items-center justify-center bg-gradient-to-br ${stat.gradient} rounded-[12px]`}
                  >
                    {stat.icon}
                  </div>
                  {/* Values */}
                  <div className="space-y-1">
                    <div
                      className={`text-4xl lg:text-[43.2px] font-bold tracking-tight ${stat.textColor} font-inter`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-[16.8px] font-normal text-[#99A1AF] font-inter">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Container: Heavy Graphic Frame + Floating Indicator Dots */}
          <div className="lg:col-span-6 relative w-full aspect-[728/720] max-w-[728px] mx-auto">
            {/* Ambient image background backlight flare */}
            <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-[#2B7FFF]/40 to-[#AD46FF]/40 blur-[76.8px] rounded-[28.8px] pointer-events-none" />

            {/* Primary Gym Graphic Container */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#101828]/80 to-black rounded-[28.8px] border border-[#1E2939]/70 overflow-hidden group backdrop-blur-sm">
              <img
                src="/missionImg.png"
                alt="vNET Training Environment"
                className="w-full h-full object-cover rounded-[28.8px] transition-transform duration-700 group-hover:scale-102"
              />

              {/* Bottom Heavy Cinematic Shadow Layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Bottom Left Floating Badge Component */}
              <div className="absolute bottom-10 left-10 right-10 sm:right-auto flex items-center gap-5 p-[19.2px] bg-black/75 rounded-[19.2px] border border-[#364153] backdrop-blur-md">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#00C950] to-[#009966] rounded-[16.8px]">
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
                <div className="flex flex-col font-inter">
                  <span className="text-white text-xl lg:text-[28.8px] font-bold leading-none">
                    Growth
                  </span>
                  <span className="text-[#99A1AF] text-xs lg:text-[16.8px] mt-1 font-normal">
                    Continuous Improvement
                  </span>
                </div>
              </div>
            </div>

            {/* Design Element Floating Dots */}
            <div className="absolute top-[5.5%] right-[7%] w-3.5 h-3.5 bg-[#2B7FFF] rounded-full opacity-90 shadow-[0_0_15px_#2B7FFF] animate-pulse" />
            <div className="absolute top-[16%] left-[5.5%] w-2.5 h-2.5 bg-[#AD46FF] rounded-full opacity-60 shadow-[0_0_10px_#AD46FF]" />
            <div className="absolute top-[50%] right-[9%] w-2.5 h-2.5 bg-[#00B8DB] rounded-full opacity-80 shadow-[0_0_12px_#00B8DB]" />
          </div>
        </div>
      </div>
    </section>
  );
};
