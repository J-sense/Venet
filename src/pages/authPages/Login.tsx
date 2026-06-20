import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormCard } from "@/components/auth/FormCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";

export const Login = () => {
  // 1. Initialize the form hook
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Login Attempt:", data);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-slate-800 border-slate-700"
                />
                Remember me
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-blue-500 font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#0A66C2] hover:bg-blue-700 text-white font-bold py-3.5 rounded-full transition-all"
            >
              Sign In
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
