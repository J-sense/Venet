import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

import { customerReviews as reviews } from "../data/homeData";

export const CustomerFeedback: React.FC = () => {
  return (
    <section className="relative w-full bg-[#030303]  overflow-hidden select-none">
      {/* ── CUSTOM REVERSE INFINITE GLIDE ANIMATION STYLES ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infiniteScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-glide-left {
          display: flex;
          width: max-content;
          animation: infiniteScrollLeft 35s linear infinite;
        }
        .animate-glide-left:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* ── CENTRALIZED BACKLIGHT SPOTLIGHT FLARE (#0B60BD26) ── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[340px] pointer-events-none z-0 filter blur-[95px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(11, 96, 189, 0.15) 0%, rgba(11, 96, 189, 0.04) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[100px] pointer-events-none z-0 filter blur-[40px] opacity-80 mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(11, 96, 189, 0.21) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ── MAIN SCENE FRAMING LAYER ── */}
      <div className="relative w-full flex flex-col gap-16 z-10">
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4 text-center w-full px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white font-sora">
            <span className="text-[#2B7FFF]"></span>
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-2xl font-inter font-normal tracking-wide">
            .
          </p>
        </div>
        <SectionHeader
          subtitle=" At This Part You Can See Few Of The Many Positive Reviews Of Our
            Customers"
          titleAccent="speak"
          titlePrimary="Our customers"
        />

        {/* ── HORIZONTAL INFINITE CAROUSEL TRACK ── */}
        <div className="relative w-full overflow-hidden mask-gradient-edges">
          {/* Edge masking to blend left & right borders smoothly into background dark */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

          {/* Core Glide Container */}
          <div className="animate-glide-left gap-8 px-4">
            {/* Double the mapping arrays to maintain a truly gapless, fluid scroll chain */}
            {[...reviews, ...reviews, ...reviews].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-6 w-[480px] h-[240px] shrink-0 rounded-[20px] bg-transparent transition-all duration-300"
              >
                {/* Monochromatic Profile Image Container */}
                <div className="w-[150px] h-full rounded-[16px] overflow-hidden bg-[#101828]/60 shrink-0 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover filter grayscale"
                  />
                </div>

                {/* Content Details Block */}
                <div className="flex flex-col justify-center gap-3 h-full">
                  <p className="text-white/70 font-inter text-[11px] sm:text-xs font-normal leading-[1.6] line-clamp-5 tracking-wide">
                    "{item.quote}"
                  </p>

                  {/* Rating Stars Frame */}
                  <div className="flex items-center gap-0.5 text-[#FF9E0B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Profile Author Label */}
                  <span className="text-white font-inter text-sm font-bold tracking-wide">
                    {item.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
