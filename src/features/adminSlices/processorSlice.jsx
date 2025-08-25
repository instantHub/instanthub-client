import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProcessorDeductions = createAsyncThunk(
  "processor/fetchProcessorDeductions",
  async (processorId, { rejectWithValue }) => {
    console.log("fetchProcessorDeductions");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/processors/deductions/${processorId}`
        // }/api/products/processor-deductions/${processorId}`
      );
      console.log("fetchProcessorDeductions", response.data);
      return response.data; // Assuming the API returns an array of products
    } catch (error) {
      console.log("ERROR in THUNK", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = { results: {}, loading: false, error: null };

const processorSlice = createSlice({
  name: "processor",
  initialState,
  reducers: {
    // Reset results if needed
    clearProcessorDeductions: (state) => {
      state.results = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcessorDeductions.pending, (state) => {
        console.log("ADDCASE pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessorDeductions.fulfilled, (state, action) => {
        console.log("ADDCASE fullfilled");
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchProcessorDeductions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearProcessorDeductions } = processorSlice.actions;

export default processorSlice.reducer;
