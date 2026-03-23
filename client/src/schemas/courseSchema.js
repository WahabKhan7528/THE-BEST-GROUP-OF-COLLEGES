import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Course title is required"),
  duration: z.string().optional(),
  eligibility: z.string().optional(),
  examSystem: z.string().optional(),
  description: z.string().optional(),
});
