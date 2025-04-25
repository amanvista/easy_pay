import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantId:0,
  menuItems: {},            // all menu items of the current restaurant
  loading: false,
  menuItemLoading:false,
  restaurantError: false,
  menuError: false,
  restaurant:{}
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    setRestaurant: (state, action) => {
        state.restaurant = action.payload;
      },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRestaurantError: (state, action) => {
      state.restaurantError = action.payload;
    },
    clearRestaurant: (state) => {
      state.menuItems = [];
    },
    setMenuItemsLoading: (state) => {
        state.menuItemLoading = false;
    },
    setMenuError: (state) => {
        state.menuError = false;
      }
  }
});

export const { 
  setRestaurant, 
  setMenuItems, 
  setLoading, 
  setRestaurantError,
  setMenuError,
  clearRestaurant ,
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