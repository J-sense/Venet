import { SidebarItem } from "@/pages/dashboard/experts/Setting/components/ExpertsSideBarItem";
import { Bell, ChevronDown, Menu, ReceiptText, Shield, User, X } from "lucide-react";

import { useState } from "react";
import { Outlet } from "react-router";

export const UserSettingsLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 min-h-screen bg-[#030712] text-white w-full relative overflow-hidden p-4 md:p-8">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile Toggle Button */}
      <div 
        className="md:hidden flex justify-between items-center bg-[#0D1526] border border-white/5 p-4 rounded-2xl shadow-xl cursor-pointer relative z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-white flex items-center gap-3">
          <Menu className="w-5 h-5 text-blue-400" />
          Settings Menu
        </span>
        <button className="text-zinc-400 hover:text-white transition-colors">
          {isOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 shrink-0 transition-all duration-300 ease-in-out relative z-10
          ${isOpen ? "opacity-100 max-h-[500px] translate-y-0" : "opacity-0 max-h-0 -translate-y-4 overflow-hidden md:opacity-100 md:max-h-full md:translate-y-0 md:overflow-visible"}
        `}
      >
        <div className="bg-[#0D1526] border border-white/5 p-4 rounded-2xl flex flex-col gap-2 shadow-xl shadow-black/40">
          <div onClick={() => setIsOpen(false)}>
            <SidebarItem
              label="Account"
              path="/dashboard/user/settings/account"
              icon={User}
            />
          </div>
          <div onClick={() => setIsOpen(false)}>
            <SidebarItem
              label="Security"
              path="/dashboard/user/settings/security"
              icon={Shield}
            />
          </div>
          <div onClick={() => setIsOpen(false)}>
            <SidebarItem
              label="Billing"
              path="/dashboard/user/settings/billing"
              icon={ReceiptText}
            />
          </div>
          <div onClick={() => setIsOpen(false)}>
            <SidebarItem
              label="Notifications"
              path="/dashboard/user/settings/notifications"
              icon={Bell}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full flex-1 relative z-10 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};
