import { createSlice } from '@reduxjs/toolkit';
import { setRestaurant } from './restaurantSlice';

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  showCart: false,
  day:'today',
  slotId:'',
  restaurantData:JSON.parse(localStorage.getItem("restaurant-data")) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      
      let storedRestaurantId = state.restaurantData.id
      let currentRestaurantId = action.payload.restaurant.id
      if(storedRestaurantId!=currentRestaurantId){
        state.items = [];
        localStorage.removeItem("cart");
      }
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.restaurantData = action.payload.restaurant
        localStorage.setItem("restaurant-data", JSON.stringify(action.payload.restaurant));
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
    },
    setDay: (state,action) => {
      state.day = action.payload;
    },
    setSlotId: (state,action) => {
      state.slotId = action.payload;
    },
    setRestaurantData:(state,action)=>{
      state.restaurantData = action.payload
    }
  }
});

export const { addItem, removeItem, clearCart, toggleCart,setDay,setSlotId ,setRestaurantData} = cartSlice.actions;


export const selectRestaurantData = (state) => state.cart.restaurantData;
export const selectCartItems = (state) => state.cart.items;
export const selectShowCart = (state) => state.cart.showCart;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;