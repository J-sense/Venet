// src/pages/experts/EXpertsMySession.tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";

export default function EXpertsMySession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="absolute inset-0 h-full flex flex-col lg:flex-row bg-[#0A0A0E] overflow-hidden mx-3 sm:mx-4 md:mx-6 my-16 sm:my-20 lg:my-24">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto 
          w-[260px] sm:w-[280px] lg:w-[300px] xl:w-[320px]
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/10 bg-[#0F172A] flex-shrink-0
          overflow-y-auto`}
      >
        <ConsultationSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F172A]/30 h-full overflow-hidden">
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
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
