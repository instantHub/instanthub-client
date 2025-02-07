import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processor: {},
  hardDisk: {},
  ram: {},
  screenSize: {},
  screenCondition: {},
  physicalCondition: {},
  age: {},
  graphic: {},
  modelYear: {},
};

export const laptopDeductionSlice = createSlice({
  name: "laptopDeductions",
  initialState,
  reducers: {
    addProcessor: (state, action) => {
      // console.log("addProcessor Reducer", action.payload);
      // console.log(initialState);
      state.processor = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addHardDisk: (state, action) => {
      // console.log("addHardDisk Reducer", action.payload);
      // console.log(initialState);
      return {
        ...state,
        hardDisk: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
          type: action.payload.type,
        },
      };
    },
    addRam: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.ram = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addScreenSize: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.screenSize = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addGraphic: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.graphic = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },

    addScreenCondition: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.screenCondition = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addPhysicalCondition: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.physicalCondition = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addAge: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.age = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },
    addModelYear: (state, action) => {
      console.log("modelYear Reducer", action.payload);
      state.modelYear = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
        type: action.payload.type,
      };
    },

    clearLaptopDeductions: (state, action) => {
      console.log("clearLaptopDeductions reducer");

      return {
        ...state,
        processor: {},
        hardDisk: {},
        ram: {},
        screenSize: {},
        screenCondition: {},
        physicalCondition: {},
        age: {},
        graphic: {},
        modelYear: {},
      };
    },
  },
});

export const {
  addProcessor,
  addHardDisk,
  addRam,
  addScreenSize,
  addGraphic,
  addScreenCondition,
  addPhysicalCondition,
  addAge,
  addModelYear,
  clearLaptopDeductions,
} = laptopDeductionSlice.actions;

export default laptopDeductionSlice.reducer;
