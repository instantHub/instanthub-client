import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
  Dispatch,
  FC,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetCouponQuery } from "@api";
import { toast } from "react-toastify";
import FAQ from "@components/user/static/FAQ";
import { LocationSelector } from "@components/user";
import { LAPTOP } from "@utils/user/constants";
import SelectedProduct from "./questionnaire/SelectedProduct";
import {
  ArrowRightIcon,
  PartyPopperIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowRight,
} from "lucide-react";
import {
  NON_DEAD_LAPTOP_PRICE,
  NON_DEAD_MOBILE_PRICE,
} from "../recycle/constants";
import { Button, FormInput, Modal } from "@components/general";
import { IGetUpTo, selectOfferPrice } from "@features/slices";
import { IAddress } from "@features/api/orders/types";
import {
  IConditionLabels,
  IProductResponse,
} from "@features/api/productsApi/types";
import { SubmitForm2 } from "./SubmitForm2";
import { RootState } from "@features/store";

interface ICouponState {
  couponCode: string;
  couponPrice: number | null;
  couponView: boolean;
  couponCodeApplied: boolean;
}

interface ICoupon {
  id: string;
  couponCode: string;
  couponValue: number;
}

export interface IReducerState {
  name: string;
  email: string;
  phone: string | number;
  addressDetails: IAddress;
  coupon: ICouponState;
  offerPrice: number | null;
  specialPrice: number | string;
  recycleProduct: boolean;
  selectedPaymentMode: string;
  selectedDigitalPayment: string;
  finalDeductionsSetArray: IFinalDeductionSet[];
  isOpen: boolean;
}

interface IFinalDeductionSet {
  type: string;
  conditions: Partial<IConditionLabels>[];
}

export type TReducerAction =
  | { type: keyof IAddress; value: string }
  | { type: "location"; value: Partial<IAddress> }
  | { type: "offerPrice" | "specialPrice"; value: number }
  | { type: "selectedPaymentMode" | "selectedDigitalPayment"; value: string }
  | { type: "recycleProduct"; value: boolean }
  | { type: "finalDeductionsSetArray"; value: IFinalDeductionSet[] }
  | { type: keyof ICouponState; value: string | number | boolean }
  | { type: "name" | "email" | "phone"; value: string | number };

interface ContextType {
  state: IReducerState;
  formData: IProductFinalData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<TReducerAction>;
}

const initialState: IReducerState = {
  name: "",
  email: "",
  phone: "",
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
  finalDeductionsSetArray: [],
  isOpen: false,
};

function reducer(state: IReducerState, action: TReducerAction): IReducerState {
  const { type, value } = action;

  const updateAddress = (key: keyof IAddress, val: string) => ({
    ...state,
    addressDetails: { ...state.addressDetails, [key]: val },
  });

  const updateCoupon = (
    key: keyof ICouponState,
    val: string | number | boolean
  ) => ({
    ...state,
    coupon: { ...state.coupon, [key]: val },
  });

  switch (type) {
    case "address":
    case "pinCode":
    case "state":
    case "city":
      return updateAddress(type, value as string);
    case "location":
      return {
        ...state,
        addressDetails: { ...state.addressDetails, ...value },
      };
    case "offerPrice":
    case "specialPrice":
    case "selectedPaymentMode":
    case "selectedDigitalPayment":
    case "recycleProduct":
    case "finalDeductionsSetArray":
    case "name":
    case "email":
    case "phone":
      return { ...state, [type]: value as any };
    case "couponCode":
    case "couponPrice":
    case "couponView":
    case "couponCodeApplied":
      return updateCoupon(type, value);
    default:
      return state;
  }
}

export const StateContext = createContext<ContextType | null>(null);

export interface IProductFinalData {
  productId: string;
  productName: string;
  productBrand: string;
  productCategory: string;
  variant: IGetUpTo;
  uniqueURLs: {
    category: string;
    brand: string;
    product: string;
  };
  finalDeductionSet: IFinalDeductionSet[];
}

