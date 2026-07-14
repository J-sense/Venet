/* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu, Bell } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ExpertsSidebar } from "./ExpertsSidebar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type UserLayoutProps = {
  navItems: any[];
  user?: any; // Added user prop to handle the data being passed in
};

const getHeaderContent = (pathname: string) => {
  if (pathname.includes("/availability")) {
    return { title: "Weekly Availability", subtitle: "Set your available hours for each day of the week" };
  } else if (pathname.includes("/profile")) {
    return { title: "Expert Profile", subtitle: "Ensure Your Profile Is Always Up to Date" };
  } else if (pathname.includes("/Reviews")) {
    return { title: "What Clients Are Saying", subtitle: "Read reviews, ratings, and success stories from clients you've helped." };
  } else if (pathname.includes("/settings")) {
    return { title: "Settings", subtitle: "Manage your account and preferences" };
  } else if (pathname.includes("/consultation")) {
    return { title: "Consultations", subtitle: "Manage your upcoming and past sessions" };
  } else {
    // Default to Overview
    return { title: "Expert Dashboard", subtitle: "Welcome back" };
  }
};

const ExpertsLayout = ({ navItems }: UserLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const headerContent = getHeaderContent(location.pathname);

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
      <div className={`flex flex-col flex-1 transition-all duration-300 relative z-10 ${isSidebarOpen ? "lg:ml-[260px]" : "lg:ml-0"}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 md:h-20 lg:h-24 bg-black border-b border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Dynamic Titles */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={toggleSidebar}
              className="p-1.5 sm:p-2 hover:bg-zinc-800 rounded-xl transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="flex flex-col min-w-0 ml-5">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">
                {headerContent.title}
              </h1>
              <p className="text-[#94A3B8] text-xs sm:text-sm hidden sm:block truncate">
                {headerContent.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Notifications & User Avatar */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-2">
            <button className="relative p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border-2 border-black"></span>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-zinc-700 overflow-hidden cursor-pointer hover:border-zinc-500 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
                alt="Expert Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main ref={mainRef} className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#000000]">
          <ScrollToTop scrollRef={mainRef} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ExpertsLayout;
