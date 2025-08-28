import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
const nameRegex = /^[A-Z][a-zA-Z]*$/;

export const registrationSchema = z.object({
  photo: z
    .array(z.instanceof(File))
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file[0]?.type),
      "Select a JPEG or PNG image"
    ),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(nameRegex, "Name must start with a capital letter. The name must contain only Latin letters without spaces."),
  country: z.string().min(1, "Country is required"),
  age: z
    .string()
    .min(1, { error: 'Email cannot be empty' })
    .refine(data => Number(data) > 0, { message: 'Age must be integer and greater than 0' }),
  gender: z
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
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((v) => v === true, "You must accept terms"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});
