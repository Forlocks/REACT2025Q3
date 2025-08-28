import { configureStore } from '@reduxjs/toolkit';
import selectedCardsSlice from './slices/selectedCardsSlice';

export const store = configureStore({
  reducer: {
    submitedFo: selectedCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
