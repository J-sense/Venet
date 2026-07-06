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
      className={`bg-[#27272A] border-r border-[#1F1F1F] fixed top-0 left-0 z-40 flex h-screen w-[300px] flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Logo Section */}
      <Link to={"/"} className="p-6 flex items-center justify-center w-full">
        <img
          src="/VNetLogo.png"
          alt="VNET"
          className="h-auto w-[300px] max-w-[160px] object-contain brightness-110 rounded-full"
        />
      </Link>
      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4">
        <p className="text-[#FFFFFF] text-[10px] font-bold uppercase tracking-[2px] px-4 mb-4">
          Main Menu
        </p>

        <div className="space-y-1">
          {navItems?.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-300 ${isActive
                    ? "bg-blue-500/10 outline outline-1 outline-blue-500/20"
                    : "hover:bg-[#171717] hover:text-white"
                  }`}
              >
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
                  <Icon className="w-5 h-5 text-[#A3A3A3]" />
                )}

                {/* Label */}
                <span
                  className={`text-base font-medium  leading-6 ${isActive ? "text-blue-400" : "text-[#FFFFFF]"
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
      <div className="p-4 border-t border-[#1F1F1F]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-medium text-[#A3A3A3] hover:text-red-500 transition-colors"
        >
          <span>Log Out</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
