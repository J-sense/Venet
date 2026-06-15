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
      ? "bg-[#0B60BD] text-white shadow-md"
      : "border border-[#0B60BD] text-[#0B60BD] hover:bg-[#0B60BD]/5";

  return (
    <button
      onClick={onClick}
      className={`rounded-[100px] inline-flex justify-center items-center gap-5 transition-all duration-300 font-vazirmatn text-lg font-medium ${sizeClasses} ${variantClasses} ${className}`}
    >
      <span className="text-center [text-shadow:_0px_2px_4px_rgb(0_0_0_/_0.20)]">
        {label}
      </span>
    </button>
  );
};
