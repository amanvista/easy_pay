// app/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { id, name, price, quantity, veg, ... }
    restaurant: null, // { id, name, address }
    meta: {
      eta: "30 mins",
      savings: 50,
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // Set restaurant info if it's a new cart
      if (!state.restaurant) {
        state.restaurant = item.restaurant;
      }
    },

    incrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      }
    },

    decrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }

      // If cart is empty after removal, clear restaurant
      if (state.items.length === 0) {
        state.restaurant = null;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.meta = { eta: "30 mins", savings: 0 };
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  setCartMeta,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
