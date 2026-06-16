import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { programs } from "../program/ProgramCards";

export const SubscriptionSuggestionMain = () => {
  // Track IDs of programs added to the cart
  const [cart, setCart] = useState<string[]>([]);

  const toggleCart = (title: string) => {
    setCart((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <div className="w-full bg-[#030303] py-20 px-6 relative overflow-hidden">
      <div className="absolute -left-64 -top-64 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Cart Notification Bar - Appears when items are in cart */}
        {cart.length > 0 && (
          <div className="mb-8 p-4 bg-[#0B1120] border border-blue-900/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <ShoppingCart className="size-5 text-blue-500" />
              <span className="font-medium">
                {cart.length} programs in cart
              </span>
            </div>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-all">
              View Cart
            </button>
          </div>
        )}

        <div className="mb-16 text-center">
          <h2 className="text-white text-4xl font-bold mb-3">
            Your Recommended Programs
          </h2>
          <p className="text-slate-400">
            Based on your assessment, we recommend the following programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            const isAdded = cart.includes(program.title);

            return (
              <div
                key={idx}
                className="relative p-8 bg-[#18181B] rounded-2xl border border-[#155DFC] flex flex-col"
              >
                <div className="absolute -top-3 left-6 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  Recommended for You
                </div>

                <div className="flex gap-4">
                  <div className={`size-10 shrink-0 ${program.iconColor}`}>
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold leading-7">
                      {program.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {program.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="p-4 bg-[#155DFC1A] rounded-lg border border-[#155DFC1A]/30">
                    <h4 className="text-white text-sm font-semibold">
                      Why This is Recommended
                    </h4>
                    <p className="text-slate-500 text-xs mt-1 leading-5">
                      Based on your assessment responses, this program aligns
                      well with your goals.
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex-grow">
                  <h4 className="text-white text-sm font-semibold mb-3">
                    Benefits
                  </h4>
                  <div className="space-y-2.5">
                    {program.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="text-blue-600 size-4 shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-xs">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <div className="mb-4">
                    <span className="text-white text-2xl font-bold">
                      $29.99
                    </span>
                    <span className="text-slate-500 text-xs ml-1">/month</span>
                  </div>
                  <button
                    onClick={() => toggleCart(program.title)}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      isAdded
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isAdded ? "Remove from cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
