import { IPartnerAuthState } from "./partner_auth.slice";
import { RootState } from "@features/store";

export const selectPartnertate = (state: RootState): IPartnerAuthState =>
  state.partnerPanel;

export const selectToken = (state: RootState) => state.adminPanel.token;
