import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  hourlyRate: z.string().optional().nullable(),
  yearsOfExperience: z.string().optional().nullable(),
  professionalTitle: z.string().optional().nullable(),
  aboutMe: z
    .string()
    .max(500, "About me must be less than 500 characters")
    .optional()
    .nullable(),

  specializations: z
    .array(
      z.object({
        title: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
      }),
    )
    .optional()
    .default([]),

  certifications: z
    .array(
      z.object({
        fileName: z.string().optional(),
        file: z.any().optional(),
        fileUrl: z.string().optional().nullable(),
      }),
    )
    .optional()
    .default([]),

  achievements: z
    .array(
      z.object({
        fileName: z.string().optional(),
        file: z.any().optional(),
        fileUrl: z.string().optional().nullable(),
      }),
    )
    .optional()
    .default([]),

  educations: z
    .array(
      z.object({
        degree: z.string().optional().nullable(),
        institution: z.string().optional().nullable(),
        year: z.string().optional().nullable(),
        certificate: z.any().optional(),
        fileName: z.string().optional(),
        file: z.any().optional(),
        fileUrl: z.string().optional().nullable(),
      }),
    )
    .optional()
    .default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
