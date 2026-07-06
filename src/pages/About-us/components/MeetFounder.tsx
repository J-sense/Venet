import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const MeetFounder = () => {
  return (
    <section className="bg-[#030303] text-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Image Container */}
        <div className="relative group max-w-lg lg:max-w-none mx-auto w-full">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative rounded-[20px] overflow-hidden border border-zinc-800 bg-[#0F172A]">
            <img
              src="/founderImg1.png"
              alt="vNET Founder - One Man's Journey"
              className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col items-start text-left space-y-5 lg:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full">
            <span className="text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              From Tragedy to Triumph
            </span>
          </div>

          <div>
            <span className="text-[#94A3B8] text-xs font-bold tracking-widest uppercase block mb-2">
              Meet the Founder
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold leading-[1.15] tracking-tight text-white">
              One Man's Journey.<br />
              <span className="text-blue-500">A Mission to Transform Lives.</span>
            </h2>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal font-['Inter']">
            For decades, life presented unimaginable challenges... from childhood trauma and addiction surrounding my family to cancer, near-death experiences, serious illness, and paralysis. Rather than giving up, I turned it into fuel through discipline, health, and a mission. Today, my mission is to help others transform their own lives through the vNET community.
          </p>

          <Link
            to="/founder-story"
            className="group px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
          >
            Read My Story
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
