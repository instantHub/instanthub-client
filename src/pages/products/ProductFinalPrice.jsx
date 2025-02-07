import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/api/products/productsApi";
import { useGetCouponQuery } from "../../features/api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FaAngleRight } from "react-icons/fa6";
import FAQ from "../../components/FAQ";
import { GiPartyPopper } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import LocationSelector from "../../components/LocationSelector";
import { LAPTOP_DESKTOP, MOBILE } from "../../utils/constants";
import SubmitForm from "./SubmitForm";

const initialState = {
  addressDetails: { address: "", state: "", city: "", pinCode: "" },
  coupon: {
    couponCode: "",
    couponPrice: null,
    couponView: false,
    couponCodeApplied: false,
  },
  offerPrice: null,
  specialPrice: "",
  recycleProduct: false,
  selectedPaymentMode: "",
  selectedDigitalPayment: "",
  deductionsByType: {},
  isOpen: false,
};

function reducer(state, action) {
  // console.log("reducer func action:", action);
  const { type, value } = action;
  switch (type) {
    // Address Details
    case "address":
      return {
        ...state,
        addressDetails: { ...state.addressDetails, [type]: value },
      };
    case "location":
      return {
        ...state,
        addressDetails: { ...state.addressDetails, ...value },
      };
    case "pinCode":
      return {
        ...state,
        addressDetails: { ...state.addressDetails, [type]: value },
      };

    // Prices
    case "offerPrice":
      return { ...state, [type]: Number(value) };
    case "specialPrice":
      return { ...state, [type]: Number(value) };

    // Payment Modes
    case "selectedPaymentMode":
      return { ...state, [type]: value };
    case "selectedDigitalPayment":
      return { ...state, [type]: value };

    // Recycle Product
    case "recycleProduct":
      return { ...state, [type]: value };

    case "deductionsByType":
      return { ...state, [type]: value };

    // Coupon
    case "couponCode":
      return { ...state, coupon: { ...state.coupon, [type]: value } };
    case "couponPrice":
      return { ...state, coupon: { ...state.coupon, [type]: Number(value) } };
    case "couponView":
      return { ...state, coupon: { ...state.coupon, [type]: value } };
    case "couponCodeApplied":
      return { ...state, coupon: { ...state.coupon, [type]: value } };

    default:
      throw new Error();
  }
}

