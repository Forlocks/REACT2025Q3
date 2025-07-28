import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailsLayout } from './DetailsLayout';
import { useShipClassLoader } from '../../hooks/useShipClassLoader';

vi.mock('../../hooks/useShipClassLoader');
vi.mock('react-router', () => ({
  Outlet: () => <div>Main Content</div>
}));

const mockUseShipClassLoader = vi.mocked(useShipClassLoader);

describe('DetailsLayout', () => {
  const defaultShipDetails = {
    numberOfDecks: '15',
    warpCapable: 'Yes',
    alternateReality: 'No',
    activeFrom: '2285',
    activeTo: '2293',
    species: 'Human',
    affiliation: 'Starfleet'
  };

  beforeEach(() => {
    mockUseShipClassLoader.mockReturnValue({
      isDetailsVisible: true,
      isEmptyDetails: false,
      isLoading: false,
      shipDetails: defaultShipDetails,
      handleHideDetails: vi.fn(),
    });
  });

  it('should render main content and details sidebar', () => {
    render(<DetailsLayout />);
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Ship Class')).toBeInTheDocument();
  });

  it('should show loading spinner when loading', () => {
    mockUseShipClassLoader.mockReturnValue({
      ...mockUseShipClassLoader(),
      isLoading: true,
    });
    render(<DetailsLayout />);
    expect(screen.getByAltText('Loading spinner')).toBeInTheDocument();
  });

  it('should show empty state when details are empty', () => {
    mockUseShipClassLoader.mockReturnValue({
      ...mockUseShipClassLoader(),
      isEmptyDetails: true,
    });
    render(<DetailsLayout />);
    expect(screen.getByText('⚠ Unknown')).toBeInTheDocument();
  });

  it('should display all ship details when loaded', () => {
    render(<DetailsLayout />);
    expect(screen.getByText('Number of decks:')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Warp capable:')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Species:')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('should hide details panel when not visible', () => {
    mockUseShipClassLoader.mockReturnValue({
      ...mockUseShipClassLoader(),
      isDetailsVisible: false,
    });
    render(<DetailsLayout />);
    const detailsPanel = screen.getByText('Ship Class').parentElement;
    expect(detailsPanel?.parentElement).not.toHaveClass('details_visible');
  });

  it('should show details panel when visible', () => {
    mockUseShipClassLoader.mockReturnValue({
      ...mockUseShipClassLoader(),
      isDetailsVisible: true,
    });
    render(<DetailsLayout />);
    const detailsPanel = screen.getByText('Ship Class').parentElement;
    expect(detailsPanel?.parentElement).toHaveClass('details_visible');
  });

  it('should render all ship properties', () => {
    render(<DetailsLayout />);
    const properties = [
      'Number of decks',
      'Warp capable',
      'Alternate reality',
      'Active from',
      'Active to',
      'Species',
      'Affiliation'
    ];
    properties.forEach(prop => {
      expect(screen.getByText(`${prop}:`)).toBeInTheDocument();
    });
  });
});
