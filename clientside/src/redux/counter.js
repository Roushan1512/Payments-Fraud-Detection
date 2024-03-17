import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyname: localStorage.getItem("companyname") || "",
};

export const companySlice = createSlice({
  name: "companyname",
  initialState,
  reducers: {
    setcompanyname: (state, action) => {
      state.companyname = action.payload;
      localStorage.setItem("companyname", state.companyname);
    },
    delcompanyname: (state) => {
      (state.companyname = ""),
        localStorage.setItem("companyname", state.companyname);
    },
  },
});

export const { setcompanyname, delcompanyname } = companySlice.actions;

export default companySlice.reducer;
