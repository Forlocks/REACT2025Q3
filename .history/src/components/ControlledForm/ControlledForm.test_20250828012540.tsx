import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ControlledForm } from './ControlledForm';
import countriesReducer from '../../slices/countriesSlice';
import registeredUsersReducer from '../../slices/registeredUsersSlice';

// Mock the FileReader
class MockFileReader {
  result: string | null = null;
  onloadend: (() => void) | null = null;

  readAsDataURL() {
    this.result = 'data:image/jpeg;base64,mock-base64-string';
    if (this.onloadend) {
      this.onloadend();
    }
  }
}

// Mock global FileReader
global.FileReader = MockFileReader as any;

// Mock the Button component
vi.mock('../../components/Button/Button', () => ({
  Button: ({ children, isDisabled, ...props }: any) => (
    <button disabled={isDisabled} {...props}>
      {children}
    </button>
  ),
}));

describe('ControlledForm', () => {
  const mockOnClose = vi.fn();
  const mockStore = configureStore({
    reducer: {
      country: countriesReducer,
      registeredUser: registeredUsersReducer,
    },
    preloadedState: {
      country: {
        countries: ['USA', 'Russia', 'Canada', 'Belarus'],
      },
      registeredUser: {
        registeredUsers: [],
      },
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithStore = () => {
    return render(
      <Provider store={mockStore}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );
  };

  it('renders all form fields', () => {
    renderWithStore();

    expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/country/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/male/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/military helicopter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to the terms/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    renderWithStore();

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/photo is required/i)).toBeInTheDocument();
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/country is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithStore();

    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('validates password confirmation', async () => {
    renderWithStore();

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    renderWithStore();

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    // Fill the form
    const photoInput = screen.getByLabelText(/photo/i);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const countryInput = screen.getByPlaceholderText(/country/i);
    const ageInput = screen.getByPlaceholderText(/age/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms/i);
    const maleRadio = screen.getByLabelText(/male/i);

    fireEvent.change(photoInput, { target: { files: [file] } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.click(maleRadio);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('disables submit button when form is invalid', () => {
    renderWithStore();

    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    renderWithStore();

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    // Fill the form
    const photoInput = screen.getByLabelText(/photo/i);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const countryInput = screen.getByPlaceholderText(/country/i);
    const ageInput = screen.getByPlaceholderText(/age/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms/i);
    const maleRadio = screen.getByLabelText(/male/i);

    fireEvent.change(photoInput, { target: { files: [file] } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.click(maleRadio);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);

    await waitFor(() => {
      const submitButton = screen.getByText(/submit/i);
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('calls onClose after successful submission', async () => {
    renderWithStore();

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    // Fill the form
    const photoInput = screen.getByLabelText(/photo/i);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const countryInput = screen.getByPlaceholderText(/country/i);
    const ageInput = screen.getByPlaceholderText(/age/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms/i);
    const maleRadio = screen.getByLabelText(/male/i);

    fireEvent.change(photoInput, { target: { files: [file] } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.click(maleRadio);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});