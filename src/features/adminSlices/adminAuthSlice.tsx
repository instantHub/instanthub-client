import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAdminResponse,
  IValidateTokenResponse,
} from "@features/api/authApi/types";

export interface AdminAuthState {
  admin: IAdminResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpiry: number | null;
  sideBarOpen: boolean;
}

const initialState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  sessionExpiry: null,
  sideBarOpen: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ admin: IValidateTokenResponse }>
    ) => {
      const { admin } = action.payload;
      state.admin = admin.admin;
      state.isAuthenticated = true;
      state.sessionExpiry = admin?.sessionExpiry;
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.sessionExpiry = null;
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
