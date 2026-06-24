/* eslint-disable @typescript-eslint/no-explicit-any */
// /home/workdir/artifacts/ResumeBuildForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProfileInput } from "@/components/ui/profileInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const employmentSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().default(false),
  responsibilities: z.string().min(10, "Please add responsibilities"),
});

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  currentOrganization: z.string().min(1, "Current organization is required"),
  nationality: z.string().min(1, "Please select nationality"),
  currentSalary: z.string().min(1, "Current salary is required"),
  expectedSalary: z.string().optional(),
  educationalInstitute: z.string().min(1, "Educational institute is required"),
  programDegree: z.string().min(1, "Program/Degree is required"),
  passingYear: z.string().min(1, "Passing year is required"),
  githubProfile: z.string().optional(),
  employments: z
    .array(employmentSchema)
    .min(1, "At least one employment record is required"),
});

// type ProfileFormData = z.infer<typeof profileSchema>;

export default function ResumeBuildForm() {
  const [hasNoEmployment, setHasNoEmployment] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Samit",
      lastName: "Das",
      email: "srsamitdas@gmail.com",
      phone: "",
      currentOrganization: "",
      nationality: "",
      currentSalary: "",
      expectedSalary: "",
      educationalInstitute: "",
      programDegree: "",
      passingYear: "",
      githubProfile: "",
      employments: [
        {
          companyName: "Brain Station 23",
          designation: "Senior .NET Software Engineer",
          department: "Engineering",
          startDate: "01/01/2026",
          endDate: "",
          currentlyWorking: true,
          responsibilities:
            "- Architected and developed high-performance .NET microservices.\n- Led a team of 5 engineers in modernizing legacy applications.\n- Implemented CI/CD pipelines using GitHub Actions and Azure DevOps.",
        },
      ],
    },
  });

  const { handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "employments",
  });

  const onSubmit = (values: any) => {
    console.log("Submitted Resume Data:", values);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Progress Stepper */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          {/* Step 1 - Personal Information */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <p className="text-blue-400 text-sm font-medium mt-3">
              Personal Information
            </p>
          </div>

          {/* Connector Line */}
          <div className="w-24 h-px bg-zinc-700 mt-5" />

          {/* Step 2 - Resume */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-600 flex items-center justify-center">
              <Check className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-zinc-400 text-sm font-medium mt-3">Resume</p>
          </div>
        </div>

        {/* Info Note */}
        <p className="text-center text-zinc-500 text-xs mt-6 max-w-md italic">
          * This information will be stored for future reference. You do not
          need to provide this information the next time you apply for a job on
          this website.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput
              label="First Name *"
              name="firstName"
              placeholder="Samit Protim"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="Last Name *"
              name="lastName"
              placeholder="Das"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />

            <ProfileInput
              label="Email address *"
              name="email"
              type="email"
              placeholder="srsamitdas@gmail.com"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="Phone number *"
              name="phone"
              placeholder="Phone number"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />

            <ProfileInput
              label="Current Organization *"
              name="currentOrganization"
              placeholder="Current Organization"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="Nationality"
              name="nationality"
              placeholder="Select Nationality"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />

            <ProfileInput
              label="Educational Institute *"
              name="educationalInstitute"
              placeholder="Educational Institute"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="Current Salary *"
              name="currentSalary"
              placeholder="Current Salary"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />

            <ProfileInput
              label="Program/Degree (CSE, EEE, BA, Diploma or Others)"
              name="programDegree"
              placeholder="Program/Degree"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="Expected Salary"
              name="expectedSalary"
              placeholder="Expected Salary"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />

            <ProfileInput
              label="Passing Year (You can also add expected passing year) *"
              name="passingYear"
              placeholder="Passing Year"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
            <ProfileInput
              label="GitHub Profile link"
              name="githubProfile"
              placeholder="GitHub Profile link"
              className="!bg-[#0E1416] border-none border-zinc-700"
            />
          </div>

          {/* Employment History */}
          <div className="rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#0E1416] rounded flex items-center justify-center">
                  💼
                </div>
                <h3 className="text-white font-semibold">Employment History</h3>
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasNoEmployment}
                  onChange={(e) => setHasNoEmployment(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
                I have no employment record
              </label>
            </div>

            {!hasNoEmployment && (
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-[#0E1416] border-none border-white/10 rounded-2xl p-6 relative"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-white font-semibold text-lg">
                        COMPANY {index + 1}
                      </h4>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-zinc-400 hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProfileInput
                        label="Company Name *"
                        name={`employments.${index}.companyName`}
                        placeholder="Brain Station 23"
                        className="!bg-[#111827] border border-zinc-700"
                      />
                      <ProfileInput
                        label="Designation *"
                        name={`employments.${index}.designation`}
                        placeholder="Senior .NET Software Engineer"
                        className="!bg-[#111827] border border-zinc-700"
                      />

                      <ProfileInput
                        label="Department *"
                        name={`employments.${index}.department`}
                        placeholder="Engineering"
                        className="!bg-[#111827] border border-zinc-700"
                      />
                      <div className="space-y-2">
                        <label className="text-sm text-zinc-400">
                          Employment Period *
                        </label>
                        <div className="flex gap-3">
                          <ProfileInput
                            name={`employments.${index}.startDate`}
                            placeholder="01/01/2026"
                            className="!bg-[#111827] border border-zinc-700"
                          />
                          <span className="text-zinc-500 self-center">to</span>
                          <ProfileInput
                            name={`employments.${index}.endDate`}
                            placeholder=""
                            className="!bg-[#111827] border border-zinc-700"
                          />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-zinc-400 mt-2">
                          <input
                            type="checkbox"
                            {...form.register(
                              `employments.${index}.currentlyWorking`,
                            )}
                            className="accent-blue-500"
                          />
                          Currently Working
                        </label>
                      </div>
                    </div>

                    <div className="mt-6">
                      <ProfileInput
                        label="Responsibilities"
                        name={`employments.${index}.responsibilities`}
                        as="textarea"
                        rows={9}
                        placeholder="Write responsibilities..."
                        className="!bg-[#111827] border border-zinc-700"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() =>
                    append({
                      companyName: "",
                      designation: "",
                      department: "",
                      startDate: "",
                      endDate: "",
                      currentlyWorking: false,
                      responsibilities: "",
                    })
                  }
                  className="text-white bg-none rounded-full border border-blue-500 py-6 w-full"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Company
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800 px-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-10 py-6 text-base font-medium rounded-xl"
            >
              Complete Resume
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
