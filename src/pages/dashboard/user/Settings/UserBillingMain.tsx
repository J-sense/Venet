import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCancelSubscriptionMutation,
  useGetBillingDataQuery,
  useGetMyPurchaseTalentPortalQuery,
} from "@/redux/features/userDashboard/userProfile.api";
import { Download, History, Receipt, Sparkles } from "lucide-react";


export default function UserBillingMain() {

  const { data: billingData } = useGetBillingDataQuery(undefined);
  const historyItems = Array.isArray(billingData?.data) ? billingData.data : [];
  const { data: MySubscriptionData, refetch: refetchSubscriptions } =
    useGetMyPurchaseTalentPortalQuery(undefined);
  const subscriptionsList = Array.isArray(MySubscriptionData?.data)
    ? MySubscriptionData.data
    : [];
  const [cancelSubscription, { isLoading: isCanceling }] =
    useCancelSubscriptionMutation();

  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancelSubscription = async (id: string) => {
    try {
      await cancelSubscription(id).unwrap();
      refetchSubscriptions();
    } catch (error) {
      console.log("Error canceling subscription:", error);
    }
  };

  const confirmCancel = async () => {
    if (selectedSubId) {
      await handleCancelSubscription(selectedSubId);
      setIsDialogOpen(false);
      setSelectedSubId(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Active Subscriptions Section */}
      <Card className="bg-[#122131] border-none rounded-xl overflow-hidden shadow-none">
        <CardHeader className="px-6 py-5">
          <CardTitle className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
            <Sparkles className="w-5 h-5 text-blue-400" />
            My Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptionsList.length > 0 ? (
              subscriptionsList.map((sub: any, i: number) => {
                const isActive = sub.status?.toUpperCase() === "ACTIVE";
                const isIncomplete = sub.status?.toUpperCase() === "INCOMPLETE";
                const isCanceled = sub.status?.toUpperCase() === "CANCELED";

                return (
                  <div
                    key={sub.id || i}
                    className="bg-[#2736474D] rounded-xl p-5 border border-white/5 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-zinc-200 font-medium text-[17px] mb-1 capitalize">
                          {sub.plan?.name || "Subscription Plan"}
                        </h3>
                        <p className="text-zinc-400 text-[13px]">
                          ${sub.plan?.price || "0"}{" "}
                          <span className="lowercase">/ {sub.plan?.interval || "month"}</span>
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${isActive
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : isIncomplete
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : isCanceled
                              ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                              : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                          }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${isActive
                            ? "bg-emerald-400"
                            : isIncomplete
                              ? "bg-amber-400"
                              : isCanceled
                                ? "bg-rose-400"
                                : "bg-zinc-400"
                            }`}
                        />
                        {sub.status}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                      <div className="text-zinc-400 text-[13px]">
                        {sub.current_period_end
                          ? `Next billing: ${new Date(sub.current_period_end).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}`
                          : "No active period"}
                      </div>
                      {isActive && (
                        <button
                          disabled={isCanceling}
                          onClick={() => {
                            if (sub?.id) {
                              setSelectedSubId(sub.id);
                              setIsDialogOpen(true);
                            }
                          }}
                          className="text-red-500 font-semibold hover:text-red-400 transition-colors text-[13px] disabled:opacity-50"
                        >
                          Cancel Plan
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center text-zinc-400 py-6">
                No subscriptions found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing History Section */}
      <Card className="bg-[#122131] border-none rounded-xl overflow-hidden shadow-none">
        <CardHeader className="px-6 py-5 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
            <History className="w-5 h-5 text-zinc-300" />
            Billing History
          </CardTitle>
          <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-[13px] font-semibold transition-colors mt-0">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-t border-white/5">
              <thead>
                <tr className="text-zinc-400 border-b border-white/5">
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Plan Name
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap text-right">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {historyItems.length > 0 ? (
                  historyItems.map((item: any, i: number) => (
                    <tr
                      key={item.id || i}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-zinc-300 capitalize">
                        {item.plan_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                        ${item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-medium border ${item.status?.toUpperCase() === "PAID"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {item.invoice_pdf_url ? (
                          <a
                            href={item.invoice_pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                            title="View / Download Invoice PDF"
                          >
                            <Receipt className="w-4 h-4 inline-block" />
                          </a>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-zinc-400"
                    >
                      No billing history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#122131] border border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Cancel Subscription?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm mt-2">
              Are you sure you want to cancel your program subscription? You will lose access to premium portal features at the end of your billing period.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-row justify-end gap-3">
            <button
              onClick={() => {
                setIsDialogOpen(false);
                setSelectedSubId(null);
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm font-medium transition-colors cursor-pointer"
            >
              Keep Subscription
            </button>
            <button
              disabled={isCanceling}
              onClick={confirmCancel}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isCanceling ? "Canceling..." : "Confirm Cancellation"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
