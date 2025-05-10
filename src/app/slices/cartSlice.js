import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  showCart: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    }
  }
});

export const { addItem, removeItem, clearCart, toggleCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectShowCart = (state) => state.cart.showCart;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;