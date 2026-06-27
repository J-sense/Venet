import React from "react";
import ProgrameMain from "../../program/ProgrameMain";
import { Check } from "lucide-react";

export default function MentalHealthPage() {
  return (
    <div className="bg-[#0A0A0A] text-white pt-20 bg-black">
      {/* Full Screen Hero Section */}
      <div className="w-full relative flex items-center overflow-hidden h-[100vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mentalHealthBanner.png" // ← Replace with your actual image
            alt="Mental Health Background"
            className="w-full h-full object-cover"
          />

          {/* Gradients - Dark & Dramatic like the image */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
        </div>

        {/* Top Floating Text */}

        <div className="absolute top-8 right-8 md:top-12 md:right-24 z-20 text-right">
          <h3 className="text-gray-300 font-semibold tracking-widest text-sm md:text-base">RECOVERY IS POSSIBLE</h3>
          <p className="text-gray-500 text-xs tracking-widest mt-1">HEALING. PURPOSE. FREEDOM. LIFE.</p>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6  flex justify-between items-center mt-12">

          {/* Left Side Copy */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 px-4 py-1.5 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="uppercase text-blue-300 text-xs font-medium tracking-widest">
                MENTAL HEALTH PROGRAM
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 w-7xl ">
              You Are Not <span className="text-[#3B82F6]">Alone</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-lg mb-10 font-['Inter'] leading-relaxed">
              Mental health. Substance abuse. Hope lost. Whatever you're carrying
              — change is possible. Transformation is real. VNET is where your
              comeback begins.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-[#1A63F4] hover:bg-blue-600 shadow-[0_0_20px_rgba(26,99,244,0.4)] transition px-8 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-3">
                Start Your Recovery
                <span>→</span>
              </button>
              <button className="px-8 py-3.5 bg-black/40 border border-white/20 hover:bg-white/10 rounded-full transition-all text-sm font-medium flex items-center justify-center">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 md:gap-14 text-left">
              <div>
                <div className="text-2xl md:text-3xl font-bold ">10K+</div>
                <div className="text-white/50 text-xs mt-1 font-['Inter']">Active Members</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold ">500+</div>
                <div className="text-white/50 text-xs mt-1 font-['Inter']">Expert Trainers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold ">95%</div>
                <div className="text-white/50 text-xs mt-1 font-['Inter']">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Glowing Arrow (Center) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none">
            <div className="w-32 h-16 bg-gradient-to-r from-red-500/0 via-red-500/20 to-blue-500/80 blur-xl absolute" />
            <span className="text-blue-400 text-8xl font-thin drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] relative z-10">→</span>
          </div>

          {/* Right Side Visual Elements */}


        </div>

        {/* Bottom Banner Text */}

      </div>

      {/* Rest of Page Content */}
      <ProgrameMain />
    </div>
  );
}