const ProductFinalPrice = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const navigate = useNavigate();

  const { data: productDetails, isLoading: productLoading } =
    useGetProductDetailsQuery(productId);

  const { data: couponsData } = useGetCouponQuery();

  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log("Reducer state:", state);

  const selectedProdDetails = useSelector((state) => state.deductions);
  const laptopSlice = useSelector((state) => state.laptopDeductions);
  console.log("selectedProdDetails", selectedProdDetails);

  const [formData, setFormData] = useState();
  console.log("formData", formData);

  const [isOpen, setIsOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const submitCoupon = async () => {
    const couponFound = couponsData.find(
      (c) => c.couponCode === state.coupon.couponCode
    );

    if (couponFound) {
      // const currentPrice = state.offerPrice;
      // PERCENTAGE CALCULATIONS FOR COUPON
      // const couponValue = (couponFound.couponValue * currentPrice) / 100;

      // AMOUNT CALCULATION FOR COUPON
      const couponValue = couponFound.couponValue;
      dispatch({ type: "couponPrice", value: couponValue });

      const finalPrice = couponValue + state.offerPrice;
      dispatch({ type: "specialPrice", value: finalPrice });
      dispatch({ type: "couponCodeApplied", value: true });
      dispatch({ type: "couponView", value: false });

      toast.success("Coupon Code Applied Successfully");
    } else {
      toast.error("Invalid Coupon Code..!");
    }
  };

  // UseEffect to handle page refresh
  useEffect(() => {
    if (selectedProdDetails.productName == "") {
      navigate(`/categories/brands/productDetails/${productId}`);
    } else if (!selectedProdDetails.productAge.conditionLabel) {
      if (selectedProdDetails.productCategory === "Desktop") return;
      navigate(`/categories/brands/productDetails/${productId}`);
    }
    // else if (
    //   selectedProdDetails.productPhysicalCondition.conditionLabel === ""
    // ) {
    //   navigate(`/categories/brands/productDetails/${productId}`);
    // }
  }, [selectedProdDetails]);

  useEffect(() => {
    completeFinalData();
  }, [selectedProdDetails, productDetails]);

  async function completeFinalData() {
    if (productLoading) return;

    const productCategory = productDetails?.category?.name?.toLowerCase();

    let deductedPrice =
      Number(selectedProdDetails.getUpTo.price) -
      Number(selectedProdDetails.toBeDeducted) +
      Number(selectedProdDetails.toBeAdded);

    const minPrice = productCategory === "laptop" ? 1500 : 500;

    // Setting Price
    if (
      deductedPrice > minPrice &&
      deductedPrice <= selectedProdDetails.getUpTo.price
    ) {
      dispatch({ type: "offerPrice", value: Math.ceil(deductedPrice) });
    } else if (deductedPrice > selectedProdDetails.getUpTo.price) {
      dispatch({
        type: "offerPrice",
        value: LAPTOP_DESKTOP.includes(productCategory)
          ? Math.ceil(deductedPrice)
          : selectedProdDetails.getUpTo.price,
      });
    } else {
      dispatch({ type: "offerPrice", value: minPrice });
      dispatch({ type: "recycleProduct", value: true });
    }

    // 
    const finalDeductionSet = selectedProdDetails.deductions.reduce(
      (res, curr) => {
        (res[curr.type] = res[curr.type] || []).push(curr);
        return res;
      },
      {}
    );

    dispatch({ type: "deductionsByType", value: finalDeductionSet });

    const finalDeductionArray = Object.entries(finalDeductionSet).map(
      ([type, conditions]) => ({
        type,
        conditions,
      })
    );

    setFormData({
      ...formData,
      productId,
      productName: selectedProdDetails.productName,
      productBrand: productDetails.brand.name,
      productCategory: selectedProdDetails.productCategory,
      variant: selectedProdDetails.getUpTo,
      deductions: selectedProdDetails.deductions,
      // accessoriesAvailable: AccessoriesSelected,
      finalDeductionSet: finalDeductionArray,
    });
  }

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${`${selectedProdDetails?.productName}`} Online and Get Instant Cash | InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
      </Helmet>

      <div className="flex flex-col justify-between pt-2 px-10 bg-slate-200 bg-opacity-10 w-full max-2sm:px-4">
        <Link
          to={`/categories/brands/productDetails/${productDetails?.id}`}
          className="w-fit text-secondary bg-white px-2 border border-secondary rounded"
        >
          {"< Back"}
        </Link>

        {showLocation && (
          <LocationSelector
            handleAddress={(state, city) => {
              dispatch({ type: "location", value: { state, city } });
            }}
            setShowLocation={setShowLocation}
            setIsOpen={setIsOpen}
          />
        )}

        <div className="w-full flex gap-10 max-sm:gap-5 max-sm:flex-col text-[16px] max-sm:text-xs">
          {/* Left */}
          <div
            className={`${
              state.coupon.couponCodeApplied
                ? ` max-h-[630px]`
                : ` max-h-[600px]`
            } w-[40%] bg-white grow-0 border-l border-r px-4 py-2 shadow-md flex flex-col items-center justify-center max-sm:w-full`}
          >
            <div className="flex justify-center items-center">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${
                  productDetails?.image
                }`}
                alt="productImage"
                className="size-20 max-sm:size-16"
              />
              <div className="flex flex-col gap-2 text-lg  max-sm:text-xs text-yellow-500 font-semibold">
                <span>{selectedProdDetails.productName}</span>
                {productDetails?.category?.name === MOBILE && (
                  <span>{selectedProdDetails.getUpTo.variantName}</span>
                )}
              </div>
            </div>

            <div className="flex w-full justify-end mt-5">
              <Link
                to={`/sell/deductions?productId=${productDetails?.id}&variant=${selectedProdDetails?.getUpTo.variantName}`}
              >
                <button className="px-2 border-b rounded">Recalculate</button>
              </Link>
            </div>

            {/* Price Summary */}
            <div className="flex flex-col w-full items-start mt-2 mb-7 gap-4 border rounded shadow-md px-4 py-2">
              <h2 className="pb-2 border-b font-semibold">Price Summary</h2>

              <PricingDetail free={false} price={state.offerPrice}>
                Offered Price
              </PricingDetail>

              <PricingDetail free={true} price={100}>
                PickUp Charges
              </PricingDetail>

              <PricingDetail free={true} price={50}>
                Processing Fee
              </PricingDetail>

              {state.coupon.couponCodeApplied && (
                <PricingDetail free={false} price={state.coupon.couponPrice}>
                  <h2 className="flex items-center gap-1">
                    Coupon
                    <span className="flex gap-1 items-center text-green-600">
                      {state.coupon.couponCode} Applied
                      <GiPartyPopper />
                    </span>
                  </h2>
                </PricingDetail>
              )}

              <PricingDetail
                free={false}
                price={
                  state.coupon.couponCodeApplied
                    ? state.specialPrice
                    : state.offerPrice
                }
              >
                Total
              </PricingDetail>

              <div className="w-full flex justify-center">
                {!state.recycleProduct ? (
                  <button
                    onClick={() => setShowLocation(true)}
                    className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
                  >
                    Sell
                  </button>
                ) : (
                  ["Laptop", "Mobile"].includes(
                    productDetails.category.name
                  ) && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          navigate(
                            `/recycle-categories/recycle-brands/recycle-productDetails/${productId}`
                          );
                        }}
                        className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
                      >
                        Recycle
                      </button>
                      <p className="text-[11px] font-semibold text-center text-wrap">
                        Since your product has many issues price is lower then
                        expected, You can recylce this product with us for the
                        above price.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Apply Coupon */}
            {!state.recycleProduct && (
              <div className="w-full px-4 py-4 max-sm:py-3 border rounded shadow-md">
                <div
                  className="flex justify-between items-center"
                  onClick={() => {
                    dispatch({ type: "couponView", value: true });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      <img
                        src="/images/apply_coupon.webp"
                        alt="applycoupon"
                        className="size-5"
                      />
                    </span>
                    <span>Apply Coupon</span>
                  </div>
                  <FaAngleRight />
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-h-[550px] p-4 flex flex-col shadow-md overflow-y-auto scrollbar">
              <p className="text-center">
                This is your Products Offered Price based on the <br />
                following criteria that you selected
              </p>

              <DisplayDeductions data={state.deductionsByType} />
            </div>

            <div className="w-full mt-5 flex items-center justify-center">
              <FAQ />
            </div>
          </div>
        </div>
      </div>

      {state.coupon.couponView && (
        <CouponModal
          dispatch={dispatch}
          state={state}
          submitCoupon={submitCoupon}
        />
      )}

      {isOpen && (
        <SubmitForm
          formData={formData}
          setFormData={setFormData}
          reducer={{ state, dispatch }}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default ProductFinalPrice;

// Coupon Modal
const CouponModal = ({ dispatch, state, submitCoupon }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white pt-5 px-8 rounded-lg shadow-lg w-fit">
        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="coupon">Add Coupon Code</label>
          <input
            type="text"
            name="coupon"
            placeholder="Enter Coupon Code"
            className="px-2 py-1 border rounded"
            onChange={(e) => {
              dispatch({ type: "couponCode", value: e.target.value });
            }}
            required
          />
        </div>
        <div className="flex gap-2 items-center justify-center my-4 text-sm">
          <button
            onClick={() => submitCoupon()}
            className="bg-green-700 text-white px-4 py-1 rounded disabled:bg-gray-500"
            disabled={state.coupon.couponCodeApplied}
          >
            Apply
          </button>

          <button
            onClick={() => {
              dispatch({ type: "couponView", value: false });
            }}
            className="bg-red-700 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
        {state.coupon.couponCodeApplied && (
          <div className="w-full flex justify-center items-center text-sm max-sm:text-xs text-red-600 pb-3">
            Coupon Already Applied <FcCancel />
          </div>
        )}
      </div>
    </div>
  );
};

// DisplayDeductions component to render the entire data object
const DisplayDeductions = ({ data }) => (
  <div className="mt-5 text-lg max-sm:text-sm">
    {Object.entries(data).map(([conditionName, conditionLabels]) => (
      <Section
        key={conditionName}
        conditionName={conditionName}
        conditionLabels={conditionLabels}
      />
    ))}
  </div>
);

// Reusable component to display a group of items (like 'Age' or 'Accessories')
const Section = ({ conditionName, conditionLabels }) => {
  return (
    <div className="mb-5">
      <h2 className="py-1 text-xl max-sm:text-sm text-green-600 font-bold">
        {conditionName}
      </h2>
      <ul className="">
        {conditionLabels.map((cl, i) => (
          <Item key={i} clNo={i + 1} conditionLabel={cl.conditionLabel} />
        ))}
      </ul>
    </div>
  );
};

// Reusable component to display individual items (Age, Accessores, Processors, etc.)
const Item = ({ clNo, conditionLabel }) => {
  return (
    <li>
      <strong>{clNo}</strong>. {conditionLabel}
    </li>
  );
};

const PricingDetail = ({ children, free, price }) => {
  return (
    <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
      <h2>{children}</h2>
      <div className="flex items-center">
        {free && <span className="text-green-500">Free</span>}
        <span className={`pl-1 ${free && "line-through"}`}>₹{price}</span>
      </div>
    </div>
  );
};

// Old finalCompleteData
{
  // async function completeFinalData() {
  //   if (productLoading) return;
  //   let prodDeductions = [];
  //   const productCategory = productDetails?.category?.name?.toLowerCase();
  //   if (productCategory === "mobile") {
  //     const prodVarDeduction = productDetails.variantDeductions.find(
  //       (vd) =>
  //         vd.variantName === String(selectedProdDetails.getUpTo.variantName)
  //     );
  //     prodDeductions = prodVarDeduction?.deductions || [];
  //   } else if (LAPTOP_DESKTOP.includes(productCategory)) {
  //     const simpleDed = productDetails.simpleDeductions || [];
  //     const processor = await getProcessorDeductions(
  //       laptopSlice.processor.conditionLabel,
  //       productDetails?.category?.id
  //     );
  //     prodDeductions = [...simpleDed, ...(processor?.deductions || [])];
  //   } else {
  //     prodDeductions = productDetails.simpleDeductions || [];
  //   }
  //   const prodAccessories = prodDeductions.find((pd) =>
  //     pd.conditionName.toLowerCase().includes("accessories")
  //   );
  //   const deductedConditionLabels = new Set(
  //     selectedProdDetails.deductions.map((item) => item.conditionLabel)
  //   );
  //   const AccessoriesSelected = [];
  //   const AccessoriesNotSelected = [];
  //   prodAccessories?.conditionLabels.forEach((accessory) => {
  //     if (deductedConditionLabels.has(accessory.conditionLabel)) {
  //       AccessoriesSelected.push(accessory);
  //     } else {
  //       AccessoriesNotSelected.push(accessory);
  //     }
  //   });
  //   let deductedPrice =
  //     Number(selectedProdDetails.getUpTo.price) -
  //     Number(selectedProdDetails.toBeDeducted) +
  //     Number(selectedProdDetails.toBeAdded);
  //   AccessoriesNotSelected.forEach((a) => {
  //     deductedPrice -= (a.priceDrop * selectedProdDetails.getUpTo.price) / 100;
  //   });
  //   const minPrice = productCategory === "laptop" ? 1500 : 500;
  //   if (
  //     deductedPrice > minPrice &&
  //     deductedPrice <= selectedProdDetails.getUpTo.price
  //   ) {
  //     dispatch({ type: "offerPrice", value: Math.ceil(deductedPrice) });
  //   } else if (deductedPrice > selectedProdDetails.getUpTo.price) {
  //     dispatch({
  //       type: "offerPrice",
  //       value: LAPTOP_DESKTOP.includes(productCategory)
  //         ? Math.ceil(deductedPrice)
  //         : selectedProdDetails.getUpTo.price,
  //     });
  //   } else {
  //     dispatch({ type: "offerPrice", value: minPrice });
  //     dispatch({ type: "recycleProduct", value: true });
  //   }
  //   const finalDeductionSet = selectedProdDetails.deductions.reduce(
  //     (res, curr) => {
  //       (res[curr.type] = res[curr.type] || []).push(curr);
  //       return res;
  //     },
  //     {}
  //   );
  //   // finalDeductionSet.AccessoriesNotSelected = AccessoriesNotSelected;
  //   dispatch({ type: "deductionsByType", value: finalDeductionSet });
  //   const finalDeductionArray = Object.entries(finalDeductionSet).map(
  //     ([type, conditions]) => ({
  //       type,
  //       conditions,
  //     })
  //   );
  //   setFormData({
  //     ...formData,
  //     productId,
  //     productName: selectedProdDetails.productName,
  //     productBrand: productDetails.brand.name,
  //     productCategory: selectedProdDetails.productCategory,
  //     variant: selectedProdDetails.getUpTo,
  //     deductions: selectedProdDetails.deductions,
  //     // accessoriesAvailable: AccessoriesSelected,
  //     finalDeductionSet: finalDeductionArray,
  //   });
  // }
}

// Old getProcessorDeductions
{
  // async function getProcessorDeductions(processorName, category) {
  //   console.log("getProcessorDeductions function", processorName);
  //   try {
  //     let URL =
  //       import.meta.env.VITE_BUILD === "development"
  //         ? `http://localhost:8000/api/processors/deductions/${processorName}?from=finalPriceCal&category=${category}`
  //         : `https://api.instantpick.in/api/processors/deductions/${processorName}?from=finalPriceCal&category=${category}`;
  //     console.log("URL of processor", URL);
  //     const response = await fetch(URL, {
  //       method: "GET", // HTTP method
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }
  //     const data = await response.json(); // Parse the JSON response
  //     // console.log("Processor Deductions:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Failed to fetch processor deductions:", error);
  //   }
  // }
}

