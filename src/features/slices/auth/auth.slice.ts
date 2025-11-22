import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "@features/api/admin/types";

export interface AdminAuthState {
  admin: IAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpiry?: number | null;
  sideBarOpen: boolean;
}

const initialState: AdminAuthState = {
  admin: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  sessionExpiry: null,
  sideBarOpen: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ admin: IAdmin }>) => {
      const { admin } = action.payload;
      // console.log("setCred slice", admin);

      state.admin = admin;
      state.isAuthenticated = true;
      state.sessionExpiry = admin?.sessionExpiry;

      if (admin.token) {
        console.log("token present");

        state.token = admin.token;
        localStorage.setItem("token", admin.token);
      }
    },

    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateSessionExpiry: (state) => {
      state.sessionExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    },
  },
});

export const { setCredentials, logout, setLoading, updateSessionExpiry } =
  adminAuthSlice.actions;

export default adminAuthSlice.reducer;
