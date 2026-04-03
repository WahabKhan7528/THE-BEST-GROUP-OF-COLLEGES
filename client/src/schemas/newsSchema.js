import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  status: z.preprocess(
    (value) => (typeof value === "string" ? value.toLowerCase() : value),
    z.string().optional(),
  ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
});