{
  // async function completeFinalData() {
  //   let prodDeductions;
  //   let productCategory = productDetails?.category?.name?.toLowerCase();
  //   if (!productLoading) {
  //     // console.log("productDetails", productDetails);
  //     if (productCategory === "mobile") {
  //       let prodVarDeduction = productDetails.variantDeductions.find(
  //         (vd) =>
  //           vd.variantName === String(selectedProdDetails.getUpTo.variantName)
  //       );
  //       prodDeductions = prodVarDeduction.deductions;
  //     } else if (LAPTOP_DESKTOP.includes(productCategory)) {
  //       let simpleDed = productDetails.simpleDeductions;
  //       let processor = await getProcessorDeductions(
  //         laptopSlice.processor.conditionLabel,
  //         productDetails?.category?.id
  //       );
  //       // console.log("processor", processor);
  //       let procBasDed = processor?.deductions;
  //       prodDeductions = [...simpleDed, ...procBasDed];
  //     } else {
  //       prodDeductions = productDetails.simpleDeductions;
  //     }
  //   }
  //   // console.log("prodDeductions", prodDeductions);
  //   const prodAccessories = prodDeductions.find((pd) =>
  //     pd.conditionName.toLowerCase().includes("accessories")
  //   );
  //   // Get the condition labels from selectedProdDetails.deductions
  //   const deductedConditionLabels = selectedProdDetails.deductions.map(
  //     (item) => item.conditionLabel
  //   );
  //   // console.log("deductedConditionLabels",deductedConditionLabels);
  //   // Check and return if the conditionLabel of the accessory is present in deductedConditionLabels
  //   function checkAccessory(accessory) {
  //     return deductedConditionLabels.find(
  //       (label) => label === accessory.conditionLabel
  //     );
  //   }
  //   let AccessoriesSelected = [];
  //   let AccessoriesNotSelected = [];
  //   prodAccessories?.conditionLabels.map((accessory) => {
  //     // Filter out the prodAccessories that are present in deductedConditionLabels(selectedProdDetails.deductions)
  //     if (checkAccessory(accessory)) {
  //       AccessoriesSelected.push(accessory);
  //     } else {
  //       AccessoriesNotSelected.push(accessory);
  //     }
  //   });
  //   // console.log("AccessoriesSelected", AccessoriesSelected);
  //   // console.log("AccessoriesNotSelected", AccessoriesNotSelected);
  //   let deductedPrice =
  //     Number(selectedProdDetails.getUpTo.price) -
  //     Number(selectedProdDetails.toBeDeducted) +
  //     Number(selectedProdDetails.toBeAdded);
  //   // console.log("deductedPrice initial", deductedPrice);
  //   if (AccessoriesNotSelected.length > 0) {
  //     AccessoriesNotSelected.map((a) => {
  //       deductedPrice =
  //         deductedPrice -
  //         Number((a.priceDrop * selectedProdDetails.getUpTo.price) / 100);
  //       // if (productCategory.includes("mobile")) {
  //       //   deductedPrice =
  //       //     deductedPrice -
  //       //     Number((a.priceDrop * selectedProdDetails.getUpTo.price) / 100);
  //       // } else {
  //       //   deductedPrice = deductedPrice - Number(a.priceDrop);
  //       // }
  //       // console.log("AccessoriesNotSelected", a);
  //     });
  //   }
  //   const minPrice = productCategory === "laptop" ? 1500 : 500;
  //   // Final Offer Price
  //   if (
  //     deductedPrice > minPrice &&
  //     deductedPrice <= selectedProdDetails.getUpTo.price
  //   ) {
  //     // setOfferPrice(Math.ceil(deductedPrice));
  //     dispatch({ type: "offerPrice", value: Math.ceil(deductedPrice) });
  //   } else if (deductedPrice > selectedProdDetails.getUpTo.price) {
  //     console.log("Final price above product price");
  //     if (LAPTOP_DESKTOP.includes(productCategory)) {
  //       console.log("Laptop/Desktop");
  //       // setOfferPrice(Math.ceil(deductedPrice));
  //       dispatch({ type: "offerPrice", value: Math.ceil(deductedPrice) });
  //     } else {
  //       // setOfferPrice(selectedProdDetails.getUpTo.price);
  //       dispatch({
  //         type: "offerPrice",
  //         value: selectedProdDetails.getUpTo.price,
  //       });
  //     }
  //   } else {
  //     // setOfferPrice(minPrice);
  //     dispatch({ type: "offerPrice", value: Math.ceil(minPrice) });
  //     // setRecycleProduct(true);
  //     dispatch({ type: "recycleProduct", value: true });
  //   }
  //   let finalDeductionSet = selectedProdDetails.deductions.reduce((res, curr) => {
  //     if (!res[curr.type]) {
  //       res[curr.type] = [curr];
  //     } else {
  //       res[curr.type].push(curr);
  //     }
  //     return res;
  //   }, {});
  //   finalDeductionSet.AccessoriesNotSelected = AccessoriesNotSelected;
  //   // setDeductionsByType(finalDeductionSet);
  //   dispatch({ type: "deductionsByType", value: finalDeductionSet });
  //   // console.log("finalDeductionSet", finalDeductionSet);
  //   const finalDeductionArray = Object.entries(finalDeductionSet).reduce(
  //     (acc, ite) => {
  //       acc.push({ type: ite[0], conditions: ite[1] });
  //       return acc;
  //     },
  //     []
  //   );
  //   // console.log("finalDeductionArray", finalDeductionArray);
  //   setFormData({
  //     ...formData,
  //     productId,
  //     productName: selectedProdDetails.productName,
  //     productBrand: productDetails.brand.name,
  //     productCategory: selectedProdDetails.productCategory,
  //     variant: selectedProdDetails.getUpTo,
  //     deductions: selectedProdDetails.deductions,
  //     accessoriesAvailable: AccessoriesSelected,
  //     finalDeductionSet: finalDeductionArray,
  //   });
  // }
}

