import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  href?: any
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  href
}: StatCardProps) {
  return (
    <Link to={href}>

      <Card className="bg-[#0D1526] border-[#FFFFFF0F]">
        <CardContent className="p-5 md:p-6 flex flex-col justify-between h-[130px] md:h-[140px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#90A1B9] text-xs md:text-sm font-medium">
                {title}
              </p>
              {subtitle && (
                <p className="text-[#62748E] text-xs mt-0.5">{subtitle}</p>
              )}
            </div>
            <div className="text-[#62748E]">{icon}</div>
          </div>

          <div className="mt-auto">
            <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {value}
            </p>
            {trend && <p className="text-emerald-400 text-sm mt-1">{trend}</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
