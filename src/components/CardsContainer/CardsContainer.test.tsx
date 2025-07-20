import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardsContainer } from './CardsContainer';
import { Ship } from '../../models/Ship';

describe('CardsContainer Component', () => {
  const mockShips: Ship[] = [
    {
      uid: '1',
      name: 'Ship 1',
      registry: 'Registry 1',
      status: 'Active',
      dateStatus: '2023-01-01',
      class: {
        name: 'Class A',
        uid: '',
      },
      owner: {
        name: 'Owner 1',
        uid: '',
      },
      operator: {
        name: 'Operator 1',
        uid: '',
      },
    },
    {
      uid: '2',
      name: 'Ship 2',
      registry: null,
      status: null,
      dateStatus: null,
      class: null,
      owner: null,
      operator: null,
    },
  ];

  it('renders correct number of cards', () => {
    render(<CardsContainer ships={mockShips} />);
    const cardElements = document.querySelectorAll('.card');
    expect(cardElements.length).toBe(mockShips.length);
  });

  it('displays correct card data', () => {
    render(<CardsContainer ships={[mockShips[0]]} />);

    expect(screen.getByText('Ship 1')).toBeInTheDocument();
    expect(screen.getByText('Registry 1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Class A')).toBeInTheDocument();
    expect(screen.getByText('Owner 1')).toBeInTheDocument();
    expect(screen.getByText('Operator 1')).toBeInTheDocument();
  });

  it('replaces missing values with "unknown"', () => {
    render(<CardsContainer ships={[mockShips[1]]} />);

    expect(screen.getByText('Ship 2')).toBeInTheDocument();
    expect(screen.getAllByText('unknown').length).toBe(6);
  });

  it('has correct container class', () => {
    const { container } = render(<CardsContainer ships={mockShips} />);
    expect(container.firstChild).toHaveClass('cards-container');
  });
});
