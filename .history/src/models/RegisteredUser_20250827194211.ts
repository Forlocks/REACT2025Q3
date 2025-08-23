export interface RegisteredUser {
  photo: File[];
  name: string;
  country: string;
  age: string;
  gender: "Male" | "female";
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
