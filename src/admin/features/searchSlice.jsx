import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000/api/products";
// http://localhost:8000/api/products/667eba432b98e44b82ee3afd?search=Air

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (search, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/products`,
        {
          params: {
            page: search.page,
            limit: search.limit,
            search: search.search,
            categoryId: search.categoryId,
          },
        }
      );
      return response.data; // Assuming the API returns an array of products
    } catch (error) {
      console.log("ERROR in THUNK", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = { results: [], loading: false, error: null };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Reset results if needed
    clearSearchResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        console.log("addCase PENDING");

        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        console.log("addCase FULLFILLED");

        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
