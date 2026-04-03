import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Course title is required"),
  code: z.string().min(2, "Course code is required").optional(),
  duration: z.string().optional(),
  eligibility: z.string().optional(),
  examSystem: z.enum(["semester", "annual", "other"]).optional(),
  campuses: z.array(z.string()).optional(),
  totalSemesters: z.coerce.number().int().positive().optional().or(z.literal("")).optional(),
  totalYears: z.coerce.number().int().positive().optional().or(z.literal("")).optional(),
  totalCreditHours: z.coerce.number().int().positive().optional().or(z.literal("")).optional(),
  description: z.string().optional(),
});
