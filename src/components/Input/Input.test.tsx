import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  const mockProps = {
    inputValue: '',
    onInputChange: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders input with correct attributes', () => {
    render(<Input {...mockProps} />);

    const input = screen.getByPlaceholderText('Ship name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
    expect(input).toHaveValue('');
  });

  it('displays passed inputValue', () => {
    render(<Input {...mockProps} inputValue="Enterprise" />);
    expect(screen.getByPlaceholderText('Ship name')).toHaveValue('Enterprise');
  });

  it('calls onInputChange when typing', () => {
    render(<Input {...mockProps} />);
    const input = screen.getByPlaceholderText('Ship name');
    fireEvent.change(input, { target: { value: 'Voyager' } });
    expect(mockProps.onInputChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter key is pressed', () => {
    render(<Input {...mockProps} />);
    const input = screen.getByPlaceholderText('Ship name');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockProps.onSearch).toHaveBeenCalledTimes(1);
  });
});
