import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  const mockProps = {
    name: 'Test Vessel',
    registry: 'PANAMA',
    status: 'Active',
    dateStatus: '2023-10-15',
    class: 'A1',
    owner: 'Marine Inc.',
    operator: 'Ocean Operators LLC',
  };

  it('renders all card properties correctly', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    expect(screen.getByText(/Registry:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.registry)).toBeInTheDocument();

    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.status)).toBeInTheDocument();

    expect(screen.getByText(/Date status:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.dateStatus)).toBeInTheDocument();

    expect(screen.getByText(/Class:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.class)).toBeInTheDocument();

    expect(screen.getByText(/Owner:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.owner)).toBeInTheDocument();

    expect(screen.getByText(/Operator:/)).toBeInTheDocument();
    expect(screen.getByText(mockProps.operator)).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = render(<Card {...mockProps} />);

    expect(container.firstChild).toHaveClass('card');
    expect(screen.getByText(mockProps.name)).toHaveClass('card__name');
  });

  it('renders with empty values', () => {
    const emptyProps = {
      name: '',
      registry: '',
      status: '',
      dateStatus: '',
      class: '',
      owner: '',
      operator: '',
    };

    render(<Card {...emptyProps} />);

    expect(screen.getByText(/Registry:/)).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
  });
});
