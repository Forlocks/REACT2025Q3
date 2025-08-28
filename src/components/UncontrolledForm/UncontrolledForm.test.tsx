import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UncontrolledForm } from './UncontrolledForm';
import countriesReducer from '../../slices/countriesSlice';

describe('UncontrolledForm - individual fields', () => {
  const createStore = () => configureStore({
    reducer: {
      country: countriesReducer,
      registeredUser: () => ({ registeredUsers: [] }),
    },
    preloadedState: {
      country: { countries: ['USA', 'Russia', 'Canada'] },
    },
  });

  const renderForm = () => render(
    <Provider store={createStore()}>
      <UncontrolledForm onClose={vi.fn()} />
    </Provider>
  );

  it('updates Name field', () => {
    renderForm();
    const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
  });

  it('updates Age field', () => {
    renderForm();
    const ageInput = screen.getByPlaceholderText('Age') as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: '30' } });
    expect(ageInput.value).toBe('30');
  });

  it('updates Email field', () => {
    renderForm();
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates Password field', () => {
    renderForm();
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    expect(passwordInput.value).toBe('Password123!');
  });

  it('updates Confirm Password field', () => {
    renderForm();
    const confirmInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement;
    fireEvent.change(confirmInput, { target: { value: 'Password123!' } });
    expect(confirmInput.value).toBe('Password123!');
  });

  it('updates Country field', () => {
    renderForm();
    const countryInput = screen.getByPlaceholderText('Country') as HTMLInputElement;
    fireEvent.change(countryInput, { target: { value: 'Canada' } });
    expect(countryInput.value).toBe('Canada');
  });

  it('toggles Terms checkbox', () => {
    renderForm();
    const termsCheckbox = screen.getByLabelText(/i agree to the terms/i) as HTMLInputElement;
    expect(termsCheckbox.checked).toBe(false);
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox.checked).toBe(true);
  });

  it('selects Gender radio button', () => {
    renderForm();
    const maleRadio = screen.getByDisplayValue('Male') as HTMLInputElement;
    const femaleRadio = screen.getByDisplayValue('Female') as HTMLInputElement;
    const helicopterRadio = screen.getByDisplayValue('Military helicopter') as HTMLInputElement;

    fireEvent.click(maleRadio);
    expect(maleRadio.checked).toBe(true);
    expect(femaleRadio.checked).toBe(false);
    expect(helicopterRadio.checked).toBe(false);

    fireEvent.click(femaleRadio);
    expect(maleRadio.checked).toBe(false);
    expect(femaleRadio.checked).toBe(true);
    expect(helicopterRadio.checked).toBe(false);

    fireEvent.click(helicopterRadio);
    expect(maleRadio.checked).toBe(false);
    expect(femaleRadio.checked).toBe(false);
    expect(helicopterRadio.checked).toBe(true);
  });
});
