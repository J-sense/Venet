// ============================================================
//  AgoraVideoCallPage.tsx  – Professional Video Call
//  Uses agora-rtc-react LocalUser + RemoteUser (no simulation)
// ============================================================

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useLocalScreenTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  PhoneOff,
  Users,
  MonitorUp,
  MonitorOff,
  X,
} from "lucide-react";
import InCallChatSidebar from "./components/InCallChatSidebar";
import { useSessionSocket } from "@/providers/SessionSocketProvider";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────────
//  Agora client (create once, outside any component!)
// ──────────────────────────────────────────────────────────────
const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// ──────────────────────────────────────────────────────────────
//  Main Page – wraps everything in AgoraRTCProvider
// ──────────────────────────────────────────────────────────────
export default function AgoraVideoCallPage() {
  return (
    <AgoraRTCProvider client={agoraClient}>
      <CallRoom />
    </AgoraRTCProvider>
  );
}

// ──────────────────────────────────────────────────────────────
//  CallRoom – the actual call logic lives here
// ──────────────────────────────────────────────────────────────
function CallRoom() {
  // ----- Routing & Navigation -----
  const { channel: paramChannel } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { lastMessage } = useSessionSocket();
  const locationState = (location.state as any) || {};

  const role = locationState.role || searchParams.get("role") || "user";
  const isExpert = role === "expert";

  const localName =
    locationState.localName ||
    searchParams.get("localName") ||
    (isExpert ? "Expert" : "User");

  const remoteName =
    locationState.remoteName ||
    searchParams.get("remoteName") ||
    (isExpert ? "User" : "Expert");

  const channel =
    locationState.agora?.channel ||
    searchParams.get("channel") ||
    paramChannel ||
    "session-11";

  // Dynamic Agora Token for expert vs user
  const TOKEN =
    locationState.token ||
    searchParams.get("token") ||
    (isExpert
      ? locationState.agora?.expert_token
      : locationState.agora?.user_token) ||
    locationState.agora?.token ||
    "006bfbee723f2864929ad1a78db8e6a5b06IADJeyIXZ5h6zMhw33K8YxuaPv1kuMKj6mmYUXNCen7RfMYiKV8epnmXIgCPNHUDttaPagQAAQBGk45qAgBGk45qAwBGk45qBABGk45q";

  // Dynamic Agora UID for expert vs user
  const rawUid =
    locationState.uid ||
    searchParams.get("uid") ||
    (isExpert
      ? locationState.agora?.expert_uid
      : locationState.agora?.user_uid) ||
    locationState.agora?.uid ||
    null;

  // Extract APP_ID from state, searchParams, or token prefix (chars 3..35)
  const APP_ID =
    locationState.agora?.appId ||
    searchParams.get("appId") ||
    (TOKEN && TOKEN.length > 35
      ? TOKEN.substring(3, 35)
      : "bfbee723f2864929ad1a78db8e6a5b06");

  const localAvatar =
    locationState.localAvatar ||
    searchParams.get("localAvatar") ||
    (isExpert
      ? locationState.session?.expert_profile_image
      : locationState.session?.user_profile_image) ||
    "";

  const remoteAvatar =
    locationState.remoteAvatar ||
    searchParams.get("remoteAvatar") ||
    (isExpert
      ? locationState.session?.user_profile_image
      : locationState.session?.expert_profile_image) ||
    "";

  // ----- Call state -----
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [activeToast, setActiveToast] = useState<any>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- Agora hooks -----
  const isConnected = useIsConnected();

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const { screenTrack } = useLocalScreenTrack(screenShareOn, {}, "disable");

  // Join channel with dynamic backend credentials
  useJoin(
    {
      appid: APP_ID,
      channel: channel,
      token: TOKEN,
      uid: rawUid || null,
    },
    true,
  );

  // Publish our local tracks to the channel
  // Agora Web SDK allows only 1 video track per client.
  // We swap the camera track for the screen track when sharing.
  const activeVideoTrack =
    screenShareOn && screenTrack ? screenTrack : localCameraTrack;
  const tracksToPublish = [localMicrophoneTrack, activeVideoTrack].filter(
    Boolean,
  ) as any[];
  usePublish(tracksToPublish);

  // Handle native "Stop Sharing" button in the browser
  useEffect(() => {
    if (screenTrack) {
      const handleTrackEnded = () => setScreenShareOn(false);
      screenTrack.on("track-ended", handleTrackEnded);
      return () => {
        screenTrack.off("track-ended", handleTrackEnded);
      };
    }
  }, [screenTrack]);

  // All remote participants in the channel
  const remoteUsers = useRemoteUsers();

  const handleLeave = () => {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}

    const role = searchParams.get("role");
    if (role === "user") {
      navigate("/dashboard/user/consultation/upcoming");
    } else {
      // Default to expert if not specified or is "expert"
      navigate("/dashboard/experts/consultation/upcoming");
    }
  };

  // Session ID for WebSocket chat endpoint /ws/session-chat/<session-id>/
  const sessionId =
    locationState.session?.id ||
    locationState.sessionId ||
    searchParams.get("sessionId") ||
    paramChannel?.replace(/^session-/, "") ||
    "11";
  const userId = locationState?.userId;

  // Auto-end call when server broadcasts session_ended / session_completed socket event
  useEffect(() => {
    if (!lastMessage) return;

    const eventName =
      lastMessage?.event || lastMessage?.type || lastMessage?.action;
    const endedSessionId =
      lastMessage?.session_id ||
      lastMessage?.session ||
      lastMessage?.id ||
      lastMessage?.data?.session_id ||
      lastMessage?.data?.id;

    if (
      eventName === "session_ended" ||
      eventName === "session_completed" ||
      eventName === "session_cancelled" ||
      eventName === "end_session"
    ) {
      // Trigger leave if no specific session ID or if session ID matches current call
      if (!endedSessionId || String(endedSessionId) === String(sessionId)) {
        console.log(
          "[AgoraVideoCallPage] Received session_ended event. Leaving call...",
          lastMessage
        );
        toast.info("Session has ended.");
        handleLeave();
      }
    }
  }, [lastMessage, sessionId]);
  // ──────────────────────────────────────────────────────────
  //  IN-CALL SCREEN
  // ──────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen w-screen bg-[#07090E] overflow-hidden font-sora select-none">
      {/* ── VIDEO AREA ─────────────────────────────────────── */}
      <div className="relative flex-1 min-w-0 h-full flex flex-col bg-[#0A0D15]">
        {/* Remote Users Grid */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
          {isConnected && remoteUsers.length > 0 ? (
            // Layout: 1 remote = full screen, 2+ = grid
            <div
              className={`w-full h-full ${
                remoteUsers.length === 1 ? "" : "grid grid-cols-2 gap-1"
              }`}
            >
              {remoteUsers.map((user) => (
                <div
                  key={user.uid}
                  className="relative w-full h-full bg-[#111625]"
                >
                  <RemoteUser
                    user={user}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Remote user name badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-white border border-white/10 flex items-center gap-2">
                    {remoteAvatar && (
                      <img
                        src={remoteAvatar}
                        alt={remoteName}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
                      />
                    )}
                    <span>{remoteName}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Waiting state
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 text-center">
              <div className="relative">
                {localAvatar ? (
                  <img
                    src={localAvatar}
                    alt={localName}
                    className="w-28 h-28 rounded-full object-cover shadow-2xl border-2 border-blue-500/40"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                    {localName.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
              </div>
              <div>
                <p className="text-white text-xl font-semibold">{localName}</p>
                <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2 justify-center">
                  <Users size={13} />
                  Waiting for {remoteName} to join…
                </p>
              </div>
            </div>
          )}

          {/* Local User – Picture-in-Picture (bottom left) */}
          <div className="absolute bottom-4 left-4 w-[160px] sm:w-[220px] aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#1A2333] shadow-2xl z-20 hover:scale-[1.03] transition-transform duration-300">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              playAudio={false}
              videoTrack={localCameraTrack}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              {/* If camera is off, show avatar or initials */}
              {!cameraOn && (
                <div className="w-full h-full flex items-center justify-center bg-[#1A2333] absolute inset-0 z-10">
                  {localAvatar ? (
                    <img
                      src={localAvatar}
                      alt={localName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-lg">
                      {localName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                </div>
              )}
            </LocalUser>

            {/* Local name badge */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-semibold text-white z-30">
              {localName}
            </div>

            {/* Mic status dot */}
            <div
              className={`absolute bottom-2 right-2 p-1.5 rounded-full z-30 shadow-md ${micOn ? "bg-blue-600" : "bg-red-500"}`}
            >
              {micOn ? (
                <Mic size={10} className="text-white" />
              ) : (
                <MicOff size={10} className="text-white" />
              )}
            </div>
          </div>
        </div>

        {/* ── CONTROL BAR ───────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#0E111A] border-t border-white/5">
          {/* Left: participant count */}
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-xs">
            <Users size={14} />
            <span>
              {remoteUsers.length + 1} participant
              {remoteUsers.length !== 0 ? "s" : ""}
            </span>
          </div>

          {/* Center: controls */}
          <div className="flex items-center gap-3 mx-auto">
            {/* Mic */}
            <button
              onClick={() => setMicOn((prev) => !prev)}
              title={micOn ? "Mute" : "Unmute"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${
                micOn
                  ? "bg-[#1E2D44] hover:bg-[#263752] text-white border border-blue-500/20"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
              }`}
            >
              {micOn ? <Mic size={19} /> : <MicOff size={19} />}
            </button>

            {/* Camera */}
            <button
              onClick={() => setCameraOn((prev) => !prev)}
              title={cameraOn ? "Stop Video" : "Start Video"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${
                cameraOn
                  ? "bg-[#1E2D44] hover:bg-[#263752] text-white border border-blue-500/20"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
              }`}
            >
              {cameraOn ? <Video size={19} /> : <VideoOff size={19} />}
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setScreenShareOn((prev) => !prev)}
              title={screenShareOn ? "Stop Screen Share" : "Start Screen Share"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${
                screenShareOn
                  ? "bg-blue-600 text-white border border-blue-400/30"
                  : "bg-[#1E2D44] hover:bg-[#263752] text-white border border-white/10"
              }`}
            >
              {screenShareOn ? (
                <MonitorUp size={19} />
              ) : (
                <MonitorOff size={19} />
              )}
            </button>

            {/* Chat */}
            <button
              onClick={() => setChatOpen((prev) => !prev)}
              title="Chat"
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer relative ${
                chatOpen
                  ? "bg-blue-600 text-white border border-blue-400/30"
                  : "bg-[#1E2D44] hover:bg-[#263752] text-white border border-white/10"
              }`}
            >
              <MessageSquare size={19} />
            </button>

            {/* End Call */}
            <button
              onClick={handleLeave}
              title="End Call"
              className="flex items-center gap-2 px-5 py-3.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-full transition-all duration-200 active:scale-90 shadow-lg cursor-pointer text-sm"
            >
              <PhoneOff size={17} />
              <span className="hidden sm:inline">End Call</span>
            </button>
          </div>

          {/* Right: spacer */}
          <div className="hidden sm:block w-28" />
        </div>
      </div>

      {/* ── CHAT SIDEBAR COMPONENT ────────────────────────── */}
      <InCallChatSidebar
        chatOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        localName={localName}
        sessionId={String(userId || sessionId)}
        onNewMessage={(msg) => {
          console.log(
            "[AgoraVideoCallPage] Received new message for toast:",
            msg,
          );
          setActiveToast(msg);
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = setTimeout(() => {
            setActiveToast(null);
          }, 5000);
        }}
      />

      {/* Floating Notification Pop-up Toast for Incoming Opponent Message (Middle of Call Screen) */}
      {activeToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%] sm:w-[420px] bg-[#0A0F1D]/95 backdrop-blur-xl border border-blue-500/40 text-white rounded-2xl shadow-2xl p-3.5 flex items-center gap-3.5 animate-in fade-in slide-in-from-top-6 duration-300">
          {/* Sender Initial Badge */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-lg border border-white/10">
            {activeToast.sender?.charAt(0) || "P"}
          </div>

          {/* Toast Content */}
          <div
            onClick={() => {
              setActiveToast(null);
              setChatOpen(true);
            }}
            className="flex-1 min-w-0 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-xs font-bold text-white truncate">
                {activeToast.sender}
              </h4>
              <span className="text-[10px] text-zinc-400 shrink-0">
                {activeToast.time}
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5 truncate font-normal">
              {activeToast.text ||
                (activeToast.fileName
                  ? `📎 ${activeToast.fileName}`
                  : "Sent a message")}
            </p>
          </div>

          {/* View & Close Action */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setActiveToast(null);
                setChatOpen(true);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md"
            >
              View
            </button>
            <button
              onClick={() => setActiveToast(null)}
              className="p-1 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
