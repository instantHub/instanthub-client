import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "",
};

const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      console.log("currentPage reducer", action.payload);

      const { currentPage } = action.payload;
      state.currentPage = currentPage;
      localStorage.setItem("currentPage", currentPage);
    },

    clearAdminPanel: (state, action) => {
      console.log("clearAdminPanel reducer", action.payload);

      state[clear] = { ...clearedEntries, filtered: false };
    },
  },
});

export const { setCurrentPage, clearAdminPanel } = adminPanelSlice.actions;

export default adminPanelSlice.reducer;
