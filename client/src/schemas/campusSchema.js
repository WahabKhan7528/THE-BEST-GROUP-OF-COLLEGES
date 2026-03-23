import { z } from "zod";

export const createCampusSchema = z.object({
  id: z.string().min(2, "Campus ID is required"),
  name: z.string().min(2, "Campus name is required"),
  code: z.string().min(2, "Campus code is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().optional(),
});

export const editCampusSchema = z.object({
  name: z.string().min(2, "Campus name is required"),
  code: z.string().min(2, "Campus code is required"),
  location: z.string().min(2, "Location is required"),
  dean: z.string().optional(),
  established: z.string().optional(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
    website: z.string().optional(),
  }).optional(),
});
