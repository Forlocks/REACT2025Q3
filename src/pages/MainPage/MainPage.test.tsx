import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPage } from './MainPage';
import { selectedCardsSlice } from '../../slices/selectedCardsSlice';
import { baseApi } from '../../api/baseApi';

const mockUseShipLoader = vi.fn();

vi.mock('../../hooks/useShipLoader/useShipLoader', () => ({
  useShipLoader: (page: number) => mockUseShipLoader(page),
}));

function renderWithProviders(ui: React.ReactElement, { route = '/' } = {}) {
  const store = configureStore({
    reducer: {
      selectedCards: selectedCardsSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}

describe('MainPage', () => {
  beforeEach(() => {
    mockUseShipLoader.mockReset();
    mockUseShipLoader.mockImplementation(() => ({
      inputValue: 'test',
      isLoading: false,
      ships: [{ id: '1', name: 'Ship 1' }],
      pageCount: 3,
      handleInputChange: vi.fn(),
      handleSearch: vi.fn(),
    }));
  });

  it('shows empty state when no ships are found', () => {
    mockUseShipLoader.mockImplementation(() => ({
      inputValue: '',
      isLoading: false,
      ships: [],
      pageCount: 0,
      handleInputChange: vi.fn(),
      handleSearch: vi.fn(),
    }));

    renderWithProviders(
      <Routes>
        <Route path="/:page" element={<MainPage />} />
      </Routes>,
      { route: '/1' }
    );

    expect(screen.queryByTestId('ship-card')).not.toBeInTheDocument();
  });

  it('invokes useShipLoader with NaN for invalid page param', () => {
    renderWithProviders(
      <Routes>
        <Route path="/:page" element={<MainPage />} />
      </Routes>,
      { route: '/abc' }
    );

    expect(mockUseShipLoader).toHaveBeenCalledWith(NaN);
  });

  it('navigates to /1 when no page param is provided', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/1" element={<div>Page 1</div>} />
      </Routes>,
      { route: '/' }
    );

    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});
