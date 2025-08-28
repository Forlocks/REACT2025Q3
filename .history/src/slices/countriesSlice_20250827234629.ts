import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ['USA', 'Russia', 'Canada', ''],
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
