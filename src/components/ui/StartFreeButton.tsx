import { useState } from "react";
import { AssessmentModal } from "@/components/assessment";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

interface StartFreeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  showIcon?: boolean;
}

export function StartFreeButton({
  children,
  text = "Start Free",
  showIcon = false,
  className,
  onClick,
  disabled,
  ...props
}: StartFreeButtonProps) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const { data: myProfile } = useMyProfileQuery(undefined);
  const userFromRedux = useAppSelector(selectCurrentUser);
  const userProfile = myProfile?.data || userFromRedux;

  // Check userProfile.is_assessment when logged in, or localStorage guest submission when logged out
  const guestSubmitted =
    typeof window !== "undefined"
      ? localStorage.getItem("vnet_free_assessment_submitted") === "true"
      : false;

  const is_assessment = userProfile
    ? Boolean(userProfile?.is_assessment)
    : guestSubmitted;

  const isDisabled = disabled ?? is_assessment;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!isDisabled) {
      setIsAssessmentOpen(true);
    }
  };

  const buttonContent = children || (
    <>
      <span>{text}</span>
      {showIcon && <span className="text-[12px] md:text-[14px]">→</span>}
    </>
  );

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        title={isDisabled ? "Assessment already completed" : text}
        className={cn(
          "bg-gradient-to-b from-[#007AFF] to-[#0B60BD] border border-[#007AFF4D] text-white rounded-full font-bold transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35),0_4px_15px_rgba(0,122,255,0.3)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] active:scale-[0.97] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.35)] cursor-pointer flex items-center justify-center gap-2 select-none",
          "disabled:bg-zinc-800/90 disabled:bg-none disabled:text-zinc-400 disabled:border disabled:border-zinc-700/80 disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none disabled:hover:brightness-100 disabled:active:scale-100",
          className
        )}
        {...props}
      >
        {buttonContent}
      </button>

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </>
  );
}
