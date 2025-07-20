import { ShipsApiResponse } from '../models/Ship';

export const mockFetchResponse = <T extends ShipsApiResponse>(
  data: T,
  ok = true,
  status = 200
): Response =>
  ({
    ok,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
    statusText: 'OK',
    redirected: false,
    type: 'basic',
    url: '',
    clone: function () {
      return this;
    },
    body: null,
    bodyUsed: false,
    arrayBuffer: function () {
      return Promise.resolve(new ArrayBuffer(0));
    },
    blob: function () {
      return Promise.resolve(new Blob());
    },
    formData: function () {
      return Promise.resolve(new FormData());
    },
  }) as Response;

export const mockFetchError = (error: Error): Promise<never> => {
  return Promise.reject(error);
};
