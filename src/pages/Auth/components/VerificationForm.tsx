import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/ui/FormInput";

const verificationSchema = z
  .object({
    code: z.array(z.string()),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type VerificationFormData = {
  otp: string;
  new_password: string;
  confirm_password: string;
};

export const VerificationForm = ({
  onVerify,
  isVerifying = false,
}: {
  onVerify: (data: VerificationFormData) => void;
  isVerifying?: boolean;
}) => {
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: ["", "", "", "", "", ""],
      new_password: "",
      confirm_password: "",
    },
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    index: number,
    val: string,
    fieldChange: (val: string) => void
  ) => {
    const sanitized = val.replace(/[^0-9]/g, "");
    fieldChange(sanitized ? sanitized.slice(-1) : "");

    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !form.getValues(`code.${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e
      .clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (!pastedData) return;

    const digits = pastedData.split("");
    digits.forEach((digit, i) => {
      form.setValue(`code.${i}`, digit);
    });

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (values: z.infer<typeof verificationSchema>) => {
    const otp = values.code.join("");
    if (otp.length < 6) {
      form.setError("code", { message: "6-digit OTP code is required" });
      return;
    }
    onVerify({
      otp,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4 text-left w-full"
      >
        <div className="flex flex-col items-center space-y-2 mb-2">
          <label className="text-white text-xs font-medium self-start">
            6-Digit OTP Code
          </label>
          <div className="flex gap-2 sm:gap-3 justify-center w-full">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <FormField
                key={index}
                control={form.control}
                name={`code.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        maxLength={1}
                        onPaste={handlePaste}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value, field.onChange)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-slate-950/80 border-slate-700 text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {form.formState.errors.code && (
            <p className="text-[11.5px] text-red-400 font-medium self-start mt-1">
              Please enter the complete 6-digit OTP code.
            </p>
          )}
        </div>

        <FormInput
          name="new_password"
          label="New Password"
          type="password"
          placeholder="••••••••"
        />

        <FormInput
          name="confirm_password"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
        />

        <Button
          type="submit"
          disabled={isVerifying || form.formState.isSubmitting}
          className="w-full h-14 rounded-[82px] bg-[#0A66C2] hover:bg-blue-700 text-lg font-medium transition-all disabled:opacity-50 mt-4 cursor-pointer"
        >
          {isVerifying || form.formState.isSubmitting
            ? "Resetting Password..."
            : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};
