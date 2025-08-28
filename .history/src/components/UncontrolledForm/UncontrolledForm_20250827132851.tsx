import React from 'react';
import './UncontrolledForm.scss';
import { Button } from '../../components/Button/Button';

export const UncontrolledForm: React.FC = () => {
  return (
    <form className="form">
      <label className="form__label">
        Name:
        <input className="form__input" type="text" name="name" />
      </label>
      <label className="form__label">
        Email:
        <input className="form__input" type="email" name="email" />
      </label>
      <Button onButtonClick={() => {}}>Submit</Button>
    </form>
  );
};
