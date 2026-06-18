import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormCard } from "@/components/auth/FormCard";
import { VerificationForm } from "./VerificationForm"; // Adjust path as needed

export const VerifyIdentity = () => {
  const handleVerify = (code: string) => {
    console.log("Verification code submitted:", code);
    // Add your API call to verify the code here
  };

  const handleResend = () => {
    console.log("Resending verification code...");
    // Add your logic to trigger a new code
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="Please enter the 5-digit code sent to your email."
    >
      <FormCard className="max-w-[480px]">
        <VerificationForm onVerify={handleVerify} onResend={handleResend} />
      </FormCard>
    </AuthLayout>
  );
};
