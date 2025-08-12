import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ColorThemeContext } from './ColorThemeContext';

describe('ColorThemeContext', () => {
  it('should have default value "dark" and noop setter', () => {
    function TestComponent() {
      const [color, setColor] = useContext(ColorThemeContext);

      React.useEffect(() => {
        setColor('light');
      }, [setColor]);
      return <div>{color}</div>;
    }

    render(<TestComponent />);

    expect(screen.getByText('dark')).toBeDefined();
  });

  it('should allow updating value when provider is used', () => {
    function TestComponent() {
      const [color, setColor] = useContext(ColorThemeContext);
      return (
        <div>
          <span data-testid="color">{color}</span>
          <button onClick={() => setColor('light')}>Set Light</button>
        </div>
      );
    }

    function Wrapper() {
      const [color, setColor] = React.useState('dark');
      return (
        <ColorThemeContext.Provider value={[color, setColor]}>
          <TestComponent />
        </ColorThemeContext.Provider>
      );
    }

    render(<Wrapper />);

    const colorSpan = screen.getByTestId('color');
    const button = screen.getByText('Set Light');

    expect(colorSpan.textContent).toBe('dark');

    fireEvent.click(button);

    expect(colorSpan.textContent).toBe('light');
  });
});
