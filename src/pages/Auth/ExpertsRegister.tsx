import { ExpartFormCard } from "@/pages/Auth/components/ExpartFormCard";
import { ExpertsAuthLayout } from "@/pages/Auth/components/ExpertsAuthLayout";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterExpertMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const expertSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    specialty: z.string().min(1, "Please select a specialty"),
    experience: z.string().min(1, "Required"),
    hourlyRate: z.string().min(1, "Required"),
    password: z.string().min(2, "Min 2 characters"),
    confirmPassword: z.string().min(2, "Required"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ExpertForm = z.infer<typeof expertSchema>;

const specialties = [
  "Fitness & Personal Training",
  "Nutrition & Dietetics",
  "Mental Health & Therapy",
  "Physical Therapy",
  "Life Coaching",
  "Yoga & Meditation",
  "Sports Performance",
  "Weight Management",
];

export default function ExpertsRegister() {
  const navigate = useNavigate();

  const form = useForm<ExpertForm>({
    resolver: zodResolver(expertSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      specialty: "",
      experience: "",
      hourlyRate: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [registerExpert, { isLoading }] = useRegisterExpertMutation();
  const { setError } = form;
  const onSubmit = async (values: ExpertForm) => {
    try {
      const res = await registerExpert({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
        role: "EXPERT",
        specialty: values.specialty,
        years_of_experience: Number(values.experience),
        hourly_rate: Number(values.hourlyRate),
        all_agreements_accepted: true,
      }).unwrap();

      toast.success(res.details || "Expert registered successfully");
      navigate("/auth/login");
    } catch (error) {
      const apiError = error as {
        data?: { details?: Record<string, string | string[]> | string };
      };
      const details = apiError.data?.details;

      const fieldMap: Record<string, keyof ExpertForm> = {
        email: "email",
        password: "password",
        confirm_password: "confirmPassword",
        first_name: "firstName",
        last_name: "lastName",
        specialty: "specialty",
        years_of_experience: "experience",
        hourly_rate: "hourlyRate",
      };

      if (details && typeof details === "object" && !Array.isArray(details)) {
        Object.entries(details).forEach(([field, message]) => {
          const text = Array.isArray(message)
            ? message.join(" ")
            : String(message);

          const targetField = fieldMap[field];

          if (targetField) {
            setError(targetField, { type: "server", message: text });
          }

          toast.error(text);
        });
      } else if (typeof details === "string") {
        toast.error(details);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <ExpertsAuthLayout
      title="Create Expert Profile"
      subtitle="Join our network of certified experts"
      bgImage="/expertBG.png"
    >
      {/* FormCard with bg image clipped inside it */}
      <ExpartFormCard className="relative overflow-hidden">
        {/* ── Background image — clipped to FormCard ── */}

        {/* ── All form content above image layers ── */}
        <div className="relative z-10">
          {/* Back button */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3.5"
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="First Name"
                  name="firstName"
                  placeholder="Jubayer"
                  type="text"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Ahmend"
                  type="text"
                />
              </div>

              {/* Email */}
              <div className="flex md:block">
                <FormInput
                  label="Email Address"
                  name="email"
                  placeholder="Email"
                  type="email"
                />

                {/* Specialty */}
                <FormSelect
                  label="Specialty"
                  name="specialty"
                  placeholder="Select specialty..."
                  options={specialties}
                />
              </div>

              {/* Experience + Rate */}
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Years of Experience"
                  name="experience"
                  placeholder="e.g., 10+"
                  type="number"
                />
                <FormInput
                  label="Hourly Rate ($)"
                  name="hourlyRate"
                  placeholder="100"
                  type="number"
                />
              </div>

              {/* Password row */}
              <div className="grid grid-cols-2 gap-3">
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 mt-1 rounded-[82px] bg-[#0A66C2] hover:bg-blue-700 text-white text-md font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-transparent animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Footer */}
              <p className="text-center text-sm text-white/40">
                Already have an account?{" "}
                <a
                  href="/auth/experts-login"
                  className="text-blue-400 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </form>
          </Form>
        </div>
      </ExpartFormCard>
    </ExpertsAuthLayout>
  );
}
