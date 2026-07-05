import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const CART_BENEFITS = [
  "AI-powered personalized roadmaps",
  "Daily task tracking and progress monitoring",
  "Community access and support",
  "Mobile app access",
  "Certificates upon program completion",
  "Cancel anytime - no long-term commitment",
];

const PRICING_RULES = [
  "First program: $29.99/month",
  "Each additional program: $19.99/month",
  "Automatic multi-program discounts",
  "No refunds for current billing period",
];

export const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vnet_cart");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (title: string) => {
    const nextCart = cartItems.filter((item) => item !== title);
    setCartItems(nextCart);
    localStorage.setItem("vnet_cart", JSON.stringify(nextCart));
  };

  const nItems = cartItems.length;

  const firstPrice = nItems >= 1 ? 29.99 : 0.0;
  const additionalPrice = nItems > 1 ? (nItems - 1) * 29.99 : 0.0;
  const discount = nItems > 1 ? (nItems - 1) * 10.0 : 0.0;
  const total = firstPrice + additionalPrice - discount;

  return (
    // 'relative' is required here so the absolute gradient stays anchored to this div
    <div className="bg-[#030303] min-h-screen text-white py-30 relative overflow-hidden">
      <div className="relative z-10 p-8 md:p-12 max-w-[1600px] mx-auto">
        {/* Blue Gradient Corner Effect */}
        <div
          className="absolute top-60 left-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0B60BD]/70 to-transparent -z-10"
        />
        <h1 className="text-3xl font-bold mb-8 relative z-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items & Benefits */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-[#18181B] p-12 rounded-2xl border border-[#27272A] text-center">
                <h3 className="text-xl text-zinc-400 mb-6 font-['Inter']">Your cart is empty</h3>
                <Link to="/subscription-suggestions">
                  <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-semibold text-lg font-['Inter']">
                    Browse Suggested Programs
                  </button>
                </Link>
              </div>
            ) : (
              cartItems.map((title, idx) => (
                <div
                  key={idx}
                  className="bg-[#18181B] p-7 rounded-2xl border border-[#27272A] flex justify-between items-center"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[#FFFFFF] text-[21.79px] font-medium font-['Inter'] leading-8">
                      {title}
                    </h3>
                    <p className="text-[#9F9FA9] text-[19.37px] font-normal font-['Inter'] leading-7">
                      ${idx === 0 ? "29.99" : "19.99"}/month
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(title)}
                    className="text-red-500 hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))
            )}

            {/* Subscription Benefits */}
            <div className="w-full p-7 bg-blue-600/10 rounded-2xl border border-blue-600/30">
              <h3 className="text-blue-400 text-xl font-medium font-['Inter'] leading-8 mb-4">
                Subscription Benefits
              </h3>

              <ul className="space-y-3">
                {CART_BENEFITS.map((benefit, index) => (
                  <li
                    key={index}
                    className="text-zinc-300 text-base font-normal font-['Inter'] leading-6 flex gap-2"
                  >
                    <span>•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Order Summary & Pricing Rules */}
          <div className="space-y-6">
            <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-800 p-7">
              {/* Header */}
              <h2 className="text-white text-2xl font-medium font-['Inter'] leading-8 mb-4">
                Order Summary
              </h2>

              {/* Line Items */}
              <div className="space-y-5">
                <div className="flex justify-between items-center text-zinc-300 text-xl font-normal font-['Inter']">
                  <span>First Program</span>
                  <span>${firstPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300 text-xl font-normal font-['Inter']">
                  <span>Additional Programs ({nItems > 1 ? nItems - 1 : 0})</span>
                  <span>${additionalPrice.toFixed(2)}</span>
                </div>
                {nItems > 1 && (
                  <div className="flex justify-between items-center text-emerald-500 text-xl font-normal font-['Inter']">
                    <span>Multi-program Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total Section */}
              <div className="pt-7 mt-7 border-t border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-2xl font-normal font-['Inter']">
                    Monthly Total
                  </span>
                  <span className="text-white text-2xl font-normal font-['Inter']">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-zinc-500 text-base font-normal font-['Inter']">
                  Billed monthly • Cancel anytime
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-8">
                <button
                  disabled={nItems === 0}
                  className={`w-full h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors rounded-[32px] text-white text-xl font-medium font-['Inter'] ${nItems === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  Proceed to Checkout
                </button>
                <Link to="/subscription-suggestions" className="w-full">
                  <button className="w-full h-14 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-[32px] text-white text-xl font-medium font-['Inter']">
                    Add More Programs
                  </button>
                </Link>
              </div>
            </div>

            {/* Pricing Rules */}
            <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-800 p-7">
              <h3 className="text-white text-xl font-medium font-['Inter'] leading-8 mb-4">
                Pricing Rules
              </h3>

              <ul className="space-y-3">
                {PRICING_RULES.map((rule, index) => (
                  <li
                    key={index}
                    className="text-zinc-400 text-base font-normal font-['Inter'] leading-6 flex gap-2"
                  >
                    <span>•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
