import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisteredUser } from '../models/RegisteredUser';

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
    selectAllRegisteredUsers: (state) => state.registeredUsers,
  },
  reducers: {
    addCard: (state, action: PayloadAction) => {
      const card = action.payload;
        state.registeredUsers.push(card);
    },
  },
});

export const { selectAllRegisteredUsers } = registeredUsersSlice.selectors;
export const { addCard } = registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
