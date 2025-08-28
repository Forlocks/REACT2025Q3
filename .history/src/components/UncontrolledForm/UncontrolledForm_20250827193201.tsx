import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addUser } from '../../slices/registeredUsersSlice';
import { Button } from '../../components/Button/Button';
import { registrationSchema } from '../../validation/registration';
import './UncontrolledForm.scss';
import { RegisteredUser } from '../../models/RegisteredUser';

export const UncontrolledForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      photo: formData.getAll('photo'),
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      country: formData.get('country') as string,
      email: formData.get('mail') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
    };

    const result = registrationSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const errorsObj = result.error.flatten().fieldErrors;

      (Object.keys(errorsObj) as Array<keyof typeof errorsObj>).forEach((key) => {
        const message = errorsObj[key];

        if (message && message.length > 0) {
          fieldErrors[key] = message[0];
        }
      });

      setErrors(fieldErrors);

      return;
    }

    dispatch(addUser(result.data as RegisteredUser));
    setErrors({});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="photo">Photo</label>
        <input id="photo" name="photo" type="file" />
        {errors.photo && <div className="form__error">{errors.photo}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        {errors.name && <div className="form__error">{errors.name}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" list="country-options" />
        <datalist id="country-options">
          <option>USA</option>
          <option>Russia</option>
          <option>Canada</option>
          <option>Belarus</option>
        </datalist>
        {errors.country && <div className="form__error">{errors.country}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" style={{ width: "70px" }} />
        {errors.age && <div className="form__error">{errors.age}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="gender">Male</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />
        <label htmlFor="gender">Female</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />Military helicopter
        <label htmlFor="gender">Female</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />Military helicopter
      </div>

      <div className="form__field">
        <label htmlFor="mail">Email</label>
        <input id="mail" name="mail" type="email" />
        {errors.email && <div className="form__error">{errors.email}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {errors.password && <div className="form__error">{errors.password}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input id="confirm-password" name="confirm-password" type="password" />
        {errors.confirmPassword && <div className="form__error">{errors.confirmPassword}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="terms">I agree to the terms</label>
        <input id="terms" name="terms" type="checkbox" style={{ width: "20px" }} />
        {errors.terms && <div className="form__error">{errors.terms}</div>}
      </div>

      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
