import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '../../validation/registration';
import { Button } from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { addUser } from '../../slices/registeredUsersSlice';
import { RegisteredUser } from '../../models/RegisteredUser';
import './ControlledForm.scss';

interface ControlledFormProps {
  onClose: () => void;
}

type FormValues = {
  photo: FileList;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Military helicopter';
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export const ControlledForm: React.FC<ControlledFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      gender: 'Male',
      terms: false,
    },
  });

  const submit = (data: FormValues) => {
    const file = data.photo[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      const user: RegisteredUser = {
        photo: base64,
        name: data.name,
        age: data.age,
        gender: data.gender,
        country: data.country,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        terms: data.terms,
      };

      dispatch(addUser(user));
      onClose();
    };

    reader.readAsDataURL(file);
  };

  return (
    <form className="form" onSubmit={handleSubmit(submit)} autoComplete="on">
      <div className="form__field">
        <label htmlFor="photo">Photo</label>
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <input
              id="photo"
              type="file"
              name={field.name}
              ref={field.ref}
              onChange={(e) => field.onChange(e.target.files)}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.photo && <div className="form__error">{errors.photo.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input {...register('name')} id="name" type="text" placeholder="Name" />
        {errors.name && <div className="form__error">{errors.name.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="country">Country</label>
        <input {...register('country')} id="country" list="country-options" placeholder="Country" />
        <datalist id="country-options">
          <option>USA</option>
          <option>Russia</option>
          <option>Canada</option>
          <option>Belarus</option>
        </datalist>
        {errors.country && <div className="form__error">{errors.country.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="age">Age</label>
        <input {...register('age')} id="age" type="number" placeholder="Age" style={{ width: '70px' }} />
        {errors.age && <div className="form__error">{errors.age.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="gender1">Male</label>
        <input
          {...register('gender')}
          id="gender1"
          type="radio"
          value="Male"
          style={{ width: "15px" }}
        />
        <label htmlFor="gender2">Female</label>
        <input
          {...register('gender')}
          id="gender2"
          type="radio"
          value="Female"
          style={{ width: "15px" }}
        />
        <label htmlFor="gender3">Military helicopter</label>
        <input
          {...register('gender')}
          id="gender3"
          type="radio"
          value="Military helicopter"
          
        />
        {errors.gender && <div className="form__error">{errors.gender.message}</div>}
      </div>


      <div className="form__field">
        <label htmlFor="mail">Email</label>
        <input {...register('email')} id="mail" type="email" placeholder="Email" />
        {errors.email && <div className="form__error">{errors.email.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input {...register('password')} id="password" type="password" placeholder="Password" />
        {errors.password && <div className="form__error">{errors.password.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input {...register('confirmPassword')} id="confirm-password" type="password" placeholder="Confirm password" />
        {errors.confirmPassword && <div className="form__error">{errors.confirmPassword.message}</div>}
      </div>

      <div className="form__field">
        <label htmlFor="terms">I agree to the terms</label>
        <input {...register('terms')} id="terms" type="checkbox" style={{ width: '20px' }} />
        {errors.terms && <div className="form__error">{errors.terms.message}</div>}
      </div>


      <div className="form__footer">
        <Button type="submit" isDisabled={!isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};
