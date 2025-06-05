import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@features/api";

import deductionSlice from "./userSlices/deductionSlice";
import serviceProblemsSlice from "./userSlices/serviceProblemsSlice";
import filterSlice from "./adminSlices/filterSlice";
import searchSlice from "./adminSlices/searchSlice";
import processorSlice from "./adminSlices/processorSlice";
import adminPanelSlice from "./adminSlices/adminPanelSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    deductions: deductionSlice,
    serviceProblems: serviceProblemsSlice,
    filter: filterSlice,
    search: searchSlice,
    processor: processorSlice,
    adminPanel: adminPanelSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
