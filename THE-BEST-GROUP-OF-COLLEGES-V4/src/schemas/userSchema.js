import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  id: z.string().optional(),
  department: z.string().optional(),
  subjects: z.string().optional(),
  contact: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  course: z.string().optional(),
  semester: z.string().optional(),
  academicSystem: z.enum(["Semester", "Annual"]).optional(),
  class: z.string().optional(),
  designation: z.string().optional(),
  qualification: z.string().optional(),
  enrollmentYear: z.string().optional(),
}).refine(
  (data) => !data.password || data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);
