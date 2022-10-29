import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar/sidebarSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
