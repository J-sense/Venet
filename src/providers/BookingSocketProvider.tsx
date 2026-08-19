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

interface BookingSocketContextType {
  isConnected: boolean;
  lastMessage: any;
  sendMessage: (data: any) => void;
  setExpertId: (id: string | null) => void;
}

const BookingSocketContext = createContext<
  BookingSocketContextType | undefined
>(undefined);

// Toggle between local development (true) and production deployment (false)
const IS_LOCAL = true;
const SOCKET_URL_LOCAL =
  "wss://midlands-pros-fairfield-depend.trycloudflare.com/ws/booking/";
const SOCKET_URL_PROD = "wss://asib.checkall.org/ws/booking/";

export const BookingSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAppSelector(selectCurrentToken);
  const [expertId, setExpertId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token || !expertId) {
      setIsConnected(false);
      return;
    }

    const wsBaseUrl = IS_LOCAL ? SOCKET_URL_LOCAL : SOCKET_URL_PROD;
    const cleanWsBaseUrl = wsBaseUrl.endsWith("/")
      ? wsBaseUrl
      : `${wsBaseUrl}/`;
    const socketUrl = `${cleanWsBaseUrl}?token=${token}&expert_id=${expertId}`;
    const ws = new WebSocket(socketUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log(
        `[WebSocket] Booking socket connected for expert: ${expertId}`,
      );
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log(event);
      try {
        const parseSocketData = JSON.parse(event.data);
        console.log(
          parseSocketData.event,
          "parse socket data,647382463278478327467234632",
        );
        if (
          parseSocketData?.event === "availability_updated" ||
          parseSocketData?.event === "slot_locked" ||
          parseSocketData?.event === "slot_available" ||
          parseSocketData?.event === "payment_success"
        ) {
          dispatch(
            baseApi.util.invalidateTags([
              {
                type: "Availability",
              },
            ]),
          );
          // } else if (parseSocketData?.event === "slot_locked") {
          //   dispatch(
          //     baseApi.util.invalidateTags([
          //       {
          //         type: "Availability",
          //         id: parseSocketData.expert_id,
          //       },
          //     ]),
          //   );
          // } else if (parseSocketData?.event === "slot_available") {
          //   dispatch(
          //     baseApi.util.invalidateTags([
          //       {
          //         type: "Availability",
          //         id: parseSocketData.expert_id,
          //       },
          //     ]),
          //   );
          // } else if (parseSocketData?.event === "payment_success") {
          // dispatch(
          //   baseApi.util.invalidateTags([
          //     {
          //       type: "Availability",
          //       id: parseSocketData.expert_id,
          //     },
          //   ]),
          // );
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
  }, [token, expertId, dispatch]);

  const sendMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return (
    <BookingSocketContext.Provider
      value={{ isConnected, lastMessage, sendMessage, setExpertId }}
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
