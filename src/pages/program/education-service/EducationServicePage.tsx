import React from "react";
import ProgrameMain from "../../program/ProgrameMain";
import { ActionButton } from "@/components/ui/ActionButton";

export default function EducationServicePage() {
  return (
    <div
      className="bg-[#0A0A0A] text-white pt-
    6"
    >
      {/* Full Screen Hero */}
      <div className="w-full min-h-[110vh] relative flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/EducationalProgmeBanner.png" // Replace with your actual image
            alt="Education Service Background"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-6 py-2.5 rounded-full mb-8">
              <span className="text-blue-400">★</span>
              <span className="uppercase text-blue-300 text-sm font-medium tracking-widest">
                EDUCATION SERVICE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-extrabold leading-[78px] mb-6">
              You Have Potential.
              <br />
              We <span className="text-blue-600">Unlock It</span>
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Education. Support. Direction.
              <br />
              That's your transformation. Get access to online courses, career
              training, job placement and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <ActionButton
                label="Start Free Assessment"
                className="bg-[#007AFF]"
              />
              <button className="h-14 px-8 py-3.5 bg-white/10 rounded-full outline outline-1 outline-offset-[-1px] outline-white/20 flex items-center justify-center gap-2.5 hover:bg-white/20 transition-all">
                <span className="text-white text-base font-medium">
                  Learn More
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">10K+</div>
                <div className="text-white/60 text-sm mt-1">
                  Students Enrolled
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">500+</div>
                <div className="text-white/60 text-sm mt-1">Expert Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">95%</div>
                <div className="text-white/60 text-sm mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <ProgrameMain />
    </div>
  );
}
