import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColorTheme } from './ColorTheme';
import { ColorThemeContext } from '../context/colorThemeContext/ColorThemeContext';
import * as setRootColorsModule from '../controllers/setRootColors/setRootColors';

describe('ColorTheme component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('uses color theme from localStorage if present', () => {
    localStorage.setItem('STS color theme', 'light');
    const setRootColorsMock = vi.spyOn(setRootColorsModule, 'setRootColors');

    render(
      <ColorTheme>
        <ColorThemeContext.Consumer>
          {([color]) => <div>{color}</div>}
        </ColorThemeContext.Consumer>
      </ColorTheme>
    );

    expect(screen.getByText('light')).toBeDefined();
    expect(setRootColorsMock).toHaveBeenCalledWith('light');
  });

  it('falls back to default "dark" if localStorage is empty', () => {
    const setRootColorsMock = vi.spyOn(setRootColorsModule, 'setRootColors');

    render(
      <ColorTheme>
        <ColorThemeContext.Consumer>
          {([color]) => <div>{color}</div>}
        </ColorThemeContext.Consumer>
      </ColorTheme>
    );

    expect(screen.getByText('dark')).toBeDefined();
    expect(setRootColorsMock).toHaveBeenCalledWith('dark');
  });

  it('calls setRootColors whenever colorTheme changes', () => {
    const setRootColorsMock = vi.spyOn(setRootColorsModule, 'setRootColors');

    const TestComponent = () => {
      const [color, setColor] = React.useContext(ColorThemeContext);
      React.useEffect(() => {
        setColor('light');
      }, [setColor]);
      return <div>{color}</div>;
    };

    render(
      <ColorTheme>
        <TestComponent />
      </ColorTheme>
    );

    expect(setRootColorsMock).toHaveBeenCalled();

    expect(setRootColorsMock).toHaveBeenLastCalledWith('light');
  });
});
