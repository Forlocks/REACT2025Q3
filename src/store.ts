import { configureStore } from '@reduxjs/toolkit';
import selectedCardsSlice from './slices/selectedCardsSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
