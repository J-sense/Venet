import React from "react";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "fill" | "outline";
  size?: "large" | "medium";
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = "fill",
  size = "large",
  className = "",
}) => {
  const sizeClasses = size === "large" ? "py-3.5 px-8" : "py-2 px-6";

  const variantClasses =
    variant === "fill"
      ? "bg-gradient-to-b from-[#007AFF] to-[#0B60BD] border border-[#007AFF4D] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] cursor-pointer select-none"
      : "border border-[#0B60BD] text-[#0B60BD] hover:bg-[#0B60BD]/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.2)] [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer select-none";

  return (
    <button
      onClick={onClick}
      className={`rounded-[100px] inline-flex justify-center items-center gap-5 transition-all duration-300 font-vazirmatn text-lg font-medium ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className="text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
        {label}
      </span>
    </button>
  );
};
