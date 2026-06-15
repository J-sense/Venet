import React, { useState } from "react";

interface TrainerItem {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const OurTrainersSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const trainers: TrainerItem[] = [
    {
      id: 1,
      name: "Jack Drake",
      role: "Trainer 1",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Nathaniel",
      role: "Trainer 2",
      image:
        "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Marcus Vance",
      role: "Trainer 3",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Marcus Vance",
      role: "Trainer 3",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Marcus Vance",
      role: "Trainer 3",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* ── LEFT DEEP BLUE AMBIENT LIGHTING BACKGROUND GLOW ── */}
      <div
        className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[55%] h-[600px] pointer-events-none z-0 filter blur-[120px] opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, #0B60BD 0%, rgba(11, 96, 189, 0.1) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* ── LEFT PANEL: TYPOGRAPHY & BUTTON ── */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white font-sora leading-none">
            Our <span className="text-[#2B7FFF]">Trainers</span>
          </h2>

          <div className="flex flex-col gap-4 text-sm sm:text-base font-normal font-inter text-[#99A1AF] leading-[1.7] tracking-wide max-w-xl">
            <p>
              Our certified trainers are experienced fitness experts dedicated
              to helping you reach your goals through personalized coaching and
              motivation. They create custom workout plans, guide you with
              proper techniques, and provide continuous support to keep you
              consistent and improving.
            </p>
            <p>
              In short, they're here to help you train smarter, stay motivated,
              and achieve real results safely and effectively.
            </p>
          </div>

          <button className="mt-2 px-7 py-3 bg-[#2B7FFF] text-white font-bold font-inter text-xs rounded-full hover:bg-[#0066FF] transition-all duration-200 active:scale-[0.98]">
            Explore All
          </button>
        </div>

        {/* ── RIGHT PANEL: INTERLOCKING OVERLAPPING CAROUSEL CARDS ── */}
        <div className="lg:col-span-7 relative w-full h-[520px] flex items-center pt-6">
          <div className="relative w-full h-full flex items-center gap-6 overflow-visible">
            {trainers.map((trainer, index) => {
              // Calculate index relative to the current active presentation layer
              const isFirst = index === activeIndex;
              const isSecond = index === (activeIndex + 1) % trainers.length;

              // Only render the active item and the preview companion element to match the reference stack
              if (!isFirst && !isSecond) return null;

              return (
                <div
                  key={trainer.id}
                  onClick={() => {
                    if (isSecond) setActiveIndex(index);
                  }}
                  className={`relative rounded-[48px] overflow-hidden bg-[#18181C] border border-white/5 shadow-2xl transition-all duration-500 ease-out cursor-pointer ${
                    isFirst
                      ? "w-[360px] h-[480px] z-20 scale-100 opacity-100 shrink-0"
                      : "w-[310px] h-[410px] z-10 opacity-40 scale-95 translate-y-2 shrink-0 -ml-16 hidden sm:block"
                  }`}
                >
                  {/* Portrait Asset Layer with High Edge Contrast Grayscale */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.75]"
                    />
                    {/* Shadow overlay gradient system to secure title text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                  </div>

                  {/* Identification Text Labels positioned directly on the cards */}
                  <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-1 z-10">
                    <h3 className="text-3xl font-extrabold tracking-tight text-white font-sora">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-medium text-white/50 font-inter tracking-wider">
                      {trainer.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BOTTOM SLIDER DOT PAGINATION TRACK ── */}
      <div className="absolute bottom-12 right-4 sm:right-[15%] z-30 flex items-start gap-2">
        {trainers.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setActiveIndex(dotIndex)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === dotIndex ? "w-8 bg-[#2B7FFF]" : "w-4 bg-white"
            }`}
            aria-label={`Go to slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
