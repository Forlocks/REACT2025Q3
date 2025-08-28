import { configureStore } from '@reduxjs/toolkit';
import registeredUsersSlice from './slices/registeredUsersSlice';

export const store = configureStore({
  reducer: {
    registeredUser: registeredUsersSlice,
    countries:
  },
});

export type RootState = ReturnType<typeof store.getState>;
