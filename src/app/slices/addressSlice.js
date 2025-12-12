import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice";

// Load addresses from localStorage
const loadFromLocalStorage = () => {
  try {
    const savedAddresses = localStorage.getItem("savedAddresses");
    const selectedAddress = localStorage.getItem("selectedAddress");
    
    return {
      addresses: savedAddresses ? JSON.parse(savedAddresses) : [],
      selectedAddress: selectedAddress ? JSON.parse(selectedAddress) : null,
    };
  } catch (error) {
    console.error("Error loading addresses from localStorage:", error);
    return {
      addresses: [],
      selectedAddress: null,
    };
  }
};

const initialState = loadFromLocalStorage();

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("savedAddresses", JSON.stringify(state.addresses));
    if (state.selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(state.selectedAddress));
    } else {
      localStorage.removeItem("selectedAddress");
    }
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new Event("addressUpdated"));
  } catch (error) {
    console.error("Error saving addresses to localStorage:", error);
  }
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
      // If no address is selected and addresses exist, select the first one
      if (!state.selectedAddress && action.payload.length > 0) {
        state.selectedAddress = action.payload[0];
      }
      // If selected address exists but is not in the new addresses array, select first available
      else if (state.selectedAddress && action.payload.length > 0) {
        const addressExists = action.payload.find(addr => addr.id === state.selectedAddress.id);
        if (!addressExists) {
          state.selectedAddress = action.payload[0];
        }
      }
      // If no addresses, clear selected address
      else if (action.payload.length === 0) {
        state.selectedAddress = null;
      }
      saveToLocalStorage(state);
    },

    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      // If this is the first address, select it automatically
      if (state.addresses.length === 1) {
        state.selectedAddress = action.payload;
      }
      saveToLocalStorage(state);
    },

    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
        // Update selected address if it's the one being updated
        if (state.selectedAddress?.id === action.payload.id) {
          state.selectedAddress = action.payload;
        }
      }
      saveToLocalStorage(state);
    },

    deleteAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses = state.addresses.filter((addr) => addr.id !== addressId);
      
      // If deleted address was selected, select first available or null
      if (state.selectedAddress?.id === addressId) {
        state.selectedAddress = state.addresses.length > 0 ? state.addresses[0] : null;
      }
      saveToLocalStorage(state);
    },

    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
      saveToLocalStorage(state);
    },

    clearAddresses: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    // Clear addresses when user logs out
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      // No need to call saveToLocalStorage here as logout already clears localStorage
    });
  },
});

export const {
  setAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  selectAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
