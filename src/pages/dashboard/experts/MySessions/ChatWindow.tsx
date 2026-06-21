// src/components/consultation/ChatWindow.tsx
import { useParams } from "react-router";
import { useState } from "react";
import { VideoCall } from "@/components/ui/VideoCall";
import { ConsultationReview } from "./ConsultationReview";

const UPCOMING_SESSIONS = [
  {
    id: "101",
    client: "Jonathan Rivers",
    initials: "JR",
    time: "10:00 AM",
    topic: "Strategic Career Mapping",
    channel: "consultation-101",
    avatarColor: "#1a4a8a",
  },
  {
    id: "102",
    client: "Elena Rodriguez",
    initials: "ER",
    time: "02:30 PM",
    topic: "Work-Life Balance Audit",
    channel: "consultation-102",
    avatarColor: "#4a1a8a",
  },
];

export const ChatWindow = () => {
  const { section, id } = useParams();
  const [activeCall, setActiveCall] = useState<{
    channel: string;
    remoteName: string;
  } | null>(null);

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
              {/* ... Session details ... */}
              <button
                onClick={() =>
                  setActiveCall({
                    channel: session.channel,
                    remoteName: session.client,
                  })
                }
                className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl text-white font-medium transition-colors"
              >
                Join Video Call
              </button>
            </div>
          ))}
        </div>

        {/* VideoCall overlay */}
        {activeCall && (
          <VideoCall
            channel={activeCall.channel}
            onLeave={() => setActiveCall(null)}
            userName="Alice Wong" // Replace with your actual logged-in user name
          />
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
            Chat history...
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
