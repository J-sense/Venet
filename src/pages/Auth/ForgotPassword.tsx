import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthLayout } from "@/pages/Auth/components/AuthLayout";
import { FormCard } from "@/pages/Auth/components/FormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Password reset requested for:", values.email);
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
              className="w-full bg-[#0A66C2] hover:bg-blue-700 h-14 rounded-[82px] text-md font-medium"
            >
              Send Reset Link
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
