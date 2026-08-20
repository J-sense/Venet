"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { toast } from "sonner";
import { useUserSecurityPasswordChangeMutation } from "@/redux/features/auth/auth.api";

// 1. Zod Schema
const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(12, "Password must be at least 12 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ExpertsSecurityPage() {
  // 3. Submit Handler
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [userSecurityChanagePassword, { isLoading }] =
    useUserSecurityPasswordChangeMutation();
  // 3. Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Add your API call here
    try {
      const response = await userSecurityChanagePassword({
        password: values.currentPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      });
      console.log(response);
      if (response?.data?.success) {
        toast.success(
          response?.data?.details || "Password changed successfully!",
        );
      } else {
        console.log(response);
        toast.error((response?.error as any)?.data?.details?.password);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="text-white max-w-full space-y-8">
      <div>
        <h1 className="text-[#D4E4FA] text-[32px] font-semibold">
          Security & Access
        </h1>
        <p className="text-[#BDC9C6] text-[18px] font-normal">
          Protect your account with robust password policies and advanced
          multi-factor authentication protocols.
        </p>
      </div>

      {/* Password Change Card */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6 font-semibold">
          <Lock className="w-5 h-5 text-blue-500" />
          <h2>Change Password</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Current Password"
              type="password"
              name="currentPassword"
              placeholder="Current Password"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="New Password"
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>

            <Button type="submit" className="bg-[#0A66C2] text-white">
              Update Password
            </Button>
          </form>
        </Form>
      </div>

      {/* Danger Zone */}
      <div className="border border-[#FFB4AB33] bg-[#010F1F] rounded-2xl p-8 max-w-md">
        <div className="flex items-center gap-2 text-[#FFB4AB] font-semibold mb-4">
          <AlertTriangle className="w-5 h-5" />
          <h2>Danger Zone</h2>
        </div>
        <p className="text-[#BDC9C6] text-sm mb-6">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <Button variant="outline" className="border-red-500 text-red-500">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
