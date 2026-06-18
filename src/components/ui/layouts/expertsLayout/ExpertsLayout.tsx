/* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu, User } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { ExpertsSidebar } from "./ExpertsSidebar";

type UserLayoutProps = {
  navItems: any[];
  user?: any; // Added user prop to handle the data being passed in
};

const ExpertsLayout = ({ navItems, user }: UserLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen w-full bg-[#FAF8F6] relative overflow-hidden text-[#2C1810]">
      {/* Sidebar - Desktop & Mobile */}
      <ExpertsSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        navItems={navItems}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-[260px] transition-all duration-300 relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-[#E8DED0] px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-[#FAF8F6] rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-[#3D2817]" />
            </button>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="flex items-center gap-2 relative p-2 bg-[#3D2817] text-white px-4 py-3 hover:bg-[#805a35] rounded-full transition-all">
              <User className="w-5 h-5" />
              {user?.data?.first_name || "User"}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ExpertsLayout;
