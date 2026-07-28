import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Check, LayoutDashboard, Home, ShieldCheck } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { baseApi } from "@/redux/baseApi";

export const PaymentSuccessPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sessionId =
    searchParams.get("session_id") || searchParams.get("sessionId");

  useEffect(() => {
    dispatch(clearCart());
    dispatch(baseApi.util.invalidateTags(["Cart"]));
  }, [dispatch]);

  return (
    <div className="min-h-screen text-white py-24 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(12,64,158,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_20%),linear-gradient(180deg,#020205_0%,#08090D_40%,#05060A_100%)]">
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute left-1/2 top-16 w-[520px] h-[520px] -translate-x-1/2 rounded-full blur-[110px] bg-[#0b5bff]/20" />
        <div className="absolute right-16 top-32 w-[320px] h-[320px] rounded-full blur-[100px] bg-[#9c3bff]/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020205]/80 to-transparent" />
      </div>

      <div className="w-full max-w-xl bg-[#11131a] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] rounded-[28px] p-8 md:p-12 text-center relative z-10 mx-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-400 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-4 font-['Inter']">
          <ShieldCheck size={16} />
          <span>Payment Verified</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-['Inter'] tracking-tight">
          Subscription Active
        </h1>
        <p className="text-[#c7c7d1] text-base md:text-lg mb-10 leading-relaxed font-['Inter'] max-w-2xl mx-auto">
          Your payment was processed successfully. Your program access and
          personalized roadmap are now ready in your dashboard.
        </p>

        {sessionId && (
          <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-2xl mb-8 text-left">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-1 font-['Inter']">
              Transaction ID
            </span>
            <span className="text-xs font-mono text-zinc-300 break-all select-all">
              {sessionId}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/user" className="w-full sm:w-auto flex-1">
            <button className="w-full px-8 py-3.5 bg-[#4f7cff] hover:bg-[#5d8dff] transition rounded-full text-white font-semibold text-lg font-['Inter'] flex items-center justify-center gap-2 cursor-pointer shadow-[0_12px_30px_rgba(79,124,255,0.25)]">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
          </Link>

          <Link to="/" className="w-full sm:w-auto flex-1">
            <button className="w-full px-8 py-3.5 bg-[#1f2330] hover:bg-[#2a2f44] transition rounded-full text-white font-semibold text-lg font-['Inter'] flex items-center justify-center gap-2 cursor-pointer border border-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
              <Home size={20} />
              <span>Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
