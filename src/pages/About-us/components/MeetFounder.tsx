import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router";

export const MeetFounder = () => {
  return (
    <section className="bg-[#030303] text-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Portrait */}
        <div className="relative max-w-md mx-auto w-full">
          {/* Offset back plate for depth */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border border-white/10 bg-gradient-to-b from-[#16203A] to-[#0A101D]" />

          {/* Portrait card */}
          <div
            className="relative rounded-[28px] overflow-hidden aspect-[4/5] select-none
              bg-[#0F172A] border border-white/15
              shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.4)]"
          >
            <img
              src="/Smiling Bald Professional Headshot.png"
              alt="Jonathan Karma, Founder & CEO of vNXT"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* Bottom fade for the name plate */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

            {/* Inset edge above the image */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)]" />

            {/* Name plate */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl px-5 py-4 backdrop-blur-md
              bg-gradient-to-b from-[#12151C]/90 to-[#0A0C10]/90
              border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
            >
              <h3 className="text-white text-2xl font-extrabold tracking-tight leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                Jonathan Karma
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-blue-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                Founder & CEO, vNXT
              </p>
            </div>
          </div>

          {/* Floating book chip */}
          <div
            className="absolute -top-3 -left-3 inline-flex items-center gap-2 rounded-full px-4 py-2 select-none
              bg-gradient-to-b from-[#FFD36B] to-[#F0A500]
              border border-amber-200/60
              shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-3px_6px_rgba(120,70,0,0.35)]
              text-slate-950 text-[11px] font-bold uppercase tracking-wider
              [text-shadow:0_1px_0_rgba(255,255,255,0.5)]"
          >
            Author of The Warrior's Way
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col items-start text-left space-y-5 lg:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-b from-blue-500/20 to-blue-600/10 border border-blue-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] px-4 py-1.5 rounded-full select-none">
            <span className="text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              From Tragedy to Triumph
            </span>
          </div>

          <div>
            <span className="text-[#94A3B8] text-xs font-bold tracking-widest uppercase block mb-2">
              Meet the Founder
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold leading-[1.15] tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              One Man's Journey.
              <br />
              <span className="text-blue-500">
                A Mission to Transform Lives.
              </span>
            </h2>
          </div>

          {/* Role chips */}
          <div className="flex flex-wrap gap-2 select-none">
            {["Author", "Founder & CEO", "Technology Executive", "Entrepreneur", "Transformation Advocate"].map(
              (role) => (
                <span
                  key={role}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-200
                    bg-gradient-to-b from-white/10 to-white/[0.02]
                    border border-white/10
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.35)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                >
                  {role}
                </span>
              ),
            )}
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal font-['Inter']">
            For decades, life presented unimaginable challenges... from
            childhood trauma and addiction surrounding my family to cancer,
            near-death experiences, serious illness, and paralysis. Rather than
            giving up, I turned it into fuel through discipline, health, and a
            mission. Today, my mission is to help others transform their own
            lives through the vNXT community.
          </p>

          {/* Quote card */}
          <div
            className="relative w-full max-w-2xl rounded-2xl p-5 pl-6 overflow-hidden select-none
              bg-gradient-to-b from-[#16203A]/80 to-[#0B1220]/80
              border border-white/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute left-0 inset-y-4 w-1 rounded-r-full bg-gradient-to-b from-[#2B7FFF] to-[#0B60BD]" />
            <Quote className="w-5 h-5 text-[#2B7FFF] mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" />
            <p className="text-white text-base sm:text-lg font-bold leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              Where you start does not determine where you can finish.
            </p>
          </div>

          <Link
            to="/founder-story"
            className="group px-7 py-3.5 bg-gradient-to-b from-[#007AFF] to-[#0B60BD] border border-[#007AFF4D] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] rounded-full text-white text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer select-none"
          >
            Read My Story
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};