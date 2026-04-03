import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(2, "Class name is required"),
  classCode: z.string().optional(),
  section: z.string().optional(),
  course: z.string().optional(),
  semester: z.string().optional(),
  annualYear: z.string().optional(),
  session: z.string().optional(),
  semesterSubjects: z.array(
    z.object({
      semesterNumber: z.number().int().positive(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      status: z.string().optional(),
      resultPublished: z.boolean().optional(),
      lockedAt: z.string().optional(),
      completedAt: z.string().optional(),
      subjectAssignments: z.array(
        z.object({
          subject: z.string().min(1),
          faculty: z.string().min(1),
        }),
      ).optional(),
    }),
  ).optional(),
  subjects: z.array(z.string()).optional(),
  faculty: z.array(z.string()).optional(),
  campus: z.string().min(1, "Please select a campus"),
});
