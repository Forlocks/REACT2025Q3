// ControlledForm.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ControlledForm } from './ControlledForm';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';

const dispatchMock = vi.fn();
const onCloseMock = vi.fn();

// Мокаем react-redux модуль
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<any>('react-redux');
  return {
    ...actual,
    useDispatch: () => dispatchMock,
    useSelector: actual.useSelector, // оставляем дефолтно, не трогаем countries
  };
});

describe('ControlledForm (без проверки countries)', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    onCloseMock.mockClear();
  });

  it('renders all form fields except countries', () => {
    render(<ControlledForm onClose={onCloseMock} />);

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
    render(<ControlledForm onClose={onCloseMock} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('calls dispatch and onClose on valid form submission', async () => {
    render(<ControlledForm onClose={onCloseMock} />);
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
