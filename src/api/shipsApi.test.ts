import { configureStore } from '@reduxjs/toolkit';
import { shipsApi } from './shipsApi';
import { vi, describe, it, expect, beforeEach } from 'vitest';

function setupApiStore(api: typeof shipsApi) {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
  return { store, api };
}

const storeRef = setupApiStore(shipsApi);

describe('shipsApi', () => {
  beforeEach(() => {
    window.fetch = vi.fn();
  });

  it('should make correct POST request with encoded body and headers', async () => {
    const fakeResponse = {
      spacecrafts: [{ id: 1, name: 'Enterprise' }],
      page: {
        firstPage: true,
        lastPage: false,
        numberOfElements: 1,
        pageNumber: 0,
        pageSize: 15,
        totalElements: 1,
        totalPages: 1,
      },
    };

    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response(JSON.stringify(fakeResponse), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );

    const result = await storeRef.store.dispatch(
      shipsApi.endpoints.getShips.initiate({ key: 'test key', page: 0 })
    );

    expect(result.error).toBeUndefined();

    expect(window.fetch).toHaveBeenCalledTimes(1);

    const [request] = (window.fetch as ReturnType<typeof vi.fn>).mock.calls[0];

    expect(request.headers.get('Content-type')).toBe('application/x-www-form-urlencoded');

    if (typeof request.body === 'string') {
      expect(request.body).toBe('name=test%20key');
    } else if (request.body?.source) {
      expect(request.body.source).toBe('name=test%20key');
    }

    expect(result.data).toEqual({
      spacecrafts: fakeResponse.spacecrafts,
      totalPages: fakeResponse.page.totalPages,
    });
  });

  it('should handle empty response gracefully', async () => {
    const fakeResponse = {
      spacecrafts: [],
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 0,
        pageNumber: 0,
        pageSize: 15,
        totalElements: 0,
        totalPages: 0,
      },
    };

    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response(JSON.stringify(fakeResponse), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );

    const result = await storeRef.store.dispatch(
      shipsApi.endpoints.getShips.initiate({ key: '', page: 0 })
    );

    expect(result.error).toBeUndefined();
    expect(result.data).toEqual({
      spacecrafts: [],
      totalPages: 0,
    });
  });
});
