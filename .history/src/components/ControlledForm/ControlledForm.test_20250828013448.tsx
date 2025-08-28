import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ControlledForm } from './ControlledForm';
import countriesReducer from '../../slices/countriesSlice';

// Mock FileReader
const mockFileReader = {
  readAsDataURL: vi.fn(),
  result: 'data:image/jpeg;base64,mock-base64-string',
  onloadend: null,
};

global.FileReader = vi.fn(() => mockFileReader) as any;

// Mock Button component
vi.mock('../../components/Button/Button', () => ({
  Button: ({ children, isDisabled, ...props }: any) => (
    <button disabled={isDisabled} {...props}>
      {children}
    </button>
  ),
}));

describe('ControlledForm', () => {
  const mockOnClose = vi.fn();
  
  const createStore = () => configureStore({
    reducer: {
      country: countriesReducer,
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

  it('shows validation errors', async () => {
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

  it('submits valid form', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

    // Добавляем файл (используем querySelector для file input так как у него нет label)
    const fileInput = screen.getByLabelText('Photo');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Используем корректное имя согласно валидации
    fireEvent.change(screen.getByPlaceholderText('Name'), { 
      target: { value: 'John' } // Имя с заглавной буквы, только латиница
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
      target: { value: 'Password123!' } // Пароль с заглавной буквой, цифрой и спецсимволом
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { 
      target: { value: 'Password123!' } 
    });
    fireEvent.click(screen.getByLabelText(/i agree to the terms/i));

    // Выбираем пол
    fireEvent.click(screen.getByLabelText(/male/i));

    // Ждем пока форма станет валидной
    await waitFor(() => {
      expect(screen.getByText('Submit')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText('Submit'));

    // Симулируем завершение чтения файла
    if (mockFileReader.onloadend) {
      mockFileReader.onloadend();
    }

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});