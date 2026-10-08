import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";
import { Link } from "react-router";

interface PlanFeature {
  text: string;
}

interface Plan {
  title: string;
  subtitle: string;
  price: string;
  features: PlanFeature[];
  isPopular?: boolean;
}

export const SubscriptionSection: React.FC = () => {
  const plans: Plan[] = [
    {
      title: "First Program",
      subtitle: "Ultimate package for serious athletes",
      price: "$14.99",
      features: [
        { text: "AI-powered tracking" },
        { text: "Progress tracking" },
        { text: "Certificate upon completion" },
        { text: "Community access" },
        { text: "Mobile app access" },
      ],
    },
    {
      title: "Additional Programs",
      subtitle: "Best for dedicated fitness enthusiasts",
      price: "$9.99",
      isPopular: true,
      features: [
        { text: "All First Program features" },
        { text: "Multi-program discounts" },
        { text: "Priority support" },
        { text: "Advanced analytics" },
        { text: "Expert consultations (Discounted)" },
      ],
    },
    {
      title: "Talent Portal",
      subtitle: "Ultimate package for serious athletes",
      price: "$9.99",
      features: [
        { text: "Professional profile" },
        { text: "Job recommendations" },
        { text: "Resume builder" },
        { text: "Cover letter generator" },
        { text: "Networking community" },
      ],
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* ── AMBIENT NEON BACKGROUND GLOW SYSTEM ── */}
      <div
        className="absolute left-1/2 top-[-10%] -translate-x-1/2 w-[80%] h-[350px] pointer-events-none z-0 opacity-40 filter blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(43, 127, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      <div
        className="absolute left-1/2 bottom-[-5%] -translate-x-1/2 w-[60%] h-[250px] pointer-events-none z-0 opacity-30 filter blur-[100px] mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(16, 24, 40, 1) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto flex flex-col gap-16 lg:gap-20 z-10">
        <SectionHeader
          titlePrimary="Subscription"
          titleAccent="Plan"
          subtitle="Select The Perfect Membership Plan That Matches Your Fitness Goals And Lifestyle"
        />

        {/* Pricing Cards Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-[1200px] mx-auto w-full px-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between h-full rounded-[24px] p-8 text-white ${plan.isPopular
                  ? "bg-gradient-to-b from-[#1A7BFF] to-[#0052D4] border-2 border-[#2B7FFF] z-20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
                  : "bg-gradient-to-b from-[#16203A]/70 to-[#0B1220]/70 border border-[#1E2939]/80 backdrop-blur-sm z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
                }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] tracking-widest font-bold font-inter uppercase px-4 py-1 rounded-full text-white
                    bg-gradient-to-b from-[#4A98FF] to-[#1F6FE0]
                    border border-white/25
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.3)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                >
                  Most Popular
                </div>
              )}

              {/* Top Content Box */}
              <div>
                <h3 className="text-2xl font-bold font-sora tracking-tight mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  {plan.title}
                </h3>
                <p
                  className={`text-xs font-inter min-h-[36px] flex items-center mb-6 ${plan.isPopular ? "text-white/80" : "text-[#99A1AF]"
                    }`}
                >
                  {plan.subtitle}
                </p>

                {/* Pricing Display */}
                <div className="flex items-baseline gap-1 font-inter mb-8">
                  <span className="text-4xl lg:text-[44px] font-extrabold tracking-tight leading-none [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${plan.isPopular ? "text-white/70" : "text-[#99A1AF]"
                      }`}
                  >
                    /month
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 min-h-[220px]">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-sm font-inter font-normal"
                    >
                      {/* Glossy check badge */}
                      <span
                        className={`w-5 h-5 mt-px rounded-full shrink-0 flex items-center justify-center border ${plan.isPopular
                            ? "bg-gradient-to-b from-white/30 to-white/10 border-white/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.3)]"
                            : "bg-gradient-to-b from-emerald-500/35 to-emerald-700/15 border-emerald-400/30 text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_3px_rgba(0,0,0,0.35)]"
                          }`}
                      >
                        <svg
                          className="w-3 h-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span
                        className={
                          plan.isPopular ? "text-white" : "text-[#D1D5DC]"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button pinned to bottom */}
              <div className="w-full pt-4 mt-auto">
                <Link
                  to={
                    plan.title === "Talent Portal"
                      ? "/talent-portal"
                      : "/programs/all-programs"
                  }
                  className={`block w-full py-3.5 rounded-full text-center font-bold font-inter text-sm tracking-wide cursor-pointer select-none no-underline ${plan.isPopular
                      ? "bg-gradient-to-b from-white to-slate-200 text-[#0066FF] border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(15,23,42,0.18)] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
                      : "bg-gradient-to-b from-[#0066FF] to-[#0052D4] text-white border border-[#0066FF]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                    }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};