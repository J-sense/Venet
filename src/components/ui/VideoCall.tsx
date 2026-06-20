// src/components/ui/VideoCall.tsx
import React, { useState, useEffect, useMemo } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  AgoraRTCProvider,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useRemoteUsers,
  LocalVideoTrack,
  RemoteUser,
  useRTCClient,
} from "agora-rtc-react";

const VideoCallInner = ({
  channel,
  onLeave,
}: {
  channel: string;
  onLeave: () => void;
}) => {
  const [micOn, setMicOn] = useState(true);
  const client = useRTCClient();
  const remoteUsers = useRemoteUsers();
  const { localCameraTrack } = useLocalCameraTrack(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

  // Join the channel
  useJoin({
    appid: "c252fa208b16491c88bfe682ac306ba0",
    channel: channel,
    token:
      "007eJxTYLBULi3cmuMnl/V989tTb9s//29eujLqdk6X0za72ujHj+8qMCQbmRqlJRoZWCQZmplYGiZbWCSlpZpZGCUmGxuYJSUabMkyy2oIZGTIcn3MwAiFID4LQ1heagkDAwAqtyI7",
    uid: null,
  });

  // Debugging logs to verify connection
  useEffect(() => {
    console.log("--- AGORA DEBUG ---");
    console.log("Joined Channel:", channel);
    client.on("user-joined", (user) =>
      console.log("New user detected:", user.uid),
    );
  }, [client, channel]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative w-full h-full">
        {remoteUsers.length > 0 ? (
          remoteUsers.map((user) => (
            <div key={user.uid} className="absolute inset-0">
              <RemoteUser user={user} playVideo playAudio />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Waiting for participant...
          </div>
        )}

        {/* Local PiP Window */}
        {localCameraTrack && (
          <div className="absolute bottom-28 right-6 w-64 h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl z-20 bg-zinc-800">
            <LocalVideoTrack track={localCameraTrack} play />
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="h-24 bg-[#0F172A] flex items-center justify-center gap-6 border-t border-white/10">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-16 h-16 rounded-full ${micOn ? "bg-zinc-700" : "bg-red-600"}`}
        >
          {micOn ? "🎤" : "🔇"}
        </button>
        <button
          onClick={onLeave}
          className="bg-red-600 px-10 py-3 rounded-full text-white font-bold"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export const VideoCall = ({
  channel,
  onLeave,
}: {
  channel: string;
  onLeave: () => void;
}) => {
  const client = useMemo(
    () => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
    [],
  );
  return (
    <AgoraRTCProvider client={client}>
      <VideoCallInner channel={channel} onLeave={onLeave} />
    </AgoraRTCProvider>
  );
};
