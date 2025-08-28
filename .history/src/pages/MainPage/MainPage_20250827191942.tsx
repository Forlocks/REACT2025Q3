import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllRegisteredUsers } from "../../store/registeredUsersSlice";
import { UserCard } from "../../components/UserCard/UserCard";
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import './MainPage.scss';
import { RegisteredUser } from '../../models/RegisteredUser';

export const MainPage: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const users: RegisteredUser = useSelector(selectAllRegisteredUsers);

  return (
    <div className={isOpenForm ? 'main main--blurred' : 'main'} onClick={() => isOpenForm && setIsOpenForm(false)}>
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => setIsOpenForm(true)}>Controlled</Button>
      <Button onButtonClick={() => setIsOpenForm(true)}>Uncontrolled</Button>
      <div className="main__user-cards">
        {users.map((user) => (
          <UserCard key={user.email} userData={user} />
        ))}
      </div>
      <ModalRegistration isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
        <UncontrolledForm />
      </ModalRegistration>
    </div>
  );
};
