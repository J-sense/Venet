// components/ui/ProfileInput.tsx
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
import { Textarea } from "@/components/ui/textarea";

// ── Icons ──────────────────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg
    width="16"
    height="16"
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

const EyeOpenIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="16"
    height="16"
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

// ── Props ──────────────────────────────────────────────────────────────────────
interface ProfileInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  as?: "input" | "textarea";
  rows?: number;
  className?: string;
  showLeftIcon?: boolean;
  disabled?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────────
export const ProfileInput = ({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  rows = 5,
  className = "",
  showLeftIcon = false,
  disabled = false,
}: ProfileInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmail = type === "email" || name.toLowerCase().includes("email");
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const LeadIcon = showLeftIcon ? (isEmail ? EmailIcon : null) : null;

  const InputComponent = as === "textarea" ? Textarea : Input;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="!text-[#94A3B8] !text-[16px] font-medium">
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative">
              {/* Left Icon */}
              {LeadIcon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <LeadIcon />
                </span>
              )}

              <InputComponent
                {...field}
                type={resolvedType}
                placeholder={placeholder}
                disabled={disabled}
                rows={as === "textarea" ? rows : undefined}
                className={`
                  !bg-[#334155] border border-zinc-700 
                  text-white text-[14px] placeholder:text-zinc-400
                  focus:border-blue-500 focus:ring-blue-500/30
                  h-12 py-3
                  ${LeadIcon ? "pl-11" : "pl-4"}
                  ${isPassword ? "pr-11" : "pr-4"}
                  ${disabled ? "opacity-60 cursor-not-allowed" : ""}
                  ${className}
                `.trim()}
              />

              {/* Password Toggle */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage className="text-red-400 text-sm" />
        </FormItem>
      )}
    />
  );
};
