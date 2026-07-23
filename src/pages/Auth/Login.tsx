/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { AuthLayout } from "@/pages/Auth/components/AuthLayout";
import { FormCard } from "@/pages/Auth/components/FormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";

import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await loginUser({
        email: values.email,
        password: values.password,
      });
      console.log("Login Attempt Result:", res);

      if (res?.data?.success && res?.data?.data) {
        const { access, refresh, user } = res.data.data;
        dispatch(
          setUser({
            user,
            token: access,
            refresh,
          })
        );
        toast.success(
          res.data?.details || res.data?.message || "Login successful!"
        );
        navigate("/dashboard/user");
      } else if (res?.error) {
        console.log(res?.error);
        const errorData = res.error as any;
        toast.error(
          errorData?.data?.detail ||
            errorData?.data?.message ||
            errorData?.data?.details ||
            "Invalid email or password. Please try again."
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "An error occurred while signing in.");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your wellness journey"
    >
      {/* 2. Pass title/subtitle to FormCard to handle header internally */}
      <FormCard className="max-w-[480px]">
        {/* 3. Wrap everything in the Form provider to fix the Context error */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Form Inputs */}
            <FormInput
              name="email"
              label="Email Address"
              placeholder="name@company.com"
              type="email"
            />

            <FormInput
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            {/* Remember & Forgot */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2 text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-slate-800 border-slate-700 w-4 h-4"
                />
                Remember me
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-blue-500 font-semibold hover:underline w-full sm:w-auto text-left sm:text-right"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A66C2] hover:bg-blue-700 text-white font-bold py-3 lg:py-3.5 rounded-full transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-blue-600/10 border border-blue-600/20 text-white py-3 rounded-full hover:bg-blue-600/20 transition-all"
            >
              <img src="/Google.png" alt="Google" className="w-5 h-5" />
              Google
            </button>

            {/* Register Footer */}
            <p className="text-center text-gray-400 text-sm">
              Don't have an account yet?{" "}
              <Link
                to="/auth/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </Form>
      </FormCard>
    </AuthLayout>
  );
};
