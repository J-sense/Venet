/* eslint-disable react-hooks/purity */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AssessmentCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentCompleteModal({
  isOpen,
  onClose,
}: AssessmentCompleteModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-none p-0 max-w-[420px] rounded-[32px] overflow-hidden font-['Inter'] shadow-2xl [&>button]:hidden">
        <div className="relative w-full text-center p-8 min-h-[620px]">
          {/* Background Image - Behind Trophy & Title */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[380px] h-[380px] pointer-events-none z-0">
            <div
              className="w-full h-full bg-cover bg-top bg-no-repeat rounded-b-[60px] opacity-110"
              style={{
                backgroundImage: "url('/Element.png')",
              }}
            />
          </div>

          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px] z-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 5 + 3}px`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 1}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    backgroundColor: [
                      "#3B82F6",
                      "#10B981",
                      "#F59E0B",
                      "#8B5CF6",
                      "#EF4444",
                    ][Math.floor(Math.random() * 5)],
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-20 flex flex-col items-center">
            {/* Trophy Illustration */}
            <div className="flex justify-center mb-6 mt-4">
              <div className="relative">
                <img src="/trophy.png" alt="Trophy" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[32px] font-bold text-white mb-2 tracking-tight">
              Assessment Complete!
            </h1>
            <p className="text-[#94A3B8] text-[15px] mb-8 font-medium">
              Review your mistakes and try again
            </p>

            {/* Leaderboard Card */}
            <div className="bg-[#0F1423] w-full rounded-3xl p-6 mb-8 text-left shadow-lg border border-white/5">
              <h3 className="text-white font-bold text-xl mb-8">Leaderboard</h3>

              <div className="flex justify-around items-center mb-8 px-2">
                <div className="text-center">
                  <div className="text-[34px] font-bold text-white mb-1 leading-none">
                    100
                  </div>
                  <div className="text-[13px] text-[#64748B]">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-[34px] font-bold text-white mb-1 leading-none">
                    100%
                  </div>
                  <div className="text-[13px] text-[#64748B]">Success Rate</div>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full mb-6" />

              <div>
                <div className="flex justify-between text-[13px] mb-3">
                  <span className="text-[#94A3B8]">Overall Performance</span>
                  <span className="font-bold text-white">100%</span>
                </div>
                <div className="w-full bg-[#1E293B] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#0070F3] h-full rounded-full w-full" />
                </div>
              </div>
            </div>

            {/* View Certificate Button */}
            <Button
              onClick={onClose}
              className="w-full bg-[#0070F3] hover:bg-[#0060df] text-white h-14 text-base font-semibold rounded-full shadow-[0_4px_14px_0_rgba(0,112,243,0.39)] transition-all"
            >
              View Certificate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
