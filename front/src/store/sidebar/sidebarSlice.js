import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    value: "closed",
  },
  reducers: {
    close: (state) => {
      state.value = "closed";
    },
    open: (state) => {
      state.value = "opened";
    },
  },
});

export const { close, open } = sidebarSlice.actions;

export default sidebarSlice.reducer;
