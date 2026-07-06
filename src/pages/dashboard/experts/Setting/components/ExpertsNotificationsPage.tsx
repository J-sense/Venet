import { Smartphone } from "lucide-react";
import { useState } from "react";

export default function ExpertsNotificationsPage() {
  const [inAppReminders, setInAppReminders] = useState(true);

  return (
    <div className="w-full max-w-full space-y-6 select-none animate-fadeIn">
      {/* ── IN-APP NOTIFICATIONS PANEL ── */}
      <div className="bg-[#122131] border border-[#FFFFFF0F] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/25">
        {/* Card Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-white/10">
          <div className="p-2.5 bg-blue-500/10 rounded-xl text-[#2B7FFF] flex items-center justify-center shrink-0">
            <Smartphone size={20} className="stroke-[2]" />
          </div>
          <h2 className="text-white text-base md:text-lg font-bold font-sora tracking-tight">
            In-App Notifications
          </h2>
        </div>

        {/* Setting Row */}
        <div className="pt-6 flex items-start justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <h3 className="text-white text-sm md:text-base font-bold font-sora tracking-tight">
              Consultation Reminders
            </h3>
            <p className="text-xs md:text-sm text-[#90A1B9]/70 leading-relaxed font-inter">
              Alerts for upcoming wellness or career consultations.
            </p>
          </div>

          {/* Custom Toggle Switch matching screenshot */}
          <div className="pt-1 shrink-0">
            <button
              onClick={() => setInAppReminders(!inAppReminders)}
              aria-label="Toggle consultation reminders"
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ${inAppReminders ? "bg-[#2B7FFF]" : "bg-zinc-700"
                }`}
            >
              <span
                className={`flex items-center justify-center h-5.5 w-5.5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${inAppReminders ? "translate-x-6 text-[#2B7FFF]" : "translate-x-0.5 text-zinc-500"
                  }`}
              >
                {inAppReminders && (
                  <svg
                    className="w-3 h-3 text-[#2B7FFF] stroke-[3]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
