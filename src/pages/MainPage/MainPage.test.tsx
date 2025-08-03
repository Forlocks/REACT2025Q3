import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, } from 'react-router-dom';
import { MainPage } from './MainPage';
import { useShipLoader } from '../../hooks/useShipLoader/useShipLoader';

vi.mock('../../hooks/useShipLoader/useShipLoader');
vi.mock('../../components/Header/Header');
vi.mock('../../components/Form/Form');
vi.mock('../../components/CardsContainer/CardsContainer');
vi.mock('../../components/Pagination/Pagination');
vi.mock('../NotFoundPage/NotFoundPage');
vi.mock('../../layouts/DetailsLayout/DetailsLayout');

const mockUseShipLoader = vi.mocked(useShipLoader);

describe('MainPage', () => {
  const renderMainPage = (route = '/1') => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/:page?" element={<MainPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockUseShipLoader.mockReturnValue({
      inputValue: '',
      isLoading: false,
      ships: [],
      pageCount: 1,
      handleInputChange: vi.fn(),
      handleSearch: vi.fn(),
    });
  });

  it('should redirect to /1 when no page specified', () => {
    renderMainPage('/');
    expect(screen.queryByText('Not Found')).toBeNull();
  });

  it('should show loading spinner when isLoading is true', () => {
    mockUseShipLoader.mockReturnValue({
      ...mockUseShipLoader(1),
      isLoading: true,
    });
    renderMainPage();
    expect(screen.getByAltText('Loading spinner')).toBeInTheDocument();
  });

  it('should show "No results found" when ships array is empty', () => {
    mockUseShipLoader.mockReturnValue({
      ...mockUseShipLoader(1),
      ships: [],
    });
    renderMainPage();
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should show NotFoundPage for invalid path structure', () => {
    renderMainPage('/1/invalid');
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
