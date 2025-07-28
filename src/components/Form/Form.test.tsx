import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

const setup = () => {
  const onInputChange = vi.fn();
  const onSearch = vi.fn();
  render(
    <Form inputValue="test" onInputChange={onInputChange} onSearch={onSearch} />
  );
  return { onInputChange, onSearch };
};

describe('Form', () => {
  it('renders input and button', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onInputChange when input changes', async () => {
    const { onInputChange } = setup();
    await userEvent.type(screen.getByRole('textbox'), 'abc');
    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onSearch when button clicked', async () => {
    const { onSearch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onSearch when Enter pressed in input', async () => {
    const { onSearch } = setup();
    await userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(onSearch).toHaveBeenCalled();
  });
});
