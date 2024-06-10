import { z } from "zod";
export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters long"),
});
