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
    addUser: (state, action: PayloadAction<RegisteredUser>) => {
        const user = action.payload;
        state.registeredUsers.push(user);
    },
  },
});

export const { selectAllRegisteredUsers } = registeredUsersSlice.selectors;
export const { addCard } = registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
