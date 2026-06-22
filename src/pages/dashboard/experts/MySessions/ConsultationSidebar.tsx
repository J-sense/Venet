// src/pages/experts/ConsultationSidebar.tsx
import { useNavigate, useParams } from "react-router";
import { X } from "lucide-react";

const MOCK_HISTORY_LIST = [
  { id: "1", name: "Henry Dholi" },
  { id: "2", name: "Mariya Desoja" },
  { id: "3", name: "Robert Jhon" },
];

interface ConsultationSidebarProps {
  onClose?: () => void;
}

export const ConsultationSidebar = ({ onClose }: ConsultationSidebarProps) => {
  const navigate = useNavigate();
  const { section, id } = useParams();
  const activeSection = section || "upcoming";

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4 border-b border-white/10">
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-6 text-white">
          Active Conversations
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["upcoming", "previous"].map((s) => (
            <button
              key={s}
              onClick={() => {
                navigate(`/dashboard/experts/consultation/${s}`);
                onClose?.(); // Close sidebar on mobile after navigation
              }}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${
                activeSection === s
                  ? "bg-[#0A66C2] text-white"
                  : "bg-[#1E2937] text-gray-400 hover:bg-[#2D3748]"
              }`}
            >
              {s === "upcoming" ? "Upcoming" : "History"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeSection === "previous" ? (
            <div className="space-y-2">
              {MOCK_HISTORY_LIST.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(
                      `/dashboard/experts/consultation/previous/${item.id}`,
                    );
                    onClose?.();
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    id === item.id ? "bg-[#1E2937]" : "hover:bg-[#1E2937]/50"
                  }`}
                >
                  <div className="font-semibold text-white">{item.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic text-center mt-10">
              Upcoming sessions are managed in the main view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
