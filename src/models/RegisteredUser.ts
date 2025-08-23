export interface RegisteredUser {
  photo: string;
  name: string;
  country: string;
  age: string;
  gender: "Male" | "Female" | "Military helicopter";
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
