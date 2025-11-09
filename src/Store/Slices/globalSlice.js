import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = globalSlice.actions;
export default globalSlice.reducer;
