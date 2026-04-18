import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name is required"),
  code: z.string().optional(),
  course: z.string().optional(),
  campuses: z.array(z.string()).optional(),
  creditHours: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal(""))
    .optional(),
  isElective: z.boolean().optional(),
  description: z.string().optional(),
});
