/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/consultation/ChatWindow.tsx
import { Users } from "lucide-react";
import { useParams, useLocation } from "react-router";
import { PreviousSessionChat } from "./components/PreviousSessionChat";
import { UpcomingSessions } from "./components/UpcomingSessions";
import { useGetUserSessionQuery } from "@/redux/features/userDashboard/userSession.api";

export const ChatWindow = () => {
  const { section, id } = useParams();
  const location = useLocation();
  const isExpert = location.pathname.includes("/dashboard/experts");
  const { data: mySessions, isLoading } = useGetUserSessionQuery(undefined);
  const sessionsList = mySessions?.data || [];
  console.log(mySessions);
  if (section === "upcoming") {
    return (
      <UpcomingSessions
        isLoading={isLoading}
        sessionsList={sessionsList}
        isExpert={isExpert}
      />
    );
  }

  if (section === "previous") {
    return <PreviousSessionChat isExpert={isExpert} id={id} />;
  }

  // ===================== DEFAULT / EMPTY STATE =====================
  return (
    <div className="flex-1 flex items-center justify-center p-6 text-center min-h-[300px]">
      <div className="max-w-xs">
        <Users className="w-16 h-16 mx-auto text-zinc-600 mb-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
          No conversation selected
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Select an upcoming session or a previous conversation from the sidebar
          to get started
        </p>
      </div>
    </div>
  );
};
