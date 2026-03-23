import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(2, "Class name is required"),
  sections: z.string().optional(),
  subjects: z.string().optional(),
  faculty: z.string().optional(),
  campus: z.string().min(1, "Please select a campus"),
});
