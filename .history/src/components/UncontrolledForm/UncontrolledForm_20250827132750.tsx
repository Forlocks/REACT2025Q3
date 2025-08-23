import React from 'react';
import './UncontrolledForm.scss';
import { Button } from '../../components/Button/Button';

export const UncontrolledForm: React.FC = () => {
  return (
    <div className="modal-registration" onClick={e => e.stopPropagation()}>
      <div className="modal-registration__close">
        <Button onButtonClick={onClose}>✖</Button>
      </div>
      <h2 className="modal-registration__title">Register</h2>
      {children}
    </div>
  );
};
