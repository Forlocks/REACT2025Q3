import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { ColorThemeContext } from '../../context/colorThemeContext/ColorThemeContext';

const emptyReducer = (state = {}) => state;

describe('Header', () => {
  let store: ReturnType<typeof configureStore>;
  let dispatchedActions: PayloadAction[];

  beforeEach(() => {
    dispatchedActions = [];
    store = configureStore({ reducer: emptyReducer });
    store.dispatch = (action) => {
      dispatchedActions.push(action as unknown as PayloadAction);
      return action;
    };
    localStorage.clear();
  });

  function renderWithProviders(
    ui: React.ReactElement,
    {
      theme = 'dark',
      route = '/',
      setColorTheme = () => {},
    }: {
      theme?: string;
      route?: string;
      setColorTheme?: React.Dispatch<React.SetStateAction<string>>;
    } = {}
  ) {
    return render(
      <Provider store={store}>
        <ColorThemeContext.Provider value={[theme, setColorTheme]}>
          <MemoryRouter initialEntries={[route]}>
            {ui}
          </MemoryRouter>
        </ColorThemeContext.Provider>
      </Provider>
    );
  }

  it('renders correctly with initial dark theme', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('☀')).toBeInTheDocument();
  });

  it('toggles theme and sets localStorage', () => {
    let currentTheme = 'dark';

    const setColorTheme: React.Dispatch<React.SetStateAction<string>> = (value) => {
      if (typeof value === 'function') {
        currentTheme = value(currentTheme);
      } else {
        currentTheme = value;
      }
    };

    renderWithProviders(<Header />, { theme: currentTheme, setColorTheme });

    const button = screen.getByText('☀');
    fireEvent.click(button);

    expect(localStorage.getItem('STS color theme')).toBeTruthy();
  });

  it('calls dispatch and rotates reset button on revalidateQueryCache', async () => {
    renderWithProviders(<Header />);

    const resetButton = screen.getByAltText('Reset query cache').parentElement as HTMLElement;
    fireEvent.click(resetButton);

    expect(dispatchedActions.some(action => action.type.includes('invalidateTags'))).toBe(true);
    expect(screen.getByAltText('Reset query cache').classList.contains('rotating')).toBe(true);

    await waitFor(() => {
      expect(screen.getByAltText('Reset query cache').classList.contains('rotating')).toBe(false);
    }, { timeout: 600 });
  });

  it('throws error when "Get error" button clicked', () => {
    renderWithProviders(<Header />);
    const errorButton = screen.getByText('Get error');
    expect(() => fireEvent.click(errorButton)).toThrow('Custom error');
  });

  it('shows "Main" link when on /about path', () => {
    renderWithProviders(<Header />, { route: '/about' });
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('shows "About us" link when not on /about path', () => {
    renderWithProviders(<Header />, { route: '/' });
    expect(screen.getByText('About us')).toBeInTheDocument();
  });
});
