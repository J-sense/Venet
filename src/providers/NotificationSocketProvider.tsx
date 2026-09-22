/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/baseApi";
import { toast } from "sonner";

interface NotificationSocketContextType {
  isConnected: boolean;
  lastNotification: any;
  sendNotificationMessage: (data: any) => void;
}

const NotificationSocketContext = createContext<
  NotificationSocketContextType | undefined
>(undefined);

const SOCKET_URL =
  import.meta.env.VITE_NOTIFICATION_SOCKET_URL ||
  "wss://democracy-desired-pharmacy-barnes.trycloudflare.com/ws/notifications/";

export const NotificationSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAppSelector(selectCurrentToken);
  const [isConnected, setIsConnected] = useState(false);
  const [lastNotification, setLastNotification] = useState<any>(null);
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
      console.log("[NotificationSocket] WebSocket connected successfully.");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("[NotificationSocket] Received message:", event.data);
      try {
        const parsed = JSON.parse(event.data);
        console.log(parsed, "notificationsssssss")
        setLastNotification(parsed);

        // Toast notification popover trigger for new notifications
        if (parsed?.title || parsed?.heading || parsed?.message || parsed?.body) {
          toast.info(parsed?.title || "New Notification", {
            description: parsed?.message || parsed?.body || "",
          });
        }

        // Auto-invalidate RTK Query Notifications tag to refresh badge and list
        dispatch(baseApi.util.invalidateTags(["Notifications" as any]));
      } catch (e) {
        console.error("[NotificationSocket] Error parsing message:", e);
        setLastNotification(event.data);
      }
    };

    ws.onclose = () => {
      console.log("[NotificationSocket] WebSocket connection closed.");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("[NotificationSocket] WebSocket error:", error);
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

  const sendNotificationMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        typeof data === "string" ? data : JSON.stringify(data),
      );
    } else {
      console.warn("[NotificationSocket] Socket is not open.");
    }
  };

  return (
    <NotificationSocketContext.Provider
      value={{ isConnected, lastNotification, sendNotificationMessage }}
    >
      {children}
    </NotificationSocketContext.Provider>
  );
};

export const useNotificationSocket = () => {
  const context = useContext(NotificationSocketContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationSocket must be used within a NotificationSocketProvider",
    );
  }
  return context;
};
