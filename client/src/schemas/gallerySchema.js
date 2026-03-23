import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(2, "Title is required"),
  album: z.string().min(1, "Please select an album"),
  tags: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});
