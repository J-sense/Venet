/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthLayout } from "@/pages/Auth/components/AuthLayout";
import { FormCard } from "@/pages/Auth/components/FormCard";
import {
  VerificationForm,
  type VerificationFormData,

} from "./components/VerificationForm";
import { useLocation, useNavigate } from "react-router";
import { useVerifyOTPMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export const VerifyIdentity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();

  const handleVerify = async (data: VerificationFormData) => {
    if (!email) {
      toast.error("Email not found. Please try requesting a password reset again.");
      return;
    }

    try {
      const res = await verifyOTP({
        email,
        otp: data.otp,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });
      console.log("Verify OTP response:", res);

      if (res?.data) {
        toast.success(
          res.data?.message ||
          res.data?.details ||
          "Password reset successful! Please sign in with your new password."
        );
        navigate("/auth/login");
      } else if (res?.error) {
        const errorData = res.error as any;
        toast.error(
          errorData?.data?.message ||
          errorData?.data?.details ||
          errorData?.data?.error ||
          "Invalid OTP or failed to reset password. Please try again."
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <AuthLayout
      isCentered={true}
      title="Reset Your Password"
      subtitle={
        email
          ? `Enter the 6-digit OTP code sent to ${email} and your new password.`
          : "Enter the 6-digit OTP code and your new password."
      }
    >
      <FormCard className="max-w-[480px]">
        <VerificationForm onVerify={handleVerify} isVerifying={isVerifying} />
      </FormCard>
    </AuthLayout>
  );
};
