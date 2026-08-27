/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetServerTimeQuery } from "@/redux/features/userDashboard/userSession.api";
import { Calendar, Clock, Hourglass, Loader2, Search, Video } from "lucide-react";
import { useNavigate } from "react-router";

interface UpcomingSessionsProps {
  isLoading: boolean;
  sessionsList: any[];
  isExpert: boolean;
}

const getSessionLocalDateTimes = (session: any) => {
  if (!session?.date || !session?.start_time) {
    return { formattedDate: session?.date || "", formattedTime: "" };
  }

  const cleanDate = session.date.trim();
  const cleanStartTime = session.start_time.trim();
  const cleanEndTime = session.end_time ? session.end_time.trim() : null;

  const startIso = `${cleanDate}T${cleanStartTime.length === 5 ? `${cleanStartTime}:00` : cleanStartTime}Z`;
  const startDateObj = new Date(startIso);

  let endDateObj: Date | null = null;
  if (cleanEndTime) {
    const endIso = `${cleanDate}T${cleanEndTime.length === 5 ? `${cleanEndTime}:00` : cleanEndTime}Z`;
    endDateObj = new Date(endIso);
  } else if (session.duration_minutes) {
    endDateObj = new Date(
      startDateObj.getTime() + session.duration_minutes * 60 * 1000
    );
  }

  const localYear = startDateObj.getFullYear();
  const localMonth = String(startDateObj.getMonth() + 1).padStart(2, "0");
  const localDay = String(startDateObj.getDate()).padStart(2, "0");
  const formattedDate = `${localYear}-${localMonth}-${localDay}`;

  const format12h = (d: Date) => {
    if (isNaN(d.getTime())) return "";
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 || 12;
    return `${displayH}:${m} ${ampm}`;
  };

  const startTime12h = format12h(startDateObj);
  const endTime12h = endDateObj ? format12h(endDateObj) : "";

  const formattedTime = endTime12h
    ? `${startTime12h} - ${endTime12h}`
    : startTime12h;

  return { formattedDate, formattedTime };
};

const checkCanJoinSession = (session: any, serVerTimeData: any) => {
  if (!session) return false;
  // If backend marked status as ONGOING, session is active and joinable
  if (session.status === "ONGOING") return true;
  if (session.status !== "SCHEDULED") return false;

  // Get current timestamp in ms (server time or fallback to Date.now())
  let nowMs = Date.now();
  if (serVerTimeData?.data?.timestamp) {
    nowMs = serVerTimeData.data.timestamp * 1000;
  } else if (serVerTimeData?.data?.server_time) {
    nowMs = new Date(serVerTimeData.data.server_time).getTime();
  }

  if (!session.date || !session.start_time) return true;

  const cleanDate = session.date.trim();
  const cleanStartTime = session.start_time.trim();
  const cleanEndTime = session.end_time ? session.end_time.trim() : null;

  const startIso = `${cleanDate}T${cleanStartTime.length === 5 ? `${cleanStartTime}:00` : cleanStartTime}Z`;
  const startMs = new Date(startIso).getTime();

  let endMs: number;
  if (cleanEndTime) {
    const endIso = `${cleanDate}T${cleanEndTime.length === 5 ? `${cleanEndTime}:00` : cleanEndTime}Z`;
    endMs = new Date(endIso).getTime();
  } else {
    const durationMs = (session.duration_minutes || 30) * 60 * 1000;
    endMs = startMs + durationMs;
  }

  // Allow joining strictly from start_time up until 5 minutes after end_time
  const preBufferMs = 0; // Set to 0 so button enables strictly at start_time
  const postBufferMs = 5 * 60 * 1000;
  return nowMs >= startMs - preBufferMs && nowMs <= endMs + postBufferMs;
};

export const UpcomingSessions = ({
  isLoading,
  sessionsList,
  isExpert,
}: UpcomingSessionsProps) => {
  const navigate = useNavigate();
  const { data: serVerTime } = useGetServerTimeQuery(undefined);
  console.log(serVerTime, "server time");

  const handleJoinCall = (session: any) => {
    const agora = session.agora || {};
    const channel = agora.channel || `session-${session.id}`;
    const userId = session?.id
    const token = isExpert
      ? agora.expert_token || agora.token
      : agora.user_token || agora.token;

    const uid = isExpert
      ? agora.expert_uid || session.expert
      : agora.user_uid || session.user;

    const localName = isExpert
      ? session.expert_name || "Expert"
      : session.user_name || "User";

    const remoteName = isExpert
      ? session.user_name || "User"
      : session.expert_name || "Expert";

    const localAvatar = isExpert
      ? session.expert_profile_image
      : session.user_profile_image;

    const remoteAvatar = isExpert
      ? session.user_profile_image
      : session.expert_profile_image;

    const role = isExpert ? "expert" : "user";

    navigate(
      `/video-call/${channel}?remoteName=${encodeURIComponent(
        remoteName
      )}&localName=${encodeURIComponent(localName)}&role=${role}${token ? `&token=${encodeURIComponent(token)}` : ""
      }${uid ? `&uid=${encodeURIComponent(uid)}` : ""}${localAvatar ? `&localAvatar=${encodeURIComponent(localAvatar)}` : ""}${remoteAvatar ? `&remoteAvatar=${encodeURIComponent(remoteAvatar)}` : ""}`,
      {
        state: {
          session,
          agora,
          token,
          uid,
          localName,
          remoteName,
          localAvatar,
          remoteAvatar,
          role,
          userId
        },
      }
    );
  };

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
          <div className="flex flex-col items-center justify-center py-16 text-center ">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="mt-3 text-sm text-zinc-400 font-medium">
              Loading sessions...
            </p>
          </div>
        ) : sessionsList.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            No upcoming sessions found.
          </div>
        ) : (
          sessionsList.map((session: any) => {
            const rawAvatar = !isExpert
              ? session.expert_profile_image
              : session.user_profile_image;

            const avatarUrl =
              rawAvatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                !isExpert
                  ? session.expert_name
                  : session?.user_name || "User",
              )}&background=1E293B&color=3B82F6`;
            const { formattedDate, formattedTime } =
              getSessionLocalDateTimes(session);
            const canJoin = checkCanJoinSession(session, serVerTime);

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
                  {canJoin ? (
                    <span className="hidden sm:flex shrink-0 bg-red-500/10 text-red-400 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                      {session.status === "ONGOING" ? "Ongoing" : "Live"}
                    </span>
                  ) : (
                    <span className="hidden sm:flex shrink-0 bg-blue-500/10 text-blue-400 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full items-center gap-1.5 whitespace-nowrap">
                      {session.status}
                    </span>
                  )}

                  {/* Action Button — visible on md+ inline */}
                  <div className="hidden md:block shrink-0 ml-2">
                    {canJoin ? (
                      <button
                        onClick={() => handleJoinCall(session)}
                        className="bg-[#0066fe] hover:bg-[#0057d9] text-white font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 ring-1 ring-blue-500/40 whitespace-nowrap text-sm cursor-pointer"
                      >
                        <Video size={15} />
                        Join Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-white/5 text-zinc-400 font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 border border-white/10 cursor-not-allowed whitespace-nowrap text-sm"
                        title="Join button will activate when session start time is reached"
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
                        {formattedDate}
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
                  {canJoin ? (
                    <button
                      onClick={() => handleJoinCall(session)}
                      className="w-full bg-[#0066fe] hover:bg-[#0057d9] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 ring-1 ring-blue-500/40 cursor-pointer"
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
};

export default UpcomingSessions;
