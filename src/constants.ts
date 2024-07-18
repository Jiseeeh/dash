import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(3).max(18),
    email: z.string().email(),
    role: z.enum(["user", "admin"]),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const updateFormSchema = z.object({
  username: z.string().min(3).max(18),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});
