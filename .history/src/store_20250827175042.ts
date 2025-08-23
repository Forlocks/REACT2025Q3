import { configureStore } from '@reduxjs/toolkit';
import registeredSlice from './slices/registeredSlice';

export const store = configureStore({
  reducer: {
    registeredUser: registeredSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
