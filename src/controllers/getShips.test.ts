import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getShips } from './getShips';
import { mockFetchResponse } from '../test-utils/fetch-mocks';
import type { ShipsApiResponse, NestedShipProperty } from '../models/Ship';

describe('getShips', () => {
  const mockKey = 'enterprise';
  const mockClass: NestedShipProperty = { uid: 'c1', name: 'Constitution' };
  const mockOwner: NestedShipProperty = { uid: 'o1', name: 'Starfleet' };
  const mockOperator: NestedShipProperty = { uid: 'op1', name: 'Federation' };

  const mockData: ShipsApiResponse = {
    spacecrafts: [
      {
        uid: '1',
        name: 'USS Enterprise',
        registry: 'NCC-1701',
        status: 'active',
        dateStatus: '2265-01-01',
        class: mockClass,
        owner: mockOwner,
        operator: mockOperator,
      },
      {
        uid: '2',
        name: 'USS Voyager',
        registry: 'NCC-74656',
        status: 'lost',
        dateStatus: '2371-01-01',
        class: null,
        owner: null,
        operator: null,
      },
    ],
  };

  beforeEach(() => {
    window.fetch = vi.fn();
    window.localStorage = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as Storage;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make POST request with correct parameters', async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchResponse(mockData));
    await getShips(mockKey);

    expect(fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/spacecraft/search?pageNumber=0&pageSize=15',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: `name=${encodeURIComponent(mockKey)}`,
      }
    );
  });

  it('should return array of ships with correct structure', async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchResponse(mockData));
    const result = await getShips(mockKey);

    expect(result).toEqual(mockData.spacecrafts);
    expect(result?.[0].class?.name).toBe('Constitution');
    expect(result?.[1].operator).toBeNull();
  });

  it('should handle null values in response', async () => {
    const responseWithNulls: ShipsApiResponse = {
      spacecrafts: [
        {
          uid: '3',
          name: 'Unknown Ship',
          registry: null,
          status: null,
          dateStatus: null,
          class: null,
          owner: null,
          operator: null,
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValue(mockFetchResponse(responseWithNulls));
    const result = await getShips(mockKey);

    expect(result?.[0].registry).toBeNull();
    expect(result?.[0].class).toBeNull();
  });

  it('should return null on network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));
    const result = await getShips(mockKey);
    expect(result).toBeNull();
  });

  it('should save search key to localStorage', async () => {
    vi.mocked(fetch).mockResolvedValue(mockFetchResponse(mockData));
    await getShips(mockKey);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'STS last request',
      mockKey
    );
  });
});
