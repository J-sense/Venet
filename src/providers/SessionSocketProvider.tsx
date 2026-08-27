/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface SessionSocketContextType {
  isConnected: boolean;
  lastMessage: any;
  sendMessage: (data: any) => void;
}

const SessionSocketContext = createContext<
  SessionSocketContextType | undefined
>(undefined);

// const SOCKET_URL = "wss://asib.checkall.org/ws/booking/";
const SOCKET_URL = "wss://asib.checkall.org/ws/booking/";

export const SessionSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAppSelector(selectCurrentToken);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      setIsConnected(false);
      return;
    }

    const cleanWsUrl = SOCKET_URL.endsWith("/") ? SOCKET_URL : `${SOCKET_URL}/`;
    const socketUrl = `${cleanWsUrl}?token=${token}`;

    const ws = new WebSocket(socketUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("[WebSocket] Global Session socket connected successfully.");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("[WebSocket] Global Session socket message:", event.data);
      try {
        const parseSocketData = JSON.parse(event.data);
        setLastMessage(parseSocketData);

        // Invalidate session & availability RTK Query cache tags on socket updates
        if (
          parseSocketData?.event === "availability_updated" ||
          parseSocketData?.event === "slot_locked" ||
          parseSocketData?.event === "slot_available" ||
          parseSocketData?.event === "payment_success" ||
          parseSocketData?.event === "session_updated" ||
          parseSocketData?.event === "session_started" ||
          parseSocketData?.event === "session_ended"
        ) {
          dispatch(
            baseApi.util.invalidateTags([
              { type: "Availability" },
              { type: "UserSession" },
            ]),
          );
        }
      } catch (e) {
        console.error("[WebSocket] Error parsing session socket data:", e);
        setLastMessage(event.data);
      }
    };

    ws.onclose = () => {
      console.log("[WebSocket] Global Session socket closed.");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("[WebSocket] Global Session socket error:", error);
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => {
          ws.close();
        };
      } else if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [token, dispatch]);

  const sendMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        typeof data === "string" ? data : JSON.stringify(data),
      );
    } else {
      console.warn("[WebSocket] Cannot send message - socket is not open.");
    }
  };

  return (
    <SessionSocketContext.Provider
      value={{ isConnected, lastMessage, sendMessage }}
    >
      {children}
    </SessionSocketContext.Provider>
  );
};

export const useSessionSocket = () => {
  const context = useContext(SessionSocketContext);
  if (context === undefined) {
    throw new Error(
      "useSessionSocket must be used within a SessionSocketProvider",
    );
  }
  return context;
};
