import {
  Activity,
  Award,
  Flame,
  Heart,
  HeartOff,
  Lock,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
const AMAZON_BOOK_URL = "https://www.amazon.com/stores/Jonathan-Karma/author/B0HJFGRLNL?ref=ap_rdr&shoppingPortalEnabled=true";
const timelineEvents = [
  {
    side: "left",
    badge: "Childhood",
    badgeColor: "bg-slate-500/10 text-slate-300 border border-slate-500/20",
    dotColor:
      "from-white to-slate-400 ring-white/10 shadow-[0_0_15px_rgba(255,255,255,0.4)]",
    title: "Born Into Chaos",
    desc: "Grew up surrounded by drugs, violence, crime, abuse, neglect, and homelessness. The environment was relentless — but survival was non-negotiable.",
    icon: Flame,
    iconColor: "text-slate-400",
  },
  {
    side: "right",
    badge: "Age 14",
    badgeColor: "bg-red-500/10 text-red-300 border border-red-500/20",
    dotColor:
      "from-red-600 to-red-400 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    title: "A Defining Loss",
    desc: "Found his mother dead from a drug overdose. A moment that would have broken most — it became the first fire that forged an unbreakable resolve.",
    icon: HeartOff,
    iconColor: "text-red-400",
  },
  {
    side: "left",
    badge: "Age 18",
    badgeColor: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    dotColor:
      "from-orange-600 to-orange-400 ring-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.4)]",
    title: "Prison",
    desc: "Went to prison. Inside, instead of losing himself, he found discipline, focus, and a new mindset. He began building the foundation of who he would become.",
    icon: Lock,
    iconColor: "text-orange-400",
  },
  {
    side: "right",
    badge: "Near-Death",
    badgeColor: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    dotColor:
      "from-rose-600 to-rose-400 ring-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.4)]",
    title: "Multiple Brushes With Death",
    desc: "Gun violence, knife attacks, being thrown from a moving vehicle — life tested him at every turn. Each survival sharpened his sense of purpose.",
    icon: Activity,
    iconColor: "text-rose-400",
  },
  {
    side: "left",
    badge: "Medical Crisis",
    badgeColor: "bg-purple-500/10 text-purple-300 border border-purple-500/20",
    dotColor:
      "from-purple-600 to-purple-400 ring-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    title: "Brain Hemorrhage & Paralysis",
    desc: "Suffered a severe brain hemorrhage and went into a coma. He woke up with paralysis affecting the right side of his body. Doctors believed he might never walk, recover normal movement, or live independently again.",
    icon: Activity,
    iconColor: "text-purple-400",
  },
  {
    side: "right",
    badge: "The Turning Point",
    badgeColor: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    dotColor:
      "from-blue-600 to-blue-400 ring-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    title: "The Rebuild Begins",
    desc: "Rather than accepting defeat, he overhauled everything — nutrition, lifestyle, daily habits, discipline, and mindset. The transformation was total and relentless.",
    icon: TrendingUp,
    iconColor: "text-blue-400",
  },
  {
    side: "left",
    badge: "Recovery",
    badgeColor:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    dotColor:
      "from-emerald-600 to-emerald-400 ring-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.4)]",
    title: "Against All Odds",
    desc: "Within approximately one year, he relearned to walk, relearned to speak, regained full physical function, overcame multiple chronic health conditions, and built a healthier, stronger life than ever before.",
    icon: Award,
    iconColor: "text-emerald-400",
  },
];

export const FounderStoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#030303] text-white min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0B60BD]/25 to-transparent -z-10" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3 bg-gradient-to-br from-[#0b60bd]/15 to-transparent -z-10" />

        {/* Main Top Story Section */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 flex items-center min-h-[85vh]">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            {/* Left Column: Story Content */}
            <div
              className="relative flex flex-col items-start text-left space-y-6 w-full max-w-2xl
        rounded-3xl p-8 sm:p-10 overflow-hidden select-none
        bg-gradient-to-b from-[#16203A]/70 to-[#0B1220]/70
        border border-white/10 backdrop-blur-sm
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
            >
              {/* Accent bar on the left edge */}
              <div className="absolute left-0 inset-y-6 w-1 rounded-r-full bg-gradient-to-b from-[#2B7FFF] to-[#0B60BD]" />

              <h1 className="text-4xl md:text-5xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white w-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]">
                Beating All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#5AA2FF] to-[#1D63E8]">
                  The Odds
                </span>
              </h1>

              {/* Divider */}
              <div className="h-px w-20 bg-gradient-to-r from-[#2B7FFF] to-transparent" />

              <p className="text-[#FFFFFFB2] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                My life has been a journey through unimaginable hardship — loss,
                addiction, violence, illness, and recovery. Every obstacle
                became another reason to fight, learn, and grow. Today my
                purpose is helping others discover that transformation is always
                possible.
              </p>
            </div>

            {/* Right Column: Book */}
            <div className="mx-auto w-full max-w-[300px] flex flex-col items-center gap-10">
              <a
                href={AMAZON_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy The Warrior's Way by Jonathan Karma on Amazon"
                className="group relative block w-full [perspective:1200px] cursor-pointer"
              >
                {/* Contact shadow under the book (no glow) */}
                <div className="absolute -bottom-6 left-[10%] right-[10%] h-5 rounded-[50%] bg-black/80 blur-xl transition-all duration-500 group-hover:scale-90 group-hover:opacity-60" />

                {/* Book wrapper */}
                <div
                  className="relative aspect-[2/3] w-full transition-transform duration-500 ease-out
            [transform:rotateY(-12deg)_rotateX(2deg)]
            group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)]"
                >
                  {/* Page-edge sheets */}
                  <div className="absolute inset-y-[2%] right-0 left-[3%] translate-x-[10px] rounded-r-md bg-gradient-to-r from-zinc-300 to-zinc-500 border border-zinc-600/60" />
                  <div className="absolute inset-y-[1%] right-0 left-[2%] translate-x-[6px] rounded-r-md bg-gradient-to-r from-zinc-200 to-zinc-400 border border-zinc-500/60" />
                  <div className="absolute inset-y-[0.5%] right-0 left-[1%] translate-x-[3px] rounded-r-md bg-gradient-to-r from-white to-zinc-300 border border-zinc-400/60" />

                  {/* Cover */}
                  <div className="absolute inset-0 overflow-hidden rounded-l-[3px] rounded-r-md bg-[#0A0C10] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)]">
                    <img
                      src="/bookCover.png"
                      alt="The Warrior's Way by Jonathan Karma, book cover"
                      className="absolute inset-0 h-full w-full object-cover scale-[1.06]"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 left-[7%] w-[2%] bg-gradient-to-r from-white/20 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/25" />
                    <div
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12
                bg-gradient-to-r from-transparent via-white/25 to-transparent
                transition-transform duration-1000 ease-out group-hover:translate-x-full"
                    />
                  </div>
                </div>
              </a>

              {/* Amazon button */}
              <a
                href={AMAZON_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6
          text-sm font-bold tracking-wide text-slate-950 select-none no-underline
          bg-gradient-to-b from-[#FFD36B] to-[#F0A500]
          border border-amber-200/60
          shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-3px_6px_rgba(120,70,0,0.35)]
          [text-shadow:0_1px_0_rgba(255,255,255,0.5)]
          transition-transform duration-200 active:scale-[0.97]"
              >
                Get the Book on Amazon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Life Timeline Section */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 border-t border-zinc-900/50 bg-[#06080E]/60 relative">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-24 relative z-10">
            <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-3">
              The Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-sora [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              Life <span className="text-blue-500">Timeline</span>
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-normal font-['Inter']">
              A story of survival, strength, and relentless transformation
              across decades.
            </p>
          </div>

          {/* Timeline Path Container */}
          <div className="max-w-[1400px] mx-auto relative">
            {/* Vertical central timeline line */}
            <div className="absolute left-4 lg:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-slate-200 via-red-500 via-orange-500 via-rose-500 via-purple-500 via-blue-500 to-emerald-500 opacity-30 -translate-x-1/2" />

            {/* Event Nodes */}
            <div className="space-y-12 lg:space-y-16 relative">
              {timelineEvents.map((event, idx) => {
                const isLeft = event.side === "left";
                const Icon = event.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col lg:flex-row items-start ${isLeft ? "lg:flex-row-reverse" : ""
                      } relative w-full`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-8 z-20 flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${event.dotColor} !shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.35)] flex items-center justify-center relative`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#030303]" />
                        {/* Pulsing ring outline */}
                        <div className="absolute -inset-1.5 rounded-full border border-white/10 animate-pulse -z-10" />
                      </div>
                    </div>

                    {/* Card Container */}
                    <div
                      className={`w-full lg:w-1/2 pl-10 lg:pl-0 ${isLeft ? "lg:pr-16 lg:pl-4" : "lg:pl-16 lg:pr-4"} relative`}
                    >
                      {/* Horizontal Connector Line (Desktop Only) */}
                      {isLeft ? (
                        <div className="absolute right-0 top-10 w-16 h-[1.5px] bg-gradient-to-r from-blue-500/0 to-blue-500/20 hidden lg:block" />
                      ) : (
                        <div className="absolute left-0 top-10 w-16 h-[1.5px] bg-gradient-to-l from-blue-500/0 to-blue-500/20 hidden lg:block" />
                      )}

                      {/* Glossy Event Card */}
                      <div
                        className="relative group p-6 sm:p-7 rounded-[20px] select-none
                          bg-gradient-to-b from-[#1F3150] to-[#142033]
                          hover:from-[#16203A] hover:to-[#0B1220]
                          border border-white/10 hover:border-blue-400/30
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]
                          transition-all duration-500 hover:-translate-y-1.5"
                      >
                        {/* Event Badge */}
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] ${event.badgeColor}`}
                        >
                          {event.badge}
                        </span>

                        {/* Header with Title and Icon */}
                        <div className="flex items-center gap-3.5 mb-3">
                          <div
                            className={`p-2 rounded-xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)] ${event.iconColor}`}
                          >
                            <Icon
                              size={18}
                              strokeWidth={1.8}
                              className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                            />
                          </div>
                          <h3 className="text-white text-lg sm:text-xl font-bold font-sora tracking-tight leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                            {event.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-normal font-['Inter']">
                          {event.desc}
                        </p>
                      </div>
                    </div>

                    {/* Empty Spacer Column for Desktop */}
                    <div className="hidden lg:block lg:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 border-t border-zinc-900/50 bg-[#030303]">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Text & Badges */}
            <div className="flex flex-col items-start text-left space-y-6">
              <div>
                <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-3">
                  The Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] font-sora [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  Why I Created <span className="text-[#155DFC]">vNXT</span>
                </h2>
              </div>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-xl font-normal font-['Inter']">
                vNXT exists because no one should have to face life's darkest
                moments alone. The platform connects people with experts,
                education, coaching, wellness resources, and a supportive
                community that empowers lasting transformation.
              </p>

              {/* Grid of 6 pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-4">
                {[
                  {
                    label: "Resilience",
                    icon: Shield,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                  },
                  {
                    label: "Discipline",
                    icon: Zap,
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                  },
                  {
                    label: "Community",
                    icon: Users,
                    color: "text-indigo-400",
                    bg: "bg-indigo-400/10",
                  },
                  {
                    label: "Purpose",
                    icon: Target,
                    color: "text-purple-400",
                    bg: "bg-purple-400/10",
                  },
                  {
                    label: "Transformation",
                    icon: Star,
                    color: "text-pink-400",
                    bg: "bg-pink-400/10",
                  },
                  {
                    label: "Hope",
                    icon: Heart,
                    color: "text-emerald-400",
                    bg: "bg-emerald-400/10",
                  },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl px-4 py-3.5 flex items-center gap-3 select-none
                        bg-gradient-to-b from-[#1F3150] to-[#142033]
                        border border-white/10 hover:border-blue-400/30
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]
                        transition-all duration-300"
                    >
                      <div
                        className={`p-2 rounded-lg border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)] ${item.bg} ${item.color}`}
                      >
                        <ItemIcon
                          size={16}
                          strokeWidth={2}
                          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                        />
                      </div>
                      <span className="text-white text-xs sm:text-sm font-semibold font-sora [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Quote Card */}
            <div className="relative group max-w-lg lg:max-w-none mx-auto w-full">
              <div
                className="relative p-8 sm:p-10 rounded-[24px] overflow-hidden flex flex-col justify-between min-h-[300px]
                  bg-gradient-to-br from-[#0F172B] via-[#162456] to-[#3C0366]
                  border border-white/10 hover:border-blue-400/30
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-3px_6px_rgba(0,0,0,0.4)]
                  transition-all duration-500"
              >
                {/* Inner ambient glows */}
                <div className="absolute -top-[100px] -right-[100px] w-[220px] h-[220px] rounded-full blur-[70px] bg-blue-400/10 pointer-events-none" />
                <div className="absolute -bottom-[100px] -left-[100px] w-[220px] h-[220px] rounded-full blur-[70px] bg-purple-500/10 pointer-events-none" />

                <div className="relative z-10">
                  <Award
                    className="text-[#2B7FFF] size-8 mb-6 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
                    strokeWidth={1.5}
                  />
                  <blockquote className="text-white text-xl sm:text-[26px] font-bold font-sora leading-relaxed tracking-wide [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    "Sacrifice who you are today for what you can become
                    tomorrow."
                  </blockquote>
                </div>
                <div className="relative z-10 mt-8">
                  <div className="w-full h-[1px] bg-white/10 mb-4" />
                  <p className="text-slate-400/70 text-xs sm:text-sm font-normal tracking-wide">
                    The philosophy that drove every step of the rebuild.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};