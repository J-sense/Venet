import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { AssessmentModal } from "@/components/assessment";
import { useAllProgramsQuery } from "@/redux/features/programs/program.api";

export default function BannerV2() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const stats = [
    { label: "Members Transformed", value: "10K+" },
    { label: "Expert Coaches", value: "500+" },
    { label: "Success Rate", value: "95%" },
  ];
  const { data: getAllPrograms } = useAllProgramsQuery(undefined);
  console.log(getAllPrograms);
  return (
    <div className="relative min-h-[100vh] lg:min-h-[112vh] flex items-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bannerTwo.png" // Replace with your actual image name
          alt="VNET Fitness Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 md:from-black/10 via-black/40 md:via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 text-center pt-24 md:pt-20 pb-12">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-[33554400px] backdrop-blur-md border"
            style={{
              background: "linear-gradient(to right, #007AFF33, #0B60BD33)",
              borderColor: "#007AFF4D",
            }}
          >
            <span className="text-[#007AFF]">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            </span>
            <span className="uppercase text-[10px] md:text-sm font-medium tracking-widest text-[#FFFFFFE5]">
              TRANSFORM YOUR LIFE JOURNEY
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[70px] font-bold leading-tight lg:leading-[1.1] text-white px-2">
            Sacrifice Who You Are Today <br className="hidden md:block" />
            For What You Can Become With{" "}
            <span className="text-[#2B7FFF]">VNET</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-[#FFFFFFB2] max-w-2xl text-center px-4 leading-relaxed">
            Join the vNET community and take charge of your transformation
            journey. We empower you with personalized programs across Health &
            Fitness, Mental Health, Educational Services, and Career growth, all
            backed by expert support.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0 pt-2">
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="bg-[#007AFF] shadow-[#155DFC4D] hover:bg-blue-600 transition px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 text-white w-full sm:w-auto"
            >
              Start Free Assessment
              <span className="text-lg md:text-xl">→</span>
            </button>
            <Link to="/programs/all-programs">
              <button className="border text-white bg-[#FFFFFF1A] border-white/40 hover:bg-white/10 transition px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg w-full sm:w-auto">
                Explore Programs
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-6 md:pt-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center w-[120px] sm:w-auto">
                <div className="text-2xl md:text-[32px] font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[#FFFFFF80] text-xs md:text-[16px] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
}
