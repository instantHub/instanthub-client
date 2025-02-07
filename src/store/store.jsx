import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../features/slices/globalSlice";
import authSlice from "../features/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../features/api";

import deductionSlice from "../features/slices/deductionSlice";
import laptopDeductionSlice from "../features/slices/laptopDeductionSlice";
import serviceProblemsSlice from "../features/slices/serviceProblemsSlice";
import filterSlice from "../admin/features/filterSlice";
import searchSlice from "../admin/features/searchSlice";
import processorSlice from "../admin/features/processorSlice";
import adminPanelSlice from "../admin/features/adminPanelSlice";
import { authApi } from "../features/api/admin/authApi/authApi";
import { processorApi } from "../features/api/admin/laptops/processorsApi";
import { categoriesApi } from "../features/api/categories/categoriesApi";
import { productsApi } from "../features/api/products/productsApi";
import { serviceApi } from "../features/api/services/servicesApi";
import { stocksApi } from "../features/api/admin/stocks/stocksApi";
import { recycleApi } from "../features/api/recycle/recycleApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    deductions: deductionSlice,
    serviceProblems: serviceProblemsSlice,
    laptopDeductions: laptopDeductionSlice,
    filter: filterSlice,
    search: searchSlice,
    processor: processorSlice,
    adminPanel: adminPanelSlice,

    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [processorApi.reducerPath]: processorApi.reducer,
    [recycleApi.reducerPath]: recycleApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
  },
  // middleware: (getDefault) => getDefault().concat(api.middleware),
  middleware: (getDefault) =>
    getDefault().concat(
      api.middleware,
      authApi.middleware,
      categoriesApi.middleware,
      productsApi.middleware,
      recycleApi.middleware,
      processorApi.middleware, // Add this if processorApi is actively used
      serviceApi.middleware, // Add this if serviceApi is actively used
      stocksApi.middleware // Add this if serviceApi is actively used
    ),
});

setupListeners(store.dispatch);
