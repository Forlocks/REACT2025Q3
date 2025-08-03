import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useShipLoader } from './useShipLoader';
import { getShips } from '../../controllers/getShips/getShips';
import React from 'react';
import { mockShips, mockShipResults } from '../../test-utils/fetch-mocks';

vi.mock('../../controllers/getShips/getShips');

describe('useShipLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    
    vi.mocked(getShips).mockResolvedValue(mockShipResults);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

  it('should load ships on mount with last search query', async () => {
    const lastRequest = 'enterprise';
    Storage.prototype.getItem = vi.fn(() => lastRequest);

    renderHook(() => useShipLoader(1), { wrapper: Wrapper });

    await act(async () => {
      await Promise.resolve();
    });

    expect(localStorage.getItem).toHaveBeenCalledWith('STS last request');
    expect(getShips).toHaveBeenCalledWith(lastRequest, 0, expect.any(AbortController));
  });

  it('should handle search with trimmed value', async () => {
    const { result } = renderHook(() => useShipLoader(1), { wrapper: Wrapper });

    const searchValue = '  voyager  ';
    await act(async () => {
      await result.current.handleSearch(searchValue);
    });

    expect(getShips).toHaveBeenCalledWith('voyager', 0, expect.any(AbortController));
    expect(result.current.ships).toEqual(mockShips);
    expect(result.current.pageCount).toBe(5);
  });

  it('should handle input change', () => {
    const { result } = renderHook(() => useShipLoader(1), { wrapper: Wrapper });

    const newValue = 'deep space';
    act(() => {
      result.current.handleInputChange({ 
        target: { value: newValue } 
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe(newValue);
  });
});
