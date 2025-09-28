import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPartner } from "@features/api/partnersApi/types";

export interface IPartnerAuthState {
  partner: IPartner | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpiry?: number | null;
  sideBarOpen: boolean;
}

const initialState: IPartnerAuthState = {
  partner: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  sessionExpiry: null,
  sideBarOpen: false,
};

const partnerAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setPartner: (state, action: PayloadAction<{ partner: IPartner }>) => {
      const { partner } = action.payload;
      console.log("setCred slice", partner);

      state.partner = partner;
      state.isAuthenticated = true;
      state.sessionExpiry = partner?.sessionExpiry;

      if (partner.token) {
        console.log("token present");

        state.token = partner.token;
        localStorage.setItem("token", partner.token);
      }
    },

    logoutPartner: (state) => {
      state.partner = null;
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

export const { setPartner, logoutPartner, setLoading, updateSessionExpiry } =
  partnerAuthSlice.actions;

export default partnerAuthSlice.reducer;
