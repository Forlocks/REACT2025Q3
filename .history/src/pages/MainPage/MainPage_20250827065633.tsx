import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div className="main" onClick={onClose}>
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => setIsOpenForm(true)}>Controlled</Button>
      <Button onButtonClick={() => setIsOpenForm(true)}>Uncontrolled</Button>
      <ModalRegistration isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} onClick={(e: { stopPropagation: () => unknown; }) => e.stopPropagation()}>
        <div></div>
      </ModalRegistration>
    </div>
  );
};
