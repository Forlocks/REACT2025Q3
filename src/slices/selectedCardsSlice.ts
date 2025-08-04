import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps } from '../components/Card/Card';

interface SelectedCardsState {
  selectedCards: CardProps[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};


export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  selectors: {
    selectAllSelectedCards: (state) => state.selectedCards,
  },
  reducers: {
    addCard: (state, action: PayloadAction<CardProps>) => {
      const card = action.payload;

      if (!state.selectedCards.some(savedCard => savedCard.uid === card.uid)) {
        state.selectedCards.push(card);
      }
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      state.selectedCards = state.selectedCards.filter(card => card.uid !== cardId);
    },
    clearCards: (state) => {
      state.selectedCards = [];
    },
  },
});

export const { selectAllSelectedCards } = selectedCardsSlice.selectors;
export const { addCard, removeCard, clearCards } = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