// Payment Mode
{
  /* <div className="flex items-center justify-start">
                    <label className="flex items-center">
                      <input
                        role="radio"
                        id="instantCash"
                        type="radio"
                        name="paymentMode"
                        value="Instant Cash"
                        checked={state.selectedPaymentMode === "Instant Cash"}
                        onChange={handlePaymentModeChange}
                        className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                        Instant Cash
                      </span>
                      <img
                        src="/images/instantcash.webp"
                        alt="upi"
                        className="w-16 h-7 max-sm:w-12 max-sm:h-5"
                      />
                    </label>
                  </div> 
                  
                  <div className="flex items-center justify-start">
                    <input
                      role="radio"
                      id="digitalPayments"
                      type="radio"
                      name="paymentMode"
                      value="Digital Payments"
                      checked={state.selectedPaymentMode === "Digital Payments"}
                      onChange={handlePaymentModeChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      Digital Payments
                    </span>
                    <div className="mx-2">
                      <img
                        src="/images/upi2.webp"
                        alt="upi"
                        className="w-14 h-7 max-sm:w-12 max-sm:h-5"
                      />
                    </div>
                  </div> */
}

// Digital Payments
{
  /* <label className="flex items-center">
                      <input
                        role="radio"
                        id="gpay"
                        type="radio"
                        name="digitalPaymentMode"
                        value="GPay"
                        checked={state.selectedDigitalPayment === "GPay"}
                        onChange={handleDigitalPaymentChange}
                        className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                        GPay
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        role="radio"
                        id="phonepe"
                        type="radio"
                        name="digitalPaymentMode"
                        value="PhonePe"
                        checked={state.selectedDigitalPayment === "PhonePe"}
                        onChange={handleDigitalPaymentChange}
                        className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                        PhonePe
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        role="radio"
                        id="upi"
                        type="radio"
                        name="digitalPaymentMode"
                        value="UPI"
                        checked={state.selectedDigitalPayment === "UPI"}
                        onChange={handleDigitalPaymentChange}
                        className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                        UPI
                      </span>
                    </label> */
}

