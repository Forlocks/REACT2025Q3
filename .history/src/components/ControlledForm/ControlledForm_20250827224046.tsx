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
        <label>Photo</label>
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
        {errors.photo && <div className="form__error">{errors.photo.message}</div>}
      </div>

      <div className="form__field">
        <label>Name</label>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <div className="form__error">{errors.name.message}</div>}
      </div>

      <div className="form__field">
        <label>Country</label>
        <input {...register('country')} list="country-options" placeholder="Country" />
        <datalist id="country-options">
          <option>USA</option>
          <option>Russia</option>
          <option>Canada</option>
          <option>Belarus</option>
        </datalist>
        {errors.country && <div className="form__error">{errors.country.message}</div>}
      </div>

      <div className="form__field">
        <label>Age</label>
        <input type="number" {...register('age')} placeholder="Age" />
        {errors.age && <div className="form__error">{errors.age.message}</div>}
      </div>

      <div className="form__field">
        <label>Gender</label>
        <label>
          <input type="radio" value="Male" {...register('gender')} /> Male
        </label>
        <label>
          <input type="radio" value="Female" {...register('gender')} /> Female
        </label>
        <label>
          <input type="radio" value="Military helicopter" {...register('gender')} /> Military helicopter
        </label>
        {errors.gender && <div className="form__error">{errors.gender.message}</div>}
      </div>

      <div className="form__field">
        <label>Email</label>
        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <div className="form__error">{errors.email.message}</div>}
      </div>

      <div className="form__field">
        <label>Password</label>
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <div className="form__error">{errors.password.message}</div>}
      </div>

      <div className="form__field">
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} placeholder="Confirm password" />
        {errors.confirmPassword && <div className="form__error">{errors.confirmPassword.message}</div>}
      </div>

      <div className="form__field">
        <label>
          <input type="checkbox" {...register('terms')}  style={{ width: "20px" }/> I agree to the terms
        </label>
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
