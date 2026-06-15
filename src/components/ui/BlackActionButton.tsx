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
        outline outline-2 outline-offset-[-2px] 
        outline-[#0B60BD] 
        inline-flex justify-center items-center gap-5 
        transition-all duration-300 hover:bg-[#0B60BD]/5 
        ${className}
      `}
    >
      <span className="text-center text-[#0B60BD] text-lg font-medium [text-shadow:_0px_2px_4px_rgb(0_0_0_/_0.20)]">
        {label}
      </span>
    </button>
  );
};
