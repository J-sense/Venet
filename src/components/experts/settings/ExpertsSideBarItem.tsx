/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface SidebarItemProps {
  label: string;
  path: string;
  icon?: LucideIcon; // Optional icon prop
}

export const SidebarItem = ({ label, path, icon: Icon }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }: any) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-[#1E2937] text-white font-medium"
            : "text-gray-400 hover:bg-[#1E2937]/50 hover:text-gray-200"
        }`
      }
    >
      {/* Render icon if provided */}
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
    </NavLink>
  );
};
