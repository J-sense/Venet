/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useGoogleLoginMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { selectCartItems, clearCart } from "@/redux/features/cart/cartSlice";
import { useAddToCartMultipleMutation } from "@/redux/features/cart/cart.api";

interface GoogleAuthButtonProps {
  className?: string;
}

export const GoogleAuthButton = ({ className = "" }: GoogleAuthButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [syncCart] = useAddToCartMultipleMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const fromPath = location.state?.from;

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google authentication failed. No token received.");
        return;
      }

      const res = await googleLogin(credentialResponse.credential);

      if (res?.data?.success && res?.data?.data) {
        const { access, refresh, user } = res.data.data;

        // 1. Set user & token in Redux Store
        dispatch(
          setUser({
            user,
            token: access,
            refresh,
          }),
        );
        toast.success(
          res.data?.details || res.data?.message || "Google login successful!",
        );

        // 2. Auto sync cart if guest items exist
        if (cartItems.length > 0) {
          try {
            const program_ids = cartItems.map((item) =>
              typeof item === "object" && item.program_id
                ? item.program_id
                : "02ed108d-1636-4acd-acd9-c85a30100fbc",
            );
            await syncCart({ program_ids }).unwrap();
            dispatch(clearCart());
          } catch (err) {
            console.log("Cart sync error:", err);
            dispatch(clearCart());
          }
        }

        // 3. Navigation redirect
        if (fromPath) {
          navigate(fromPath);
          return;
        }

        if (user?.role === "EXPERT") {
          navigate("/dashboard/experts");
        } else {
          navigate("/dashboard/user");
        }
      } else if (res?.error) {
        const errorData = res.error as any;
        const detailMsg =
          errorData?.data?.details?.id_token ||
          errorData?.data?.details ||
          errorData?.data?.message ||
          "Google authentication failed.";
        toast.error(
          typeof detailMsg === "string" ? detailMsg : JSON.stringify(detailMsg),
        );
      }
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      toast.error(error?.message || "Server connection failed during Google Sign-In.");
    }
  };

  return (
    <div
      className={`w-full flex justify-center items-center max-w-full overflow-hidden [&>div]:!w-full [&>div]:!max-w-full [&_iframe]:!w-full [&_iframe]:!max-w-full ${className}`}
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google Sign-In failed or cancelled.")}
        theme="filled_blue"
        shape="pill"
        size="large"
      />
    </div>
  );
};
