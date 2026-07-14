"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExpertsAuthLayout } from "@/pages/Auth/components/ExpertsAuthLayout";
import { ExpartFormCard } from "@/pages/Auth/components/ExpartFormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function ExpertsLogin() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("Login Attempt:", values);
    navigate("/dashboard/experts");
  };

  return (
    <ExpertsAuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage your expert consultations"
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

              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
              <div className="flex justify-end -mt-2 mb-2">
                <a
                  href="/auth/experts-forget"
                  className="text-xs text-white/50 hover:text-blue-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full h-11 mt-2 rounded bg-[#0A66C2] hover:bg-blue-700 text-white font-medium transition-all"
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-white/40 pt-2">
                Don't have an account?{" "}
                <a
                  href="/auth/experts-register"
                  className="text-blue-400 hover:underline"
                >
                  Create Profile
                </a>
              </p>
            </form>
          </Form>
        </div>
      </ExpartFormCard>
    </ExpertsAuthLayout>
  );
}
