/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProfileInput } from "@/components/ui/profileInput";
import { useGeneretateResumeByMutation } from "@/redux/features/userDashboard/userProfile.api";
import {
  ArrowRight,
  Award,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  Loader2,
  Plus,
  Sparkles,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ResumePreviewResult } from "./resume/ResumePreviewResult";
import { ResumeStepper } from "./resume/ResumeStepper";

export default function ResumeBuildForm() {
  const [hasNoEmployment, setHasNoEmployment] = useState(false);
  const [resumeResult, setResumeResult] = useState<any>(null);

  const [uploadFormInfo, { isLoading: isUploading }] =
    useGeneretateResumeByMutation();

  const form = useForm<any>({
    defaultValues: {
      firstName: "Samit",
      lastName: "Das",
      email: "srsamitdas@gmail.com",
      phone: "+880 1XXXXXXXXX",
      location: "Dhaka, Bangladesh",
      linkedin: "linkedin.com/in/samitdas",
      githubProfile: "github.com/samitdas",
      portfolio: "",
      nationality: "Bangladeshi",
      currentOrganization: "Brain Station 23",
      currentSalary: "",
      expectedSalary: "",
      summary:
        "Senior .NET Software Engineer with 6+ years of experience architecting scalable microservices and leading engineering teams. Specializes in cloud-native .NET systems, CI/CD automation, and legacy modernization.",
      employments: [
        {
          companyName: "Brain Station 23",
          designation: "Senior .NET Software Engineer",
          department: "Engineering",
          startDate: "2026-01-01",
          endDate: "",
          currentlyWorking: true,
          responsibilities:
            "- Architected and developed high-performance .NET microservices, reducing average API latency by 40%.\n- Led a team of 5 engineers in modernizing legacy applications, cutting technical debt by 30%.\n- Implemented CI/CD pipelines using GitHub Actions and Azure DevOps, reducing deployment time from 2 hours to 15 minutes.",
        },
        {
          companyName: "Previous Company Name",
          designation: "Software Engineer",
          department: "Engineering",
          startDate: "2020-06-01",
          endDate: "2025-12-31",
          currentlyWorking: false,
          responsibilities:
            "- Built and maintained REST APIs using ASP.NET Core.\n- Collaborated with QA to reduce production bugs by 25%.",
        },
      ],
      education: [
        {
          degree: "M.Sc. in Software Engineering",
          institute: "BRAC University",
          passingYear: "2020-06-30",
          cgpa: "3.85/4.00",
        },
        {
          degree: "B.Sc. in Computer Science & Engineering",
          institute: "University of Dhaka",
          passingYear: "2018-05-15",
          cgpa: "3.75/4.00",
        },
        {
          degree: "Higher Secondary Certificate (Science)",
          institute: "Notre Dame College, Dhaka",
          passingYear: "2014-06-10",
          cgpa: "5.00/5.00",
        },
      ],
      skills: {
        languagesFrameworks: "C#, .NET Core, ASP.NET, Entity Framework Core",
        tools: "Docker, Kubernetes, Azure, GitHub Actions, SQL Server",
        practices: "Microservices, CI/CD, Agile/Scrum, System Design",
      },
      projects: [
        {
          name: "Inventory Sync Platform",
          description:
            "Real-time inventory synchronization service across multiple warehouses.",
          techStack: "ASP.NET Core, RabbitMQ, Redis",
          liveLink: "https://inventory-sync.example.com",
        },
        {
          name: "Payment Gateway Integration Service",
          description:
            "Unified payment orchestration layer supporting multiple third-party gateways with automatic failover.",
          techStack: ".NET 8, gRPC, PostgreSQL",
          liveLink: "",
        },
        {
          name: "Internal Developer Portal",
          description:
            "Self-service portal for provisioning cloud resources and tracking deployment pipelines.",
          techStack: "Blazor, Azure DevOps API, SQL Server",
          liveLink: "https://devportal.example.com",
        },
      ],
      certifications: [
        {
          name: "Microsoft Certified: Azure Developer Associate",
          issuer: "Microsoft",
          year: "2024-01-15",
        },
        {
          name: "Microsoft Certified: Azure Solutions Architect Expert",
          issuer: "Microsoft",
          year: "2023-06-20",
        },
        {
          name: "Certified Kubernetes Application Developer (CKAD)",
          issuer: "The Linux Foundation",
          year: "2022-09-10",
        },
      ],
    },
  });

  const { handleSubmit } = form;

  // Field Arrays for Dynamic Lists
  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control: form.control,
    name: "employments",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const isSubmitting = isUploading;

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        content: {
          firstName: values.firstName || "",
          lastName: values.lastName || "",
          email: values.email || "",
          phone: values.phone || "",
          location: values.location || "",
          linkedin: values.linkedin || "",
          githubProfile: values.githubProfile || "",
          portfolio: values.portfolio || "",
          nationality: values.nationality || "",
          currentOrganization: values.currentOrganization || "",
          currentSalary: values.currentSalary || "",
          expectedSalary: values.expectedSalary || "",
          summary: values.summary || "",
          employments: hasNoEmployment
            ? []
            : (values.employments || []).slice(0, 3).map((emp: any) => ({
                companyName: emp.companyName || "",
                designation: emp.designation || "",
                department: emp.department || "",
                startDate: emp.startDate || "",
                endDate: emp.endDate || "",
                currentlyWorking: Boolean(emp.currentlyWorking),
                responsibilities: Array.isArray(emp.responsibilities)
                  ? emp.responsibilities
                  : typeof emp.responsibilities === "string"
                    ? emp.responsibilities
                        .split("\n")
                        .map((line: string) => line.trim())
                        .filter((line: string) => line.length > 0)
                    : [],
              })),
          education: (values.education || []).slice(0, 3).map((edu: any) => ({
            degree: edu.degree || "",
            institute: edu.institute || "",
            passingYear: edu.passingYear || "",
            cgpa: edu.cgpa || "",
          })),
          skills: {
            languagesFrameworks:
              typeof values.skills?.languagesFrameworks === "string"
                ? values.skills.languagesFrameworks
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : values.skills?.languagesFrameworks || [],
            tools:
              typeof values.skills?.tools === "string"
                ? values.skills.tools
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : values.skills?.tools || [],
            practices:
              typeof values.skills?.practices === "string"
                ? values.skills.practices
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : values.skills?.practices || [],
          },
          projects: (values.projects || []).slice(0, 3).map((proj: any) => ({
            name: proj.name || "",
            description: proj.description || "",
            techStack:
              typeof proj.techStack === "string"
                ? proj.techStack
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : proj.techStack || [],
            liveLink: proj.liveLink || "",
          })),
          certifications: (values.certifications || [])
            .slice(0, 3)
            .map((cert: any) => ({
              name: cert.name || "",
              issuer: cert.issuer || "",
              year: cert.year || "",
            })),
        },
      };

      console.log("Submitting Resume Payload:", payload);
      const res = await uploadFormInfo(payload).unwrap();
      console.log("Resume API Response:", res);

      if (res?.data) {
        setResumeResult(res.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success(res?.details || "Resume generated successfully!");
      } else {
        toast.success("Resume submitted successfully!");
      }
    } catch (error: any) {
      console.error("Failed to submit resume:", error);
      toast.error(
        error?.data?.details ||
          error?.data?.message ||
          error?.message ||
          "Failed to submit resume form.",
      );
    }
  };

  if (resumeResult) {
    return <ResumePreviewResult resumeResult={resumeResult} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12 pt-4">
      {/* Stepper Progress Indicator */}
      <ResumeStepper />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Personal & Contact Info
                </h2>
                <p className="text-xs text-zinc-400">
                  Basic details, contact channels & profile links
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput
                label="First Name *"
                name="firstName"
                placeholder="Samit"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="Last Name *"
                name="lastName"
                placeholder="Das"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Email Address *"
                name="email"
                type="email"
                placeholder="srsamitdas@gmail.com"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="Phone Number *"
                name="phone"
                placeholder="+880 1XXXXXXXXX"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Location *"
                name="location"
                placeholder="Dhaka, Bangladesh"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="Nationality"
                name="nationality"
                placeholder="Bangladeshi"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="LinkedIn Profile"
                name="linkedin"
                placeholder="linkedin.com/in/samitdas"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="GitHub Profile Link"
                name="githubProfile"
                placeholder="github.com/samitdas"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Portfolio Link"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="Current Organization"
                name="currentOrganization"
                placeholder="Brain Station 23"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Current Salary"
                name="currentSalary"
                placeholder="e.g. $50,000 / yr"
                className="!bg-[#0E1416] border-zinc-800"
              />
              <ProfileInput
                label="Expected Salary"
                name="expectedSalary"
                placeholder="e.g. $70,000 / yr"
                className="!bg-[#0E1416] border-zinc-800"
              />
            </div>
          </div>

          {/* SECTION 2: PROFESSIONAL SUMMARY */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Professional Summary
                </h2>
                <p className="text-xs text-zinc-400">
                  Brief overview of your experience, key strengths &
                  specialization
                </p>
              </div>
            </div>

            <ProfileInput
              label="Executive Summary"
              name="summary"
              as="textarea"
              rows={10}
              placeholder="Senior .NET Software Engineer with 6+ years of experience architecting scalable microservices..."
              className="!bg-[#0E1416] border-zinc-800 text-sm leading-relaxed min-h-[220px]"
            />
          </div>

          {/* SECTION 3: EMPLOYMENT HISTORY (MAX 3) */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      Employment History
                    </h2>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      Highest {employmentFields.length}/3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Add up to 3 highest employment history company records
                  </p>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasNoEmployment}
                  onChange={(e) => setHasNoEmployment(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
                No employment record
              </label>
            </div>

            {!hasNoEmployment && (
              <div className="space-y-6">
                {employmentFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 relative space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <h4 className="text-white font-semibold text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        Company #{index + 1}
                      </h4>
                      {employmentFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEmployment(index)}
                          className="text-zinc-400 hover:text-red-400 transition-colors p-1"
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
                        className="!bg-[#111827] border-zinc-700"
                      />
                      <ProfileInput
                        label="Designation *"
                        name={`employments.${index}.designation`}
                        placeholder="Senior .NET Software Engineer"
                        className="!bg-[#111827] border-zinc-700"
                      />

                      <ProfileInput
                        label="Department *"
                        name={`employments.${index}.department`}
                        placeholder="Engineering"
                        className="!bg-[#111827] border-zinc-700"
                      />

                      <div className="space-y-2">
                        <label className="text-xs text-zinc-400 font-medium">
                          Employment Period *
                        </label>
                        <div className="grid grid-cols-2 gap-3 items-center">
                          <ProfileInput
                            label="Start Date *"
                            name={`employments.${index}.startDate`}
                            type="date"
                            className="!bg-[#111827] border-zinc-700"
                          />
                          <ProfileInput
                            label="End Date"
                            name={`employments.${index}.endDate`}
                            type="date"
                            disabled={form.watch(
                              `employments.${index}.currentlyWorking`,
                            )}
                            className="!bg-[#111827] border-zinc-700"
                          />
                        </div>
                        <label className="flex items-center gap-2 text-xs text-zinc-400 mt-2">
                          <input
                            type="checkbox"
                            {...form.register(
                              `employments.${index}.currentlyWorking`,
                            )}
                            className="accent-blue-500"
                          />
                          Currently Working Here
                        </label>
                      </div>
                    </div>

                    <div>
                      <ProfileInput
                        label="Key Responsibilities (One per line)"
                        name={`employments.${index}.responsibilities`}
                        as="textarea"
                        rows={4}
                        placeholder="- Architected and developed microservices...&#10;- Led a team of 5 engineers..."
                        className="!bg-[#111827] border-zinc-700"
                      />
                    </div>
                  </div>
                ))}

                {employmentFields.length < 3 && (
                  <Button
                    type="button"
                    onClick={() =>
                      appendEmployment({
                        companyName: "",
                        designation: "",
                        department: "",
                        startDate: "",
                        endDate: "",
                        currentlyWorking: false,
                        responsibilities: "",
                      })
                    }
                    className="w-full py-5 bg-[#0E1416] hover:bg-zinc-800 text-blue-400 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add Company Experience (
                    {employmentFields.length}/3)
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* SECTION 4: EDUCATION HISTORY (MAX 3) */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      Education History
                    </h2>
                    <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      Highest {educationFields.length}/3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Add up to 3 highest education qualification records
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 relative space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      Education #{index + 1}
                    </h4>
                    {educationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <ProfileInput
                        label="Degree / Program *"
                        name={`education.${index}.degree`}
                        placeholder="M.Sc. in Software Engineering"
                        className="!bg-[#111827] border-zinc-700"
                      />
                    </div>
                    <ProfileInput
                      label="CGPA / Grade *"
                      name={`education.${index}.cgpa`}
                      placeholder="e.g. 3.85 / 4.00"
                      className="!bg-[#111827] border-zinc-700"
                    />

                    <div className="md:col-span-2">
                      <ProfileInput
                        label="Educational Institute *"
                        name={`education.${index}.institute`}
                        placeholder="BRAC University"
                        className="!bg-[#111827] border-zinc-700"
                      />
                    </div>
                    <ProfileInput
                      label="Passing Date / Year *"
                      name={`education.${index}.passingYear`}
                      type="date"
                      className="!bg-[#111827] border-zinc-700"
                    />
                  </div>
                </div>
              ))}

              {educationFields.length < 3 && (
                <Button
                  type="button"
                  onClick={() =>
                    appendEducation({
                      degree: "",
                      institute: "",
                      passingYear: "",
                      cgpa: "",
                    })
                  }
                  className="w-full py-5 bg-[#0E1416] hover:bg-zinc-800 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Education (
                  {educationFields.length}/3)
                </Button>
              )}
            </div>
          </div>

          {/* SECTION 5: TECHNICAL SKILLS */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Skills & Expertise
                </h2>
                <p className="text-xs text-zinc-400">
                  Comma-separated list of frameworks, tools & practices
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <ProfileInput
                label="Languages & Frameworks (Comma-separated)"
                name="skills.languagesFrameworks"
                placeholder="C#, .NET Core, ASP.NET, Entity Framework Core"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Tools & Technologies (Comma-separated)"
                name="skills.tools"
                placeholder="Docker, Kubernetes, Azure, GitHub Actions, SQL Server"
                className="!bg-[#0E1416] border-zinc-800"
              />

              <ProfileInput
                label="Practices & Methodologies (Comma-separated)"
                name="skills.practices"
                placeholder="Microservices, CI/CD, Agile/Scrum, System Design"
                className="!bg-[#0E1416] border-zinc-800"
              />
            </div>
          </div>

          {/* SECTION 6: FEATURED PROJECTS (MAX 3) */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      Featured Projects
                    </h2>
                    <span className="text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      Highest {projectFields.length}/3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Add up to 3 highest key projects & architecture
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {projectFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 relative space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      Project #{index + 1}
                    </h4>
                    {projectFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInput
                      label="Project Name *"
                      name={`projects.${index}.name`}
                      placeholder="Inventory Sync Platform"
                      className="!bg-[#111827] border-zinc-700"
                    />
                    <ProfileInput
                      label="Live Link (Optional)"
                      name={`projects.${index}.liveLink`}
                      type="url"
                      placeholder="https://inventory-sync.example.com"
                      className="!bg-[#111827] border-zinc-700"
                    />
                  </div>

                  <ProfileInput
                    label="Description"
                    name={`projects.${index}.description`}
                    as="textarea"
                    rows={2}
                    placeholder="Real-time inventory synchronization service across multiple warehouses."
                    className="!bg-[#111827] border-zinc-700"
                  />

                  <ProfileInput
                    label="Tech Stack (Comma-separated)"
                    name={`projects.${index}.techStack`}
                    placeholder="ASP.NET Core, RabbitMQ, Redis"
                    className="!bg-[#111827] border-zinc-700"
                  />
                </div>
              ))}

              {projectFields.length < 3 && (
                <Button
                  type="button"
                  onClick={() =>
                    appendProject({
                      name: "",
                      description: "",
                      techStack: "",
                      liveLink: "",
                    })
                  }
                  className="w-full py-5 bg-[#0E1416] hover:bg-zinc-800 text-indigo-400 border border-indigo-500/30 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Project (
                  {projectFields.length}/3)
                </Button>
              )}
            </div>
          </div>

          {/* SECTION 7: CERTIFICATIONS (MAX 3) */}
          <div className="bg-[#0A1012] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      Certifications & Achievements
                    </h2>
                    <span className="text-[11px] bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      Highest {certificationFields.length}/3
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Add up to 3 highest official certificates
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {certificationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 relative space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h4 className="text-white font-semibold text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      Certification #{index + 1}
                    </h4>
                    {certificationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <ProfileInput
                        label="Certification Name *"
                        name={`certifications.${index}.name`}
                        placeholder="Microsoft Certified: Azure Developer Associate"
                        className="!bg-[#111827] border-zinc-700"
                      />
                    </div>
                    <ProfileInput
                      label="Issue Date / Year *"
                      name={`certifications.${index}.year`}
                      type="date"
                      className="!bg-[#111827] border-zinc-700"
                    />

                    <div className="md:col-span-3">
                      <ProfileInput
                        label="Issuer / Organization *"
                        name={`certifications.${index}.issuer`}
                        placeholder="Microsoft / The Linux Foundation"
                        className="!bg-[#111827] border-zinc-700"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {certificationFields.length < 3 && (
                <Button
                  type="button"
                  onClick={() =>
                    appendCertification({
                      name: "",
                      issuer: "",
                      year: "",
                    })
                  }
                  className="w-full py-5 bg-[#0E1416] hover:bg-zinc-800 text-pink-400 border border-pink-500/30 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Certification (
                  {certificationFields.length}/3)
                </Button>
              )}
            </div>
          </div>

          {/* ACTION FOOTER */}
          <div className="bg-[#0A1012]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="text-left space-y-0.5">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" /> Ready to Build
                Your Resume?
              </h4>
              <p className="text-xs text-zinc-400">
                Review your details above before generating your resume.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="relative group">
                {/* Ambient Glowing Backdrop */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-40 blur-md group-hover:opacity-90 group-hover:blur-lg transition-all duration-500" />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative bg-[#081512]/90 hover:bg-[#0C201C] text-white px-7 py-7 rounded-2xl border border-emerald-500/40 hover:border-emerald-400/80 shadow-2xl flex items-center gap-3.5 group/btn transition-all duration-300 active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                >
                  {/* Inner Light Reflection Sweep */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent group-hover/btn:left-[100%] transition-all duration-1000 pointer-events-none" />

                  {isSubmitting ? (
                    <>
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <Loader2 className="w-4.5 h-4.5 animate-spin text-emerald-400" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-bold text-white tracking-tight">
                          Building AI Resume...
                        </span>
                        <span className="text-[10px] font-medium text-emerald-400/90 uppercase tracking-widest">
                          Generating PDF
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:bg-emerald-500/30 transition-all duration-300">
                        <Sparkles className="w-4.5 h-4.5 text-emerald-400 group-hover/btn:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-bold text-white tracking-tight">
                          Save & Build Resume
                        </span>
                        <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                          AI Automated • Instant PDF
                        </span>
                      </div>
                      <ArrowRight className="w-4.5 h-4.5 text-emerald-400 group-hover/btn:translate-x-1 transition-transform ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
