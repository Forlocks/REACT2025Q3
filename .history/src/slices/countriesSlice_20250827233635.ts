import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CountriesState {
  registeredUsers: RegisteredUser[];
}

const initialState: CountriesState = {
  registeredUsers: [],
};


export const registeredUsersSlice = createSlice({
  name: 'registeredUsers',
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

export const selectAllRegisteredUsers = (state: RootState) => state.registeredUser.registeredUsers;
export const { addUser } = registeredUsersSlice.actions;

export default registeredUsersSlice.reducer;
