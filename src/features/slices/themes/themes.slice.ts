import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IReQuoteThemePayload {
  re_quote: boolean;
}

const INITIAL_STATE = {
  re_quote: false,
};

export const themesSlice = createSlice({
  name: "themes",
  initialState: INITIAL_STATE,
  reducers: {
    setReQuoteTheme: (state, action: PayloadAction<IReQuoteThemePayload>) => {
      const { re_quote } = action.payload;
      state.re_quote = re_quote;
    },
  },
});

export const { setReQuoteTheme } = themesSlice.actions;

export default themesSlice.reducer;
