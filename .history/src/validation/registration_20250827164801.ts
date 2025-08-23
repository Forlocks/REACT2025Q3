import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
const nameRegex = /^[A-Z][a-zA-Z]*$/;

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png"];

export const formSchema = z
  .object({
    photo: z
      .any()
      .refine((file) => file?.length === 1, "Photo is required")
      .refine(
        (file) => ACCEPTED_FORMATS.includes(file[0]?.type),
        "Only PNG or JPEG files are allowed"
      )
      .refine((file) => file[0]?.size <= FILE_SIZE, "Max file size is 2MB"),
    name: z
      .string()
      .min(1, "Name is required")
      .regex(nameRegex, "Name must start with a capital letter"),
    age: z.string().refine(data => Number(data) > 0, { message: 'Age must be greater than 0' }),
    email: z.string().email("Invalid email address"),
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
