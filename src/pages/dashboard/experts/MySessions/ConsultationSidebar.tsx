// src/pages/experts/ConsultationSidebar.tsx
import { useNavigate, useParams, useLocation } from "react-router";
import { Search } from "lucide-react";

const MOCK_HISTORY_LIST = [
  {
    id: "1",
    name: "Henry Dholi",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150",
    message: "I came across your profile and...",
  },
  {
    id: "2",
    name: "Mariya Desoja",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
    message: "I like your confidence 💪",
  },
];
interface ConsultationSidebarProps {
  onClose?: () => void;
}

export const ConsultationSidebar = ({ onClose }: ConsultationSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, id } = useParams();
  const activeSection = section || "upcoming";

  const basePath = location.pathname.includes("/dashboard/user")
    ? "/dashboard/user"
    : "/dashboard/experts";

  return (
    <div className="h-full flex flex-col px-1 py-5">

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
                navigate(`${basePath}/consultation/${s}`);
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
        <div className="flex-1 overflow-y-auto flex flex-col">
          {activeSection === "previous" ? (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-4 relative shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  className="w-full bg-[#131926] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-500"
                />
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 px-2">
                {MOCK_HISTORY_LIST.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`${basePath}/consultation/previous/${item.id}`);
                      onClose?.();
                    }}
                    className={`flex gap-3 p-3 rounded-3xl cursor-pointer transition-all hover:bg-white/5 ${
                      id === item.id ? "bg-white/10" : ""
                    }`}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white">
                        {item.name}
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-1 mt-0.5">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
