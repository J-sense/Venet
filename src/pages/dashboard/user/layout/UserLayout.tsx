/* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu, User, Bell } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { UserSidebar } from "./UserSidebar";

type UserLayoutProps = {
  navItems: any[];
  user?: any; // Added user prop to handle the data being passed in
};

const getHeaderContent = (pathname: string) => {
  if (pathname.includes("/program")) {
    return { title: "Program Details", subtitle: "Track your progress and milestones" };
  } else if (pathname.includes("/certificates")) {
    return { title: "My Certificates", subtitle: "View and download your earned certificates" };
  } else if (pathname.includes("/talent-portal") || pathname.includes("/manual-input")) {
    return { title: "Talent Portal", subtitle: "Manage your resume and career opportunities" };
  } else if (pathname.includes("/settings")) {
    return { title: "Settings", subtitle: "Manage your account and preferences" };
  } else if (pathname.includes("/consultation")) {
    return { title: "Consultations", subtitle: "Manage your expert sessions" };
  } else {
    return { title: "User Dashboard", subtitle: "Welcome back to your learning journey!" };
  }
};

const UserLayout = ({ navItems, user }: UserLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const headerContent = getHeaderContent(location.pathname);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen w-full bg-[#FAF8F6] relative overflow-hidden text-[#2C1810]">
      {/* Sidebar - Desktop & Mobile */}
      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        navItems={navItems}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 lg:ml-[260px] transition-all duration-300 relative z-10">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 md:h-20 lg:h-24 bg-black border-b border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Dynamic Titles */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-zinc-800 rounded-xl transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="flex flex-col min-w-0 ml-1 sm:ml-5">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">
                {headerContent.title}
              </h1>
              <p className="text-[#94A3B8] text-xs sm:text-sm hidden sm:block truncate">
                {headerContent.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-2">
            <button className="relative p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full border-2 border-black"></span>
            </button>
            <button className="flex items-center gap-2 relative p-2 bg-[#1E293B] text-white px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-[#334155] rounded-full transition-all border border-zinc-700">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">{user?.data?.first_name || "User"}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#000000]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
