// src/components/consultation/ChatWindow.tsx
import { useParams } from "react-router";
import { useState } from "react";

import { ConsultationReview } from "./ConsultationReview";
import { VideoCall } from "@/components/ui/VideoCall";

const UPCOMING_SESSIONS = [
  {
    id: "101",
    client: "Jonathan Rivers",
    time: "10:00 AM",
    topic: "Strategic Career Mapping",
    channel: "consultation-101",
  },
  {
    id: "102",
    client: "Elena Rodriguez",
    time: "02:30 PM",
    topic: "Work-Life Balance Audit",
    channel: "consultation-102",
  },
];

export const ChatWindow = () => {
  const { section, id } = useParams();
  const [activeCall, setActiveCall] = useState<string | null>(null);

  if (section === "upcoming") {
    return (
      <div className="p-8 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          My Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {UPCOMING_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="bg-[#1E2937] p-6 rounded-2xl border border-white/5"
            >
              <h3 className="font-semibold text-white">{session.client}</h3>
              <p className="text-sm text-gray-400 mb-6">{session.topic}</p>
              <button
                onClick={() => setActiveCall(session.channel)}
                className="w-full bg-blue-600 py-3 rounded-xl text-white"
              >
                Join Video Call
              </button>
            </div>
          ))}
        </div>
        {activeCall && (
          <VideoCall channel={activeCall} onLeave={() => setActiveCall(null)} />
        )}
      </div>
    );
  }

  if (section === "previous" && id) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-white/5 font-semibold text-white">
          Chat with User {id}
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="bg-[#0A66C2] p-4 rounded-xl ml-auto max-w-sm text-white">
            Chat history...ss
          </div>
        </div>
        <ConsultationReview />
      </div>
    );
  }

  return (
    <div className="p-10 text-gray-500">
      Select a conversation or view upcoming.
    </div>
  );
};
