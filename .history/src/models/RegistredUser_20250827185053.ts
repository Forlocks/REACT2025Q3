export interface RegistrationFormValues {
  photo: File[];
  name: string;
  country: string;
  age: number;
  email: string;
  password: string;
  gender: "male" | "female";
}