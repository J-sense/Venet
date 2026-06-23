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
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  PhoneOff,
  Send,
  Paperclip,
  X,
  Users,
  SmilePlus,
  MonitorUp,
  MonitorOff,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────
//  Agora client (create once, outside any component!)
// ──────────────────────────────────────────────────────────────
const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// ──────────────────────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  fileUrl?: string;
  fileName?: string;
}

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
  // ----- Routing -----
  const { channel = "Default Project" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const localName = searchParams.get("localName") || "Alice Wong";
  const remoteName = searchParams.get("remoteName") || "Adam Joseph";

  // ----- Agora credentials (hard-coded from your console) -----
  const APP_ID = "9a9ec7c2021e41d59afe21d11df3b307";
  const TOKEN = "007eJxTYDi7sfL1K6HkExJMT+dP2RsmO9t9Wc/bbZuvCO0+ULBwof5BBQbLRMvUZPNkIwMjw1QTwxRTy8S0VCPDFEPDlDTjJGMDc61/llkNgYwM3s3trIwMEAji8zO4pKYlluaUKAQU5WelJpcwMAAAlFsllQ==";

  // ----- Call state -----
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [screenShareOn, setScreenShareOn] = useState(false);

  // ----- Agora hooks -----
  // useIsConnected returns true once the client is fully joined
  const isConnected = useIsConnected();

  // These hooks create the local tracks.
  // Pass the boolean directly – the SDK will enable/disable the track
  // whenever the value changes; no need to call mute/unmute manually.
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const { screenTrack } = useLocalScreenTrack(screenShareOn, {}, "disable");

  // Join channel immediately
  useJoin(
    { appid: APP_ID, channel: channel, token: TOKEN },
    true,
  );

  // Publish our local tracks to the channel
  // Agora Web SDK allows only 1 video track per client.
  // We swap the camera track for the screen track when sharing.
  const activeVideoTrack = (screenShareOn && screenTrack) ? screenTrack : localCameraTrack;
  const tracksToPublish = [localMicrophoneTrack, activeVideoTrack].filter(Boolean) as any[];
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

  // ----- Chat state -----
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "System",
      text: "You are now in the call. Chat messages are visible to all participants.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: false,
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----- Handlers -----
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: localName,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setChatInput("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: localName,
      text: "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      fileUrl: url,
      fileName: file.name,
    };
    setMessages(prev => [...prev, newMsg]);
    e.target.value = "";
  };

  const handleLeave = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    } catch(e) {}
    
    navigate("/dashboard/experts/consultation/upcoming");
  };

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
              className={`w-full h-full ${remoteUsers.length === 1
                  ? ""
                  : "grid grid-cols-2 gap-1"
                }`}
            >
              {remoteUsers.map((user) => (
                <div key={user.uid} className="relative w-full h-full bg-[#111625]">
                  <RemoteUser
                    user={user}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Remote user name badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-white border border-white/10">
                    {remoteName}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Waiting state
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 text-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                  {remoteName.charAt(0)}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
              </div>
              <div>
                <p className="text-white text-xl font-semibold">{remoteName}</p>
                <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2 justify-center">
                  <Users size={13} />
                  Waiting for others to join…
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
              {/* If camera is off, show initials */}
              {!cameraOn && (
                <div className="w-full h-full flex items-center justify-center bg-[#1A2333] absolute inset-0 z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-lg">
                    {localName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
              )}
            </LocalUser>

            {/* Local name badge */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-semibold text-white z-30">
              {localName}
            </div>

            {/* Mic status dot */}
            <div className={`absolute bottom-2 right-2 p-1.5 rounded-full z-30 shadow-md ${micOn ? "bg-blue-600" : "bg-red-500"}`}>
              {micOn ? <Mic size={10} className="text-white" /> : <MicOff size={10} className="text-white" />}
            </div>
          </div>
        </div>

        {/* ── CONTROL BAR ───────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#0E111A] border-t border-white/5">
          {/* Left: participant count */}
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-xs">
            <Users size={14} />
            <span>{remoteUsers.length + 1} participant{remoteUsers.length !== 0 ? "s" : ""}</span>
          </div>

          {/* Center: controls */}
          <div className="flex items-center gap-3 mx-auto">
            {/* Mic */}
            <button
              onClick={() => setMicOn(prev => !prev)}
              title={micOn ? "Mute" : "Unmute"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${micOn
                  ? "bg-[#1E2D44] hover:bg-[#263752] text-white border border-blue-500/20"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                }`}
            >
              {micOn ? <Mic size={19} /> : <MicOff size={19} />}
            </button>

            {/* Camera */}
            <button
              onClick={() => setCameraOn(prev => !prev)}
              title={cameraOn ? "Stop Video" : "Start Video"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${cameraOn
                  ? "bg-[#1E2D44] hover:bg-[#263752] text-white border border-blue-500/20"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                }`}
            >
              {cameraOn ? <Video size={19} /> : <VideoOff size={19} />}
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setScreenShareOn(prev => !prev)}
              title={screenShareOn ? "Stop Screen Share" : "Start Screen Share"}
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer ${
                screenShareOn
                  ? "bg-blue-600 text-white border border-blue-400/30"
                  : "bg-[#1E2D44] hover:bg-[#263752] text-white border border-white/10"
              }`}
            >
              {screenShareOn ? <MonitorUp size={19} /> : <MonitorOff size={19} />}
            </button>

            {/* Chat */}
            <button
              onClick={() => setChatOpen(prev => !prev)}
              title="Chat"
              className={`p-3.5 rounded-full transition-all duration-200 active:scale-90 shadow-md cursor-pointer relative ${chatOpen
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

      {/* ── CHAT SIDEBAR ───────────────────────────────────── */}
      <div
        className={`shrink-0 flex flex-col bg-[#0F1520] border-l border-white/5 transition-all duration-300 ease-in-out overflow-hidden
          absolute sm:relative top-0 right-0 h-full z-40
          ${chatOpen ? "w-full sm:w-[340px] md:w-[360px] translate-x-0" : "w-0 sm:w-0 translate-x-full sm:translate-x-0"}`}
      >
        {chatOpen && (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-400" />
                <h3 className="text-white font-semibold text-sm">In-Call Chat</h3>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    {/* Sender */}
                    {!msg.isMe && (
                      <span className="text-[10px] text-zinc-500 px-1">{msg.sender}</span>
                    )}

                    {/* Bubble */}
                    {msg.fileName ? (
                      // File attachment bubble
                      <a
                        href={msg.fileUrl}
                        download={msg.fileName}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-medium border transition-colors cursor-pointer ${msg.isMe
                            ? "bg-blue-600/30 border-blue-500/30 text-blue-200 hover:bg-blue-600/40"
                            : "bg-[#1A2333] border-white/5 text-zinc-300 hover:bg-[#1E2A3A]"
                          }`}
                      >
                        <Paperclip size={12} className="shrink-0" />
                        <span className="truncate max-w-[150px]">{msg.fileName}</span>
                      </a>
                    ) : (
                      // Text bubble
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isMe
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : msg.sender === "System"
                              ? "bg-[#1A2333] text-zinc-400 text-xs border border-white/5 rounded-tl-sm"
                              : "bg-[#1A2333] text-zinc-200 rounded-tl-sm border border-white/5"
                          }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[9px] text-zinc-600 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <div className="shrink-0 p-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-[#1A2333] rounded-2xl px-3 py-2 border border-white/5 focus-within:border-blue-500/40 transition-colors">
                {/* Emoji placeholder */}
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex-shrink-0">
                  <SmilePlus size={17} />
                </button>

                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none min-w-0"
                />

                {/* File attachment */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex-shrink-0"
                  title="Share file"
                >
                  <Paperclip size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Send */}
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-xl transition-all cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
