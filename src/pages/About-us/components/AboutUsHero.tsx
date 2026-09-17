import { BlackActionButton } from "@/components/ui/BlackActionButton";
import { useNavigate } from "react-router";
import { AboutUsCTA } from "./AboutUsCTA";

export const AboutUsHero = () => {
  const navigate = useNavigate()
  return (
    <section className="bg-[#030303] text-white py-20 px-6 md:px-12 lg:px-24 flex items-center min-h-[600px]">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Content */}
        <div className="flex-1 space-y-6 i">
          <h1 className="text-[28px] md:text-[48px] font-extrabold leading-[1.2] tracking-tight text-white">
            Transforming Lives Through{" "}
            <span className="text-blue-500">
              Health & Fitness, Mental Health, Education, and Career
              Preparation.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-normal font-['Inter'] leading-7 max-w-2xl">
            vNET combines AI-powered roadmaps, expert guidance, personalized
            programs, and career development tools to help people achieve
            meaningful life transformation.
          </p>
          <div className="flex md:flex-row flex-col gap-4 pt-4">
            <AboutUsCTA
              title="Your Story Isn't Over Yet"
              description="No matter where you've been or what you've experienced, transformation is possible. Your next chapter begins today."
              buttonText="Start Your Journey"
              bgClass="bg-[#0B60BD]"
              bottomCurveColor="#191C2B"
              buttonTextClass="!text-[#1E3A8A]"
            />
            <BlackActionButton label="Explore Programs" onClick={() => navigate("/programs/all-programs")} />
          </div>
        </div>

        {/* Right: Hub-and-Spoke Visual */}
        <div className="flex-1 font- flex justify-center items-center">
          {/* This container will hold your radial SVG or CSS grid layout */}

          {/* Central Portrait */}

          <img
            src="/About hero page.png"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* The nodes (icons) would be positioned absolutely around this center */}
      </div>
    </section>
  );
};
