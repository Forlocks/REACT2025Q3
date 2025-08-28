import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
const nameRegex = /^[A-Z][a-zA-Z]*$/;

export const registrationSchema = z.object({
  photo: z
    .array(z.instanceof(File))
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file[0]?.type),
      "Only PNG or JPEG files are allowed"
    ),
  name: z
    .string()
    .regex(nameRegex, "Name must start with a capital letter"),
  age: z
    .string()
    .refine(data => Number(data) > 0, { message: 'Age must be integer and greater than 0' }),
  email: z
  .string()
  .min(1, { error: 'Email cannot be empty' })
  .regex(/^\S+$/, { error: 'Email must not contain any whitespace' })
  .regex(/(?=.*@)/, { error: "Email must contain an '@' symbol separating local part and domain name" })
  .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: 'Email must contain a domain name (e.g., example.com)' }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, "Password is too weak"),
  confirmPassword: z.string(),
  gender: z.enum(["male", "female"], "Gender is required"),
  terms: z.boolean().refine((v) => v === true, "You must accept terms"),
  country: z.string().min(1, "Country is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});
