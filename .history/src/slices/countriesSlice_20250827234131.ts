import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CountriesState {
  co: string[];
}

const initialState: CountriesState = {
  co: [],
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

export default countriesSlice.reducer;
