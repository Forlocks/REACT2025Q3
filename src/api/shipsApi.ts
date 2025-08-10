import { Ship } from "../models/Ship";
import { baseApi } from "./baseApi";

interface ShipsApiResponse {
  spacecrafts: Ship[];
  page: {
    firstPage: boolean;
    lastPage: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  },
}

const PAGE_SIZE: number = 15;

export const shipsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getShips: create.query<
      { spacecrafts: Ship[]; totalPages: number },
      { key: string; page: number }
    >({
      query: ({ key, page }) => ({
        url: `spacecraft/search?pageNumber=${page}&pageSize=${PAGE_SIZE}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(key)}`,
      }),
      transformResponse: (response: ShipsApiResponse) => ({
        spacecrafts: response.spacecrafts,
        totalPages:  response.page.totalPages,
      }),
      providesTags: ['Ships'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetShipsQuery } = shipsApi;
