import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthLayout } from "@/pages/Auth/components/AuthLayout";
import { FormCard } from "@/pages/Auth/components/FormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { useForgetPasswordUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const [forget, { isLoading }] = useForgetPasswordUserMutation();
  const navigate = useNavigate();
  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Password reset requested for:", values.email);
    try {
      const res = await forget({ email: values.email });
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.details || "Password reset code sent!");
        navigate("/auth/otp-verification", { state: { email: values.email } });
      } else {
        const errorData = res?.error as any;
        toast.error(
          errorData?.data?.email?.[0] ||
            errorData?.data?.message ||
            errorData?.data?.details ||
            "Failed to send reset email. Please try again."
        );
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link."
    >
      {/* Moved title/subtitle here so FormCard manages the header styling */}
      <FormCard className="max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="email"
              label="Email Address"
              placeholder="name@company.com"
            />

            <Button
              type="submit"
              disabled={isLoading || form.formState.isSubmitting}
              className="w-full bg-[#0A66C2] hover:bg-blue-700 h-14 rounded-[82px] text-md font-medium disabled:opacity-50 transition-all cursor-pointer"
            >
              {isLoading || form.formState.isSubmitting
                ? "Sending Reset Link..."
                : "Send Reset Link"}
            </Button>

            <div className="text-center text-sm">
              <a href="/auth/login" className="text-blue-400 hover:underline">
                Back to Sign In
              </a>
            </div>
          </form>
        </Form>
      </FormCard>
    </AuthLayout>
  );
};
