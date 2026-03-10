import { z } from "zod";

export const admissionSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  cnic: z.string().optional(),
  program: z.string().min(1, "Please select a program"),
  previous_education: z.string().optional(),
  message: z.string().optional(),
});
