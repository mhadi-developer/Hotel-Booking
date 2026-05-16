import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  lastName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),

  email: z
    .string()
    .email("Enter a valid email"),

  
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  avatar: z
    .string()
    .url("Enter valid image URL")
    .optional()
    .or(z.literal("")), // allow empty input
});

export type RegisterFormData = z.infer<typeof registerSchema>;