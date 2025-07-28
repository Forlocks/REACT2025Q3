import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination', () => {
  it('renders pagination container', () => {
    render(
      <BrowserRouter>
        <Pagination pageCount={5} />
      </BrowserRouter>
    );
    expect(screen.getByRole('contentinfo')).toHaveClass('pagination');
  });

  it('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <Pagination pageCount={5} />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });
});
