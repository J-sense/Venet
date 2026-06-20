// components/ui/FormInput.tsx
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ── Icons ──────────────────────────────────────────────────────────────────────

const EmailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

// ── FormInput ──────────────────────────────────────────────────────────────────

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
}: FormInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmail = type === "email" || name === "email";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const LeadIcon = isPassword ? LockIcon : isEmail ? EmailIcon : null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          {/* Label */}
          <FormLabel className="text-white text-[12px] font-regular  mb-1">
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative group">
              {/* Left icon */}
              {LeadIcon && (
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors duration-200 pointer-events-none z-10">
                  <LeadIcon />
                </span>
              )}

              {/* Input */}
              <Input
                {...field}
                type={resolvedType}
                placeholder={placeholder}
                className={[
                  "h-11 rounded text-sm text-white placeholder-gray-600",
                  " border border-[#334155]",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "focus-visible:border-blue-500/60 focus-visible:bg-blue-500/[0.05]",
                  "transition-all duration-200",
                  LeadIcon ? "pl-10" : "pl-4",
                  isPassword ? "pr-10" : "pr-4",
                  // inner shadow on focus via box-shadow (Tailwind override)
                  "[&:focus]:shadow-[0_0_0_3px_rgba(59,130,246,0.13)]",
                ].join(" ")}
              />

              {/* Eye toggle for password */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors duration-150 z-10"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage className="text-[11.5px] text-red-400 font-medium" />
        </FormItem>
      )}
    />
  );
};


