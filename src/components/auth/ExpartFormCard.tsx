// ExpartFormCard.tsx
import { cn } from "@/lib/utils";

export const ExpartFormCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative w-full max-w-[680px]">
      {/* Background image — clipped to card shape */}
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        aria-hidden="true"
      ></div>

      {/* Card content */}
      <div
        className={cn(
          "relative z-10 rounded-[20px] border w-full border-white/10 p-7 shadow-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
