import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../services/authApi';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ name, phone, email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.register({ name, phone, email, password });

      // Do NOT store token – only return confirmation or user object
      return response; // assuming it returns { user: {...} } or just a message
    } catch (error) {
      console.log(error.response);

      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearRegisterError: (state) => {
      state.error = null;
    },
    resetRegisterState: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user || null; // or payload.message if you just return a message
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearRegisterError, resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
