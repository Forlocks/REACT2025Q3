import { configureStore } from '@reduxjs/toolkit';
import selectedCardsSlice from './slices/selectedCardsSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
