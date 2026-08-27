import { useGetChatContactsQuery } from "@/redux/features/userDashboard/userSession.api";
import { ConsultationReview } from "../ConsultationReview";

interface PreviousSessionChatProps {
  isExpert: boolean;
  id?: string;
}

export const PreviousSessionChat = ({ isExpert }: PreviousSessionChatProps) => {
  const { data: previousChatData } = useGetChatContactsQuery(undefined)
  console.log(previousChatData, "preioushfsd chat dta")
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0A0F1C]">
      {/* Chat Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0F172A] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-700 rounded-full flex items-center justify-center text-2xl shrink-0">
            👤
          </div>
          <div>
            <h3 className="font-semibold text-white text-base sm:text-lg">
              Henry Dholi
            </h3>
            <p className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#0A0F1C] space-y-4">
        <div className="bg-[#1E2937] p-4 rounded-2xl text-white max-w-[85%] sm:max-w-[70%] lg:max-w-[55%] text-sm sm:text-base">
          Hello! How can I help you today?
        </div>
        <div className="bg-blue-600 p-4 rounded-2xl ml-auto max-w-[85%] sm:max-w-[70%] lg:max-w-[55%] text-white text-sm sm:text-base">
          I wanted to discuss my career transition strategy.
        </div>
      </div>

      {/* Review Section */}
      {!isExpert && <ConsultationReview />}
    </div>
  );
};

export default PreviousSessionChat;
