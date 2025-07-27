import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardsContainer } from './CardsContainer';
import { BrowserRouter } from 'react-router-dom';

const ships = [
  {
    uid: '1',
    name: 'USS Enterprise',
    registry: 'NCC-1701',
    status: 'Active',
    dateStatus: '2025-07-28',
    spacecraftClass: { uid: 'c1', name: 'Constitution' },
    owner: { uid: 'o1', name: 'Starfleet' },
    operator: { uid: 'op1', name: 'Federation' },
  },
  {
    uid: '2',
    name: '<b>Voyager</b>',
    registry: null,
    status: null,
    dateStatus: null,
    spacecraftClass: null,
    owner: null,
    operator: null,
  },
];

describe('CardsContainer', () => {
  it('renders all ships as Card components', () => {
    render(
      <BrowserRouter>
        <CardsContainer ships={ships} />
      </BrowserRouter>
    );

    expect(screen.getByText('USS Enterprise')).toBeInTheDocument();
    expect(screen.getByText('NCC-1701')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('2025-07-28')).toBeInTheDocument();
    expect(screen.getByText('Constitution')).toBeInTheDocument();
    expect(screen.getByText('Starfleet')).toBeInTheDocument();
    expect(screen.getByText('Federation')).toBeInTheDocument();
    expect(screen.getByText('Voyager')).toBeInTheDocument();
    expect(screen.getAllByText('unknown')).toHaveLength(6);
  });
});
