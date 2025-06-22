import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cityId: localStorage.getItem('cityId') || '',
    cityName: localStorage.getItem('cityName') || '',
    zoneId: localStorage.getItem('zoneId') || '',
    zoneName: localStorage.getItem('zoneName') || '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCity: (state, action) => {
        const { id, name } = action.payload;
        state.cityId = id;
        state.cityName = name;
        localStorage.setItem('cityId', id);
        localStorage.setItem('cityName', name);
      },
    setZone: (state, action) => {
        const { id, name } = action.payload;
        state.zoneId = id;
        state.zoneName = name;
        localStorage.setItem('zoneId', id);
        localStorage.setItem('zoneName', name);
    },
    resetLocation(state) {
      state.cityId = null;
      state.cityName = '';
      state.zoneId = null;
      state.zoneName = '';
    },
  },
});

export const { setCity, setZone, resetLocation } = locationSlice.actions;

export default locationSlice.reducer;
