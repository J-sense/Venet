import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/auth/FormCard";
import { FormInput } from "@/components/ui/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AgreementModal } from "./AgreementModal";
import { useNavigate } from "react-router";

// Schema
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Required"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAcceptRegiste = () => {
    navigate("/auth/experts-register");
  };
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("Registration Data:", values);
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start your wellness journey today"
    >
      <FormCard>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Jubayer"
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Ahmad"
              />
            </div>

            {/* Email Field */}
            <FormInput
              name="email"
              label="Email Address"
              placeholder="name@company.com"
            />

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
              />
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* Terms Checkbox */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-500 leading-tight cursor-pointer"
                  >
                    I agree to the Terms & Conditions, Privacy Policy, and
                    Disclaimer. I understand that this platform does not provide
                    medical diagnosis.
                  </label>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 px-7 py-3 bg-[#0A66C2] hover:bg-blue-700 rounded-[82px] 
                         inline-flex justify-center items-center gap-2.5 text-white text-md 
                         font-medium leading-8 transition-all"
            >
              Create Account
            </Button>

            {/* Footer Links */}
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-400 hover:underline">
                Sign In
              </a>
            </div>
          </form>

          {/* Join as Expert Link */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-blue-500 hover:text-blue-400 underline text-sm w-full text-center"
          >
            Join as an Expert
          </button>

          {/* Centered Modal */}
          <AgreementModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAccept={handleAcceptRegiste}
          />
        </Form>
      </FormCard>
    </AuthLayout>
  );
};
