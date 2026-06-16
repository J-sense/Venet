import { ActionButton } from "@/components/ui/ActionButton";
import React, { useState, useEffect, useCallback, useRef } from "react";

interface TrainerItem {
  id: number;
  name: string;
  role: string;
  image: string;
}

const trainers: TrainerItem[] = [
  {
    id: 1,
    name: "Jack Drake",
    role: "Strength & Conditioning",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Nathaniel",
    role: "HIIT & Cardio",
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "CrossFit Coach",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sofia Reyes",
    role: "Yoga & Mobility",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ryan Torres",
    role: "Nutrition & Wellness",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
  },
];

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
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[55%] h-[600px] pointer-events-none z-0 blur-[120px] opacity-40 bg-[radial-gradient(circle_at_center,#0B60BD_0%,rgba(11,96,189,0.1)_50%,transparent_100%)]" />

      {/* Grid: 3fr for text (left), 9fr for full-width right carousel */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_9fr] gap-12 items-center">
        {/* Left Side: Text */}
        <div className="flex flex-col gap-6">
          <h2 className="font-extrabold text-[clamp(34px,4vw,56px)] leading-[1] text-white tracking-[-0.02em]">
            Our <span className="text-[#2B7FFF]">Trainers</span>
          </h2>
          <p className="text-[#99A1AF] text-[15px] leading-relaxed w-3xl">
            Our certified trainers are experienced fitness experts dedicated to
            helping you reach your goals through personalized coaching and
            motivation. They create custom workout plans, guide you with proper
            techniques, and provide continuous support to keep you consistent
            and improving. In short, they’re here to help you train smarter,
            stay motivated, and achieve real results safely and effectively.
          </p>

          <ActionButton
            className="w-[200px]"
            label="Explore All
"
          />
        </div>

        {/* Right Side: Carousel anchored to the right */}
        <div className="relative w-full h-[600px] flex items-center justify-end overflow-visible">
          <div className="relative w-full h-full flex justify-end">
            {trainers.map((trainer, index) => {
              const isActive = index === activeIndex;
              const isPeek = index === peekIndex;

              // Positioning: Anchored to the right side
              let cardClasses =
                "absolute top-1/2 rounded-[48px] overflow-hidden bg-[#18181C] shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] ";

              if (isActive) {
                // Active card sits on the right
                cardClasses +=
                  "right-[450px] -translate-y-1/2 w-[420px] h-[560px] z-20 opacity-100";
              } else if (isPeek) {
                // Peek card sits further right
                cardClasses +=
                  "right-[30px] translate-y-[calc(-50%+20px)] scale-[0.95] w-[360px] h-[480px] z-10 opacity-60 cursor-pointer";
              } else {
                // Hidden cards off-screen right
                cardClasses +=
                  "right-[-350px] translate-y-[calc(-50%+40px)] scale-[0.9] w-[300px] h-[400px] z-5 opacity-0 pointer-events-none";
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
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                  {(isActive || isPeek) && (
                    <div className="absolute bottom-[40px] left-[40px] right-[40px] z-10">
                      <h3 className="font-bold text-3xl text-white">
                        {trainer.name}
                      </h3>
                      <p className="text-sm font-medium text-[#2B7FFF] uppercase tracking-widest mt-1">
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
