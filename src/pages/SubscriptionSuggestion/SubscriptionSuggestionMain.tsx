import { Check, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";
import { programs } from "../program/data/programData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useAddToCartMultipleMutation,
  useGetAllCartItemsQuery,
} from "@/redux/features/cart/cart.api";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

export const SubscriptionSuggestionMain = () => {
  const location = useLocation();
  console.log(location.state?.assessmentResponse, "lkfdsjfklds");
  const assessmentResponse = location.state?.assessmentResponse;
  const recommendations =
    assessmentResponse?.data?.programs ||
    assessmentResponse?.data?.program_recommendations;

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const [addToCartApi] = useAddToCartMultipleMutation();
  const { data: getAllCartItem } = useGetAllCartItemsQuery(undefined, {
    skip: !token,
  });

  const rawCartItems = useAppSelector(selectCartItems);
  const cartTitles = rawCartItems.map((item) =>
    typeof item === "string" ? item : item.title,
  );

  const handleToggleCart = async (
    programId: string,
    title: string,
    price: number,
  ) => {
    const isAddedInBackend = Boolean(
      getAllCartItem?.data?.items?.some(
        (item: any) =>
          item.program?.id === programId ||
          item.program?.name?.toLowerCase() === title.toLowerCase(),
      ),
    );

    const isAddedInRedux = cartTitles.some(
      (t) => t.toLowerCase() === title.toLowerCase(),
    );

    const isAdded = token ? isAddedInBackend || isAddedInRedux : isAddedInRedux;

    if (isAdded) {
      dispatch(removeFromCart(title));
      toast.success(`${title} removed from cart`);
    } else {
      dispatch(addToCart({ program_id: programId, title, price }));
      toast.success(`${title} added to cart!`);

      if (token && programId) {
        try {
          const res = await addToCartApi({ program_ids: [programId] }).unwrap();
          if (res?.data?.skipped_items?.[0]?.reason) {
            toast.error(res?.data?.skipped_items[0]?.reason);
          }
        } catch (err) {
          console.error("Add to cart API error:", err);
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-black py-24 md:py-44 px-6 relative overflow-hidden flex items-center">
      {/* Top-Left Page Gradient */}

      <div className="max-w-[1000px] w-full mx-auto relative z-10">
        <div className="absolute top-60 left-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0B60BD]/50 to-transparent -z-10" />
        {/* Cart Notification Bar - Appears when items are in cart */}
        {cartTitles?.length > 0 && (
          <div className="mb-8 p-4 bg-[#0F172A] border border-blue-900/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <ShoppingCart className="size-5 text-blue-500" />
              <span className="font-medium">
                {cartTitles?.length} programs in cart
              </span>
            </div>
            <Link to={"/shopping-cart"}>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-all">
                View Cart
              </button>
            </Link>
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
          {recommendations && recommendations?.length > 0
            ? recommendations
                .filter((item: any) => {
                  const program = item.program || item;
                  return Boolean(
                    item?.is_recommended ?? program?.is_recommended ?? false,
                  );
                })
                .map((item: any, idx: number) => {
                  const program = item.program || item;
                  const isRecommended = Boolean(
                    item?.is_recommended ?? program?.is_recommended ?? true,
                  );
                const reasonText = item?.reason ?? program?.reason;
                const price = parseFloat(program?.price) || 29.99;
                console.log(item);
                const isAddedInBackend = Boolean(
                  getAllCartItem?.data?.items?.some(
                    (cartItem: any) =>
                      cartItem.program?.id === program.id ||
                      cartItem.program?.name?.toLowerCase() ===
                        program.name?.toLowerCase(),
                  ),
                );
                const isAddedInRedux = cartTitles.some(
                  (t) => t.toLowerCase() === program?.name?.toLowerCase(),
                );
                const isAdded = token
                  ? isAddedInBackend || isAddedInRedux
                  : isAddedInRedux;

                return (
                  <div
                    key={program.id || idx}
                    className="relative p-8 bg-[#0F172A] rounded-2xl border border-[#155DFC] flex flex-col z-0"
                  >
                    {/* Top-Left Corner Gradient */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl -z-10 pointer-events-none">
                      <div
                        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] rounded-full blur-[80px]"
                        style={{ backgroundColor: "#185CA633" }}
                      />
                    </div>

                    {isRecommended && (
                      <div className="absolute -top-3 left-6 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider z-10">
                        Recommended for You
                      </div>
                    )}

                    <div className="flex gap-4">
                      <div>
                        <h3 className="text-white text-xl font-bold leading-7">
                          {program.name}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                          {program.description}
                        </p>
                      </div>
                    </div>

                    {Boolean(reasonText) && (
                      <div className="pt-6">
                        <div className="p-4 bg-[#155DFC1A] rounded-lg border border-[#155DFC1A]/30">
                          <h4 className="text-white text-sm font-semibold">
                            Why This is Recommended
                          </h4>
                          <p className="text-slate-400 text-xs mt-1 leading-5">
                            {reasonText}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 flex-grow">
                      <h4 className="text-white text-sm font-semibold mb-3">
                        Benefits
                      </h4>
                      <div className="space-y-2.5">
                        {program.benefits?.map((b: any, i: number) => (
                          <div
                            key={b.id || i}
                            className="flex items-start gap-2.5"
                          >
                            <Check className="text-blue-600 size-4 shrink-0 mt-0.5" />
                            <span className="text-slate-400 text-xs">
                              {typeof b === "string" ? b : b.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <div className="mb-4">
                        <span className="text-white text-2xl font-bold">
                          ${program.price}
                        </span>
                        <span className="text-slate-500 text-xs ml-1">
                          /month
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleToggleCart(program.id, program.name, price)
                        }
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
              })
            : programs.map((program, idx) => {
                console.log(program, "programmmmm");
                const Icon = program.icon;
                const isAdded = cartTitles.includes(program.title);

                return (
                  <div
                    key={idx}
                    className="relative p-8 bg-[#0F172A] rounded-2xl border border-[#155DFC] flex flex-col z-0"
                  >
                    {/* Top-Left Corner Gradient */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl -z-10 pointer-events-none">
                      <div
                        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] rounded-full blur-[80px]"
                        style={{ backgroundColor: "#185CA633" }}
                      />
                    </div>

                    <div className="absolute -top-3 left-6 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider z-10">
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
                          Based on your assessment responses, this program
                          aligns well with your goals.
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
                        <span className="text-slate-500 text-xs ml-1">
                          /month
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleToggleCart("", program.title, 29.99)
                        }
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
        {/* Explore All Programs Button */}
        <div className="mt-12 flex justify-center">
          <Link to="/programs/all-programs">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all select-none hover:scale-105 active:scale-95">
              Explore All Programs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
