import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ControlledForm } from './ControlledForm';
import countriesReducer from '../../slices/countriesSlice';

// Mock Button component
vi.mock('../../components/Button/Button', () => ({
  Button: ({ children, isDisabled, ...props }: any) => (
    <button disabled={isDisabled} {...props}>
      {children}
    </button>
  ),
}));

// Mock файловой логики
vi.mock('./ControlledForm', async () => {
  const actual = await vi.importActual('./ControlledForm');
  return {
    ...actual,
    // Мокируем логику обработки файла чтобы она сразу возвращала mock
    submit: vi.fn().mockImplementation((data, dispatch, onClose) => {
      const user = {
        photo: 'data:image/jpeg;base64,mock-base64-string',
        name: data.name,
        age: data.age,
        gender: data.gender,
        country: data.country,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        terms: data.terms,
      };
      dispatch({ type: 'registeredUser/addUser', payload: user });
      onClose();
    }),
  };
});

describe('ControlledForm', () => {
  const mockOnClose = vi.fn();
  
  const createStore = () => configureStore({
    reducer: {
      country: countriesReducer,
      registeredUser: () => ({ registeredUsers: [] }), // Mock reducer для пользователей
    },
    preloadedState: {
      country: {
        countries: ['USA', 'Russia', 'Canada'],
      },
    },
  });

  it('renders form fields', () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('enables submit button when form is valid', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    // Заполняем форму валидными данными
    fireEvent.change(screen.getByPlaceholderText('Name'), { 
      target: { value: 'John' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Country'), { 
      target: { value: 'USA' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), { 
      target: { value: '25' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { value: 'john@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { value: 'Password123!' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { 
      target: { value: 'Password123!' } 
    });
    fireEvent.click(screen.getByLabelText(/i agree to the terms/i));
    fireEvent.click(screen.getByLabelText(/male/i));

    await waitFor(() => {
      expect(screen.getByText('Submit')).not.toBeDisabled();
    });
  });

  it('shows email validation error for invalid email', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { value: 'invalid-email' } 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows password mismatch error', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { value: 'Password123!' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { 
      target: { value: 'Different123!' } 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });
});