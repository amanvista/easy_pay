import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('restaurantState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('restaurantState', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Load initial state from localStorage if available
const persistedState = loadState();

const initialState = persistedState || {
  restaurantId: 0,
  menuItems: {},
  loading: false,
  menuItemLoading: false,
  restaurantError: false,
  menuError: false,
  restaurant: {}
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
      saveState(state);
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
      saveState(state);
    },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
      saveState(state);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      saveState(state);
    },
    setRestaurantError: (state, action) => {
      state.restaurantError = action.payload;
      saveState(state);
    },
    clearRestaurant: (state) => {
      state.menuItems = {};
      state.restaurant = {};
      state.restaurantId = 0;
      saveState(state);
    },
    setMenuItemsLoading: (state, action) => {
      state.menuItemLoading = action.payload;
      saveState(state);
    },
    setMenuError: (state, action) => {
      state.menuError = action.payload;
      saveState(state);
    }
  }
});

export const { 
  setRestaurant, 
  setMenuItems, 
  setLoading, 
  setRestaurantError,
  setMenuError,
  clearRestaurant,
  setRestaurantId,
  setMenuItemsLoading
} = restaurantSlice.actions;

// Selectors
export const selectMenuItems = (state) => state.restaurant.menuItems;
export const selectRestaurantLoading = (state) => state.restaurant.loading;
export const selectRestaurantError = (state) => state.restaurant.restaurantError;
export const selectRestaurant = (state) => state.restaurant.restaurant;
export const selectMenuError = (state) => state.restaurant.menuError;
export const selectRestaurantId = (state) => state.restaurant.restaurantId;
export const selectMenuItemsLoading = (state) => state.restaurant.menuItemLoading;

export default restaurantSlice.reducer;