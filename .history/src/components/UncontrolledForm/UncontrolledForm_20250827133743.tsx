import React from 'react';
import './UncontrolledForm.scss';
import { Button } from '../../components/Button/Button';

export const UncontrolledForm: React.FC = () => {
  return (
    <form className="form">
      <input label="avatar"></input>
      <Button type="submit">Submit</Button>
    </form>
  );
};
