import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 message and link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
    expect(screen.getByAltText('Broken ship')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /main page/i })).toHaveAttribute('href', '/');
  });
});
