export interface RegistrationFormValues {
  photo: File[];            // <input type="file" multiple={false}>, FormData.getAll вернёт массив
  name: string;
  country: string;
  age: number;              // number, не string
  gender: "male" | "female";
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;           // чекбокс
}