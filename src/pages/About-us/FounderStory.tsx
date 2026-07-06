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
import { AboutUsCTA } from "./components/AboutUsCTA";

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
            <div className="flex flex-col items-start text-left space-y-6">


              <h1 className="text-4xl md:text-5xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white w-full">
                Beating All{" "}
                <span className="text-blue-500">The Odds</span>
              </h1>

              <p className="text-[#FFFFFFB2] text-base sm:text-lg leading-relaxed max-w-xl font-normal ">
                My life has been a journey through unimaginable hardship — loss,
                addiction, violence, illness, and recovery. Every obstacle
                became another reason to fight, learn, and grow. Today my
                purpose is helping others discover that transformation is always
                possible.
              </p>

            </div>

            {/* Right Column: Poster Image */}
            <div className="relative group max-w-lg lg:max-w-none mx-auto w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-[20px] overflow-hidden border border-zinc-800 bg-[#0F172A] shadow-2xl">
                <img
                  src="/founderImg2.jpg"
                  alt="VNET Trauma Survivors Poster"
                  className="w-full h-auto object-cover scale-[1.01] hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-sora">
              Life <span className="text-blue-500">Timeline</span>
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-normal font-['Inter']">
              A story of survival, strength, and relentless transformation
              across decades.
            </p>
          </div>

          {/* Timeline Path Container */}
          <div className="max-w-[1400px] mx-auto relative">
            {/* Vertical central timeline line (glowing gradient matching path colors) */}
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
                    {/* Timeline Dot (glowing ring + custom gradient) */}
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-8 z-20 flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${event.dotColor} flex items-center justify-center relative`}
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

                      {/* Glassmorphic Event Card */}
                      <div className="relative group p-6 sm:p-7 bg-[#19273C] hover:bg-[#0F1322]/80 border border-white/[0.03] hover:border-blue-500/20 rounded-[20px] transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(11,96,189,0.12)]">
                        {/* Event Badge */}
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider mb-4 ${event.badgeColor}`}
                        >
                          {event.badge}
                        </span>

                        {/* Header with Title and Icon */}
                        <div className="flex items-center gap-3.5 mb-3">
                          <div
                            className={`p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] ${event.iconColor}`}
                          >
                            <Icon size={18} strokeWidth={1.8} />
                          </div>
                          <h3 className="text-white text-lg sm:text-xl font-bold font-sora tracking-tight leading-snug">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] font-sora">
                  Why I Created <span className="text-[#155DFC]">vNET</span>
                </h2>
              </div>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-xl font-normal font-['Inter']">
                vNET exists because no one should have to face life's darkest
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
                      className="bg-[#19273C] border border-zinc-900 rounded-xl px-4 py-3.5 flex items-center gap-3 hover:border-blue-500/20 transition-all duration-300"
                    >
                      <div
                        className={`p-2 rounded-lg ${item.bg} ${item.color}`}
                      >
                        <ItemIcon size={16} strokeWidth={2} />
                      </div>
                      <span className="text-white text-xs sm:text-sm font-semibold font-sora">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Quote Card */}
            <div className="relative group max-w-lg lg:max-w-none mx-auto w-full">
              {/* Soft Glow Behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-[26px] blur-xl opacity-30 group-hover:opacity-40 transition-opacity" />

              {/* Gradient Card */}
              <div className="relative p-8 sm:p-10 bg-gradient-to-br from-[#0F172B] via-[#162456] to-[#3C0366] border border-white/[0.08] rounded-[24px] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px] hover:border-blue-500/30 transition-all duration-500">
                {/* Inner ambient glows for premium depth */}
                <div className="absolute -top-[100px] -right-[100px] w-[220px] h-[220px] rounded-full blur-[70px] bg-blue-400/10 pointer-events-none" />
                <div className="absolute -bottom-[100px] -left-[100px] w-[220px] h-[220px] rounded-full blur-[70px] bg-purple-500/10 pointer-events-none" />

                <div className="relative z-10">
                  <Award
                    className="text-[#2B7FFF] size-8 mb-6"
                    strokeWidth={1.5}
                  />
                  <blockquote className="text-white text-xl sm:text-[26px] font-bold font-sora leading-relaxed tracking-wide">
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
      <AboutUsCTA
        title="Your Story Isn't Over Yet"
        description="No matter where you've been or what you've experienced, transformation is possible. Your next chapter begins today."
        buttonText="Start Free Assessment"
        bgClass="bg-[#1E3A8A]"
        bottomCurveColor="#191C2B"
        buttonTextClass="!text-[#1E3A8A]"
      />
    </>
  );
};
