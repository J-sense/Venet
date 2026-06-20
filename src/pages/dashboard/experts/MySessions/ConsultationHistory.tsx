// src/pages/ConsultationHistory.tsx

import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";

export default function ConsultationHistory() {
  return (
    <div className="flex h-screen bg-[#0F172A] text-white overflow-hidden">
      <ConsultationSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F172A]/30 border-l border-white/5">
        {/* The ChatWindow will render inside here via the Router */}
        <Outlet />
      </main>
    </div>
  );
}
