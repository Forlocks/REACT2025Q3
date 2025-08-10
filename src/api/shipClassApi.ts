import { ShipClass } from "../models/ShipClass";
import { baseApi } from "./baseApi";

interface ShipClassApiResponse {
  spacecraftClass: ShipClass;
}

const shipClassApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getShipClass: create.query<
      ShipClass,
      { uid: string; }
    >({
      query: ({ uid }) => ({
        url: `spacecraftClass?uid=${uid}`,
      }),
      transformResponse: (response: ShipClassApiResponse) => response.spacecraftClass,
      providesTags: ['ShipClass'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetShipClassQuery } = shipClassApi;
