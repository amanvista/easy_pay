import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to create an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderPayload, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost/easy_pay_backend/api/orders/create', orderPayload); // Replace with your real API URL
      return response.data; // Expected to return: { order_id, status_id, total_amount, scheduled_pickup_time, is_bulk, payment_url }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const initialState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
