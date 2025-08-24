import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CountriesState {
  registeredUsers: string[];
}

const initialState: CountriesState = {
  registeredUsers: [],
};


export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  selectors: {
    selectAllCountries: (state) => state.countries,
  },
  reducers: {},
});

export const selectAllCountries = (state: RootState) => state.country.countries;

export default countrySlice.reducer;
