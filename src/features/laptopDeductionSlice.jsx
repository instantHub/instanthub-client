import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toBeDeducted: 0,
  processor: {},
  hardDisk: {},
  ram: {},
  screenSize: {},
  graphic: {},
  deductions: [],
};

export const laptopDeductionSlice = createSlice({
  name: "laptopDeductions",
  initialState,
  reducers: {
    addProcessor: (state, action) => {
      // console.log("addProcessor Reducer", action.payload);
      console.log(initialState);
      state.processor = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
      };
    },
    addHardDisk: (state, action) => {
      // console.log("addHardDisk Reducer", action.payload);
      console.log(initialState);
      return {
        ...state,
        hardDisk: {
          conditionLabel: action.payload.conditionLabel,
          priceDrop: action.payload.priceDrop,
          operation: action.payload.operation,
        },
      };
    },
    addRam: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.ram = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
      };
    },
    addScreenSize: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.screenSize = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
      };
    },
    addGraphic: (state, action) => {
      // console.log("addRam Reducer", action.payload);
      state.graphic = {
        conditionLabel: action.payload.conditionLabel,
        priceDrop: action.payload.priceDrop,
        operation: action.payload.operation,
      };
    },

    addLaptopDeductions: (state, action) => {
      console.log("addLaptopDeductions Reducer");
      console.log(action.payload);

      // Check if action.payload already exists in deductions
      const isExisting = state.deductions.some((condition) => {
        return condition.conditionLabel === action.payload.conditionLabel;
      });
      if (!isExisting) {
        return {
          ...state,
          toBeDeducted: state.toBeDeducted + action.payload.priceDrop,
          deductions: [...state.deductions, action.payload],
        };
      }
    },
    removeLaptopDeductions: (state, action) => {
      console.log("removeLaptopDeductions reducer");

      // Check if action.payload already exists in deductions
      const isExisting = state.deductions.some((condition) => {
        return condition.conditionLabel === action.payload.conditionLabel;
      });

      if (isExisting) {
        // Filter out the item from the deductions array if it exists
        const updatedDeductions = state.deductions.filter(
          (condition) =>
            condition.conditionLabel !== action.payload.conditionLabel
        );

        return {
          ...state,
          toBeDeducted: state.toBeDeducted - Number(action.payload.priceDrop),
          deductions: updatedDeductions,
        };
      }
    },
    clearLaptopDeductions: (state, action) => {
      console.log("clearLaptopDeductions reducer");

      return {
        ...state,
        processor: {},
        hardDisk: {},
        ram: {},
        screenSize: {},
        graphic: {},
        toBeDeducted: 0,
        deductions: [],
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
  addLaptopDeductions,
  removeLaptopDeductions,
  clearLaptopDeductions,
} = laptopDeductionSlice.actions;
export default laptopDeductionSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   productName: "",
//   productImage: "",
//   productCategory: "",
//   productAge: {},
//   getUpTo: {
//     variantName: "",
//     price: undefined,
//   },
//   toBeDeducted: 0,
//   toBeAdded: 0,
//   finalPrice: 0,
//   deductions: [],
// };

// export const deductionSlice = createSlice({
//   name: "laptopDeductions",
//   initialState,
//   reducers: {
//     setGetUpto: (state, action) => {
//       console.log("setGetUpto reducer");
//       // console.log(
//       //   action.payload.productName,
//       //   action.payload.productImage,
//       //   action.payload.variantName,
//       //   action.payload.price
//       // );
//       const { productName, productImage, productCategory, variantName, price } =
//         action.payload;
//       return {
//         ...state,
//         productName,
//         productImage,
//         productCategory,
//         getUpTo: {
//           variantName,
//           price,
//         },
//       };
//     },
//     addDeductions: (state, action) => {
//       console.log("addDeduction Reducer from Laptop", action.payload);
//       console.log(initialState);

//       // Check if action.payload already exists in deductions
//       const isExisting = state.deductions.some((condition) => {
//         return condition.conditionLabel === action.payload.conditionLabel;
//       });
//       if (!isExisting) {
//         if (action.payload.operation === "Subtrack") {
//           return {
//             ...state,
//             toBeDeducted: Math.ceil(
//               state.toBeDeducted +
//                 (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//             ),
//             deductions: [...state.deductions, action.payload],
//           };
//         } else if (action.payload.operation === "Add") {
//           return {
//             ...state,
//             toBeAdded: Math.ceil(
//               state.toBeAdded +
//                 (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//             ),
//             deductions: [...state.deductions, action.payload],
//           };
//         }
//         // return {
//         //   ...state,
//         //   toBeDeducted: state.toBeDeducted + Number(action.payload.priceDrop),
//         //   deductions: [...state.deductions, action.payload],
//         // };
//       }
//     },
//     addProductAge: (state, action) => {
//       console.log("addProductAge reducer", action.payload);
//       console.log(initialState);
//       return {
//         ...state,
//         productAge: {
//           conditionLabel: action.payload.conditionLabel,
//           priceDrop: action.payload.priceDrop,
//           operation: action.payload.operation,
//         },
//       };
//     },
//     removeDeductions: (state, action) => {
//       console.log("removeDeductions reducer", action.payload);

//       // Check if action.payload already exists in deductions
//       const isExisting = state.deductions.some((condition) => {
//         return condition.conditionLabel === action.payload.conditionLabel;
//       });

//       if (isExisting) {
//         // Filter out the item from the deductions array if it exists
//         const updatedDeductions = state.deductions.filter(
//           (condition) =>
//             condition.conditionLabel !== action.payload.conditionLabel
//         );

//         if (action.payload.operation === "Subtrack") {
//           return {
//             ...state,
//             toBeDeducted: Math.ceil(
//               state.toBeDeducted -
//                 (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//             ),
//             deductions: updatedDeductions,
//           };
//         } else if (action.payload.operation === "Add") {
//           return {
//             ...state,
//             toBeAdded: Math.ceil(
//               state.toBeAdded -
//                 (state.getUpTo.price * Number(action.payload.priceDrop)) / 100
//             ),
//             deductions: updatedDeductions,
//           };
//         }

//         // return {
//         //   ...state,
//         //   toBeDeducted: state.toBeDeducted - Number(action.payload.priceDrop),
//         //   deductions: updatedDeductions,
//         // };
//       }
//     },
//     clearDeductions: (state, action) => {
//       return {
//         ...state,
//         toBeDeducted: 0,
//         productAge: {},
//         deductions: [],
//       };
//     },
//     clearLaptopDeductions: (state, action) => {
//       console.log("clearLaptopDeductions reducer");

//       // return {
//       //   ...state,
//       //   processor: {},
//       //   hardDisk: {},
//       //   ram: {},
//       //   toBeDeducted: 0,
//       //   deductions: [],
//       // };
//     },
//   },
// });

// export const {
//   setGetUpto,
//   addDeductions,
//   addProductAge,
//   clearDeductions,
//   removeDeductions,
//   clearLaptopDeductions,
// } = deductionSlice.actions;
// export default deductionSlice.reducer;
