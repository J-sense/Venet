// src/pages/experts/EXpertsMySession.tsx

import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";

export default function EXpertsMySession() {
  return (
    <div className="flex h-full w-full bg-[#0A0A0E] overflow-hidden">
      <ConsultationSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F172A]/30 border-l border-white/5">
        <Outlet />
      </div>
    </div>
  );
}
