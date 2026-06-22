// src/pages/experts/EXpertsMySession.tsx
"use client";

import React, { useState } from "react";
import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";
import { Menu, X } from "lucide-react";

export default function EXpertsMySession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full bg-[#0A0A0E] overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-[320px] lg:w-[380px] 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/10 bg-[#0F172A]`}
      >
        <ConsultationSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F172A]/30 h-full overflow-hidden relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden absolute top-4 left-4 z-30 p-3 bg-[#1E2937] rounded-xl text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
