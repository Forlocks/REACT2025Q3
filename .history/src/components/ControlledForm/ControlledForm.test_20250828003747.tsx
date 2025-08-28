import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ControlledForm } from './ControlledForm';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { useDispatch } from 'react-redux';
import * as redux from 'react-redux';

let useDispatchMock: any;

beforeEach(() => {
  useDispatchMock = vi.spyOn(redux, 'useDispatch').mockReturnValue(vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ControlledForm', () => {
  it('renders all form fields', () => {
    render(<ControlledForm onClose={vi.fn()} />);

    expect(screen.getByLabelText(/Photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
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
    useDispatchMock.mockReturnValue(dispatchMock);

    render(<ControlledForm onClose={onCloseMock} />);

    // Заполняем форму
    const file = new File(['photo'], 'photo.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Photo/i), { target: { files: [file] } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.click(screen.getByLabelText(/Male/i));
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i));

    // Сабмит
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Ждем, пока dispatch и onClose вызовутся
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
