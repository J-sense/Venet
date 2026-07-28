import { CustomerFeedback } from "@/pages/Home/components/CustomerFeedback";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddToCartMultipleMutation, useGetAllCartItemsQuery } from "@/redux/features/cart/cart.api";
import { addToCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  programTitle?: string;
  programId?: string;
}

export default function HowItWorks({
  steps,
  title = "How It Works",
  subtitle = "Your journey from assessment to success in 5 simple steps",
  buttonText = "Start Your Journey",
  programTitle = "VNET Wellness Program",
  programId,
}: HowItWorksProps) {
  const dispatch = useAppDispatch();
  const rawCartItems = useAppSelector(selectCartItems);
  const token = useAppSelector(selectCurrentToken);
  const [addToCartApi, { isLoading: isAddingToCart }] = useAddToCartMultipleMutation();
  const { data: getAllCartItem } = useGetAllCartItemsQuery(undefined, {
    skip: !token,
  });

  const targetProgramId = programId || "02ed108d-1636-4acd-acd9-c85a30100fbc";

  const isAddedInBackend = Boolean(
    getAllCartItem?.data?.items?.some(
      (item: any) =>
        item.program?.id === targetProgramId ||
        item.program?.name?.toLowerCase() === programTitle.toLowerCase()
    )
  );

  const isAddedInRedux = rawCartItems.some(
    (item) =>
      (typeof item === "string" ? item : item.title).toLowerCase() ===
      programTitle.toLowerCase()
  );

  const isAdded = token ? isAddedInBackend : isAddedInRedux;

  const handleAddToCart = async () => {
    if (!isAdded) {
      const pId = programId || "02ed108d-1636-4acd-acd9-c85a30100fbc";
      dispatch(
        addToCart({ program_id: pId, title: programTitle, price: 29.99 }),
      );
      toast.success(`${programTitle} added to cart!`);

      if (token) {
        try {
          await addToCartApi({
            program_ids: [pId],
          }).unwrap();
        } catch (err) {
          console.log("Add to cart API sent:", err);
        }
      }
    }
  };

  return (
    <>
      <div className="pt-40 bg-black relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-Middle Gradient */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#165292d2]  blur-[120px]" />
          {/* Bottom-Right Gradient */}
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#007AFF33] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {title}
              <span className="text-[#155DFC]">Works</span>
            </h2>
            <p className="text-white/70 text-lg">{subtitle}</p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps?.map((step, index) => (
              <div
                key={step.number}
                className="group bg-[#0F172A] shadow-lg hover:bg-[#1A1E2A] border border-white/10 hover:border-[#007AFF]/30 rounded-2xl p-6 md:p-8 flex items-start gap-6 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#155DFC] flex items-center justify-center text-white font-semibold text-lg mt-1 shadow-[0_0_20px_#155DFC80,0_6.02px_9.03px_-6.02px_#155DFC]">
                  {step.number}
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#007AFF] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon Placeholder */}
                <div className="w-12 h-12 flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity flex items-center justify-center text-3xl">
                  {index === 0 && "🧠"}
                  {index === 1 && "📋"}
                  {index === 2 && "📝"}
                  {index === 3 && "📈"}
                  {index === 4 && "🏆"}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons: Add to Cart & View Cart */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14">
            {isAdded ? (
              <div className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.35)] backdrop-blur-xl transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Added to Cart</span>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="group relative px-9 py-4 rounded-full bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-lg flex items-center gap-3 transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-[#007AFF]/30"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 text-white group-hover:scale-105 transition-transform duration-200" />
                    <span>Add Program to Cart</span>
                  </>
                )}
              </button>
            )}

            <Link to="/shopping-cart">
              <button className="bg-[#007AFF] hover:bg-blue-600 transition-all px-10 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg shadow-[#007AFF]/40">
                {buttonText}
                <span>→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <CustomerFeedback />
    </>
  );
}
