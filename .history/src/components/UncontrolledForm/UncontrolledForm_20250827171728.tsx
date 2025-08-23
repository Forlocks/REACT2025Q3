import React from 'react';
import { Button } from '../../components/Button/Button';
import { registrationSchema } from '../../validation/registration';
import './UncontrolledForm.scss';

export const UncontrolledForm: React.FC = () => {
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
      console.log('Validation errors:', result.error.format());
      return;
    }

    console.log('Valid data:', result.data);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="photo">Photo</label>
        <input id="photo" name="photo" type="file" />
      </div>
      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
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
      </div>
      <div className="form__field">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" style={{ width: "70px" }} />
      </div>
      <div className="form__field">
        <label htmlFor="gender">Male</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />
        <label htmlFor="gender">Female</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />
      </div>
      <div className="form__field">
        <label htmlFor="mail">Email</label>
        <input id="mail" name="mail" type="email" />
      </div>
      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <div className="form__field">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input id="confirm-password" name="confirm-password" type="password" />
      </div>
      <div className="form__field">
        <label htmlFor="terms">I agree to the terms</label>
        <input id="terms" name="terms" type="checkbox" style={{ width: "20px" }} />
      </div>
      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
