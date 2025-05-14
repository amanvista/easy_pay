import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';
import configReducer from './slices/configSlice';
import loginReducer from './slices/authSlice';
import restaurantReducer from './slices/restaurantSlice';
import locationReducer from './slices/locationSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    config: configReducer,
    auth: loginReducer,
    restaurant: restaurantReducer,
    location: locationReducer,
    order:orderReducer
  }
  ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});