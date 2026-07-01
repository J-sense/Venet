"use client";

import { Check } from "lucide-react";

export default function LockPortal({ onUnlock }: { onUnlock?: () => void }) {
  const benefits = [
    "Professional profile builder with certificate showcase",
    "AI-powered job recommendations based on your completed programs",
    "Resume and cover letter generator",
    "Networking community with other graduates",
    "Direct messaging with recruiters and hiring managers",
  ];

  return (
    // 'p-8' provides the extra outer margin/padding on all sides
    // 'flex items-center justify-center' ensures perfect centering
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl"
        style={{
          backgroundImage: "url(/unlockImg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-90"
          style={{
            background: "linear-gradient(to bottom, #1A4C99, #2B7FFF)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full p-10 flex flex-col items-center justify-center space-y-8">
          {/* Briefcase Icon */}
          <div className="flex items-center justify-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Unlock the Talent Portal
            </h1>
            <p className="text-base text-white/80 max-w-sm mx-auto leading-relaxed">
              Get matched with opportunities and showcase your achievements to
              our network of top employers.
            </p>
          </div>

          {/* Features Box */}
          <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              What's Included:
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/90 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center space-y-0.5">
            <div className="text-5xl font-extrabold text-white">$9.99</div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
              Per Month • Cancel Anytime
            </p>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={onUnlock}
            className="w-full bg-white text-blue-900 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 shadow-lg text-center"
          >
            Subscribe to Talent Portal
          </button>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/50 max-w-sm">
            $9.99 charged monthly. No refunds for unused portion in current
            billing period.
          </p>
        </div>
      </div>
    </div>
  );
}
