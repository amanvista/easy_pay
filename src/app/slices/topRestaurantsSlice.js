import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch top restaurants by zoneId
export const fetchTopRestaurants = createAsyncThunk(
  'topRestaurants/fetch',
  async (zoneId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost/easy_pay_backend/api/restaurants/top-restaurants?zone_id=${zoneId}`
      );
      const data = res?.data?.data;
      return { zoneId, restaurants: data || [] };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top restaurants');
    }
  }
);

const topRestaurantsSlice = createSlice({
  name: 'topRestaurants',
  initialState: {
    restaurants: [],
    loading: false,
    error: null,
    zoneId: null
  },
  reducers: {
    clearTopRestaurants: (state) => {
      state.restaurants = [];
      state.zoneId = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload.restaurants;
        state.zoneId = action.payload.zoneId;
        state.loading = false;
      })
      .addCase(fetchTopRestaurants.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearTopRestaurants } = topRestaurantsSlice.actions;

// Selectors
export const selectTopRestaurants = (state) => state.topRestaurants.restaurants;
export const selectTopRestaurantsLoading = (state) => state.topRestaurants.loading;
export const selectTopRestaurantsError = (state) => state.topRestaurants.error;
export const selectTopRestaurantsZoneId = (state) => state.topRestaurants.zoneId;

export default topRestaurantsSlice.reducer;
