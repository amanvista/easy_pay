import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice";

// Load cart from localStorage
const savedCart =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;

const initialState = savedCart
  ? JSON.parse(savedCart)
  : {
      items: [], // { id, name, price, quantity, veg, ... }
      restaurant: null, // { id, name, address }
      meta: {
        eta: "30 mins",
        savings: 50,
      },
    };

// Save cart to localStorage
const saveToLocalStorage = (state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      if (!state.restaurant) {
        state.restaurant = item.restaurant;
      }

      saveToLocalStorage(state);
    },

    incrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      }

      saveToLocalStorage(state);
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

      if (state.items.length === 0) {
        state.restaurant = null;
      }

      saveToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.meta = { eta: "30 mins", savings: 0 };
      saveToLocalStorage(state);
    },

    setCartMeta: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    // Clear cart when user logs out
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.items = [];
      state.restaurant = null;
      state.meta = { eta: "30 mins", savings: 0 };
      // No need to call saveToLocalStorage here as logout already clears localStorage
    });
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  clearCart,
  setCartMeta,
} = cartSlice.actions;

export default cartSlice.reducer;
