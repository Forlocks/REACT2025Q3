import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

const renderHeader = (children?: React.ReactNode) =>
  render(
    <BrowserRouter>
      <Header>{children}</Header>
    </BrowserRouter>
  );

describe('Header', () => {
  it('renders title and nav', () => {
    renderHeader();
    expect(screen.getByText('Star Trek Ships')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  it('renders children', () => {
    renderHeader(<span>child</span>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders Main nav when location is /about', () => {
    window.history.pushState({}, '', '/about');
    renderHeader();
    expect(screen.getByRole('link', { name: /main/i })).toBeInTheDocument();
  });

  it('renders About us nav when location is not /about', () => {
    window.history.pushState({}, '', '/');
    renderHeader();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });
});
