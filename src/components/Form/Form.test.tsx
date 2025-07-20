import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

describe('Form Component', () => {
  const mockProps = {
    inputValue: '',
    onInputChange: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders Input and Button components', () => {
    render(<Form {...mockProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('passes inputValue prop to Input', () => {
    render(<Form {...mockProps} inputValue="test value" />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('calls onInputChange when typing', async () => {
    const user = userEvent.setup();
    render(<Form {...mockProps} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'a');

    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  it('calls onSearch when button clicked', async () => {
    const user = userEvent.setup();
    render(<Form {...mockProps} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockProps.onSearch).toHaveBeenCalledTimes(1);
  });

  it('has correct form class', () => {
    const { container } = render(<Form {...mockProps} />);
    expect(container.firstChild).toHaveClass('form');
  });
});
