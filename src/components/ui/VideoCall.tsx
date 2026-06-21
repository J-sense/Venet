"use client";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

const ZEGO_CONFIG = {
  appID: 858072203,
  serverSecret: "2a57a8f7c6cdf5088e20e3f32e2afd32",
};

export function VideoCall({
  channel,
  onLeave,
}: {
  channel: string;
  onLeave: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const zp = useRef<ZegoUIKitPrebuilt | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const initZego = async () => {
      if (!containerRef.current) return;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        ZEGO_CONFIG.appID,
        ZEGO_CONFIG.serverSecret,
        channel,
        Date.now().toString(),
        "User Name",
      );

      zp.current = ZegoUIKitPrebuilt.create(kitToken);

      zp.current.joinRoom({
        container: containerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
        showPreJoinView: false,
        // Hiding default Zego UI to make space for your Tailwind interface
        showRoomTimer: true,
      });
    };

    initZego();
  }, [channel]);

  const toggleMic = () => {
    zp.current?.muteMicrophone();
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    zp.current?.muteCamera();
    setCamOn(!camOn);
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900 overflow-hidden">
      {/* Video Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Tailwind Custom Controls (Matching image_42673a.png layout) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4">
        <button
          onClick={toggleMic}
          className={`p-4 rounded-full ${micOn ? "bg-zinc-800" : "bg-red-500"} text-white`}
        >
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-4 rounded-full ${camOn ? "bg-zinc-800" : "bg-red-500"} text-white`}
        >
          {camOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        <button className="p-4 rounded-full bg-zinc-800 text-white">
          <MessageSquare size={20} />
        </button>

        <button className="p-4 rounded-full bg-zinc-800 text-white">
          <MoreHorizontal size={20} />
        </button>

        <button
          onClick={onLeave}
          className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2"
        >
          <PhoneOff size={20} /> End Call
        </button>
      </div>
    </div>
  );
}
