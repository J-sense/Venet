import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCartItems,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useClearCartApiMutation,
  useGetAllCartItemsQuery,
  useProceedToCheckOutMutation,
  useRemoveAllItemFromCartMutation,
  useRemoveSingleCartItemMutation,
} from "@/redux/features/cart/cart.api";
import { toast } from "sonner";

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
  const dispatch = useAppDispatch();
  const rawCartItems = useAppSelector(selectCartItems);
  const token = useAppSelector(selectCurrentToken);
  const [clearCartApi, { isLoading: isClearApiLoading }] =
    useClearCartApiMutation();
  const { data: getAllCart, refetch } = useGetAllCartItemsQuery(undefined, {
    skip: !token,
  });
  const [removeItem, { isLoading: isRemoveAllLoading }] =
    useRemoveAllItemFromCartMutation();
  const [singleRemoveCart] = useRemoveSingleCartItemMutation();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const isClearing = isRemoveAllLoading || isClearApiLoading;

  const backendCart = getAllCart?.data;
  const backendItems = backendCart?.items || [];
  const backendPricing = backendCart?.pricing;
  const [proceedToCheckout, { isLoading: isCheckoutLoading }] =
    useProceedToCheckOutMutation();

  // Local fallback cart titles for guest users
  const cartTitles = rawCartItems.map((item) =>
    typeof item === "string" ? item : item.title,
  );

  const handleRemove = async (title: string, itemId?: number | string) => {
    if (itemId) setDeletingId(itemId);
    try {
      if (token && itemId) {
        await singleRemoveCart(itemId).unwrap();
        toast.success("Program removed from cart!");
        refetch();
      }
      dispatch(removeFromCart(title));
    } catch (err) {
      console.error("Failed to remove item from backend cart:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (token) {
      try {
        await removeItem(undefined).unwrap();
        dispatch(clearCart());
        toast.success("Cart cleared from database!");
        refetch();
      } catch (err) {
        console.log(
          "Cart clear API call sent, trying fallback clearCartApi...",
          err,
        );
        try {
          await clearCartApi().unwrap();
          dispatch(clearCart());
          toast.success("Cart cleared from database!");
          refetch();
        } catch (fallbackErr) {
          console.error("Backend clear cart failed:", fallbackErr);
        }
      }
    } else {
      dispatch(clearCart());
      toast.success("Cart cleared!");
    }
  };

  const handleProceedToCheckout = async () => {
    if (!token) {
      toast.error("Please sign in to complete your purchase.");
      return;
    }

    try {
      const res = await proceedToCheckout(undefined).unwrap();
      console.log("Checkout response:", res);

      const checkoutUrl = res?.data?.checkout_url || res?.checkout_url;

      if (checkoutUrl) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = checkoutUrl;
      } else {
        toast.error("Failed to retrieve payment link. Please try again.");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast.error(
        error?.data?.message ||
          error?.data?.details ||
          "Failed to initiate checkout. Please try again.",
      );
    }
  };
  const totalItemCount = token ? backendItems.length : cartTitles.length;

  // Pricing calculation fallback for guests
  const guestFirstPrice = cartTitles.length >= 1 ? 29.99 : 0.0;
  const guestAdditionalPrice =
    cartTitles.length > 1 ? (cartTitles.length - 1) * 29.99 : 0.0;
  const guestDiscount =
    cartTitles.length > 1 ? (cartTitles.length - 1) * 10.0 : 0.0;
  const guestTotal = guestFirstPrice + guestAdditionalPrice - guestDiscount;

  const firstPrice = token
    ? (backendPricing?.first_program_price ?? 0)
    : guestFirstPrice;
  const additionalPrice = token
    ? (backendPricing?.additional_programs_price ?? 0)
    : guestAdditionalPrice;
  const additionalCount = token
    ? (backendPricing?.additional_programs_count ?? 0)
    : cartTitles.length > 1
      ? cartTitles.length - 1
      : 0;
  const discount = token ? (backendPricing?.discount ?? 0) : guestDiscount;
  const total = token ? (backendPricing?.monthly_total ?? 0) : guestTotal;

  return (
    // 'relative' is required here so the absolute gradient stays anchored to this div
    <div className="bg-[#030303] min-h-screen text-white py-30 relative overflow-hidden">
      <div className="relative z-10 p-8 md:p-12 max-w-[1600px] mx-auto">
        {/* Blue Gradient Corner Effect */}
        <div className="absolute top-60 left-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0B60BD]/70 to-transparent -z-10" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          {totalItemCount > 0 && (
            <button
              onClick={handleClearAll}
              disabled={isClearing}
              className="px-4 py-2 bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isClearing ? (
                <>
                  <Loader2 size={16} className="animate-spin text-red-400" />
                  <span>Clearing Cart...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Clear Entire Cart</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items & Benefits */}
          <div className="lg:col-span-2 space-y-6">
            {totalItemCount === 0 ? (
              <div className="bg-[#18181B] p-12 rounded-2xl border border-[#27272A] text-center">
                <h3 className="text-xl text-zinc-400 mb-6 font-['Inter']">
                  Your cart is empty
                </h3>
                <Link to="/subscription-suggestions">
                  <button className="hidden px-8 py-3.5 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-semibold text-lg font-['Inter']">
                    Browse Suggested Programs
                  </button>
                </Link>
              </div>
            ) : token ? (
              // LOGGED IN USER: Backend Cart Items
              backendItems.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="bg-[#18181B] p-7 rounded-2xl border border-[#27272A] flex justify-between items-center"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[#FFFFFF] text-[21.79px] font-medium font-['Inter'] leading-8">
                      {item.program?.name}
                    </h3>
                    <p className="text-[#9F9FA9] text-[19.37px] font-normal font-['Inter'] leading-7">
                      ${item.effective_price ?? item.program?.price}/month
                    </p>
                    {item.program?.description && (
                      <p className="text-zinc-500 text-sm font-normal">
                        {item.program.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemove(item.program?.name, item.id)}
                    disabled={deletingId === item.id}
                    className="text-red-500 hover:bg-red-900/20 p-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[40px] min-h-[40px]"
                    aria-label="Remove item"
                  >
                    {deletingId === item.id ? (
                      <Loader2
                        size={24}
                        className="animate-spin text-red-400"
                      />
                    ) : (
                      <Trash2 size={24} />
                    )}
                  </button>
                </div>
              ))
            ) : (
              // GUEST USER: Redux Cart Items
              cartTitles.map((title, idx) => (
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
                  <span>${Number(firstPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300 text-xl font-normal font-['Inter']">
                  <span>Additional Programs ({additionalCount})</span>
                  <span>${Number(additionalPrice).toFixed(2)}</span>
                </div>
                {Number(discount) > 0 && (
                  <div className="flex justify-between items-center text-emerald-500 text-xl font-normal font-['Inter']">
                    <span>Multi-program Discount</span>
                    <span>-${Number(discount).toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total Section */}
              <div className="pt-7 mt-7 border-t border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-2xl font-normal font-['Inter']">
                    Total
                  </span>
                  <span className="text-white text-2xl font-normal font-['Inter']">
                    ${Number(total).toFixed(2)}
                  </span>
                </div>
                <p className="text-zinc-500 text-base font-normal font-['Inter']">
                  Billed monthly • Cancel anytime
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-8">
                <button
                  onClick={handleProceedToCheckout}
                  disabled={totalItemCount === 0 || isCheckoutLoading}
                  className={`w-full h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors rounded-[32px] text-white text-xl font-medium font-['Inter'] ${
                    totalItemCount === 0 || isCheckoutLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isCheckoutLoading
                    ? "Redirecting to Payment..."
                    : "Proceed to Checkout"}
                </button>
                <Link to="/subscription-suggestions" className="w-full hidden">
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
