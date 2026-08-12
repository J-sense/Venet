"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDown } from "lucide-react";

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: (string | FormSelectOption)[];
  className?: string;
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  options,
  className = "",
}: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && (
            <FormLabel className="!text-[#94A3B8] !text-[16px] font-medium">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative group">
              <select
                {...field}
                className={`
                  w-full h-12 rounded-xl text-[14px] text-white !bg-[#101E2D]
                  border border-zinc-700 appearance-none cursor-pointer
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
                  transition-all duration-200 pl-4 pr-10 py-3
                  ${className}
                `.trim()}
              >
                {placeholder && (
                  <option value="" disabled className="bg-[#101E2D] text-zinc-400">
                    {placeholder}
                  </option>
                )}
                {options.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const lbl = typeof opt === "string" ? opt : opt.label;
                  return (
                    <option key={val} value={val} className="bg-[#101E2D] text-white">
                      {lbl}
                    </option>
                  );
                })}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-blue-400 transition-colors">
                <ChevronDown size={18} />
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-red-400 text-sm" />
        </FormItem>
      )}
    />
  );
};

