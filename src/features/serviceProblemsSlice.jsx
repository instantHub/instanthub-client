import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceProblems: [],
};

export const serviceProblemsSlice = createSlice({
  name: "serviceProblems",
  initialState,
  reducers: {
    addServiceProblems: (state, action) => {
      console.log("addServiceProblems Reducer", action.payload);
      console.log(initialState);

      // Check if action.payload already exists in deductions
      const isExisting = state.serviceProblems.some((sp) => {
        return sp.serviceProblem === action.payload.serviceProblem;
      });
      if (!isExisting) {
        return {
          ...state,
          serviceProblems: [...state.serviceProblems, action.payload],
        };
      }
    },

    removeServiceProblems: (state, action) => {
      console.log("removeServiceProblems reducer", action.payload);

      // Check if action.payload already exists in deductions
      const isExisting = state.serviceProblems.some((sp) => {
        return sp.serviceProblem === action.payload.serviceProblem;
      });

      if (isExisting) {
        // Filter out the item from the deductions array if it exists
        const updatedProblems = state.serviceProblems.filter(
          (sp) => sp.serviceProblem !== action.payload.serviceProblem
        );

        return {
          ...state,
          serviceProblems: updatedProblems,
        };
      }
    },
    clearServiceProblems: (state, action) => {
      return {
        ...state,
        serviceProblems: [],
      };
    },
  },
});

export const {
  addServiceProblems,
  removeServiceProblems,
  clearServiceProblems,
} = serviceProblemsSlice.actions;
export default serviceProblemsSlice.reducer;
