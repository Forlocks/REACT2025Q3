import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { App } from './App';
import { getShips } from '../../controllers/getShips';
import { Ship } from '../../models/Ship';

vi.mock('../../assets/images/spinner.webp', () => ({
  default: {
    src: 'mock-spinner.webp',
    toString: () => 'mock-spinner.webp',
  },
}));

vi.mock('../../controllers/getShips', () => ({
  getShips: vi.fn(),
}));

const mockShips: Ship[] = [
  {
    uid: '1',
    name: 'USS Enterprise',
    registry: 'NCC-1701',
    status: 'active',
    dateStatus: '2265-01-01',
    class: { uid: 'c1', name: 'Constitution' },
    owner: { uid: 'o1', name: 'Starfleet' },
    operator: { uid: 'op1', name: 'Federation' },
  },
];

describe('App Component', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem: vi.fn(() => ''),
      setItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as Storage;

    vi.mocked(getShips).mockResolvedValue(mockShips);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays loading spinner when fetching data', async () => {
    vi.mocked(getShips).mockReturnValue(new Promise(() => {}));

    await act(async () => {
      render(<App />);
    });

    expect(document.querySelector('.app__spinner')).toBeInTheDocument();
  });

  it('renders ships after successful fetch', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText('USS Enterprise')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    vi.mocked(getShips).mockResolvedValue(null);

    await act(async () => {
      render(<App />);
    });

    expect(
      await screen.findByText(/An error has occurred/)
    ).toBeInTheDocument();
  });
});
