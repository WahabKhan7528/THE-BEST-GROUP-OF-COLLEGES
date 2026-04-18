import { z } from "zod";

export const materialSchema = z.object({
  classSection: z.string().min(1, "Class & section is required"),
  subject: z.string().min(1, "Subject is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string().min(1, "Material type is required"),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});
