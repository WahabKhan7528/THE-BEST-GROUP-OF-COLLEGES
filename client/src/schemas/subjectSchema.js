import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name is required"),
  code: z.string().min(2, "Subject code is required"),
  course: z.string().optional(),
  faculty: z.string().optional(),
  description: z.string().optional(),
});
