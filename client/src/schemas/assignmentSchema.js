import { z } from "zod";

export const assignmentSchema = z.object({
  classSection: z.string().min(1, "Class & section is required"),
  subject: z.string().min(1, "Subject is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dueDate: z.string().min(1, "Due date is required"),
  maxMarks: z.string().min(1, "Max marks is required"),
});
