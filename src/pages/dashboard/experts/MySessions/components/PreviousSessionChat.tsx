import React from "react";
import {
  useGetChatContactsQuery,
  useGetChatHistoryQuery,
} from "@/redux/features/userDashboard/userSession.api";
import { ConsultationReview } from "../ConsultationReview";
import { Loader2, MessageSquare, FileText } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface PreviousSessionChatProps {
  isExpert: boolean;
  id?: string;
}

export const PreviousSessionChat: React.FC<PreviousSessionChatProps> = ({
  isExpert,
  id,
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: contactsData } = useGetChatContactsQuery(undefined);
  const contactsList = Array.isArray(contactsData?.data)
    ? contactsData.data
    : [];

  // Find active contact matching current session_id or id
  const activeContact = contactsList.find(
    (c: any) =>
      String(c.session_id) === String(id) || String(c.id) === String(id)
  );

  const activeSessionId = activeContact?.session_id || id;

  // Fetch chat history using session_id
  const { data: historyData, isLoading: isLoadingHistory } =
    useGetChatHistoryQuery(activeSessionId!, {
      skip: !activeSessionId,
      refetchOnMountOrArgChange: true,
    });

  const rawMessages = Array.isArray(historyData?.data)
    ? historyData.data
    : Array.isArray(historyData)
    ? historyData
    : [];

  const contactName =
    activeContact?.name ||
    activeContact?.expert_name ||
    activeContact?.user_name ||
    "Previous Consultation";

  const contactAvatar =
    activeContact?.profile_image ||
    activeContact?.expert_profile_image ||
    activeContact?.user_profile_image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      contactName
    )}&background=1E293B&color=3B82F6`;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0A0F1C] text-white">
      {/* Chat Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0F172A] shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={contactAvatar}
            alt={contactName}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white/10 shrink-0"
          />
          <div>
            <h3 className="font-semibold text-white text-base sm:text-lg">
              {contactName}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Session History
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0A0F1C] space-y-4">
        {!activeSessionId ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
            <MessageSquare className="w-12 h-12 mb-3 text-zinc-600" />
            <p className="text-sm font-medium">
              Select a conversation to view chat history
            </p>
          </div>
        ) : isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="mt-3 text-sm font-medium">Loading chat history...</p>
          </div>
        ) : rawMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
            <p className="text-sm font-medium">
              No previous messages in this session.
            </p>
          </div>
        ) : (
          rawMessages.map((msg: any, idx: number) => {
            const isMe =
              msg.sender === (currentUser as any)?.id ||
              msg.sender_name === currentUser?.first_name ||
              msg.sender_name ===
                `${currentUser?.first_name || ""} ${currentUser?.last_name || ""}`.trim();

            const timeStr = msg.created_at
              ? new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            const messageFiles: Array<{ url: string; name?: string }> =
              Array.isArray(msg.files) && msg.files.length > 0
                ? msg.files.map((f: any) => ({
                    url: typeof f === "string" ? f : f.url || f.file || "",
                    name: typeof f === "object" ? f.name : "Attachment",
                  }))
                : msg.file
                ? [{ url: msg.file, name: "Attachment" }]
                : msg.file_url
                ? [{ url: msg.file_url, name: "Attachment" }]
                : [];

            return (
              <div
                key={msg.id || idx}
                className={`flex flex-col ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] lg:max-w-[55%] p-4 rounded-2xl text-sm sm:text-base ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-[#1E2937] text-white rounded-bl-none border border-white/5"
                  }`}
                >
                  {/* Sender Name if not me */}
                  {!isMe && msg.sender_name && (
                    <div className="text-[11px] font-bold text-blue-400 mb-1">
                      {msg.sender_name}
                    </div>
                  )}

                  {/* File / Image list rendering */}
                  {messageFiles.length > 0 && (
                    <div className="space-y-2 mb-2">
                      {messageFiles.map((fileObj, fIdx) => {
                        const fileUrl = fileObj.url;
                        if (!fileUrl) return null;
                        const isImage = fileUrl.match(
                          /\.(jpeg|jpg|gif|png|webp)/i
                        );

                        return isImage ? (
                          <a
                            key={fIdx}
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block overflow-hidden rounded-lg max-w-xs"
                          >
                            <img
                              src={fileUrl}
                              alt={fileObj.name || "Attachment"}
                              className="w-full max-h-60 object-cover hover:scale-105 transition-transform"
                            />
                          </a>
                        ) : (
                          <a
                            key={fIdx}
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 p-2 bg-black/20 rounded-lg hover:bg-black/30 transition-colors text-xs underline truncate"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                              {fileObj.name || "View Attachment"}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Message */}
                  {msg.message && (
                    <p className="leading-relaxed break-words">{msg.message}</p>
                  )}

                  {/* Timestamp */}
                  {timeStr && (
                    <div
                      className={`text-[10px] mt-1.5 font-medium ${
                        isMe ? "text-blue-200 text-right" : "text-zinc-400"
                      }`}
                    >
                      {timeStr}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Review Section */}
      {!isExpert && <ConsultationReview sessionId={activeSessionId} />}
    </div>
  );
};

export default PreviousSessionChat;
