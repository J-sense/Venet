import { Link } from "react-router";
import { X, Search, Home, AlertCircle } from "lucide-react";

export const BookingCancelPage = () => {
  return (
    <div className="bg-[#030303] min-h-screen text-white py-30 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.1),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_20%),linear-gradient(180deg,#020205_0%,#08090D_40%,#05060A_100%)]">
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute left-1/2 top-16 w-[520px] h-[520px] -translate-x-1/2 rounded-full blur-[110px] bg-rose-500/10" />
        <div className="absolute right-16 top-32 w-[320px] h-[320px] rounded-full blur-[100px] bg-slate-500/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020205]/80 to-transparent" />
      </div>

      <div className="w-full max-w-xl bg-[#11131a] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] rounded-[28px] p-8 md:p-12 text-center relative z-10 mx-6">
        {/* Cancel Icon */}
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
          <X className="w-10 h-10 text-rose-400 stroke-[2.5]" />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4 font-['Inter']">
          <AlertCircle size={16} />
          <span>Checkout Cancelled</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-['Inter'] tracking-tight">
          No Charge Processed
        </h1>
        <p className="text-[#c7c7d1] text-base md:text-lg mb-10 leading-relaxed font-['Inter'] max-w-2xl mx-auto">
          Your checkout session for the consultation booking was cancelled. You can return to the directory to schedule your session again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/experts" className="w-full sm:w-auto flex-1">
            <button className="w-full px-8 py-3.5 bg-rose-600 hover:bg-rose-500 transition rounded-full text-white font-semibold text-lg font-['Inter'] flex items-center justify-center gap-2 cursor-pointer shadow-[0_12px_30px_rgba(244,63,94,0.2)]">
              <Search size={20} />
              <span>Browse Experts</span>
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

export default BookingCancelPage;
