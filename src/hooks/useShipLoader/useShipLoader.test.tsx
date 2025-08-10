import { renderHook, act } from '@testing-library/react';
import { useShipLoader } from './useShipLoader';
import * as shipsApi from '../../api/shipsApi';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));

const mockUseGetShipsQuery = vi.spyOn(shipsApi, 'useGetShipsQuery');

describe('useShipLoader', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockUseGetShipsQuery.mockClear();
    localStorage.clear();
  });

  it('should initialize inputValue and query from localStorage', () => {
    localStorage.setItem('STS last request', 'test query');

    mockUseGetShipsQuery.mockReturnValue({
      data: { spacecrafts: ['ship1'], totalPages: 2 },
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipLoader(1));

    expect(result.current.inputValue).toBe('test query');
    expect(result.current.ships).toEqual(['ship1']);
    expect(result.current.pageCount).toBe(2);
  });

  it('handleInputChange should update inputValue', () => {
    mockUseGetShipsQuery.mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipLoader(1));

    act(() => {
      result.current.handleInputChange({ target: { value: 'new input' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe('new input');
  });

  it('handleSearch should save value to localStorage, call navigate and update query', () => {
    mockUseGetShipsQuery.mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipLoader(1));

    act(() => {
      result.current.handleSearch('search term');
    });

    expect(localStorage.getItem('STS last request')).toBe('search term');
    expect(mockedNavigate).toHaveBeenCalledWith('/1');
  });

  it('should return correct loading and error states', () => {
    mockUseGetShipsQuery.mockReturnValue({
      data: null,
      error: 'some error',
      isError: true,
      isLoading: true,
      isFetching: false,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useShipLoader(1));

    expect(result.current.error).toBe('some error');
    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(false);
  });
});