// left pricing
{
  // <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
  //   <h2>Offered Price</h2>
  //   <span>₹{state.offerPrice}</span>
  // </div>;
  // <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
  //   <h2>PickUp Charges</h2>
  //   <div className="flex items-center">
  //     <span className="text-green-500">Free</span>
  //     <span className="pl-1 line-through">₹100</span>
  //   </div>
  // </div>;
  // <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
  //   <h2>Processing Fee</h2>
  //   <div className="flex items-center">
  //     <span className="text-green-500">Free</span>
  //     <span className="pl-1 line-through">₹50</span>
  //   </div>
  // </div>;
  // {
  //   state.coupon.couponCodeApplied && (
  //     <div className="w-full flex justify-between items-center pb-3 border-b">
  //       <h2 className="flex items-center gap-1">
  //         Coupon
  //         <span className="flex gap-1 items-center text-green-600">
  //           {state.coupon.couponCode} Applied
  //           <GiPartyPopper />
  //         </span>
  //       </h2>
  //       <div className="flex items-center">
  //         <span className="pl-1">₹{state.coupon.couponPrice}</span>
  //       </div>
  //     </div>
  //   );
  // }
  // <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
  //   <h2>Total</h2>
  //   {state.coupon.couponCodeApplied ? (
  //     <span>₹{state.specialPrice}</span>
  //   ) : (
  //     <span>₹{state.offerPrice}</span>
  //   )}
  // </div>;
}
