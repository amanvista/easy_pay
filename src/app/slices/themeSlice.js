import { createSlice } from '@reduxjs/toolkit';
import { restaurantConfig } from '../../data/restaurantConfig';
import { logoutUser } from './authSlice';

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
  },
  extraReducers: (builder) => {
    // Reset theme to default when user logs out
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentTheme = restaurantConfig.defaultTheme;
      // No need to save to localStorage here as logout already clears it
    });
  },
});

export const { setTheme } = themeSlice.actions;

export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectThemeConfig = (state) => restaurantConfig.themes[state.theme.currentTheme];

export default themeSlice.reducer;