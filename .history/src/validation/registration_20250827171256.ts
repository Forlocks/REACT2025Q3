import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
const nameRegex = /^[A-Z][a-zA-Z]*$/;

export const registrationSchema = z.object({
  photo: z
    .array(z.instanceof(File))
    .refine((file) => file?.length === 1, "Photo is required")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file[0]?.type),
      "Only PNG or JPEG files are allowed"
    ),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(nameRegex, "Name must start with a capital letter"),
    country: z.string().min(1, "Country is required"),
  age: z
    .string()
    .min(1, { error: 'Email cannot be empty' })
    .refine(data => Number(data) > 0, { message: 'Age must be integer and greater than 0' }),
  email: z
    .string()
    .min(1, { error: 'Email cannot be empty' })
    .regex(/^\S+$/, { error: 'Email must not contain spaces' })
    .regex(/(?=.*@)/, { error: "Missing or incorrect use of the @ symbol" })
    .regex(/^[^@]+@[^@]+\.[^@]+$/, { error: 'Domain name missing' }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, "Password is too weak"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((v) => v === true, "You must accept terms"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});
