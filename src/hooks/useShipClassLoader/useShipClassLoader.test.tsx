import { renderHook, act, waitFor } from '@testing-library/react';
import { useShipClassLoader } from './useShipClassLoader';
import * as shipClassApi from '../../api/shipClassApi';

const mockedSetSearchParams = vi.fn();
const mockedUseSearchParams = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [mockedUseSearchParams(), mockedSetSearchParams],
}));

const mockUseGetShipClassQuery = vi.spyOn(shipClassApi, 'useGetShipClassQuery');

describe('useShipClassLoader', () => {
  beforeEach(() => {
    mockedSetSearchParams.mockClear();
    mockUseGetShipClassQuery.mockClear();
  });

  it('should initialize details visibility and empty details state based on searchParams', async () => {
    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => (key === 'details' ? 'empty' : null),
    });

    mockUseGetShipClassQuery.mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipClassLoader());

    await waitFor(() => {
      expect(result.current.isDetailsVisible).toBe(true);
      expect(result.current.isEmptyDetails).toBe(true);
    });
  });

  it('should set ship details query if details parameter is set to something else', async () => {
    mockedUseSearchParams.mockReturnValue({
      get: (key: string) => (key === 'details' ? 'some-uid' : null),
    });

    mockUseGetShipClassQuery.mockReturnValue({
      data: { species: 'Human', affiliation: 'Federation' },
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipClassLoader());

    await waitFor(() => {
      expect(result.current.isDetailsVisible).toBe(true);
      expect(result.current.isEmptyDetails).toBe(false);
      expect(result.current.shipDetails.species).toBe('Human');
      expect(result.current.shipDetails.affiliation).toBe('Federation');
    });
  });

  it('should hide details and update searchParams on handleHideDetails', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => 'some-uid',
    });

    mockUseGetShipClassQuery.mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipClassLoader());

    act(() => {
      result.current.handleHideDetails();
    });

    expect(mockedSetSearchParams).toHaveBeenCalled();

    const calledWith = mockedSetSearchParams.mock.calls[0][0];
    expect(calledWith.has('details')).toBe(false);
    expect(result.current.isDetailsVisible).toBe(false);
  });

  it('should return loading and error states correctly', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => 'some-uid',
    });

    mockUseGetShipClassQuery.mockReturnValue({
      data: null,
      error: 'error message',
      isError: true,
      isLoading: true,
      isFetching: true,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipClassLoader());

    expect(result.current.error).toBe('error message');
    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);
  });

  it('should return emptyShipClassData if data is null', () => {
    mockedUseSearchParams.mockReturnValue({
      get: () => null,
    });

    mockUseGetShipClassQuery.mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipClassLoader());

    expect(result.current.shipDetails).toEqual({
      numberOfDecks: '',
      warpCapable: '',
      alternateReality: '',
      activeFrom: '',
      activeTo: '',
      species: '',
      affiliation: '',
    });
  });
});
