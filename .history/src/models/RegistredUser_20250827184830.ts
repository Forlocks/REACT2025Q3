export interface RegistrationFormValues {
  photo: File[];
  name: string;
  country: string;
  age: number;
  gender: "male" | "female";
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;           // чекбокс
}