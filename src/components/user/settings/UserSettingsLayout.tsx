import { SidebarItem } from "@/components/experts/settings/ExpertsSideBarItem";
import { Bell, Menu, ReceiptText, Shield, User, X } from "lucide-react";

import { useState } from "react";
import { Outlet } from "react-router";

export const UserSettingsLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 min-h-screen">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center bg-[#0F172A] p-4 rounded-xl">
        <span className="font-semibold text-white">Settings Menu</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar: Added onClick to close the menu when any item is clicked */}
      <aside
        className={`w-full md:w-64 shrink-0 ${isOpen ? "block" : "hidden md:block"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="bg-[#0F172A] p-4 rounded-2xl flex flex-col gap-2">
          <SidebarItem
            label="Security"
            path="/dashboard/user/settings/account"
            icon={User}
          />
          <SidebarItem
            label="Security"
            path="/dashboard/user/settings/security"
            icon={Shield}
          />
          <SidebarItem
            label="Billing"
            path="/dashboard/user/settings/billing"
            icon={ReceiptText}
          />
          <SidebarItem
            label="Notifications"
            path="/dashboard/user/settings/notifications"
            icon={Bell}
          />
        </div>
      </aside>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};
