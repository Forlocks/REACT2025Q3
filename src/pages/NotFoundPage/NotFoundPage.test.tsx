import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByAltText('Broken ship')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /main page/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
