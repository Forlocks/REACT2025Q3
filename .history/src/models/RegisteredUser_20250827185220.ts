export interface RegisteredUser {
  photo: File[];
  name: string;
  country: string;
  age: number;
  gender: "male" | "female";
  email: string;
  password: string;
}
