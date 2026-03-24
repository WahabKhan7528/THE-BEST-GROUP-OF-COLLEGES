import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().min(1, "Please select a category"),
  tags: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});
