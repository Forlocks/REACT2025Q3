import { render, screen, waitFor } from '@testing-library/react';
import { ControlledForm } from './ControlledForm';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import * as redux from 'react-redux';
import { <AppDispatch></AppDispatch>

let useDispatchMock: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  // Мокаем useDispatch с правильным типом
  useDispatchMock = vi.spyOn(redux, 'useDispatch').mockReturnValue(vi.fn() as unknown as AppDispatch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ControlledForm (без проверки стран)', () => {
  it('renders all form fields except countries', () => {
    render(<ControlledForm onClose={vi.fn()} />);

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
    render(<ControlledForm onClose={vi.fn()} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('calls dispatch and onClose on valid form submission', async () => {
    const onCloseMock = vi.fn();
    const dispatchMock = vi.fn();
    useDispatchMock.mockReturnValue(dispatchMock as unknown as AppDispatch);

    render(<ControlledForm onClose={onCloseMock} />);

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    nameInput.value = 'John';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));

    const ageInput = screen.getByLabelText(/Age/i) as HTMLInputElement;
    ageInput.value = '25';
    ageInput.dispatchEvent(new Event('input', { bubbles: true }));

    const maleRadio = screen.getByLabelText(/Male/i) as HTMLInputElement;
    maleRadio.checked = true;
    maleRadio.dispatchEvent(new Event('change', { bubbles: true }));

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    emailInput.value = 'john@example.com';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));

    const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    passwordInput.value = 'Password123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

    const confirmInput = screen.getByLabelText(/Confirm Password/i) as HTMLInputElement;
    confirmInput.value = 'Password123';
    confirmInput.dispatchEvent(new Event('input', { bubbles: true }));

    const termsCheckbox = screen.getByLabelText(/I agree to the terms/i) as HTMLInputElement;
    termsCheckbox.checked = true;
    termsCheckbox.dispatchEvent(new Event('change', { bubbles: true }));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    submitButton.click();

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
