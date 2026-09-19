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
      {showIcon && <span className="text-lg md:text-xl">→</span>}
    </>
  );

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        title={isDisabled ? "Assessment already completed" : text}
        className={cn(
          "bg-[#007AFF] text-white rounded-full font-bold transition-all duration-300 shadow-md shadow-blue-500/20 hover:bg-blue-600 active:scale-95 cursor-pointer flex items-center justify-center gap-2",
          "disabled:bg-zinc-800/90 disabled:text-zinc-400 disabled:border disabled:border-zinc-700/80 disabled:cursor-not-allowed disabled:hover:bg-zinc-800/90 disabled:opacity-75 disabled:shadow-none disabled:active:scale-100",
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
