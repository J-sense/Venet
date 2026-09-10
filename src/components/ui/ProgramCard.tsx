import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type React from "react";

interface ProgramCardProps {
  title: string;
  status: string;
  progress: number;
  icon: React.ReactNode;
}

export function STartProgramCard({
  title,
  status,
  progress,
  icon,
}: ProgramCardProps) {
  return (
    <Card className="group relative bg-[#0D1526]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/20">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none" />
      <CardContent className="p-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8">
        <div className="flex items-center gap-5">
          {/* Icon Box */}
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-out">
            {icon}
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg tracking-tight mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-3 flex-wrap hidden">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                {status}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span className="text-xs text-zinc-400 font-medium tracking-wide hidden">
                  {progress}% Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button className="shrink-0 bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 rounded-full px-8 py-5 transition-all duration-300 font-bold group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] w-full sm:w-auto overflow-hidden relative">
          <span className="relative z-10">{progress > 0 ? "Continue" : "Start Now"}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
