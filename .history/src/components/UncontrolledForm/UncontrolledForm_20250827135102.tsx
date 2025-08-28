import React from 'react';
import './UncontrolledForm.scss';
import { Button } from '../../components/Button/Button';

export const UncontrolledForm: React.FC = () => {
  return (
    <form className="form">
      <label forHtml="name">Name</label>
      <input id="name" name="name" type="text" />
      <div className="form__footer">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
