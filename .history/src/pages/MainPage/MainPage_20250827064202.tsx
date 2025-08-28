import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(false); 

  return (
    <div className="main">
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => setIsOpenForm(true)}>Controlled</Button>
      <Button onButtonClick={() => setIsOpenForm(true)}>Uncontrolled</Button>
    </div>
    <ModalRegistration
  );
};
