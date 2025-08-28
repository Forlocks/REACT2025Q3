import z from 'zod';

export const registrationSchema = z.object({
  photo: z
    .any() // для файла
    .refine((file) => file?.length > 0, "Photo is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Country is required"),
  age: z.number().min(1, "Age must be positive"),
  gender: z.enum(["male", "female"], "Gender is required"),
  mail: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((v) => v === true, "You must accept terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
