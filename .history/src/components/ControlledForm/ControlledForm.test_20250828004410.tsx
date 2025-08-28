import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ControlledForm } from './ControlledForm';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Мокаем редьюсеры
const mockReducer = (state = {}) => state;

const store = configureStore({
  reducer: {
    countries: mockReducer,
    registeredUsers: mockReducer,
  },
});

const dispatchMock = vi.fn();
store.dispatch = dispatchMock;

const onCloseMock = vi.fn();

describe('ControlledForm (без проверки countries)', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    onCloseMock.mockClear();
  });

  const renderForm = () =>
    render(
      <Provider store={store}>
        <ControlledForm onClose={onCloseMock} />
      </Provider>
    );

  it('renders all form fields except countries', () => {
    renderForm();

    expect(screen.getByLabelText(/Photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Male/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Military helicopter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to the terms/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    renderForm();
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('calls dispatch and onClose on valid form submission', async () => {
    renderForm();
    const user = userEvent.setup();

    // Файл
    const file = new File(['photo'], 'photo.png', { type: 'image/png' });
    const photoInput = screen.getByLabelText(/Photo/i) as HTMLInputElement;
    await user.upload(photoInput, file);

    // Остальные поля
    await user.type(screen.getByLabelText(/Name/i), 'John');
    await user.type(screen.getByLabelText(/Age/i), '25');
    await user.click(screen.getByLabelText(/Male/i));
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'Password123');
    await user.type(screen.getByLabelText(/Confirm Password/i), 'Password123');
    await user.click(screen.getByLabelText(/I agree to the terms/i));

    // Сабмит
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
