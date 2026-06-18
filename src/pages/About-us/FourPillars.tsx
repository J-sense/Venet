import { Dumbbell, Brain, BookOpen, Briefcase } from "lucide-react";

const PILLARS = [
  {
    icon: Dumbbell,
    title: "Health & Fitness",
    desc: "Personalized physical wellness plans, nutrition tracking, and expert coaching to build a resilient body.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    desc: "Mindfulness practices, stress management techniques, and cognitive behavioral tools for clarity and peace.",
  },
  {
    icon: BookOpen,
    title: "Education",
    desc: "Curated learning paths, skill development modules, and continuous education resources for personal growth.",
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    desc: "AI-driven job matching, interview preparation, networking tools, and leadership development programs.",
  },
];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl flex flex-col items-start text-start group hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#0A66C2]/10 rounded-full flex justify-center items-center mb-6">
              {/* The wrapper ensures the icon matches the requested size and color */}
              <div className="flex justify-center items-center text-[#0A66C2]">
                <pillar.icon size={20} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {pillar.title}
            </h3>
            <p className="self-stretch text-start py-3 text-slate-500 text-base font-normal leading-6">
              {pillar.desc}
            </p>
            <button className="w-36 px-2.5 py-2 bg-[#0A66C2] hover:bg-[#085299] rounded-[32px] inline-flex justify-center items-center transition-colors">
              <span className="text-white text-base font-medium font-['Inter'] leading-6">
                Buy Now
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
