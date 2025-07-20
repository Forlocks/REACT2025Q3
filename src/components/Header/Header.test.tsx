import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';

describe('Header Component', () => {
  const mockProps = {
    inputValue: '',
    onInputChange: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders title and form components', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByText('Star Trek Ships')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Get error' })
    ).toBeInTheDocument();
  });

  it('passes props to Form component', () => {
    render(<Header {...mockProps} inputValue="test" />);
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Header {...mockProps} />);
    await user.type(screen.getByRole('textbox'), 'enterprise');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('has correct CSS classes', () => {
    const { container } = render(<Header {...mockProps} />);
    expect(container.firstChild).toHaveClass('header');
    expect(screen.getByText('Star Trek Ships')).toHaveClass('header__title');
  });
});
