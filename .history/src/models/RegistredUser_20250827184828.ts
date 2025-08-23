export interface RegistrationFormValues {
  photo: File[];
  name: string;
  country: string;
  age: number;              // number, не string
  gender: "male" | "female";
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;           // чекбокс
}