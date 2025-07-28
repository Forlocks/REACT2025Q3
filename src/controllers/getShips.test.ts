import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getShips } from './getShips';

describe('getShips', () => {
  const mockResponse = {
    spacecrafts: [
      { uid: '1', name: 'Enterprise', registry: 'NCC-1701' },
      { uid: '2', name: 'Voyager', registry: 'NCC-74656' },
    ],
    page: {
      totalPages: 5,
    },
  };

  const mockError = new Error('Network error');

  beforeEach(() => {
    window.fetch = vi.fn();
    vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a POST request with correct parameters', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const controller = new AbortController();
    const result = await getShips('enterprise', 1, controller);

    expect(fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/spacecraft/search?pageNumber=1&pageSize=15',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: 'name=enterprise',
        signal: controller.signal,
      }
    );

    expect(result).toEqual({
      spacecrafts: mockResponse.spacecrafts,
      totalPages: mockResponse.page.totalPages,
    });
  });

  it('should store search key in localStorage', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const controller = new AbortController();
    await getShips('voyager', 0, controller);

    expect(localStorage.setItem).toHaveBeenCalledWith('STS last request', 'voyager');
  });

  it('should encode the search key in the request body', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const controller = new AbortController();
    await getShips('star trek', 2, controller);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: 'name=star%20trek',
      })
    );
  });

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(mockError);

    const controller = new AbortController();
    
    await expect(getShips('enterprise', 1, controller)).rejects.toThrow(mockError);
  });

  it('should include abort signal in the request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const controller = new AbortController();
    await getShips('discovery', 3, controller);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: controller.signal,
      })
    );
  });

  it('should return correct pagination data', async () => {
    const customResponse = {
      ...mockResponse,
      page: {
        totalPages: 10,
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(customResponse),
    } as Response);

    const controller = new AbortController();
    const result = await getShips('defiant', 4, controller);

    expect(result?.totalPages).toBe(10);
  });

  it('should handle empty response data', async () => {
    const emptyResponse = {
      spacecrafts: [],
      page: {
        totalPages: 0,
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(emptyResponse),
    } as Response);

    const controller = new AbortController();
    const result = await getShips('nonexistent', 0, controller);

    expect(result).toEqual({
      spacecrafts: [],
      totalPages: 0,
    });
  });
});
