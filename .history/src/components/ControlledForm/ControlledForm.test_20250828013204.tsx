import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ControlledForm } from './ControlledForm';
import countriesReducer from '../../slices/countriesSlice';

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

  it('submits valid form', async () => {
    render(
      <Provider store={createStore()}>
        <ControlledForm onClose={mockOnClose} />
      </Provider>
    );

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
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});