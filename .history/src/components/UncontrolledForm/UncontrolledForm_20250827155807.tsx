import React from 'react';
import './UncontrolledForm.scss';
import { Button } from '../../components/Button/Button';

export const UncontrolledForm: React.FC = () => {
  return (
    <form className="form">
      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
      </div>
      <div className="form__field">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" style={{ width: "70px" }} />
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
        <label htmlFor="gender">Male</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />
        <label htmlFor="gender">Female</label>
        <input id="gender" name="gender" type="radio" style={{ width: "15px" }} />
      </div>
      <div className="form__field">
        <label htmlFor="terms">I agree to the terms</label>
        <input id="terms" name="terms" type="checkbox" style={{ width: "20px" }} />
      </div>
      <div className="form__field">
        <label>
          Выберите или введите:
          <input
            list="options"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <datalist id="options">
          <option value="Вариант 1" />
          <option value="Вариант 2" />
          <option value="Вариант 3" />
        </datalist>
      </div>
      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
