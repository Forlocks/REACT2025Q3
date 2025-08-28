import { configureStore } from '@reduxjs/toolkit';
import registeredUsersSlice from './slices/registeredUsersSlice';

export const store = configureStore({
  reducer: {
    registeredUser: registeredUsersSlice,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
