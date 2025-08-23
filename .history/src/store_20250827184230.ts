import { configureStore } from '@reduxjs/toolkit';
import registeredUserSlice from './slices/registeredUsersSlice';

export const store = configureStore({
  reducer: {
    registeredUser: registeredUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
