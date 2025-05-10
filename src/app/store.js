import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';
import configReducer from './slices/configSlice';
import loginReducer from './slices/authSlice';
import restaurantReducer from './slices/restaurantSlice';
import locationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    config: configReducer,
    auth: loginReducer,
    restaurant: restaurantReducer,
    location: locationReducer,
  }
  ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});