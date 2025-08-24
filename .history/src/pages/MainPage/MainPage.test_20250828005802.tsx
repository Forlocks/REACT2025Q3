import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPage } from './MainPage';
import registeredUsersReducer, { RegisteredUser } from '../../slices/registeredUsersSlice';

// Мокаем пользователей
const mockUsers: RegisteredUser[] = [
  { name: 'Alice', age: 25, country: 'USA', gender: 'female', email: 'alice@mail.com', password: '123', photo: 'alice.jpg' },
  { name: 'Bob', age: 30, country: 'UK', gender: 'male', email: 'bob@mail.com', password: '456', photo: 'bob.jpg' },
];

const renderWithStore = (users: RegisteredUser[]) => {
  const store = configureStore({
    reducer: {
      registeredUsers: registeredUsersReducer,
    },
    preloadedState: {
      registeredUsers: { users },
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
    expect(screen.getByRole('dialog')).toBeInTheDocument(); // предполагаем, что ModalRegistration использует role="dialog"
    expect(screen.getByText(/ControlledForm/i)).toBeInTheDocument();
  });

  it('открывает UncontrolledForm при клике на кнопку Uncontrolled', () => {
    renderWithStore([]);
    fireEvent.click(screen.getByText('Uncontrolled'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/UncontrolledForm/i)).toBeInTheDocument();
  });

  it('закрывает модалку при клике на фон', () => {
    renderWithStore([]);
    fireEvent.click(screen.getByText('Controlled'));
    const mainDiv = screen.getByText('Forms').parentElement!;
    fireEvent.click(mainDiv);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
