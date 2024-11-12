import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: {
    category: "",
    product: "",
    page: 1,
    filtered: false,
  },
  brandsList: {
    category: "",
    filtered: false,
  },
  conditionLabelsList: {
    category: "",
    condition: "",
    filtered: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterCategory: (state, action) => {
      console.log("filterCategory reducer", action.payload);

      const { category, from } = action.payload;

      // Use spread operator to retain other properties in the target object
      state[from] = {
        ...state[from], // retain existing properties
        category, // update only the category
        filtered: true,
      };
    },

    filterProduct: (state, action) => {
      console.log("filterProduct reducer", action.payload);

      const { product, from } = action.payload;
      state[from] = {
        ...state[from],
        product,
        filtered: true,
      };
    },

    filterPage: (state, action) => {
      console.log("filterPage reducer", action.payload);

      const { page, from } = action.payload;

      state[from] = {
        ...state[from],
        page,
        filtered: true,
      };
    },

    filterCondition: (state, action) => {
      console.log("filterCondition reducer", action.payload);

      const { condition, from } = action.payload;
      state[from] = {
        ...state[from],
        condition,
        filtered: true,
      };
    },

    clearFilter: (state, action) => {
      console.log("clearFilter reducer", action.payload);

      const { clear } = action.payload;

      const clearedEntries = Object.entries(state[clear])
        .map(([key]) => key) // Return an array of keys
        .reduce((acc, curr) => {
          acc[curr] = ""; // Set each key to an empty string in the accumulator
          return acc; // Return the accumulator in each iteration
        }, {});

      console.log("clearedEntries", clearedEntries);

      state[clear] = { ...clearedEntries, filtered: false };
    },
  },
});

export const {
  filterCategory,
  filterCondition,
  filterProduct,
  filterPage,
  clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
