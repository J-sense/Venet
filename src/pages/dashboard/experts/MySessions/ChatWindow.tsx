/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/consultation/ChatWindow.tsx
import { Calendar, Clock, Hourglass, Search, Users, Video } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router";
import { ConsultationReview } from "./ConsultationReview";
import { useGetUserSessionQuery } from "@/redux/features/userDashboard/userSession.api";

const formatTimeTo12Hour = (timeStr: string) => {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${ampm}`;
};

export const ChatWindow = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isExpert = location.pathname.includes("/dashboard/experts");
  const { data: mySessions, isLoading } = useGetUserSessionQuery(undefined);
  const sessionsList = mySessions?.data || [];
  console.log(mySessions);
  // ===================== UPCOMING SESSIONS =====================
  if (section === "upcoming") {
    return (
      <div className="flex-1 overflow-y-auto bg-[#0F172A] text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-white/5 bg-[#0F172A]/95 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Upcoming Sessions
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              Manage and join your scheduled voice sessions
            </p>
          </div>
          <div className="relative w-full sm:w-64 lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="w-full bg-[#131926] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-zinc-400">
              Loading sessions...
            </div>
          ) : sessionsList.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              No upcoming sessions found.
            </div>
          ) : (
            sessionsList.map((session: any) => {
              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                !isExpert
                  ? session.expert_name
                  : session?.user_name || "Expert",
              )}&background=1E293B&color=3B82F6`;
              const formattedTime = `${formatTimeTo12Hour(session.start_time)} - ${formatTimeTo12Hour(session.end_time)}`;
              const isScheduled = session.status === "SCHEDULED";

              return (
                <div
                  key={session.id}
                  className="group w-full bg-[#111723] border border-white/5 rounded-2xl overflow-hidden hover:bg-[#131a29] hover:border-white/10 transition-all duration-300 shadow-lg"
                >
                  {/* Card Top: Avatar + Name + Badge + Action Button */}
                  <div className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={avatarUrl}
                        alt={session.expert_name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/5 group-hover:ring-blue-500/30 transition-all duration-300"
                      />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#111723]" />
                    </div>

                    {/* Name + Role */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base sm:text-lg tracking-tight group-hover:text-blue-400 transition-colors truncate">
                        {!isExpert ? session.expert_name : session?.user_name}
                      </h3>
                      <p className="text-blue-400/80 text-xs sm:text-sm font-medium mt-0.5 truncate">
                        {session.status}
                      </p>
                    </div>

                    {/* Status Badge */}
                    {isScheduled && (
                      <span className="hidden sm:flex shrink-0 bg-red-500/10 text-red-400 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                        Live
                      </span>
                    )}

                    {/* Action Button — visible on md+ inline */}
                    <div className="hidden md:block shrink-0 ml-2">
                      {isScheduled ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/video-call/${session.id}?remoteName=${encodeURIComponent(
                                session.expert_name,
                              )}&localName=${encodeURIComponent("User")}&role=${
                                isExpert ? "expert" : "user"
                              }`,
                            )
                          }
                          className="bg-[#0066fe] hover:bg-[#0057d9] text-white font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 ring-1 ring-blue-500/40 whitespace-nowrap text-sm"
                        >
                          <Video size={15} />
                          Join Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-white/5 text-zinc-400 font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 border border-white/10 cursor-not-allowed whitespace-nowrap text-sm"
                        >
                          <Clock size={15} />
                          Scheduled
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Details Grid */}
                  <div className="px-4 sm:px-6 py-4 grid grid-cols-3 gap-3 sm:gap-4">
                    {/* Date */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-zinc-500 text-[10px] font-bold tracking-wider uppercase block mb-0.5">
                          Date
                        </span>
                        <div className="text-white text-xs sm:text-sm font-semibold truncate">
                          {session.date}
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-zinc-500 text-[10px] font-bold tracking-wider uppercase block mb-0.5">
                          Time
                        </span>
                        <div className="text-white text-xs sm:text-sm font-semibold truncate">
                          {formattedTime}
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Hourglass className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-zinc-500 text-[10px] font-bold tracking-wider uppercase block mb-0.5">
                          Duration
                        </span>
                        <div className="text-white text-xs sm:text-sm font-semibold truncate">
                          {session.duration_minutes} min
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only Action Button */}
                  <div className="md:hidden px-4 pb-4">
                    {isScheduled ? (
                      <button
                        onClick={() =>
                          navigate(
                            `/video-call/${session.id}?remoteName=${encodeURIComponent(
                              session.expert_name,
                            )}&localName=${encodeURIComponent("User")}&role=${
                              isExpert ? "expert" : "user"
                            }`,
                          )
                        }
                        className="w-full bg-[#0066fe] hover:bg-[#0057d9] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 ring-1 ring-blue-500/40"
                      >
                        <Video size={16} />
                        Join Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-white/5 text-zinc-400 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 border border-white/10 cursor-not-allowed"
                      >
                        <Clock size={16} />
                        Scheduled
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ===================== PREVIOUS SESSION / CHAT VIEW =====================
  if (section === "previous" && id) {
    return (
      <div className="flex flex-col flex-1 min-h-0 bg-[#0A0F1C]">
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0F172A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-700 rounded-full flex items-center justify-center text-2xl shrink-0">
              👤
            </div>
            <div>
              <h3 className="font-semibold text-white text-base sm:text-lg">
                Henry Dholi
              </h3>
              <p className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0A0F1C] space-y-4">
          <div className="bg-[#1E2937] p-4 rounded-2xl text-white max-w-[85%] sm:max-w-[70%] lg:max-w-[55%] text-sm sm:text-base">
            Hello! How can I help you today?
          </div>
          <div className="bg-blue-600 p-4 rounded-2xl ml-auto max-w-[85%] sm:max-w-[70%] lg:max-w-[55%] text-white text-sm sm:text-base">
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
    <div className="flex-1 flex items-center justify-center p-6 text-center min-h-[300px]">
      <div className="max-w-xs">
        <Users className="w-16 h-16 mx-auto text-zinc-600 mb-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
          No conversation selected
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Select an upcoming session or a previous conversation from the sidebar
          to get started
        </p>
      </div>
    </div>
  );
};
