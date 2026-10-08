import HowItWorks from "@/components/ui/ProgrammeHowItWorksSection";
import { StartFreeButton } from "@/components/ui/StartFreeButton";
import { LearnMoreButton } from "@/components/ui/LearnMoreButton";

import { careerSteps } from "./data/programData";
import { useCareerProgrammeQuery } from "@/redux/features/programs/program.api";
import HeadingBadge from "@/components/ui/HeadingBadge";

export default function CareerPage() {
  const { data: careerProgramData } = useCareerProgrammeQuery(undefined);
  console.log(careerProgramData);
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Full Screen Hero */}
      <div className="w-full h-[120vh] relative flex items-center overflow-hidden">
        {/* Background Image - No extra gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CarrerBannerImg.png"
            alt="Career Programs Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12  py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side Copy */}
            <div className="max-w-7xl">
              {/* Badge */}



              <HeadingBadge children="CAREER DEVELOPMENT PROGRAM" />

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                We see Potential,
                <br />
                We <span className="text-[#3B82F6]">Unlock Careers</span>
              </h1>

              <p className="text-base md:text-lg text-white/80 max-w-lg mb-10 font-['Inter'] leading-relaxed">
                Online courses, 1-on-1 mentorship, career training, and job
                placement — all in one network built for people who are ready to
                change their lives.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <StartFreeButton
                  text="Start Free Assessment"
                  showIcon
                  className="px-8 py-3.5 text-sm font-semibold min-w-[220px]"
                />

                <LearnMoreButton />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 text-left">
                <div>
                  <div className="text-2xl md:text-3xl font-bold ">10K+</div>
                  <div className="text-white/50 text-xs mt-1 font-['Inter']">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold ">500+</div>
                  <div className="text-white/50 text-xs mt-1 font-['Inter']">
                    Expert Trainers
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold ">95%</div>
                  <div className="text-white/50 text-xs mt-1 font-['Inter']">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Can be used for image or empty for now */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      <HowItWorks
        programId={
          careerProgramData?.data?.id || "6f9df1d7-a70b-4355-add7-2df64157bfd8"
        }
        programTitle="Career Program"
        steps={careerSteps}
        subtitle="Your journey from assessment to career success in 5 simple steps"
        buttonText="Start Your Career Journey"
      />
    </div>
  );
}
