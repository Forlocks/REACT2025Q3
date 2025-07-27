import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies default button class', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).not.toHaveClass('button--current');
  });

  it('applies current button class when isCurrentButton is true', () => {
    render(<Button isCurrentButton={true}>Current</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--current');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled={true}>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(<Button>Not Disabled</Button>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onButtonClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button isDisabled={true} onButtonClick={handleClick}>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
