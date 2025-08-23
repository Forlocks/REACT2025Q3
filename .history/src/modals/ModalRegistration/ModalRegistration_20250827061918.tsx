import React from 'react';
import { createPortal } from "react-dom";
import { Button } from '../../components/Button/Button';
import './MainPage.scss';
import { createPortal } from 'react-dom';

export const ModalRegistration: React.FC = () => {
  return createPortal(
    <div className="main">
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => {}}>Controlled</Button>
      <Button onButtonClick={() => {}}>Uncontrolled</Button>
    </div>
  );
};
