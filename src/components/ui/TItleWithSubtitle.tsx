import React from "react";

interface SectionHeaderProps {
  titlePrimary: string;
  titleAccent: string;
  subtitle: string;
}

/**
 * SectionHeader
 * A reusable component for displaying a title with an accent word and a descriptive subtitle.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titlePrimary,
  titleAccent,
  subtitle,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      <h2 className="font-sora text-[60px] font-extrabold leading-[84px] tracking-[2.4px] text-white">
        {titlePrimary} <span className="text-[#0B60BD]">{titleAccent}</span>
      </h2>

      <p className="mt-4 font-inter text-[21.61px] font-medium text-white/70 capitalize leading-[33.61px] max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
};
