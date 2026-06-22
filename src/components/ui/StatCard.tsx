import { Card, CardContent } from "@/components/ui/card";
import type React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-[#0D1526] border-[#FFFFFF0F]">
      {/* Reduced padding on mobile, standard on desktop */}
      <CardContent className="p-4 md:p-5 flex flex-col justify-between h-28 md:h-32">
        <div className="flex justify-between items-start gap-2">
          {/* Text truncates if it gets too long on tiny screens */}
          <p className="text-[#90A1B9] text-xs md:text-sm font-medium truncate">
            {title}
          </p>
          <div className="text-[#62748E] hidden md:block md:shrink-0">
            {icon}
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
