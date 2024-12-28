import { z } from "zod";

const signupSchema = z.object({
  name: z.string(),
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  email: z.string(),
  password: z.string(),
});
const loginSchema = z.object({ email: z.string(), password: z.string() });

export { signupSchema, loginSchema };
