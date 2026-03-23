import { z } from "zod";

// Custom validation for ID based on portal type
export const loginSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .refine((val, ctx) => {
      // Try to infer portal type from window.location or context
      if (typeof window !== "undefined") {
        const path = window.location.pathname.toLowerCase();
        if (path.includes("admin") && !/^ADM-\d{4,}$/.test(val)) {
          return false;
        }
        if (path.includes("faculty") && !/^FAC-\d{4,}$/.test(val)) {
          return false;
        }
        if (path.includes("student") && !/^STD-\d{4,}$/.test(val)) {
          return false;
        }
      }
      return true;
    }, {
      message: (() => {
        if (typeof window !== "undefined") {
          const path = window.location.pathname.toLowerCase();
          if (path.includes("admin")) return "ID must start with ADM- and be followed by at least 4 digits (e.g., ADM-1234)";
          if (path.includes("faculty")) return "ID must start with FAC- and be followed by at least 4 digits (e.g., FAC-1234)";
          if (path.includes("student")) return "ID must start with STD- and be followed by at least 4 digits (e.g., STD-1234)";
        }
        return "ID must start with ADM-, FAC-, or STD- and be followed by at least 4 digits (e.g., ADM-1234)";
      })(),
    }),
  password: z.string().min(1, "Password is required"),
});
