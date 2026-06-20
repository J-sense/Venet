import { useNavigate, useParams } from "react-router";

const MOCK_HISTORY_LIST = [
  { id: "1", name: "Henry Dholi" },
  { id: "2", name: "Mariya Desoja" },
  { id: "3", name: "Robert Jhon" },
];

export const ConsultationSidebar = () => {
  const navigate = useNavigate();
  const { section, id } = useParams();
  const activeSection = section || "upcoming";

  return (
    <aside className="w-[380px] border-r border-white/10 bg-[#0F172A] p-6 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-6 text-white">
        Active Conversations
      </h2>

      <div className="flex gap-2 mb-6">
        {["upcoming", "previous"].map((s) => (
          <button
            key={s}
            onClick={() => navigate(`/dashboard/experts/consultation/${s}`)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === s
                ? "bg-[#0A66C2] text-white"
                : "bg-[#1E2937] text-gray-400 hover:bg-[#2D3748]"
            }`}
          >
            {s === "upcoming" ? "Upcoming" : "History"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSection === "previous" ? (
          <div className="space-y-2">
            {MOCK_HISTORY_LIST.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(
                    `/dashboard/experts/consultation/previous/${item.id}`,
                  )
                }
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
    </aside>
  );
};
