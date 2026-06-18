import { ActionButton } from "@/components/ui/ActionButton";
import { BlackActionButton } from "@/components/ui/BlackActionButton";

export const AboutUsHero = () => {
  return (
    <section className="bg-[#030303] text-white py-20 px-6 md:px-12 lg:px-24 flex items-center min-h-[600px]">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.2] tracking-tight text-white">
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
          <div className="flex gap-4 pt-4">
            <ActionButton label="Start Your Journey" />
            <BlackActionButton label="Explore Programs" />
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
