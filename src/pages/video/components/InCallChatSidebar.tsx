/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Paperclip, Send, SmilePlus, X } from "lucide-react";
import {
  useGetChatHistoryQuery,
  useSendFileMutation,
} from "@/redux/features/userDashboard/userSession.api";

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  fileUrl?: string;
  fileName?: string;
}

interface InCallChatSidebarProps {
  chatOpen: boolean;
  onClose: () => void;
  localName: string;
  sessionId?: string | number;
  onNewMessage?: (msg: ChatMessage) => void;
}

export function InCallChatSidebar({
  chatOpen,
  onClose,
  localName,
  sessionId,
  onNewMessage,
}: InCallChatSidebarProps) {
  const { data: ChatData } = useGetChatHistoryQuery(String(sessionId || ""), {
    skip: !sessionId,
  });
  console.log(ChatData, "chat data");
  const reduxToken = useAppSelector(selectCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  const currentUserName = currentUser
    ? `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim() ||
      currentUser.email
    : localName;

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "System",
      text: "You are now in the call. Chat messages are visible to all participants.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: false,
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Play soft notification sound chime
  const playNotificationChime = () => {
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      /* ignore audio error */
    }
  };

  // Helper to accurately determine if message belongs to current user
  const checkIsMe = (senderName?: string, senderId?: string) => {
    if (!senderName && !senderId) return false;
    const cleanSenderName = (senderName || "").trim().toLowerCase();
    const cleanLocalName = (localName || "").trim().toLowerCase();
    const cleanCurrentName = (currentUserName || "").trim().toLowerCase();

    if (cleanSenderName && cleanLocalName && cleanSenderName === cleanLocalName)
      return true;
    if (
      cleanSenderName &&
      cleanCurrentName &&
      cleanSenderName === cleanCurrentName
    )
      return true;
    if (
      senderId &&
      currentUser &&
      ((currentUser as any).id === senderId ||
        (currentUser as any).user_id === senderId)
    )
      return true;
    return false;
  };

  // Helper to resolve media URLs to absolute URLs
  const resolveMediaUrl = (url?: string) => {
    if (!url) return "";
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("blob:") ||
      url.startsWith("data:")
    ) {
      return url;
    }
    const rawBase =
      import.meta.env.VITE_BASE_URL ||
      "http://designed-davis-previously-polyphonic.trycloudflare.com/api/v1";
    const origin = rawBase.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${origin}${path}`;
  };

  // Extract file URL and filename from various backend formats
  const extractFileUrlAndName = (item: any) => {
    let rawUrl = "";
    let fileName = "";

    if (Array.isArray(item.files) && item.files.length > 0) {
      const f = item.files[0];
      if (typeof f === "string") {
        rawUrl = f;
      } else if (f && typeof f === "object") {
        rawUrl = f.url || f.file || f.file_url || f.path || "";
        fileName = f.name || f.file_name || f.original_name || "";
      }
    }

    if (!rawUrl) {
      rawUrl = item.fileUrl || item.file_url || item.url || item.file || "";
    }

    if (!fileName) {
      fileName = item.fileName || item.file_name || item.name || "";
    }

    const fileUrl = resolveMediaUrl(rawUrl ? rawUrl.trim() : "");
    if (!fileName && fileUrl) {
      fileName = fileUrl.split("/").pop()?.split("?")[0] || "Attachment";
    }

    return { fileUrl, fileName };
  };

  // Helper to check if a file/URL is an image
  const isImageFile = (url?: string, fileName?: string) => {
    if (!url && !fileName) return false;
    const cleanUrl = (url || "").trim().toLowerCase();
    const cleanName = (fileName || "").trim().toLowerCase();

    if (cleanUrl.startsWith("data:image/") || cleanUrl.startsWith("blob:"))
      return true;

    const pathRegex = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)(?=[?#]|$)/i;
    return pathRegex.test(cleanUrl) || pathRegex.test(cleanName);
  };

  // Populate chat history from API query response
  useEffect(() => {
    if (ChatData?.data && Array.isArray(ChatData.data)) {
      const historyMessages: ChatMessage[] = ChatData.data.map((item: any) => {
        const { fileUrl, fileName } = extractFileUrlAndName(item);
        return {
          id: item.id,
          sender: item.sender_name || "Participant",
          text: item.message || "",
          time: item.created_at
            ? new Date(item.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
          isMe: checkIsMe(item.sender_name, item.sender),
          fileUrl,
          fileName,
        };
      });

      setMessages((prev) => {
        const systemMsg = prev.find((m) => m.id === "1");
        const systemArr = systemMsg ? [systemMsg] : [];

        const combined = [...systemArr];
        historyMessages.forEach((msg) => {
          if (!combined.some((m) => m.id === msg.id)) {
            combined.push(msg);
          }
        });
        return combined;
      });
    }
  }, [ChatData, localName, currentUserName]);

  // Connect WebSocket when chat component mounts or sessionId changes
  useEffect(() => {
    if (!sessionId) return;

    const token =
      reduxToken ||
      localStorage.getItem("token") ||
      localStorage.getItem("access_token") ||
      "";

    const wsUrl = `wss://asib.checkall.org/ws/session-chat/${sessionId}/?token=${token}`;

    console.log("[InCallChat] Connecting WebSocket to:", wsUrl);
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log(
        `[InCallChat] Connected to session chat socket for session: ${sessionId}`,
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[InCallChat] Received socket message:", data);

        const textContent = data.message || data.text || data.content;
        if (
          !textContent &&
          (!data.files || data.files.length === 0) &&
          !data.file_url &&
          !data.fileUrl
        )
          return;

        const senderName =
          data.sender_name || data.sender || data.user_name || "Participant";
        const isMe =
          checkIsMe(data.sender_name || senderName, data.sender) ||
          data.is_me === true;

        const msgTime =
          data.created_at || data.timestamp
            ? new Date(data.created_at || data.timestamp).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )
            : new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

        const { fileUrl, fileName } = extractFileUrlAndName(data);

        const incomingMsg: ChatMessage = {
          id: data.id || Date.now().toString(),
          sender: senderName,
          text: textContent || "",
          time: msgTime,
          isMe,
          fileUrl,
          fileName,
        };

        console.log(
          "[InCallChat] Processing message - isMe:",
          isMe,
          "sender:",
          senderName,
          "localName:",
          localName,
        );

        // Trigger audio chime & notify parent onNewMessage if message is from opponent
        if (!isMe && senderName !== "System") {
          playNotificationChime();
          console.log(
            "[InCallChat] Triggering onNewMessage callback:",
            incomingMsg,
          );
          if (onNewMessage) {
            onNewMessage(incomingMsg);
          }
        }

        setMessages((prev) => {
          const existingIndex = prev.findIndex((m) => m.id === incomingMsg.id);
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = incomingMsg;
            return updated;
          }
          return [...prev, incomingMsg];
        });
      } catch (e) {
        console.error("[InCallChat] Failed to parse socket message:", e);
      }
    };

    ws.onerror = (error) => {
      console.error("[InCallChat] WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("[InCallChat] WebSocket connection closed.");
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [sessionId, reduxToken, localName, currentUserName]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [sendFile, { isLoading: isUploadingFile }] = useSendFileMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
    e.target.value = "";
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() && selectedFiles.length === 0) return;

    // Send files via FormData if any file is selected
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      if (sessionId) formData.append("session", String(sessionId));
      if (chatInput.trim()) formData.append("message", chatInput.trim());

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        console.log("[InCallChat] Uploading file(s)...");
        await sendFile(formData).unwrap();
        setChatInput("");
        setSelectedFiles([]);
        setPreviewUrls([]);
      } catch (err) {
        console.error("[InCallChat] Failed to upload file(s):", err);
      }
      return;
    }

    // Send text message via WebSocket if connected
    const messageText = chatInput.trim();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message: messageText,
        }),
      );
      setChatInput("");
    } else {
      // Fallback optimistic append ONLY if WebSocket is not connected
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: currentUserName || localName,
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: true,
      };
      setMessages((prev) => [...prev, newMsg]);
      setChatInput("");
    }
  };

  return (
    <div
      className={`shrink-0 flex flex-col bg-[#0F1520] border-l border-white/5 transition-all duration-300 ease-in-out overflow-hidden absolute sm:relative top-0 right-0 h-full z-40 ${
        chatOpen
          ? "w-full sm:w-[340px] md:w-[360px] translate-x-0"
          : "w-0 sm:w-0 translate-x-full sm:translate-x-0"
      }`}
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
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] min-w-0 ${
                    msg.isMe ? "items-end" : "items-start"
                  } flex flex-col gap-1`}
                >
                  {/* Sender */}
                  {!msg.isMe && (
                    <span className="text-[10px] text-zinc-500 px-1 truncate max-w-full">
                      {msg.sender}
                    </span>
                  )}

                  {/* Bubble */}
                  {msg.fileUrl ? (
                    isImageFile(msg.fileUrl, msg.fileName) ? (
                      // Image preview bubble
                      <div className="flex flex-col gap-1.5 max-w-full">
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group overflow-hidden rounded-2xl border border-white/10 relative"
                        >
                          <img
                            src={msg.fileUrl}
                            alt={msg.fileName || "Preview"}
                            className="max-h-52 w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </a>
                        {msg.text && (
                          <div
                            className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words break-all [overflow-wrap:anywhere] whitespace-pre-wrap max-w-full min-w-0 ${
                              msg.isMe
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-[#1A2333] text-zinc-200 rounded-tl-sm border border-white/5"
                            }`}
                          >
                            {msg.text}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Document/File attachment bubble
                      <div className="flex flex-col gap-1.5 max-w-full">
                        <a
                          href={msg.fileUrl}
                          download={msg.fileName || "attachment"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-medium border transition-colors cursor-pointer max-w-full min-w-0 ${
                            msg.isMe
                              ? "bg-blue-600/30 border-blue-500/30 text-blue-200 hover:bg-blue-600/40"
                              : "bg-[#1A2333] border-white/5 text-zinc-300 hover:bg-[#1E2A3A]"
                          }`}
                        >
                          <Paperclip
                            size={14}
                            className="shrink-0 text-blue-400"
                          />
                          <span className="truncate max-w-[170px]">
                            {msg.fileName || "Attachment"}
                          </span>
                        </a>
                        {msg.text && (
                          <div
                            className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words break-all [overflow-wrap:anywhere] whitespace-pre-wrap max-w-full min-w-0 ${
                              msg.isMe
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-[#1A2333] text-zinc-200 rounded-tl-sm border border-white/5"
                            }`}
                          >
                            {msg.text}
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    // Text bubble
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words break-all [overflow-wrap:anywhere] whitespace-pre-wrap max-w-full min-w-0 ${
                        msg.isMe
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
                  <span className="text-[9px] text-zinc-600 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Pending Selected Files Preview Bar */}
          {selectedFiles.length > 0 && (
            <div className="px-3 pt-2 flex items-center gap-2 overflow-x-auto border-t border-white/5 bg-[#121927]">
              {selectedFiles.map((file, idx) => {
                const isImg = isImageFile(previewUrls[idx], file.name);
                return (
                  <div
                    key={idx}
                    className="relative group shrink-0 w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-[#1A2333] flex items-center justify-center"
                  >
                    {isImg ? (
                      <img
                        src={previewUrls[idx]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 p-1 text-center">
                        <Paperclip size={16} className="text-blue-400" />
                        <span className="text-[9px] text-zinc-400 truncate w-14">
                          {file.name}
                        </span>
                      </div>
                    )}

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveSelectedFile(idx)}
                      className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

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
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                placeholder={
                  selectedFiles.length > 0
                    ? "Add a message with file…"
                    : "Type a message…"
                }
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none min-w-0"
              />

              {/* File attachment */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingFile}
                className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
                title="Share file"
              >
                <Paperclip size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />

              {/* Send */}
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() && selectedFiles.length === 0}
                className="p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-xl transition-all cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InCallChatSidebar;
