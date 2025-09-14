import { RootState } from "@features/store";

export const selectThemesState = (state: RootState) => state.themes;
export const selectIsReQuoteTheme = (state: RootState) => state.themes.re_quote;
