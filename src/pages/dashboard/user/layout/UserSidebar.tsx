import { Link, useLocation } from "react-router";
import { LogOut } from "lucide-react";

import type { MenuItemsType } from "@/components/ui/navitems";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MenuItemsType[];
}

export function UserSidebar({ isOpen, onClose, navItems }: SidebarProps) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <aside
      className={`bg-[#18181B] border-r border-[#1F1F1F] fixed top-0 left-0 z-40 flex h-screen w-[260px] flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center justify-center w-full border-b border-[#1F1F1F]/60">
        <Link to={"/"}>
          <img
            src="/VNetLogo.png"
            alt="VNET"
            className="h-auto w-[260px] max-w-[160px] object-contain brightness-110 rounded-full"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-6">
        <p className="text-[#71717B] text-[12px] font-semibold uppercase tracking-[2px] px-4 mb-4">
          Main Menu
        </p>

        <div className="space-y-1">
          {navItems?.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/dashboard/user" &&
                location.pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500/10 outline outline-1 outline-blue-500/20 text-[16px] shadow-sm shadow-blue-500/5"
                    : "hover:bg-[#171717] hover:text-white text-[16px] text-[#94A3B8] hover:translate-x-1.5"
                }`}
              >
                {/* Active Accent Line Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />
                )}

                {/* Icon/Active State Logic */}
                {isActive ? (
                  <div className="size-5 relative grid grid-cols-2 gap-1 content-center p-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="size-1.5 outline outline-[1.67px] outline-blue-400"
                      />
                    ))}
                  </div>
                ) : (
                  <Icon className="w-5 h-5 text-[#94A3B8]" />
                )}

                {/* Label */}
                <span
                  className={`text-base font-medium font-['Inter'] leading-6 ${
                    isActive ? "text-blue-400" : "text-[#94A3B8]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 bg-[#1E1E21]/20 mt-auto">
        <div className="flex items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3 shadow-md select-none">
          {/* User Info Block */}
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate leading-tight">
              Alice Wong
            </h4>
            <p className="text-[11px] text-zinc-500 font-medium truncate mt-1 leading-none">
              Premium Member
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 rounded-xl border border-white/5 hover:border-red-500/20 transition-all duration-300 cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
