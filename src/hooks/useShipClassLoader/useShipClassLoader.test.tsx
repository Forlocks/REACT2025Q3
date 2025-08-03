import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useShipClassLoader } from './useShipClassLoader';
import { getShipClass } from '../../controllers/getShipClass/getShipClass';
import { deleteTags } from '../../controllers/deleteTags/deleteTags';
import { 
  mockShipClass, 
  mockSearchParams, 
  setSearchParamsMock,
  unknownShipClassResponse
} from '../../test-utils/fetch-mocks';

vi.mock('../../controllers/getShipClass/getShipClass', () => ({
  getShipClass: vi.fn(),
}));

vi.mock('../../controllers/deleteTags/deleteTags', () => ({
  deleteTags: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  return {
    useSearchParams: vi.fn(),
  };
});

describe('useShipClassLoader', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(deleteTags).mockImplementation((str) => str?.replace(/<\/?p>/g, '') || '');
    vi.mocked(getShipClass).mockResolvedValue(mockShipClass);
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, setSearchParamsMock]);
  });

  it('should initialize with default values', () => {
    mockSearchParams.get.mockReturnValue(null);
    
    const { result } = renderHook(() => useShipClassLoader());

    expect(result.current.isDetailsVisible).toBe(false);
    expect(result.current.isEmptyDetails).toBe(true);
    expect(result.current.isLoading).toBe(false);
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

  it('should show empty details when details=empty', async () => {
    mockSearchParams.get.mockReturnValue('empty');
    
    const { result } = renderHook(() => useShipClassLoader());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isDetailsVisible).toBe(true);
    expect(result.current.isEmptyDetails).toBe(true);
  });

  it('should load ship details when details has value', async () => {
    mockSearchParams.get.mockReturnValue('enterprise');
    
    const { result } = renderHook(() => useShipClassLoader());

    await act(async () => {
      await Promise.resolve();
    });

    expect(getShipClass).toHaveBeenCalledWith('enterprise');
    expect(result.current.isDetailsVisible).toBe(true);
    expect(result.current.isEmptyDetails).toBe(false);
    expect(result.current.shipDetails).toEqual({
      numberOfDecks: '15',
      warpCapable: 'Yes',
      alternateReality: 'No',
      activeFrom: '2285',
      activeTo: '2293',
      species: 'Human',
      affiliation: 'Starfleet',
    });
  });

  it('should handle hide details', async () => {
    mockSearchParams.get.mockReturnValue('enterprise');
    
    const { result } = renderHook(() => useShipClassLoader());

    await act(async () => {
      result.current.handleHideDetails();
      await Promise.resolve();
    });

    expect(setSearchParamsMock).toHaveBeenCalled();
    expect(result.current.isDetailsVisible).toBe(false);
  });

  it('should handle loading state', async () => {
    mockSearchParams.get.mockReturnValue('enterprise');
    vi.mocked(getShipClass).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockShipClass), 100))
    );
    
    const { result } = renderHook(() => useShipClassLoader());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle unknown values', async () => {
    mockSearchParams.get.mockReturnValue('unknown');
    vi.mocked(getShipClass).mockResolvedValue(unknownShipClassResponse);
    
    const { result } = renderHook(() => useShipClassLoader());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.shipDetails).toEqual({
      numberOfDecks: 'unknown',
      warpCapable: 'unknown',
      alternateReality: 'unknown',
      activeFrom: 'unknown',
      activeTo: 'unknown',
      species: 'unknown',
      affiliation: 'unknown',
    });
  });
});
