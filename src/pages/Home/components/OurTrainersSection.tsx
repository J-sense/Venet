import { ActionButton } from "@/components/ui/ActionButton";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { trainersData as trainers } from "../data/homeData";

export const OurTrainersSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const n = trainers.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === activeIndex) return;
      setAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setAnimating(false), 560);
    },
    [animating, activeIndex],
  );

  const advance = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % n);
    setTimeout(() => setAnimating(false), 560);
  }, [animating, n]);

  const handleTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) advance();
      else goTo((activeIndex - 1 + n) % n);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") goTo((activeIndex - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, goTo, activeIndex, n]);

  const peekIndex = (activeIndex + 1) % n;

  return (
    <section
      className="relative w-full bg-[#030303] py-[80px] px-6 sm:px-12 md:px-16 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Center Blue Gradient Glow - positioned between text and carousel on desktop */}
      <div className="absolute left-1/2 lg:left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none z-0 blur-[130px] opacity-70 bg-[radial-gradient(circle_at_center,#2B7FFF_0%,rgba(43,127,255,0.15)_50%,transparent_100%)]" />

      {/* Grid: 5fr for text (left), 7fr for right carousel */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-8 items-center">
        {/* Left Side: Text */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto lg:mx-0 pr-0 lg:pr-10">
          <h2 className="font-extrabold text-[clamp(34px,6vw,56px)] leading-[1.1] text-white tracking-[-0.02em] text-center lg:text-left">
            Our <span className="text-[#2B7FFF]">Trainers</span>
          </h2>
          <p className="text-[#FFFFFF] text-[15px] sm:text-base leading-6 text-center lg:text-left">
            Our certified trainers are experienced fitness experts dedicated to
            helping you reach your goals through personalized coaching and
            motivation. They create custom workout plans, guide you with proper
            techniques, and provide continuous support to keep you consistent
            and improving. In short, they’re here to help you train smarter,
            stay motivated, and achieve real results safely and effectively.
          </p>

          <div className="flex justify-center lg:justify-start">
            <ActionButton className="w-[200px]" label="Explore All" />
          </div>
        </div>

        {/* Right Side: Carousel anchored to the right on desktop, centered on mobile */}
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[600px] flex items-center lg:justify-end overflow-visible mt-8 lg:mt-0">
          <div className="relative w-full h-full flex lg:justify-end">
            {trainers.map((trainer, index) => {
              const isActive = index === activeIndex;
              const isPeek = index === peekIndex;

              // Positioning: Anchored to the right side on large screens, center-aligned on mobile
              let cardClasses =
                "absolute top-1/2 rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#18181C] shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] ";

              if (isActive) {
                // Active card sits centered on mobile, right on desktop
                cardClasses +=
                  "left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-[360px] xl:right-[450px] -translate-y-1/2 w-[260px] sm:w-[340px] md:w-[400px] lg:w-[420px] h-[360px] sm:h-[460px] md:h-[520px] lg:h-[560px] z-20 opacity-100";
              } else if (isPeek) {
                // Peek card sits further right
                cardClasses +=
                  "left-[85%] sm:left-[80%] lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-0 xl:right-[30px] translate-y-[calc(-50%+15px)] lg:translate-y-[calc(-50%+20px)] scale-[0.9] lg:scale-[0.95] w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-[300px] sm:h-[380px] md:h-[420px] lg:h-[480px] z-10 opacity-60 cursor-pointer";
              } else {
                // Hidden cards off-screen right
                cardClasses +=
                  "left-[150%] lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-[-350px] translate-y-[calc(-50%+30px)] lg:translate-y-[calc(-50%+40px)] scale-[0.8] lg:scale-[0.9] w-[180px] sm:w-[240px] lg:w-[300px] h-[240px] sm:h-[320px] lg:h-[400px] z-5 opacity-0 pointer-events-none";
              }

              return (
                <div
                  key={trainer.id}
                  className={cardClasses}
                  onClick={() => isPeek && advance()}
                >
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Bottom-only Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                  {(isActive || isPeek) && (
                    <div className="absolute bottom-[24px] sm:bottom-[30px] lg:bottom-[40px] left-[24px] sm:left-[30px] lg:left-[40px] right-[24px] lg:right-[40px] z-10">
                      <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white">
                        {trainer.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#2B7FFF] uppercase tracking-widest mt-1 lg:mt-2">
                        {trainer.role}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
