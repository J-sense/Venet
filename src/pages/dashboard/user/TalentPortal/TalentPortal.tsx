import { useMemo } from "react";
import {
  useGetMyPurchaseTalentPortalQuery,
  useGetMyTalentPortalQuery,
} from "@/redux/features/userDashboard/userProfile.api";
import LockPortal from "./components/LocakPortal";
import TalentPortalUnlocked from "./components/TalentPortalUnlocked";
import { Loader2 } from "lucide-react";

export default function TalentPortal() {
  const {
    data: getmyPurchaseAllPrograms,
    isLoading: isPurchasesLoading,
  } = useGetMyPurchaseTalentPortalQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(getmyPurchaseAllPrograms, "get my all subscription")
  const {
    data: getTalentPortal,
    isLoading: isPortalLoading,
  } = useGetMyTalentPortalQuery(undefined);

  const planId = getTalentPortal?.data?.[0]?.id;

  const { isSubscribed, isInCompleteTalentPortal, isInCancelledTalentPortal, idForRetry } =
    useMemo(() => {
      const purchases = Array.isArray(getmyPurchaseAllPrograms?.data)
        ? getmyPurchaseAllPrograms.data
        : [];

      if (!planId || purchases.length === 0) {
        return {
          isSubscribed: false,
          isInCompleteTalentPortal: false,
          isInCancelledTalentPortal: false,
          idForRetry: undefined,
        };
      }

      const matchingSub =
        purchases.find((sub: any) => sub?.plan?.id === planId) || purchases[0];
      const status = matchingSub?.status?.toUpperCase();

      return {
        isSubscribed: status === "ACTIVE",
        isInCompleteTalentPortal: status === "INCOMPLETE" || status === "EXPIRED",
        isInCancelledTalentPortal: status === "CANCELED" || status === "CANCELLED",
        idForRetry: matchingSub?.id,
      };
    }, [getmyPurchaseAllPrograms, planId]);

  const isLoading = isPurchasesLoading || isPortalLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isSubscribed ? (
        <TalentPortalUnlocked />
      ) : (
        <LockPortal
          portalDAta={getTalentPortal?.data}
          isInCompleteTalentPortal={isInCompleteTalentPortal}
          isInCancelledTalentPortal={isInCancelledTalentPortal}
          idForRetry={idForRetry}
        />
      )}
    </div>
  );
}
