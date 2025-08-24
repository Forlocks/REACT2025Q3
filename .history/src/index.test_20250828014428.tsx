import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainPage } from './pages/MainPage/MainPage';
vi.mock('react-dom/client', async () => {
  const actual = await vi.importActual('react-dom/client');
  return {
    ...actual,
    createRoot: () => ({
      render: (element: React.ReactNode) => element,
    }),
  };
});

describe('MainPage entry point', () => {
  it('renders MainPage inside Redux Provider', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    expect(screen.getByText(/Forms/i)).toBeInTheDocument();
  });
});
