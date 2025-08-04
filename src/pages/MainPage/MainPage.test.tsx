import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage';

const mockUseShipLoader = vi.fn();

vi.mock('../../hooks/useShipLoader/useShipLoader', () => ({
  useShipLoader: (page: number) => mockUseShipLoader(page),
}));

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

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('ship-card')).not.toBeInTheDocument();
  });

  it('invokes useShipLoader with NaN for invalid page param', () => {
    render(
      <MemoryRouter initialEntries={['/abc']}>
        <Routes>
          <Route path="/:page" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockUseShipLoader).toHaveBeenCalledWith(NaN);
  });

  it('navigates to /1 when no page param is provided', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/1" element={<div>Page 1</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });  
});