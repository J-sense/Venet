import { ActionButton } from "@/components/ui/ActionButton";
import HowItWorks from "@/components/ui/ProgrammeHowItWorksSection";

import { educationSteps } from "./data/programData";
import { useEducationServiceProgramQuery } from "@/redux/features/programs/program.api";

export default function EducationServicePage() {
  const { data: educationServiceProgram } =
    useEducationServiceProgramQuery(undefined);
  console.log(educationServiceProgram);
  return (
    <div className="bg-[#0A0A0A] text-white pt-6">
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
        <div className="relative z-10 w-full max-w-[1600px]  px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full mb-6 sm:mb-8 max-w-full">
              <span className="text-blue-400 text-xs sm:text-base shrink-0">
                ★
              </span>
              <span className="uppercase text-blue-300 text-[10px] sm:text-sm font-medium tracking-wider sm:tracking-widest truncate sm:whitespace-normal">
                EDUCATION . SERVICE . DIRECTION
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-[78px] mb-4 md:mb-6">
              You Have Potential.
              <br />
              We <span className="text-blue-600">Unlock It</span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-10 md:mb-12">
              Education. Support. Direction.
              <br />
              That's your transformation. Get access to online courses, career
              training, job placement and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full sm:w-auto">
              <ActionButton
                label="Start Free Assessment"
                className="bg-[#007AFF] w-full sm:w-auto"
              />
              <button className="w-full sm:w-auto h-14 px-8 py-3.5 bg-white/10 rounded-full outline outline-1 outline-offset-[-1px] outline-white/20 flex items-center justify-center gap-2.5 hover:bg-white/20 transition-all">
                <span className="text-white text-base font-medium">
                  Learn More
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
                  10K+
                </div>
                <div className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-1">
                  Students Enrolled
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
                  500+
                </div>
                <div className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-1">
                  Expert Mentors
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
                  95%
                </div>
                <div className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-1">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <HowItWorks
        programId={
          educationServiceProgram?.data?.id ||
          "02ed108d-1636-4acd-acd9-c85a30100fbc"
        }
        programTitle="Education Service Program"
        steps={educationSteps}
        subtitle="Your journey from assessment to career success in 5 simple steps"
        buttonText="Start Learning Now"
      />
    </div>
  );
}
