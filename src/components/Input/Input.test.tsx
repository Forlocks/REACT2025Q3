import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders with value and placeholder', () => {
    render(
      <Input inputValue="test" onInputChange={vi.fn()} onSearch={vi.fn()} />
    );
    const input = screen.getByPlaceholderText('Ship name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('calls onInputChange on change', async () => {
    const onInputChange = vi.fn();
    render(
      <Input inputValue="" onInputChange={onInputChange} onSearch={vi.fn()} />
    );
    await userEvent.type(screen.getByRole('textbox'), 'abc');
    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onSearch on Enter', async () => {
    const onSearch = vi.fn();
    render(
      <Input inputValue="" onInputChange={vi.fn()} onSearch={onSearch} />
    );
    await userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(onSearch).toHaveBeenCalled();
  });
});
