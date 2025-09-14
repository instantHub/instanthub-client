import {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetCouponQuery } from "@api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import FAQ from "@components/user/static/FAQ";
import { LocationSelector } from "@components/user";
import { LAPTOP } from "@utils/user/constants";
import { SubmitForm } from "./SubmitForm";
import SelectedProduct from "./questionnaire/SelectedProduct";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { ArrowRightIcon, CloseIcon, PartyPopperIcon } from "@icons";
import {
  NON_DEAD_LAPTOP_PRICE,
  NON_DEAD_MOBILE_PRICE,
} from "../recycle/constants";
import { Button, Typography } from "@components/general";
import { selectOfferPrice } from "@features/slices";

// Create the Context
const StateContext = createContext();

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

export const ProductFinalPrice = () => {
  const [searchParams] = useSearchParams();
  const productURL = searchParams.get("p");
  const categoryURL = searchParams.get("c");
  const brandURL = searchParams.get("b");
  const navigate = useNavigate();

  const { data: couponsData } = useGetCouponQuery();

  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log("Reducer state:", state);

  const offeredPrice = useSelector(selectOfferPrice);
  const selectedProductData = useSelector((state) => state.deductions);
  const { selectedProduct, getUpTo } = selectedProductData;
  console.log("selectedProductData", selectedProductData);
  // console.log("selectedProduct", selectedProduct);

  const [formData, setFormData] = useState();
  // console.log("formData", formData);

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

  const handlePageRefresh = () => {
    const deductionLength = Object.keys(
      selectedProductData.singleDeductions
    ).length;

    if (selectedProduct.name == "" || deductionLength < 1) return true;

    return false;
  };

  const handleBack = () => {
    const { brand, category } = selectedProduct;
    navigate(
      `/${category.uniqueURL}/${brand.uniqueURL}/${selectedProduct.uniqueURL}`
    );
  };

  async function completeFinalData() {
    if (!selectedProduct) return;

    const productCategory = selectedProduct?.category?.name;

    const minPrice =
      productCategory === LAPTOP
        ? NON_DEAD_LAPTOP_PRICE
        : NON_DEAD_MOBILE_PRICE;

    dispatch({ type: "offerPrice", value: offeredPrice });
    dispatch({ type: "recycleProduct", value: offeredPrice <= minPrice });

    let finalDeductionSet = selectedProductData.deductions.reduce(
      (res, curr) => {
        (res[curr.type] = res[curr.type] || []).push(curr);
        return res;
      },
      {}
    );

    const entriesToArray = {};
    Object.entries(selectedProductData.singleDeductions).forEach(
      ([key, value]) => {
        entriesToArray[key] = [value];
      }
    );

    finalDeductionSet = {
      ...finalDeductionSet,
      ...entriesToArray,
    };
    // console.log("finalDeductionSet", finalDeductionSet);

    dispatch({ type: "deductionsByType", value: finalDeductionSet });

    const finalDeductionArray = Object.entries(finalDeductionSet).map(
      ([type, conditions]) => ({
        type,
        conditions,
      })
    );

    setFormData({
      ...formData,
      productId: selectedProduct.id,
      uniqueURLs: {
        category: categoryURL,
        brand: brandURL,
        product: productURL,
      },
      productName: selectedProduct?.name,
      productBrand: selectedProduct?.brand?.name,
      productCategory: selectedProduct?.category?.name,
      variant: getUpTo,
      deductions: selectedProductData.deductions,
      finalDeductionSet: finalDeductionArray,
    });
  }

  // UseEffect to handle page refresh
  useEffect(() => {
    if (handlePageRefresh()) {
      navigate(`/${categoryURL}/${brandURL}/${productURL}`, {
        replace: true,
      });
    }

    completeFinalData();
  }, [selectedProductData]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Helmet>
        <title>{`Sell Old ${`${selectedProduct?.name}`} Online and Get Instant Cash | InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
      </Helmet>

      <div className="flex flex-col justify-between pt-2 px-10 bg-slate-200 bg-opacity-10 w-full max-2sm:px-4">
        <Button
          variant="outline"
          size="md"
          onClick={handleBack}
          className="w-fit"
        >
          Back
        </Button>

        <div className="w-full flex gap-10 max-sm:gap-5 max-sm:flex-col text-[16px] max-sm:text-xs">
          {/* Left */}
          <ProductPricingContainer
            selectedProduct={selectedProduct}
            getUpTo={getUpTo}
            setShowLocation={setShowLocation}
            productId={selectedProduct.id}
          />

          {/* Right */}
          <DeductionsList />
        </div>
      </div>

      {state.coupon.couponView && <CouponModal submitCoupon={submitCoupon} />}

      {showLocation && (
        <LocationSelector
          handleAddress={(state, city) => {
            dispatch({ type: "location", value: { state, city } });
          }}
          setShowLocation={setShowLocation}
          setIsOpen={setIsOpen}
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
    </StateContext.Provider>
  );
};

// DeductionsList component to render Deductions
const DeductionsList = () => {
  const { state } = useContext(StateContext);

  return (
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

// DisplayDeductions > Section
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

// DisplayDeductions > Section > Items
const Item = ({ clNo, conditionLabel }) => {
  return (
    <li>
      <strong>{clNo}</strong>. {conditionLabel}
    </li>
  );
};

// Pricing Component
const ProductPricingContainer = ({
  selectedProduct,
  getUpTo,
  setShowLocation,
  productId,
}) => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div
      className={`${
        state.coupon.couponCodeApplied ? ` max-h-[630px]` : ` max-h-[600px]`
      } w-[40%] bg-white grow-0 border-l border-r px-4 py-2 shadow-md flex flex-col items-center justify-center max-sm:w-full`}
    >
      {/* Product Detail */}
      <SelectedProduct selectedProduct={selectedProduct} getUpTo={getUpTo} />

      {/* Recalculate Button */}
      <div className="flex w-full justify-end mt-5">
        <Link
          to={`/sell/deductions?product=${selectedProduct?.uniqueURL}&variant=${getUpTo.variantName}`}
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
                <PartyPopperIcon size={16} />
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

        <Typography
          variant="h6"
          align="center"
          className="bg-yellow-300 text-red-500 px-2 py-1"
        >
          Final price will be quoted after full inspection!
        </Typography>

        <div className="w-full flex justify-center">
          {!state.recycleProduct ? (
            <button
              onClick={() => setShowLocation(true)}
              className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
            >
              Sell
            </button>
          ) : (
            ["Laptop", "Mobile"].includes(selectedProduct.category.name) && (
              <RecycleProduct uniqueURL={selectedProduct.uniqueURL} />
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
            <ArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};

// Pricing Detail
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

const RecycleProduct = ({ uniqueURL }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          navigate(
            `/recycle/categories/brands/products/productDetails/${uniqueURL}`
          );
        }}
        className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
      >
        Recycle
      </button>
      <p className="text-[11px] font-semibold text-center text-wrap">
        Since your product has many issues price is lower then expected, You can
        recylce this product with us for the above price.
      </p>
    </div>
  );
};

// Coupon Modal
const CouponModal = ({ submitCoupon }) => {
  const { state, dispatch } = useContext(StateContext);

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
            Coupon Already Applied <CloseIcon />
          </div>
        )}
      </div>
    </div>
  );
};
