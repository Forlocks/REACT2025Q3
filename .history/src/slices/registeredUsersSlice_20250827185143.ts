import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RegisteredUser from '../models/RegistredUser';

interface RegisteredUsersState {
  registeredUsers: RegisteredUser[];
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
    addCard: (state, action: PayloadAction) => {
      const card = action.payload;

      if (!state.selectedCards.some(savedCard => savedCard.uid === card.uid)) {
        state.selectedCards.push(card);
      }
    },
  },
});

export const { selectAllRegisteredUsers } = registeredUsersSlice.selectors;
export const { addCard } = registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
