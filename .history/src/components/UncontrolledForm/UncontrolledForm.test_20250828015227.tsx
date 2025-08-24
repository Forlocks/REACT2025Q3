import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UncontrolledForm } from './UncontrolledForm';
import countriesReducer from '../../slices/countriesSlice';
import { addUser } from '../../slices/registeredUsersSlice';
import { vi, describe, it, expect } from 'vitest';

// Мокаем dispatch
vi.mock('../../slices/registeredUsersSlice', () => ({
  addUser: vi.fn(),
}));

// Мокаем FileReader
class MockFileReader {
  onloadend: () => void = () => {};
  result: string = 'mock-base64';
  readAsDataURL() {
    this.onloadend();
  }
}

vi.stubGlobal('FileReader', MockFileReader);

describe('UncontrolledForm - handleSubmit', () => {
  const store = configureStore({
    reducer: {
      country: countriesReducer,
      registeredUser: () => ({ registeredUsers: [] }),
    },
    preloadedState: {
      country: { countries: ['USA', 'Canada'] },
    },
  });

  const mockOnClose = vi.fn();

  const renderForm = () =>
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

  it('shows validation errors for empty required fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('calls dispatch and onClose on valid submission', async () => {
    renderForm();

    // Заполняем валидные поля
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Country'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByPlaceholderText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByLabelText(/i agree to the terms/i));
    fireEvent.click(screen.getByDisplayValue('Male'));

    // Мокаем файл
    const fileInput = screen.getByLabelText('Photo') as HTMLInputElement;
    const file = new File(['photo'], 'photo.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    await waitFor(() => {
      expect(addUser).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
