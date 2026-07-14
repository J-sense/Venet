// src/pages/experts/EXpertsMySession.tsx
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { ConsultationSidebar } from "./ConsultationSidebar";

// Layout header height: h-16 (64px) on mobile, h-20 (80px) on md+
// Layout main padding: p-4 (16px) on mobile, p-6 (24px) on sm+, p-8 (32px) on lg+
// We cancel the padding with negative margins and set height to fill the viewport

export default function EXpertsMySession() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLg, setIsLg] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const onResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-open the consultation sidebar on desktop
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    /*
     * Negative margins cancel the layout's padding so this fills edge-to-edge.
     * Height is set to fill the viewport minus the sticky header (64px mobile / 80px md+).
     * overflow-hidden prevents inner scrollbars from leaking.
     */
    <div
      className="
        -m-4 sm:-m-6 lg:-m-8
        h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]
        flex flex-row
        bg-[#0A0A0E]
        overflow-hidden
        select-none
      "
    >
      {/* ── Overlay backdrop (mobile/tablet only) ── */}
      {isSidebarOpen && !isLg && (
        <div
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Consultation Sidebar ── */}
      <aside
        className={`
          flex-shrink-0 h-full
          bg-[#0F172A] border-r border-white/8
          transition-all duration-300 ease-in-out
          overflow-y-auto
          ${isLg
            ? "relative w-72 xl:w-80"                         // Desktop: always visible, part of flow
            : `fixed top-0 left-0 bottom-0 z-50 w-[280px]    
               ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transform`
          }
        `}
      >
        <ConsultationSidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#0F172A]">
        {/* Mobile topbar — shows session title + toggle button */}
        {!isLg && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A0F1C] shrink-0">
            <span className="text-white font-semibold text-base">My Consultations</span>
            <button
              onClick={() => setIsSidebarOpen((p) => !p)}
              className="p-2 hover:bg-[#1E2937] rounded-xl text-white transition-colors"
              aria-label="Toggle sessions sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}

        {/* Outlet fills remaining height */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
