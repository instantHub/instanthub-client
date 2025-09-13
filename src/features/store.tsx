import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@features/api";

import deductionSlice from "./slices/deductions/deduction.slice";
import serviceProblemsSlice from "./slices/services/serviceProblemsSlice";
import filterSlice from "./adminSlices/filterSlice";
import searchSlice from "./adminSlices/searchSlice";
import processorSlice from "./adminSlices/processorSlice";
import adminAuthSlice from "./adminSlices/adminAuthSlice";
import themesSlice from "./slices/themes/themes.slice";

export const store = configureStore({
  reducer: {
    deductions: deductionSlice,
    serviceProblems: serviceProblemsSlice,
    filter: filterSlice,
    search: searchSlice,
    processor: processorSlice,
    adminPanel: adminAuthSlice,
    themes: themesSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
