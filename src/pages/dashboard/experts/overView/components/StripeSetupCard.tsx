import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, CreditCard, ExternalLink, RefreshCw } from "lucide-react";

interface StripeSetupCardProps {
  getStripe: any;
  isLoadingStripe: boolean;
  handleStripeConnect: () => void;
  isOnboarding: boolean;
}

export function StripeSetupCard({
  getStripe,
  isLoadingStripe,
  handleStripeConnect,
  isOnboarding,
}: StripeSetupCardProps) {
  if (isLoadingStripe) {
    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A] p-6 rounded-2xl animate-pulse border border-white/5">
        <div className="space-y-3">
          <div className="h-6 w-20 bg-slate-800 rounded animate-pulse" />
          <div className="h-8 w-56 bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-72 bg-slate-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  const stripeData = getStripe?.data;
  const onboardingComplete = stripeData?.onboarding_complete;
  const email = stripeData?.account_info?.email;
  const accountId = stripeData?.account_info?.account_id;

  if (onboardingComplete) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/20 to-[#0F172A] border border-emerald-500/20 p-6 rounded-2xl shadow-xl backdrop-blur-md">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Stripe Payouts Connected
                </h3>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Live
                </Badge>
              </div>
              <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                Your account is fully set up. Payments and automatic payouts are active for{" "}
                <span className="font-semibold text-white">{email || "your email"}</span>.
              </p>
              {accountId && (
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Stripe Merchant ID: {accountId}
                </p>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleStripeConnect}
            disabled={isOnboarding}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/15 flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            {isOnboarding ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}
            {isOnboarding ? "Connecting..." : "Manage Payouts"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/20 to-[#0F172A] border border-amber-500/20 p-6 rounded-2xl shadow-xl backdrop-blur-md">
      {/* Visual left indicator line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20 shrink-0">
            <AlertCircle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Stripe Setup Incomplete
              </h3>
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Action Required
              </Badge>
            </div>
            <p className="text-zinc-300 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Connect your Stripe account to start receiving client bookings and payouts. Payouts are currently disabled until onboarding is completed.
            </p>
            {email && (
              <p className="text-xs text-zinc-400 mt-1">
                Associated Email: <span className="text-zinc-300 font-medium">{email}</span>
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={handleStripeConnect}
          disabled={isOnboarding}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/15 flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          {isOnboarding ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <ExternalLink className="w-4 h-4" />
          )}
          {isOnboarding ? "Connecting..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );
}
