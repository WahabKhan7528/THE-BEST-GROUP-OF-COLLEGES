import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  portalId: z.string().optional(),
  role: z.enum(["super_admin", "admin", "faculty", "student"]).optional(),
  campus: z.string().optional(),
  currentCourse: z.string().optional(),
  currentClassRoom: z.string().optional(),
  classSection: z.string().optional(),
  department: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  contact: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  course: z.string().optional(),
  semester: z.string().optional(),
  currentSemester: z.string().optional(),
  currentAnnualYear: z.string().optional(),
  designation: z.string().optional(),
  enrollmentYear: z.string().optional(),
}).refine(
  (data) => !data.password || data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);
