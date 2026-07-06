// src/pages/experts/EXpertsMySession.tsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";

export default function EXpertsMySession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 bottom-0 top-16 md:top-20 lg:top-24 flex flex-col lg:flex-row bg-[#0A0A0E] overflow-hidden p-4 lg:p-6 gap-4 lg:gap-6 select-none">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 bottom-0 left-0 z-50 lg:z-auto 
          w-[280px] lg:w-[300px] xl:w-[320px]
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/10 bg-[#0F172A] flex-shrink-0
          overflow-y-auto lg:rounded-2xl`}
      >
        <ConsultationSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F172A]/30 h-full overflow-hidden rounded-2xl">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0A0F1C] shrink-0">
          <span className="text-white font-semibold text-lg">
            My Consultations
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 hover:bg-[#1E2937] rounded-xl text-white transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-6 lg:py-8 bg-[#0F172A]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
