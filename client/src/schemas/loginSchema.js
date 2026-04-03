import { z } from "zod";

export const loginSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "ID is required"),
  password: z.string().min(1, "Password is required"),
});