export const ProductFinalPrice_v3: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productURL = searchParams.get("p") || "";
  const categoryURL = searchParams.get("c") || "";
  const brandURL = searchParams.get("b") || "";
  const navigate = useNavigate();

  const { data: couponsData = [] as unknown as ICoupon[] } =
    useGetCouponQuery();

  const [state, dispatch] = useReducer(reducer, initialState);

  const offeredPrice = useSelector(selectOfferPrice);
  const selectedProductData = useSelector((s: RootState) => s.deductions);
  const { selectedProduct, getUpTo, finalDeductionsSetArray } =
    selectedProductData;

  const [formData, setFormData] = useState<IProductFinalData>();
  const [isOpen, setIsOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const submitCoupon = () => {
    const couponFound = couponsData?.find(
      (c) => c.couponCode === state.coupon.couponCode
    );

    if (couponFound) {
      dispatch({ type: "couponCodeApplied", value: true });
      dispatch({ type: "couponPrice", value: couponFound.couponValue });
      dispatch({
        type: "specialPrice",
        value: couponFound.couponValue + (state.offerPrice ?? 0),
      });
      dispatch({ type: "couponView", value: false });
      toast.success("Coupon Code Applied Successfully");
    } else {
      toast.error("Invalid Coupon Code..!");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const deductionLength = Object.keys(
      selectedProductData?.singleDeductions || {}
    ).length;
    if (!selectedProduct?.name || deductionLength < 1) {
      navigate(`/${categoryURL}/${brandURL}/${productURL}`, { replace: true });
    }
  }, [selectedProductData]);

  useEffect(() => {
    if (!selectedProduct) return;
    const minPrice =
      selectedProduct?.category?.name === LAPTOP
        ? NON_DEAD_LAPTOP_PRICE
        : NON_DEAD_MOBILE_PRICE;

    dispatch({ type: "offerPrice", value: offeredPrice });
    dispatch({ type: "recycleProduct", value: offeredPrice <= minPrice });
    dispatch({
      type: "finalDeductionsSetArray",
      value: finalDeductionsSetArray,
    });

    setFormData({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productBrand: selectedProduct.brand?.name,
      productCategory: selectedProduct.category?.name,
      variant: getUpTo,
      uniqueURLs: {
        category: categoryURL,
        brand: brandURL,
        product: productURL,
      },
      finalDeductionSet: finalDeductionsSetArray,
    });
  }, [selectedProductData, offeredPrice]);

  return (
    <StateContext.Provider
      value={{ state, dispatch, formData: formData!, setIsOpen }}
    >
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="bg-white max-sm:border-b max-sm:border-gray-200 max-sm:shadow-sm stick top-0z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
            <div className="flex items-center justify-between">
              <Button
                leftIcon={<ArrowRight className="rotate-180" />}
                variant="outline"
                size="md"
                shape="square"
                onClick={handleBack}
                className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                Back
              </Button>

              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-instant-mid" />
                <span className="text-sm font-semibold text-gray-700">
                  Your Instant Quote
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-sm:py-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Pricing */}
            <div className="lg:col-span-2 space-y-6">
              <ProductPricingContainer
                selectedProduct={selectedProduct}
                getUpTo={getUpTo}
                setShowLocation={setShowLocation}
                productId={selectedProduct.id}
              />

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-3 gap-4">
                <TrustBadge
                  icon={<TruckIcon className="w-6 h-6 text-instant-mid" />}
                  title="Free Pickup"
                  description="At your doorstep"
                />
                <TrustBadge
                  icon={
                    <ShieldCheckIcon className="w-6 h-6 text-instant-mid" />
                  }
                  title="100% Safe"
                  description="Data security guaranteed"
                />
                <TrustBadge
                  icon={<CreditCardIcon className="w-6 h-6 text-instant-mid" />}
                  title="Instant Payment"
                  description="Multiple payment options"
                />
              </div>
            </div>

            {/* Right Column - Deductions */}
            <div className="lg:col-span-1">
              <DeductionsList />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </div>

      {state.coupon.couponView && <CouponModal submitCoupon={submitCoupon} />}

      {showLocation && (
        <LocationSelector
          handleAddress={(state: string, city: string) => {
            dispatch({ type: "location", value: { state, city } });
          }}
          setShowLocation={setShowLocation}
          setIsOpen={setIsOpen}
        />
      )}

      {isOpen && <SubmitForm2 />}
    </StateContext.Provider>
  );
};

