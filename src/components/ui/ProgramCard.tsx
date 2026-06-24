import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "./progress";
import type React from "react";

interface ProgramCardProps {
  title: string;
  status: string;
  progress: number;
  icon: React.ReactNode; // Pass the icon directly
}

export function STartProgramCard({
  title,
  status,
  progress,
  icon,
}: ProgramCardProps) {
  return (
    <Card className="bg-[#19273C] border-[#FFFFFF0F] m-3">
      <CardContent className="p-4 md:p-6">
        {/* Responsive layout: column on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex gap-4 items-center">
            <div className="bg-[#1E293B]/70 p-3 rounded-xl border border-[#FFFFFF05] shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-base md:text-[14px] text-[#9F9FA9]">
                {title}
              </h3>
              <p className="text-[#90A1B9] text-xs md:text-sm">{status}</p>
            </div>
          </div>

          <Button
            variant="default"
            className="bg-[#0A66C2] hover:bg-[#1D4ED8] text-white w-full rounded-full sm:w-auto text-sm"
          >
            Start Program
          </Button>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2 bg-[#334155]" />
          <p className="text-[#62748E] text-xs font-medium">
            {progress}% complete
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
