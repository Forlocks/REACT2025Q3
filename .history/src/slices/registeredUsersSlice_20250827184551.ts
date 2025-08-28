import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCardsState {
  selectedCards: CardProps[];
}

const initialState: RegisteredUsersState = {
  registeredUsers: [],
};


export const registeredUsersSlice = createSlice({
  name: 'selectedCards',
  initialState,
  selectors: {
    selectAllRegisteredUsers: (state) => state.selectedCards,
  },
  reducers: {
    addCard: (state, action: PayloadAction<CardProps>) => {
      const card = action.payload;

      if (!state.selectedCards.some(savedCard => savedCard.uid === card.uid)) {
        state.selectedCards.push(card);
      }
    },
  },
});

export const { selectAllRegisteredUsers } = registeredUsersSlice.selectors;
export const { addCard, removeCard, clearCards } = registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