// Trust Badge Component
const TrustBadge: FC<{
  icon: ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-2">{icon}</div>
    <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

// Pricing Container Component
const ProductPricingContainer: FC<{
  selectedProduct: IProductResponse;
  getUpTo: { variantName: string };
  setShowLocation: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}> = ({ selectedProduct, getUpTo, setShowLocation }) => {
  const { state, dispatch } = useContext(StateContext)!;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Product Header */}
      {/* <div className="relative bg-gradient-to-br from-instant-mid/60 to-instant-mid/80 p-6 overflow-hidden"> */}
      <div className="relative border border-gray-200 p-1 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
        </div>

        <div className="relative z-10">
          <SelectedProduct
            selectedProduct={selectedProduct}
            getUpTo={getUpTo}
          />

          <Link
            to={`/sell/deductions?product=${selectedProduct?.uniqueURL}&variant=${getUpTo.variantName}`}
            className="inline-flex items-center gap-2 p-4 text-instant-mid hover:text-instant-mid/90 text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Recalculate Price
          </Link>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6 space-y-6">
        {/* Price Summary Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <SparklesIcon className="w-5 h-5 text-instant-mid" />
            <h3 className="text-lg font-bold text-gray-900">Price Breakdown</h3>
          </div>

          <div className="space-y-4">
            <PricingDetail free={false} price={state.offerPrice}>
              <span className="font-semibold text-gray-900">Device Value</span>
            </PricingDetail>

            <PricingDetail free={true} price={100}>
              <span className="text-gray-700">Pickup Charges</span>
            </PricingDetail>

            <PricingDetail free={true} price={50}>
              <span className="text-gray-700">Processing Fee</span>
            </PricingDetail>

            {state.coupon.couponCodeApplied && (
              <div className="bg-instant-mid/10 rounded-lg p-3 border border-instant-mid">
                <PricingDetail free={false} price={state.coupon.couponPrice}>
                  <div className="flex items-center gap-2">
                    <PartyPopperIcon className="w-5 h-5 text-instant-mid/90" />
                    <div>
                      <p className="font-semibold text-instant-mid">
                        Coupon Applied
                      </p>
                      <p className="text-xs text-instant-mid/90">
                        {state.coupon.couponCode}
                      </p>
                    </div>
                  </div>
                </PricingDetail>
              </div>
            )}

            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <div className="text-right">
                  <p className="text-3xl font-bold text-instant-mid">
                    ₹
                    {state.coupon.couponCodeApplied
                      ? state.specialPrice
                      : state.offerPrice}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Instant cash payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
            <p className="text-xs text-amber-800 font-medium flex items-start gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Final price will be quoted after full device inspection
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-3">
          {!state.recycleProduct ? (
            <>
              <Button
                variant="greenary"
                shape="square"
                onClick={() => setShowLocation(true)}
                className="w-full h-14 flex items-center gap-1 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                rightIcon={<ArrowRightIcon className="ml-2" />}
              >
                Continue to Sell
              </Button>

              {/* Coupon Section */}
              <button
                onClick={() => dispatch({ type: "couponView", value: true })}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <img
                      src="/images/apply_coupon.webp"
                      alt="coupon"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-purple-900">
                      Have a coupon?
                    </p>
                    <p className="text-xs text-purple-600">
                      Click to apply and save more
                    </p>
                  </div>
                </div>
                <ArrowRightIcon className="text-purple-600" />
              </button>
            </>
          ) : (
            ["Laptop", "Mobile"].includes(selectedProduct.category.name) && (
              <RecycleProduct uniqueURL={selectedProduct.uniqueURL} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const PricingDetail: FC<{
  children: ReactNode;
  free: boolean;
  price: number | null;
}> = ({ children, free, price }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">{children}</div>
      <div className="flex items-center gap-2">
        {free && (
          <span className="text-xs font-semibold text-instant-mid bg-instant-mid/10 px-2 py-1 rounded-full">
            FREE
          </span>
        )}
        <span
          className={`font-semibold ${
            free ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          ₹{price}
        </span>
      </div>
    </div>
  );
};

// Deductions List Component
const DeductionsList = () => {
  const { state } = useContext(StateContext)!;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircleIcon className="w-5 h-5 text-instant-mid" />
          <h3 className="text-lg font-bold text-gray-900">Your Selections</h3>
        </div>
        <p className="text-sm text-gray-600">
          Price calculated based on these conditions
        </p>
      </div>

      <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-4">
          {state.finalDeductionsSetArray?.map((deduction, idx) => (
            <Section
              key={`${deduction.type}-${idx}`}
              conditionName={deduction.type}
              conditionLabels={deduction.conditions as IConditionLabels[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Section: FC<{
  conditionName: string;
  conditionLabels: IConditionLabels[];
}> = ({ conditionName, conditionLabels }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
      <h4 className="font-bold text-instant-mid text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-instant-mid rounded-full"></div>
        {conditionName}
      </h4>
      <ul className="space-y-2">
        {conditionLabels.map((cl, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircleIcon className="w-4 h-4 text-instant-mid/90 flex-shrink-0 mt-0.5" />
            <span>{cl.conditionLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecycleProduct: FC<{ uniqueURL: string }> = ({ uniqueURL }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Consider Recycling</h3>
        <p className="text-sm text-gray-600">
          Due to the device condition, we recommend our eco-friendly recycling
          program
        </p>
      </div>

      <Button
        variant="greenary"
        shape="square"
        onClick={() => {
          navigate(
            `/recycle/categories/brands/products/productDetails/${uniqueURL}`
          );
        }}
        className="w-full"
      >
        Recycle Device
      </Button>
    </div>
  );
};

const CouponModal: FC<{ submitCoupon: () => void }> = ({ submitCoupon }) => {
  const { state, dispatch } = useContext(StateContext)!;

  return (
    <Modal
      isOpen={state.coupon.couponView}
      onClose={() => dispatch({ type: "couponView", value: false })}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <img
              src="/images/apply_coupon.webp"
              alt="coupon"
              className="w-8 h-8"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Apply Coupon
          </h3>
          <p className="text-gray-600">
            Enter your coupon code to get extra savings
          </p>
        </div>

        <FormInput
          label="Coupon Code"
          type="text"
          name="coupon"
          placeholder="Enter your code here"
          onChange={(e) =>
            dispatch({ type: "couponCode", value: e.target.value })
          }
          required
          className="mb-4"
        />

        {state.coupon.couponCodeApplied && (
          <div className="mb-4 p-3 bg-instant-mid/10 border border-instant-mid/30 rounded-lg flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-instant-mid/90" />
            <span className="text-sm font-medium text-instant-mid">
              Coupon applied successfully!
            </span>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="greenary"
            shape="square"
            onClick={submitCoupon}
            disabled={state.coupon.couponCodeApplied}
            className="flex-1"
          >
            Apply Coupon
          </Button>
          <Button
            variant="outline"
            shape="square"
            onClick={() => dispatch({ type: "couponView", value: false })}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
