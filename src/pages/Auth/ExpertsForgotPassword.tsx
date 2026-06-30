"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExpertsAuthLayout } from "@/pages/Auth/components/ExpertsAuthLayout";
import { ExpartFormCard } from "@/pages/Auth/components/ExpartFormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ExpertsForgotPassword() {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof forgotSchema>) => {
    console.log("Password reset requested for:", values.email);
    // Add your API call to trigger the password reset email here
  };

  return (
    <ExpertsAuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
      bgImage="/expertBG.png"
    >
      <ExpartFormCard>
        <div className="relative z-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="email@example.com"
              />

              <Button
                type="submit"
                className="w-full h-11 mt-2 rounded bg-[#0A66C2] hover:bg-blue-700 text-white font-medium transition-all"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <a
                  href="/auth/experts-login"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Back to Sign In
                </a>
              </div>
            </form>
          </Form>
        </div>
      </ExpartFormCard>
    </ExpertsAuthLayout>
  );
}
