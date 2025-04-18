import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../services/authApi';

// Async thunk for login using authApi
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(phone, password);
      // Store token in local storage
      localStorage.setItem('userToken', response.token);
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
  localStorage.removeItem('userToken');
});

// Async thunk for checking authentication status using authApi
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      const userInfo = await authApi.getProfile(token);
      return userInfo;
    } catch (error) {
      localStorage.removeItem('userToken');
      throw error;
    }
  }
  throw new Error('No token found');
});

const initialState = {
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem('userToken') || null,
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