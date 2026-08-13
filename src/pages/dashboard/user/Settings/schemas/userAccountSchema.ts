import * as z from "zod";

// Validation Schema matching Postman API profile shape
export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone1: z.string().optional().nullable(),
  address1: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  years_of_experience: z.string().optional().nullable(),
  hourly_rate: z.string().optional().nullable(),
  open_to: z.string().optional().nullable(),
  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
