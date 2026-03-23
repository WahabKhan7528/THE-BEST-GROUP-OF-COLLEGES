import { z } from "zod";

export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  attachment: z.string().optional(),
  classes: z.array(z.string()).min(1, "Please select at least one target class"),
});
