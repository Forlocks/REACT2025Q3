import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DetailsLayout } from './DetailsLayout';
import * as hookModule from '../../hooks/useShipClassLoader/useShipClassLoader';
import { baseApi } from '../../api/baseApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ShipClass } from '../../models/ShipClass';

const mockShipDetails: ShipClass = {
  numberOfDecks: '5',
  warpCapable: 'Yes',
  alternateReality: 'No',
  activeFrom: '2250',
  activeTo: '2370',
  species: 'Human',
  affiliation: 'Federation',
};

interface UseShipClassLoaderReturn {
  isDetailsVisible: boolean;
  isEmptyDetails: boolean;
  handleHideDetails: () => void;
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  shipDetails: ShipClass;
}

// Дефолтный мок для хука
const defaultMockReturnValue: UseShipClassLoaderReturn = {
  isDetailsVisible: true,
  isEmptyDetails: false,
  handleHideDetails: vi.fn(),
  error: undefined,
  isError: false,
  isLoading: false,
  isFetching: false,
  shipDetails: mockShipDetails,
};

// Создаем минимальный mock store с RTK Query reducer и middleware
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

describe('DetailsLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ship details correctly', () => {
    vi.spyOn(hookModule, 'useShipClassLoader').mockReturnValue(defaultMockReturnValue);

    render(
      <Provider store={store}>
        <DetailsLayout />
      </Provider>
    );

    // Проверяем заголовок
    expect(screen.getByText('Ship Class')).toBeInTheDocument();

    // Проверяем вывод деталей из mockShipDetails
    expect(screen.getByText('Number of decks:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Warp capable:')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();

    expect(screen.getByText('Alternate reality:')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();

    expect(screen.getByText('Active from:')).toBeInTheDocument();
    expect(screen.getByText('2250')).toBeInTheDocument();

    expect(screen.getByText('Active to:')).toBeInTheDocument();
    expect(screen.getByText('2370')).toBeInTheDocument();

    expect(screen.getByText('Species:')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();

    expect(screen.getByText('Affiliation:')).toBeInTheDocument();
    expect(screen.getByText('Federation')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    vi.spyOn(hookModule, 'useShipClassLoader').mockReturnValue({
      ...defaultMockReturnValue,
      isLoading: true,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <DetailsLayout />
      </Provider>
    );

    expect(screen.getByAltText('Loading spinner')).toBeInTheDocument();
  });

  it('shows error message on error', () => {
    const errorMock: FetchBaseQueryError = {
      status: 500,
      data: { message: 'Internal Server Error' },
    };

    vi.spyOn(hookModule, 'useShipClassLoader').mockReturnValue({
      ...defaultMockReturnValue,
      isError: true,
      error: errorMock,
    });

    render(
      <Provider store={store}>
        <DetailsLayout />
      </Provider>
    );

    expect(screen.getByText(/Error: 500/)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/)).toBeInTheDocument();
  });

  it('calls handleHideDetails when hide button clicked', () => {
    const handleHideDetailsMock = vi.fn();

    vi.spyOn(hookModule, 'useShipClassLoader').mockReturnValue({
      ...defaultMockReturnValue,
      handleHideDetails: handleHideDetailsMock,
    });

    render(
      <Provider store={store}>
        <DetailsLayout />
      </Provider>
    );

    const hideButton = screen.getByText('>');
    fireEvent.click(hideButton);

    expect(handleHideDetailsMock).toHaveBeenCalled();
  });
});
