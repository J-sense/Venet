import React from "react";

interface BlackActionButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

/**
 * BlackActionButton
 * A professional outlined button with the specific orange/black theme styling.
 */
export const BlackActionButton: React.FC<BlackActionButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        self-stretch py-3.5 px-8 rounded-[100px] 
        border-2 border-[#0B60BD]
        inline-flex justify-center items-center gap-5 
        transition-all duration-200 cursor-pointer select-none
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_5px_rgba(0,0,0,0.18)]
        active:scale-[0.97] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_3px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      <span className="text-center text-[#0B60BD] text-lg font-medium [text-shadow:_0px_1px_2px_rgba(0,0,0,0.20)]">
        {label}
      </span>
    </button>
  );
};
