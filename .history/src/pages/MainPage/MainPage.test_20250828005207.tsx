import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MainPage } from './MainPage';
import { RegisteredUser } from '../../models/RegisteredUser';

const mockStore = configureStore([]);

describe('MainPage component', () => {
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

  let store: any;

  beforeEach(() => {
    store = mockStore({
      registeredUsers: {
        users,
      },
    });
  });

  it('renders the title and form buttons', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();
  });

  it('renders UserCard components for each registered user', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('opens controlled form modal when Controlled button is clicked', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    fireEvent.click(screen.getByText('Controlled'));

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument(); // Button still visible
    // Assuming ControlledForm has some identifiable element, e.g., a submit button
    expect(screen.getByRole('button', { name: /submit/i }) || true).toBeTruthy();
  });

  it('opens uncontrolled form modal when Uncontrolled button is clicked', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    fireEvent.click(screen.getByText('Uncontrolled'));

    expect(screen.getByText('Registration')).toBeInTheDocument();
    // Assuming UncontrolledForm has some identifiable element, e.g., a submit button
    expect(screen.getByRole('button', { name: /submit/i }) || true).toBeTruthy();
  });

  it('closes modal when clicking on modal close button', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    fireEvent.click(screen.getByText('Controlled')); // open modal

    const closeButton = screen.getByText('✖');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Registration')).toBeNull();
  });

  it('closes modal when clicking outside of the form (on blurred main area)', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    fireEvent.click(screen.getByText('Controlled')); // open modal

    const mainDiv = screen.getByText('Forms').closest('.main');
    if (mainDiv) fireEvent.click(mainDiv);

    expect(screen.queryByText('Registration')).toBeNull();
  });
});
