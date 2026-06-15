import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowRight } from "lucide-react";

export const ProgramBanner = () => {
  return (
    <section className="relative w-full bg-[#030303] py-20 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mt-10 md:mt-30 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: Text Content */}
        <div className="flex flex-col gap-8">
          <h2 className="text-[56px] lg:text-[72px] font-extrabold  leading-[1.1] capitalize tracking-tight">
            <span className="text-[#007AFF]">Programs</span>{" "}
            <span className="text-white">
              Designed
              <br />
              For Real Results
            </span>
          </h2>
          <p className="text-[#99A1AF] text-lg max-w-[500px] leading-relaxed">
            Build a stronger body, a healthier mindset, valuable skills, and a
            more successful career through personalized programs designed to
            support your growth every step of the way.
          </p>

          <ActionButton label="Explore Program" className="w-[300px]" />
        </div>

        {/* RIGHT SIDE: The Image/Dashboard */}
        <div className="relative w-full">
          {/* Replace this src with your specific dashboard image */}
          <img
            src="/ProgrammeBanner.png"
            alt="Programs Dashboard"
            className="w-full h-auto rounded-3xl shadow-2xl "
          />
          {/* Decorative ambient light behind the image */}
          <div className="absolute -z-10 top-10 right-10 w-full h-full bg-blue-600/20 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};
