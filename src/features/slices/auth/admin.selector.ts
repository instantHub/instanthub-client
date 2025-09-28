import { AdminAuthState } from "./auth.slice";
import { RootState } from "@features/store";

export const selectAdmintate = (state: RootState): AdminAuthState =>
  state.adminPanel;

export const selectToken = (state: RootState) => state.adminPanel.token;
