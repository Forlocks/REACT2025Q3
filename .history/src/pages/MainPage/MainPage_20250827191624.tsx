import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div className={isOpenForm ? 'main main--blurred' : 'main'} onClick={() => isOpenForm && setIsOpenForm(false)}>
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => setIsOpenForm(true)}>Controlled</Button>
      <Button onButtonClick={() => setIsOpenForm(true)}>Uncontrolled</Button>
      <div className="main__user-cards">
        <UserCard />
      </div>
      <ModalRegistration isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
        <UncontrolledForm />
      </ModalRegistration>
    </div>
  );
};
