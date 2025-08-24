import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import registeredUsersReducer, { RegisteredUser } from '../../slices/registeredUsersSlice';
import { MainPage } from './MainPage';

const users: RegisteredUser[] = [
  {
    photo: 'photo1.png',
    name: 'Alice',
    country: 'USA',
    age: '25',
    gender: 'Female',
    email: 'alice@example.com',
    password: 'pass1',
  },
  {
    photo: 'photo2.png',
    name: 'Bob',
    country: 'UK',
    age: '30',
    gender: 'Male',
    email: 'bob@example.com',
    password: 'pass2',
  },
];

function renderWithStore() {
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
}

describe('MainPage component', () => {
  it('renders the title and buttons', () => {
    renderWithStore();
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();
  });

  it('renders UserCard components for each user', () => {
    renderWithStore();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('opens controlled form modal when clicking Controlled', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('Controlled'));
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('opens uncontrolled form modal when clicking Uncontrolled', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('Uncontrolled'));
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('closes modal when clicking the close button', () => {
    renderWithStore();
    fireEvent.click(screen.getByText('Controlled'));
    const closeButton = screen.getByText('✖');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Registration')).toBeNull();
  });

  it('applies isNewCard correctly to the last user', () => {
    renderWithStore();
    const lastUserCard = screen.getByText('Bob').closest('.card');
    expect(lastUserCard).toHaveClass('card--new');
  });
});
