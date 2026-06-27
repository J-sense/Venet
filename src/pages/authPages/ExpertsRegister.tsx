import { ExpartFormCard } from "@/components/auth/ExpartFormCard";
import { ExpertsAuthLayout } from "@/components/auth/ExpertsAuthLayout";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const expertSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    specialty: z.string().min(1, "Please select a specialty"),
    experience: z.string().min(1, "Required"),
    hourlyRate: z.string().min(1, "Required"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(8, "Required"),
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
  //   const navigate = useNavigate();

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

  const onSubmit = (values: ExpertForm) => {
    console.log("Expert Registration:", values);
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
                className="w-full h-14 mt-1 rounded-[82px] bg-[#0A66C2] hover:bg-blue-700 text-white text-md font-medium transition-all duration-200"
              >
                Create Account
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
