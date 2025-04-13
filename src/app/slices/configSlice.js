import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "Savory Bites",
  tagline: "Authentic flavors, unforgettable experiences",
  logo: "https://via.placeholder.com/100x100?text=Savory+Bites",
  phone: "(555) 123-4567",
  address: "456 Foodie Lane, Culinary City",
  themes: {
    classic: {
      primaryColor: "#8b0000",
      secondaryColor: "#f9f5f0",
      textColor: "#333",
      lightText: "#666",
      unavailableColor: "#ff3333",
      cardBg: "white",
      headerBg: "#8b0000",
      headerText: "white"
    },
    green: {
      primaryColor: "#2e8b57",
      secondaryColor: "#f5f9f5",
      textColor: "#333",
      lightText: "#666",
      unavailableColor: "#ff3333",
      cardBg: "white",
      headerBg: "#2e8b57",
      headerText: "white"
    },
    blue: {
      primaryColor: "#4682b4",
      secondaryColor: "#f5f9f9",
      textColor: "#333",
      lightText: "#666",
      unavailableColor: "#ff3333",
      cardBg: "white",
      headerBg: "#4682b4",
      headerText: "white"
    },
    purple: {
      primaryColor: "#4b0082",
      secondaryColor: "#f5f0f9",
      textColor: "#333",
      lightText: "#666",
      unavailableColor: "#ff3333",
      cardBg: "white",
      headerBg: "#4b0082",
      headerText: "white"
    },
    rustic: {
      primaryColor: "#d2691e",
      secondaryColor: "#f9f5f0",
      textColor: "#333",
      lightText: "#666",
      unavailableColor: "#ff3333",
      cardBg: "#fff8f0",
      headerBg: "#d2691e",
      headerText: "white"
    }
  },
  defaultTheme: "classic"
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updateConfig: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateConfig } = configSlice.actions;

export const selectRestaurantName = (state) => state.config.name;
export const selectRestaurantTagline = (state) => state.config.tagline;
export const selectRestaurantLogo = (state) => state.config.logo;
export const selectRestaurantPhone = (state) => state.config.phone;
export const selectRestaurantAddress = (state) => state.config.address;
export const selectRestaurantThemes = (state) => state.config.themes;
export const selectDefaultTheme = (state) => state.config.defaultTheme;

export default configSlice.reducer;