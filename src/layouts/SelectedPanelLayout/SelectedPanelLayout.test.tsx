import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedPanelLayout } from './SelectedPanelLayout';
import { clearCards } from '../../slices/selectedCardsSlice';
import { useDispatch, useSelector } from 'react-redux';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Outlet</div>,
  useNavigate: vi.fn(),
}));

// Mock react-redux
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(() => vi.fn()),
}));

const mockCards = [
  {
    uid: '1',
    name: 'Card 1',
    classId: 'class1',
    registry: 'reg1',
    status: 'active',
    dateStatus: '2023-01-01',
    shipClass: 'A',
    owner: 'Owner 1',
    operator: 'Operator 1',
  },
  {
    uid: '2',
    name: 'Card 2',
    classId: 'class2',
    registry: 'reg2',
    status: 'inactive',
    dateStatus: '2023-02-01',
    shipClass: 'B',
    owner: 'Owner 2',
    operator: 'Operator 2',
  },
];

describe('SelectedPanelLayout', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('displays the panel with the number of selected cards', () => {
    vi.mocked(useSelector).mockReturnValue(mockCards);
    render(<SelectedPanelLayout />);
    expect(screen.getByText('Cards selected: 2')).toBeInTheDocument();
  });

  it('renders "Reset selection" and "Download" buttons', () => {
    vi.mocked(useSelector).mockReturnValue(mockCards);
    render(<SelectedPanelLayout />);
    expect(screen.getByText('Reset selection')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('dispatches clearCards when clicking "Reset selection"', () => {
    vi.mocked(useSelector).mockReturnValue(mockCards);
    render(<SelectedPanelLayout />);
    fireEvent.click(screen.getByText('Reset selection'));
    expect(mockDispatch).toHaveBeenCalledWith(clearCards());
  });

  it('generates a CSV file when clicking "Download"', () => {
    vi.mocked(useSelector).mockReturnValue(mockCards);

    // Mock URL.createObjectURL
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
    });

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    render(<SelectedPanelLayout />);
    fireEvent.click(screen.getByRole('button', { name: /download/i }));

    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
