"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDown } from "lucide-react"; // Using lucide for consistency

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  options,
}: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-white text-[12px] font-regular mb-1">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative group">
              <select
                {...field}
                className={[
                  "w-full h-11 rounded text-sm text-white bg-transparent",
                  "border border-[#334155] appearance-none cursor-pointer",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "focus-visible:border-blue-500/60 focus-visible:bg-blue-500/[0.05]",
                  "transition-all duration-200 pl-4 pr-10",
                  "[&:focus]:shadow-[0_0_0_3px_rgba(59,130,246,0.13)]",
                ].join(" ")}
              >
                <option value="" disabled className="bg-[#0f1221]">
                  {placeholder}
                </option>
                {options.map((s) => (
                  <option key={s} value={s} className="bg-[#0f1221]">
                    {s}
                  </option>
                ))}
              </select>

              {/* Chevron Icon - Matches your input's icon positioning */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none group-focus-within:text-blue-400 transition-colors">
                <ChevronDown size={16} />
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-[11.5px] text-red-400 font-medium" />
        </FormItem>
      )}
    />
  );
};
