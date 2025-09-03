import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className={formType ? 'main main--blurred' : 'main'} onClick={() => formType && setFormType(null)}>
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => setFormType('controlled')}>Controlled</Button>
      <Button onButtonClick={() => setFormType('uncontrolled')}>Uncontrolled</Button>
      <div className="main__user-cards">
        {users.map((user, index, array) => (
          <UserCard
            key={index}
            isNewCard={!array[index + 1]}
            photo={user.photo}
            name={user.name}
            country={user.country}
            age={user.age}
            gender={user.gender}
            email={user.email}
            password={user.password}
          />
        ))}
      </div>
      <ModalRegistration isOpen={true} onClose={() => {alert('aboba')}}>
        <pis
      </ModalRegistration>
    </div>
  );
};
