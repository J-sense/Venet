import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const VerificationForm = ({
  onVerify,
  onResend,
}: {
  onVerify: (code: string) => void;
  onResend: () => void;
}) => {
  const [timer, setTimer] = useState(120);
  const form = useForm({ defaultValues: { code: ["", "", "", "", ""] } });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onVerify(data.code.join("")))}
        className="flex flex-col items-center space-y-6"
      >
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((index) => (
            <FormField
              key={index}
              control={form.control}
              name={`code.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={1}
                      className="w-12 h-14 text-center text-xl bg-slate-950 border-slate-700 rounded-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>{formatTime(timer)} Sec</p>
          <p>
            Didn't receive a code?{" "}
            <button
              type="button"
              onClick={onResend}
              className="text-blue-500 underline"
            >
              Resend
            </button>
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-[82px] bg-blue-600 hover:bg-blue-700 text-lg"
        >
          Verify Code
        </Button>
      </form>
    </Form>
  );
};
