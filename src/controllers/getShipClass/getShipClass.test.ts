import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getShipClass } from './getShipClass';

describe('getShipClass', () => {
  const mockResponse = {
    spacecraftClass: {
      uid: 'constitution',
      name: 'Constitution',
      numberOfDecks: 15,
      warpCapable: true,
      species: { name: 'Human' },
    }
  };

  const mockError = new Error('Network error');
  const testUid = 'constitution';

  beforeEach(() => {
    window.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a GET request with correct URL', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await getShipClass(testUid);

    expect(fetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/spacecraftClass?uid=${testUid}`
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(mockError);

    await expect(getShipClass(testUid)).rejects.toThrow(mockError);
  });

  it('should handle empty response data', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);

    const result = await getShipClass(testUid);
    expect(result).toEqual({});
  });

  it('should return complete spacecraft class data', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await getShipClass(testUid);
    expect(result).toHaveProperty('spacecraftClass');
    expect(result.spacecraftClass).toHaveProperty('name');
    expect(result.spacecraftClass).toHaveProperty('numberOfDecks');
    expect(result.spacecraftClass).toHaveProperty('warpCapable');
  });

  it('should handle malformed JSON response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON')),
    } as Response);

    await expect(getShipClass(testUid)).rejects.toThrow('Invalid JSON');
  });
});
