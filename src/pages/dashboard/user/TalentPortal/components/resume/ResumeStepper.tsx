import { Briefcase, User, Wrench } from "lucide-react";

export function ResumeStepper() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <User className="w-5 h-5 text-white" />
          </div>
          <p className="text-blue-400 text-xs font-medium mt-2">
            Personal Info
          </p>
        </div>

        <div className="w-16 h-px bg-zinc-700 mt-[-16px]" />

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-zinc-300 text-xs font-medium mt-2">
            Experience & Edu
          </p>
        </div>

        <div className="w-16 h-px bg-zinc-700 mt-[-16px]" />

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-zinc-300 text-xs font-medium mt-2">
            Skills & Projects
          </p>
        </div>
      </div>
    </div>
  );
}
