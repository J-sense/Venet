/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/baseApi";

interface BookingSocketContextType {
  isConnected: boolean;
  lastMessage: any;
  sendMessage: (data: any) => void;
}

const BookingSocketContext = createContext<
  BookingSocketContextType | undefined
>(undefined);

export const BookingSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAppSelector(selectCurrentToken);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) {
      setIsConnected(false);
      return;
    }

    const socketUrl = `wss://midlands-pros-fairfield-depend.trycloudflare.com/ws/booking/?token=${token}`;
    const ws = new WebSocket(socketUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("[WebSocket] Booking socket connected.");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log(event);
      try {
        const parseSocketData = JSON.parse(event.data);
        console.log(parseSocketData, "parse socket data");
        if (parseSocketData?.event === "availability_updated") {
          baseApi.util.invalidateTags(["Availability"]);
          console.log("triggered")
        }
        setLastMessage(JSON.parse(event.data));
      } catch {
        setLastMessage(event.data);
      }
    };

    ws.onclose = () => {
      console.log("[WebSocket] Booking socket closed.");
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [token]);

  const sendMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return (
    <BookingSocketContext.Provider
      value={{ isConnected, lastMessage, sendMessage }}
    >
      {children}
    </BookingSocketContext.Provider>
  );
};

export const useBookingSocket = () => {
  const context = useContext(BookingSocketContext);
  if (context === undefined) {
    throw new Error(
      "useBookingSocket must be used within a BookingSocketProvider",
    );
  }
  return context;
};
