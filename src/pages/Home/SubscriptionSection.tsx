import { SectionHeader } from "@/components/ui/TItleWithSubtitle";
import React from "react";

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
      price: "$29.99",
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
      price: "$19.99",
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
      {/* Soft Blue Top Center Glow */}
      <div
        className="absolute left-1/2 top-[-10%] -translate-x-1/2 w-[80%] h-[350px] pointer-events-none z-0 opacity-40 filter blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(43, 127, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* Soft Blue Bottom Glow behind the popular card */}
      <div
        className="absolute left-1/2 bottom-[-5%] -translate-x-1/2 w-[60%] h-[250px] pointer-events-none z-0 opacity-30 filter blur-[100px] mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(16, 24, 40, 1) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto flex flex-col gap-16 lg:gap-20 z-10">
        {/* Header Block */}

        <SectionHeader
          titlePrimary="Subscription"
          titleAccent="Plan"
          subtitle=" Select The Perfect Membership Plan That Matches Your Fitness Goals
            And Lifestyle"
        />
        {/* Pricing Cards Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-[1200px] mx-auto w-full px-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between rounded-[24px] p-8 transition-all duration-300 ${
                plan.isPopular
                  ? "bg-[#0066FF] text-white shadow-[0_0_50px_rgba(0,102,255,0.25)] border-2 border-[#2B7FFF] md:-translate-y-4 z-20"
                  : "bg-[#101828]/70 border border-[#1E2939]/80 text-white backdrop-blur-sm z-10 hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2B7FFF] text-[10px] tracking-widest font-bold font-inter uppercase px-4 py-1 rounded-full shadow-md text-white border border-white/20">
                  Most Popular
                </div>
              )}

              {/* Card Meta Content */}
              <div>
                <h3 className="text-2xl font-bold font-sora tracking-tight mb-2">
                  {plan.title}
                </h3>
                <p
                  className={`text-xs font-inter mb-8 ${
                    plan.isPopular ? "text-white/80" : "text-[#99A1AF]"
                  }`}
                >
                  {plan.subtitle}
                </p>

                {/* Pricing Display */}
                <div className="flex items-baseline gap-1 font-inter mb-8">
                  <span className="text-4xl lg:text-[44px] font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.isPopular ? "text-white/70" : "text-[#99A1AF]"
                    }`}
                  >
                    /month
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-sm font-inter font-normal"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.isPopular ? "text-white" : "text-[#00C950]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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

              {/* Action Button */}
              <button
                className={`w-full py-3.5 rounded-full font-bold font-inter text-sm tracking-wide transition-all duration-200 active:scale-[0.98] ${
                  plan.isPopular
                    ? "bg-white text-[#0066FF] hover:bg-neutral-50 shadow-lg shadow-black/10"
                    : "bg-[#0066FF] text-white hover:bg-[#0052D4]"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
