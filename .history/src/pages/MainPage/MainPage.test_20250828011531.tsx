import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPage } from './MainPage';
import registeredUsersReducer from '../../slices/registeredUsersSlice';
import countriesReducer from '../../slices/registeredUsersSlice';
import { RegisteredUser } from '../../models/RegisteredUser';

const mockUsers: RegisteredUser[] = [
  {
    name: 'Alice', age: '25', country: 'USA', gender: 'Female', email: 'alice@mail.com', password: '123', photo: 'alice.jpg',
    confirmPassword: '',
    terms: false
  },
  {
    name: 'Bob', age: '30', country: 'UK', gender: 'Male', email: 'bob@mail.com', password: '456', photo: 'bob.jpg',
    confirmPassword: '',
    terms: false
  },
];

const renderWithStore = (users: RegisteredUser[] = [], countries: string[] = []) => {
  const store = configureStore({
    reducer: {
      registeredUser as RegisteredUserState: registeredUsersReducer,
      country: countriesReducer,
    },
    preloadedState: {
      registeredUser: { registeredUsers: users },
      country: { countries },
    },
  });

  return render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};



describe('MainPage', () => {
  it('рендерит заголовок и кнопки', () => {
    renderWithStore([]);
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();
  });

  it('рендерит карточки пользователей', () => {
    renderWithStore(mockUsers);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('открывает ControlledForm при клике на кнопку Controlled', () => {
    renderWithStore([]);
    fireEvent.click(screen.getByText('Controlled'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('открывает UncontrolledForm при клике на кнопку Uncontrolled', () => {
    renderWithStore([]);
    fireEvent.click(screen.getByText('Uncontrolled'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
