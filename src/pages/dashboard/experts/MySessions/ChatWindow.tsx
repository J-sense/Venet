// src/components/consultation/ChatWindow.tsx
import {
  Calendar,
  Clock,
  Hourglass,
  Search,
  Users,
  Video
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ConsultationReview } from "./ConsultationReview";

const UPCOMING_SESSIONS = [
  {
    id: "1",
    name: "Jubayer Ahmad",
    role: "Expert",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    date: "Jun 22, 2026",
    startsIn: "Starts in 7,015 min",
    time: "09:00 AM - 09:05 AM",
    duration: "5 Minutes",
    channel: "Default Project",
    buttonType: "join",
    buttonText: "Join Now",
  },
  {
    id: "2",
    name: "Jubayer Ahmad",
    role: "Expert",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    date: "Jun 22, 2028",
    startsIn: "Starts in 7,015 min",
    time: "09:00 AM - 09:05 AM",
    duration: "5 Minutes",
    channel: "consultation-102",
    buttonType: "wait",
    buttonText: "2 days to go",
  },
];

export const ChatWindow = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isExpert = location.pathname.includes("/dashboard/experts");

  // ===================== UPCOMING SESSIONS =====================
  if (section === "upcoming") {
    return (
      <div className="h-full flex flex-col overflow-hidden bg-[#0F172A] text-white font-sora">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Upcoming Sessions
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and join your scheduled voice sessions
            </p>
          </div>
          <div className="relative w-full md:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="w-full bg-[#131926] border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5 w-full">
          {UPCOMING_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="group w-full bg-[#111723] border border-white/5 rounded-3xl p-5 sm:p-6 lg:p-8 hover:bg-[#131a29] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-6 lg:gap-8 w-full">
                {/* 1. Left side: Profile */}
                <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0 2xl:w-[260px]">
                  <div className="relative shrink-0">
                    <img
                      src={session.avatar}
                      alt={session.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-white/5 group-hover:ring-blue-500/30 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-[3px] border-[#111723]"></div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight group-hover:text-blue-400 transition-colors truncate">
                      {session.name}
                    </h3>
                    <p className="text-blue-400/80 text-sm font-medium mt-1 truncate">
                      {session.role}
                    </p>
                  </div>
                </div>

                {/* 2. Middle: Details Block */}
                <div className="flex-1 bg-[#0A0F1C]/60 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 border border-white/5">
                  {/* Date */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-zinc-500 text-[11px] sm:text-xs font-bold tracking-wider uppercase block mb-0.5">
                        Date
                      </span>
                      <div className="text-white text-sm sm:text-base font-semibold flex flex-wrap items-center gap-2">
                        <span className="truncate">{session.date}</span>
                        {session.buttonType === "join" && (
                          <span className="bg-red-500/10 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Local Time */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-zinc-500 text-[11px] sm:text-xs font-bold tracking-wider uppercase block mb-0.5">
                        Local Time
                      </span>
                      <div className="text-white text-sm sm:text-base font-semibold truncate">
                        {session.time}
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Hourglass className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-zinc-500 text-[11px] sm:text-xs font-bold tracking-wider uppercase block mb-0.5">
                        Duration
                      </span>
                      <div className="text-white text-sm sm:text-base font-semibold truncate">
                        {session.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Right side: Action Button */}
                <div className="flex-shrink-0 w-full sm:w-auto pt-2 2xl:pt-0">
                  {session.buttonType === "join" ? (
                    <button
                      onClick={() =>
                        navigate(
                          `/video-call/${session.channel}?remoteName=${encodeURIComponent(
                            session.name,
                          )}&localName=${encodeURIComponent("Alice Wong")}`,
                        )
                      }
                      className="w-full bg-[#0066fe] hover:bg-[#0057d9] text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.985] shadow-xl shadow-blue-600/25 ring-1 ring-blue-500/50"
                    >
                      <Video size={18} />
                      <span className="whitespace-nowrap">{session.buttonText}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-white/5 text-zinc-400 font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-2.5 border border-white/10 cursor-not-allowed"
                    >
                      <Clock size={18} />
                      <span className="whitespace-nowrap">{session.buttonText}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ===================== PREVIOUS SESSION / CHAT VIEW =====================
  if (section === "previous" && id) {
    return (
      <div className="flex flex-col h-full bg-[#0A0F1C]">
        {/* Chat Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0F172A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-700 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              👤
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Henry Dholi</h3>
              <p className="text-emerald-400 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#0A0F1C] space-y-6">
          <div className="bg-[#1E2937] p-4 sm:p-5 rounded-2xl text-white max-w-[90%] sm:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%]">
            Hello! How can I help you today?
          </div>
          <div className="bg-blue-600 p-4 sm:p-5 rounded-2xl ml-auto max-w-[90%] sm:max-w-[75%] lg:max-w-[60%] xl:max-w-[50%] text-white">
            I wanted to discuss my career transition strategy.
          </div>
        </div>

        {/* Review Section */}
        {!isExpert && <ConsultationReview />}
      </div>
    );
  }

  // ===================== DEFAULT / EMPTY STATE =====================
  return (
    <div className="h-full flex items-center justify-center p-6 text-center">
      <div className="max-w-sm">
        <Users className="w-20 h-20 mx-auto text-zinc-600 mb-6" />
        <h3 className="text-2xl font-semibold text-white mb-3">
          No conversation selected
        </h3>
        <p className="text-zinc-500 leading-relaxed">
          Select an upcoming session or a previous conversation from the sidebar
          to get started
        </p>
      </div>
    </div>
  );
};
