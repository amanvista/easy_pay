import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../services/authService';

// Async thunk for login using authApi (supports email/password)
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(email, password);
      // Store token in local storage (use 'token' key to match interceptor)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userToken', response.token); // Keep for backward compatibility
      return response;
    } catch (error) {
      // Log the full response for debugging
      console.log(error.response);

      // Return the `error` field from response if it exists
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
  }
);


// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // Clear auth tokens
  localStorage.removeItem('token');
  localStorage.removeItem('userToken');
  
  // Clear address data
  localStorage.removeItem('savedAddresses');
  localStorage.removeItem('selectedAddress');
  
  // Clear cart data
  localStorage.removeItem('cart');
  
  // Clear theme data (user-specific theme preferences)
  localStorage.removeItem('restaurantTheme');
  
  // Clear any other user-specific data
  localStorage.removeItem('user');
  
  // Clear all localStorage items that might contain user data
  // This is a more comprehensive approach to ensure no user data remains
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // Remove any keys that might contain user-specific data
    if (key && (
      key.includes('user') || 
      key.includes('auth') || 
      key.includes('address') || 
      key.includes('cart') ||
      key.includes('order') ||
      key.includes('profile')
    )) {
      keysToRemove.push(key);
    }
  }
  
  // Remove the identified keys
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Dispatch address update event for cross-component sync
  window.dispatchEvent(new Event('addressUpdated'));
});

// Async thunk for checking authentication status using authApi
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      // Token is automatically added by the interceptor in createApi
      const response = await authApi.getProfile();
      // Extract user data from response (API returns { message, user })
      return response.user || response;
    } catch (error) {
      localStorage.removeItem('userToken');
      throw error;
    }
  }
  throw new Error('No token found');
});

// Initialize state - check localStorage but set loading true if token exists
const token = localStorage.getItem('userToken');
const initialState = {
  loading: token ? true : false, // Set loading true if token exists (will be verified by AuthInitializer)
  userInfo: null,
  userToken: token || null, // Initialize from localStorage to prevent flash
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Logout cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    });

    // Check auth cases
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = localStorage.getItem('userToken');
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;