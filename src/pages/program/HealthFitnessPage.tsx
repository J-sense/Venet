import { LearnMoreButton } from "@/components/ui/LearnMoreButton";
import HowItWorks from "@/components/ui/ProgrammeHowItWorksSection";

import { StartFreeButton } from "@/components/assessment";
import HeadingBadge from "@/components/ui/HeadingBadge";
import { useHealthAndFitnessProgramQuery } from "@/redux/features/programs/program.api";
import { fitnessSteps } from "./data/programData";

export default function HealthFitnessPage() {
  const { data: healthAndFintnessProgram } =
    useHealthAndFitnessProgramQuery(undefined);
  console.log(healthAndFintnessProgram)
  return (
    <div className="bg-[#0A0A0A] text-white ">
      {/* Full Screen Hero Section */}
      <div className="w-full min-h-[115vh] relative flex items-center justify-center ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/HealthProgrammeImg.png"
            alt="Health & Fitness Background"
            className="w-full h-full object-cover"
          />

          {/* Gradients */}
          {/* 1. Top dark gradient (new) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

          {/* 2. Side gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/40" />

          {/* 3. Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/90" />

          {/* 4. Radial bottom boost */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-black/0 via-black/90 to-transparent" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col items-center gap-2 text-center max-w-[917px] mx-auto">
            {/* Badge */}

            <HeadingBadge children="Health and fitness program" />

            {/* Headline */}
            <div className="flex flex-col items-center gap-6 md:gap-10 mt-4 md:mt-0">
              <div>
                <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight md:leading-[80px]">
                  Achieve Your Health &amp; Fitness Goals with{" "}
                  <span className="text-blue-600">vNXT</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="max-w-[814px] text-white/70 text-base md:text-lg font-normal leading-relaxed md:leading-7 text-center px-2">
                Join the vNXT community and take charge of your health and
                fitness journey. With personalized workout plans, nutrition
                guidance, and expert support.
              </p>
            </div>

            {/* Buttons & Stats */}
            <div className="w-full max-w-md flex flex-col items-center gap-8 mt-6">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <StartFreeButton
                  text="Start Free Assessment"
                  showIcon
                  className="px-8 py-3.5 text-sm font-semibold min-w-[220px]"
                />

                <LearnMoreButton />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">10K+</div>
                  <div className="text-white/50 text-xs sm:text-sm font-normal">
                    Active Members
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">500+</div>
                  <div className="text-white/50 text-xs sm:text-sm font-normal">
                    Expert Trainers
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">95%</div>
                  <div className="text-white/50 text-xs sm:text-sm font-normal">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Content Below */}
      <HowItWorks
        programId={healthAndFintnessProgram?.data?.id || "086fde4d-87d9-4191-ac82-61ced65f51ee"}
        programTitle="Health & Fitness Program"
        steps={fitnessSteps}
        subtitle="Your journey from assessment to fitness transformation in 5 simple steps"
        buttonText="Start Your Fitness Journey"
      />
    </div>
  );
}
