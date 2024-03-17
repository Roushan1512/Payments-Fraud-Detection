import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./counter";

export const store = configureStore({
  reducer: {
    companyname: companySlice.reducer,
  },
});
