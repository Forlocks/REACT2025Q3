import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPage } from './MainPage';
import registeredUsersReducer from '../../slices/registeredUsersSlice';
import countriesReducer from '../../slices/registeredUsersSlice';
import { RegisteredUser } from '../../models/RegisteredUser';

// Мокаем пользователей
const mockUsers: RegisteredUser[] = [
  {
    name: 'Alice', age: '25', country: 'USA', gender: 'Female', email: 'alice@mail.com', password: '123', photo: 'alice.jpg',
    confirmPassword: '',
    terms: false
  },
  { name: 'Bob', age: '30', country: 'UK', gender: 'Male', email: 'bob@mail.com', password: '456', photo: 'bob.jpg' },
];

const renderWithStore = (users: RegisteredUser[] = [], countries: string[] = []) => {
  const store = configureStore({
    reducer: {
      registeredUser: registeredUsersReducer,  // твой slice пользователей
      country: countriesReducer,               // твой slice стран
    },
    preloadedState: {
      registeredUser: { registeredUsers: users },
      country: { countries },                 // <-- сюда добавляем моки стран
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
