import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  hourlyRate: z.string().min(1, "Hourly rate is required"),
  aboutMe: z
    .string()
    .max(500, "About me must be less than 500 characters")
    .optional(),

  specializations: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .optional()
    .default([]),

  certifications: z
    .array(
      z.object({
        fileName: z.string().optional(),
        file: z.any().optional(),
      }),
    )
    .optional()
    .default([]),

  achievements: z
    .array(
      z.object({
        fileName: z.string().optional(),
        file: z.any().optional(),
      }),
    )
    .optional()
    .default([]),

  educations: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
        fileName: z.string().optional(),
        file: z.any().optional(),
      }),
    )
    .optional()
    .default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
