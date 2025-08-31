import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllRegisteredUsers } from '../../slices/registeredUsersSlice';
import { UserCard } from '../../components/UserCard/UserCard';
import { Button } from '../../components/Button/Button';
import { ControlledForm } from '../../components/ControlledForm/ControlledForm';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import { RegisteredUser } from '../../models/RegisteredUser';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  const [formType, setFormType] = useState<'controlled' | 'uncontrolled' | null>(null);
  const users: RegisteredUser[] = useSelector(selectAllRegisteredUsers);

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
      <ModalRegistration isOpen={!!formType} onClose={() => setFormType(null)}>
        {formType === 'controlled' && (
          <ControlledForm onClose={() => setFormType(null)} />
        )}
        {formType === 'uncontrolled' && (
          <UncontrolledForm onClose={() => setFormType(null)} />
        )}
      </ModalRegistration>
    </div>
  );
};
