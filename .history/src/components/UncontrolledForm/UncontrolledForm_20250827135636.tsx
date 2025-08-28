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
        <label htmlFor="age">Ager</label>
        <input id="name" name="name" type="number" />
      </div>
      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
