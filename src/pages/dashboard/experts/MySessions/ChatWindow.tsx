// src/components/consultation/ChatWindow.tsx
import { useParams } from "react-router";
import { useState } from "react";
import { VideoCall } from "@/components/ui/VideoCall";
import { ConsultationReview } from "./ConsultationReview";
import { Calendar, Clock, Users } from "lucide-react";

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

  // Upcoming Sessions View
  if (section === "upcoming") {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-400" />
            My Upcoming Sessions
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {UPCOMING_SESSIONS.map((session) => (
              <div
                key={session.id}
                className="bg-[#1E2937] rounded-2xl border border-white/5 p-5 sm:p-6 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold flex-shrink-0"
                    style={{
                      backgroundColor: session.avatarColor + "30",
                      color: session.avatarColor,
                    }}
                  >
                    {session.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg">
                      {session.client}
                    </h3>
                    <p className="text-blue-400 text-sm mt-0.5">
                      {session.topic}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-sm text-zinc-400">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setActiveCall({
                      channel: session.channel,
                      remoteName: session.client,
                    })
                  }
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl text-white font-medium transition-colors active:scale-[0.985]"
                >
                  Join Video Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Call Overlay */}
        {activeCall && (
          <VideoCall
            channel={activeCall.channel}
            onLeave={() => setActiveCall(null)}
            userName="Alice Wong"
          />
        )}
      </div>
    );
  }

  // Previous Session / Chat View
  if (section === "previous" && id) {
    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <h3 className="font-semibold text-white">Henry Dholi</h3>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0A0F1C] space-y-6">
          <div className="bg-[#1E2937] p-4 rounded-2xl max-w-[80%]">
            Hello! How can I help you today?
          </div>
          <div className="bg-blue-600 p-4 rounded-2xl ml-auto max-w-[80%] text-white">
            I wanted to discuss my career transition strategy.
          </div>
        </div>

        {/* Review Section */}
        <ConsultationReview />
      </div>
    );
  }

  // Default / Empty State
  return (
    <div className="h-full flex items-center justify-center p-6 text-center">
      <div>
        <Users className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
        <h3 className="text-xl font-medium text-white">
          No conversation selected
        </h3>
        <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
          Select an upcoming session or previous conversation from the sidebar
        </p>
      </div>
    </div>
  );
};
