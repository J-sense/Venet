import { Link } from "react-router";
import { X, ShoppingBag, Home, AlertCircle } from "lucide-react";

export const PaymentCancelPage = () => {
  return (
    <div className="bg-[#030303] min-h-screen text-white py-30 relative overflow-hidden flex items-center justify-center">
      {/* Blue Gradient Corner Effect matching ShoppingCartPage */}
      <div className="absolute top-60 left-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0B60BD]/70 to-transparent -z-10" />

      <div className="w-full max-w-xl bg-[#18181B] border border-[#27272A] rounded-2xl p-8 md:p-12 text-center relative z-10 mx-6">
        {/* Cancel Icon */}
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
          <X className="w-10 h-10 text-rose-400 stroke-[2.5]" />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4 font-['Inter']">
          <AlertCircle size={16} />
          <span>Checkout Cancelled</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-['Inter']">
          No Charge Processed
        </h1>
        <p className="text-[#9F9FA9] text-base md:text-lg mb-8 leading-relaxed font-['Inter']">
          Your checkout session was cancelled before completion. You can return to your cart anytime to review your order.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shopping-cart" className="w-full sm:w-auto flex-1">
            <button className="w-full px-8 py-3.5 bg-[#007AFF] hover:bg-blue-600 transition rounded-full text-white font-semibold text-lg font-['Inter'] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#007AFF]/40">
              <ShoppingBag size={20} />
              <span>Return to Cart</span>
            </button>
          </Link>

          <Link to="/" className="w-full sm:w-auto flex-1">
            <button className="w-full px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 transition rounded-full text-white font-semibold text-lg font-['Inter'] flex items-center justify-center gap-2 cursor-pointer">
              <Home size={20} />
              <span>Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
