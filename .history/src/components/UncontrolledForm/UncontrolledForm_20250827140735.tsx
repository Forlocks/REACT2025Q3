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
        <label htmlFor="mail">Password</label>
        <input id="mail" name="mail" type="password" />
      </div>
      <div className="form__field">
        <label htmlFor="mail">Confirm Password</label>
        <input id="mail" name="mail" type="password" />
      </div>
      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
