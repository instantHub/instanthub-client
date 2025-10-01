import { AdminAuthState } from "./auth.slice";
import { RootState } from "@features/store";

export const selectAdminState = (state: RootState): AdminAuthState =>
  state.adminPanel;

export const selectToken = (state: RootState) => state.adminPanel.token;
