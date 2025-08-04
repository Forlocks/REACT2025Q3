import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

const defaultProps = {
  uid: '123',
  classId: '123',
  name: 'USS Enterprise',
  registry: 'NCC-1701',
  status: 'Active',
  dateStatus: '2025-07-28',
  shipClass: 'Constitution',
  owner: 'Starfleet',
  operator: 'Federation',
};

describe('Card', () => {
  it('renders all props correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.registry)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.status)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.dateStatus)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.shipClass)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.owner)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.operator)).toBeInTheDocument();
  });

  it('has correct class and structure', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
    const card = screen.getByText(defaultProps.name).closest('.card');
    expect(card).toBeTruthy();
    expect(card?.querySelector('.card__description')).toBeTruthy();
    expect(card?.querySelectorAll('.card__property')).toHaveLength(6);
  });
});
