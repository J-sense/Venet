import * as z from "zod";

export const employmentSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().default(false),
  responsibilities: z.string().min(10, "Please add responsibilities"),
});

export const resumeSchema = z.object({
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

export type ResumeFormData = z.infer<typeof resumeSchema>;
