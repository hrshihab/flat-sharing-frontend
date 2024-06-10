import { z } from "zod";
export const userValidationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Must be at least 6 characters"),
  username: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
});

export const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
