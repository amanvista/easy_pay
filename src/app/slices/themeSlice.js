import { createSlice } from '@reduxjs/toolkit';
import { restaurantConfig } from '../../data/restaurantConfig';

const initialState = {
  currentTheme: localStorage.getItem('restaurantTheme') || restaurantConfig.defaultTheme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem('restaurantTheme', action.payload);
    }
  }
});

export const { setTheme } = themeSlice.actions;

export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectThemeConfig = (state) => restaurantConfig.themes[state.theme.currentTheme];

export default themeSlice.reducer;