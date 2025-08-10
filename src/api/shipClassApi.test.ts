import { configureStore } from '@reduxjs/toolkit';
import { shipClassApi } from './shipClassApi';
import { vi, describe, it, expect, beforeEach } from 'vitest';

function setupApiStore(api: typeof shipClassApi) {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
  return { store, api };
}

const storeRef = setupApiStore(shipClassApi);

describe('shipClassApi', () => {
  beforeEach(() => {
    window.fetch = vi.fn();
  });

  it('should make correct GET request and transform response', async () => {
    const fakeShipClass = {
      uid: 'abc123',
      name: 'Destroyer',
      description: 'Fast and powerful',
    };

    const fakeResponse = {
      spacecraftClass: fakeShipClass,
    };

    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response(JSON.stringify(fakeResponse), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    );

    const result = await storeRef.store.dispatch(
      shipClassApi.endpoints.getShipClass.initiate({ uid: 'abc123' })
    );

    expect(result.error).toBeUndefined();

    expect(window.fetch).toHaveBeenCalledTimes(1);

    const [request] = (window.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(request?.method || 'GET').toBe('GET');

    expect(result.data).toEqual(fakeShipClass);
  });

  it('should handle fetch failure', async () => {
    (window.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      new Response('{}', {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'content-type': 'application/json' },
      })
    );

    const result = await storeRef.store.dispatch(
      shipClassApi.endpoints.getShipClass.initiate({ uid: 'nonexistent' })
    );

    expect(result.error).toBeDefined();
  });
});
