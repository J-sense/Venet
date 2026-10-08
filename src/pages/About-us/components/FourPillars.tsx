import { Link } from "react-router";
import { PILLARS } from "../data/aboutData";

export const FourPillars = () => {
  return (
    <section className="bg-[#030303] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-[32px] font-semibold font-sora leading-10 text-white">
          The <span className="text-[#0A66C2]">Four Pillars</span> of
          Transformation
        </h2>
        <p className="text-center text-[#94A3B8] my-2 text-[16px] font-sora leading-6 max-w-lg mx-auto">
          Our holistic approach ensures every aspect of your life is supported,
          optimized, and aligned for success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
        {PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl flex flex-col items-start justify-between text-start group hover:border-blue-500/50 transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 bg-[#0A66C2]/10 rounded-full flex justify-center items-center mb-6 shrink-0">
              {/* The wrapper ensures the icon matches the requested size and color */}
              <div className="flex justify-center items-center text-[#0A66C2]">
                <pillar.icon size={20} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {pillar.title}
            </h3>
            <p className="self-stretch text-start py-3 text-slate-500 text-base font-normal leading-6 flex-1 mb-4">
              {pillar.desc}
            </p>
            <Link
              to={pillar.link || "/programs/all-programs"}
              className="mt-auto pt-2 block"
            >
              <button className="w-36 px-2.5 py-2 bg-gradient-to-b from-[#0A66C2] to-[#085299] shadow-[0_8px_24px_rgba(10,102,194,0.35),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] rounded-[32px] inline-flex justify-center items-center cursor-pointer select-none">
                <span className="text-white text-base font-medium font-['Inter'] leading-6">
                  Learn More
                </span>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
