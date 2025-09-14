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
import { Helmet } from "react-helmet-async";
import FAQ from "@components/user/static/FAQ";
import { LocationSelector } from "@components/user";
import { LAPTOP } from "@utils/user/constants";
import { SubmitForm } from "./SubmitForm";
import SelectedProduct from "./questionnaire/SelectedProduct";
import { ArrowRightIcon, CloseIcon, PartyPopperIcon } from "@icons";
import {
  NON_DEAD_LAPTOP_PRICE,
  NON_DEAD_MOBILE_PRICE,
} from "../recycle/constants";
import {
  Button,
  FlexBox,
  FormInput,
  Modal,
  Typography,
} from "@components/general";
import { selectOfferPrice } from "@features/slices";
import { IAddress } from "@features/api/ordersApi/types";
import {
  IConditionLabels,
  IProductResponse,
} from "@features/api/productsApi/types";

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

interface IState {
  addressDetails: IAddress;
  coupon: ICouponState;
  offerPrice: number | null;
  specialPrice: number | string;
  recycleProduct: boolean;
  selectedPaymentMode: string;
  selectedDigitalPayment: string;
  deductionsByType: Record<string, IDeductionsByType[]>;
  isOpen: boolean;
}

interface IDeductionsByType {
  type: string;
  conditionLabel: string;
  [key: string]: unknown;
}

type TAction =
  | { type: keyof IAddress; value: string }
  | { type: "location"; value: Partial<IAddress> }
  | { type: "offerPrice" | "specialPrice"; value: number }
  | { type: "selectedPaymentMode" | "selectedDigitalPayment"; value: string }
  | { type: "recycleProduct"; value: boolean }
  | { type: "deductionsByType"; value: Record<string, IDeductionsByType[]> }
  | { type: keyof ICouponState; value: string | number | boolean };

interface ContextType {
  state: IState;
  dispatch: Dispatch<TAction>;
}

// ---------- Initial State ----------
const initialState: IState = {
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

// ---------- Reducer ----------
function reducer(state: IState, action: TAction): IState {
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
    case "deductionsByType":
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

// ---------- Context ----------
const StateContext = createContext<ContextType | null>(null);

// ---------- Component ----------
export const ProductFinalPrice2: React.FC = () => {
  console.log("ProductFinalPrice TSX");

  const [searchParams] = useSearchParams();
  const productURL = searchParams.get("p") || "";
  const categoryURL = searchParams.get("c") || "";
  const brandURL = searchParams.get("b") || "";
  const navigate = useNavigate();

  const { data: couponsData = [] as unknown as ICoupon[] } =
    useGetCouponQuery();

  const [state, dispatch] = useReducer(reducer, initialState);

  const offeredPrice = useSelector(selectOfferPrice);
  const selectedProductData = useSelector((s: any) => s.deductions);
  const { selectedProduct, getUpTo } = selectedProductData;
  // console.log("selectedProductData", selectedProductData);

  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  // --- ICoupon Submit ---
  const submitCoupon = () => {
    const couponFound = couponsData?.find(
      (c) => c.couponCode === state.coupon.couponCode
    );

    if (couponFound) {
      dispatch({
        type: "couponCodeApplied",
        value: true,
      });
      dispatch({
        type: "couponPrice",
        value: couponFound.couponValue,
      });
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

  // --- Page refresh guard ---
  useEffect(() => {
    const deductionLength = Object.keys(
      selectedProductData?.singleDeductions || {}
    ).length;
    if (!selectedProduct?.name || deductionLength < 1) {
      navigate(`/${categoryURL}/${brandURL}/${productURL}`, { replace: true });
    }
  }, [selectedProductData]);

  // --- Final Data Preparation ---
  useEffect(() => {
    if (!selectedProduct) return;
    const minPrice =
      selectedProduct?.category?.name === LAPTOP
        ? NON_DEAD_LAPTOP_PRICE
        : NON_DEAD_MOBILE_PRICE;

    dispatch({ type: "offerPrice", value: offeredPrice });
    dispatch({ type: "recycleProduct", value: offeredPrice <= minPrice });

    // Memoized transformation
    const finalDeductionSet = {
      ...selectedProductData.deductions.reduce(
        (res: Record<string, IDeductionsByType[]>, curr: IDeductionsByType) => {
          (res[curr.type] = res[curr.type] || []).push(curr);
          return res;
        },
        {}
      ),
      ...Object.fromEntries(
        Object.entries(selectedProductData.singleDeductions || {}).map(
          ([k, v]) => [k, [v]]
        )
      ),
    };

    dispatch({ type: "deductionsByType", value: finalDeductionSet });

    const finalDeductionArray = Object.entries(finalDeductionSet).map(
      ([type, conditions]) => ({ type, conditions })
    );

    setFormData({
      productId: selectedProduct.id,
      uniqueURLs: {
        category: categoryURL,
        brand: brandURL,
        product: productURL,
      },
      productName: selectedProduct.name,
      productBrand: selectedProduct.brand?.name,
      productCategory: selectedProduct.category?.name,
      variant: getUpTo,
      deductions: selectedProductData.deductions,
      finalDeductionSet: finalDeductionArray,
    });
  }, [selectedProductData, offeredPrice]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="flex flex-col justify-between pt-2 px-10 bg-slate-200 bg-opacity-10 w-full max-2sm:px-4">
        <Button
          variant="outline"
          size="md"
          shape="square"
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
          // @ts-ignore
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
  // @ts-ignore
  const { state } = useContext(StateContext);

  return (
    <FlexBox direction="col" fullWidth>
      <div className="w-full max-h-[550px] p-4 flex flex-col shadow-md overflow-y-auto scrollbar">
        <Typography variant="h6" className="text-center">
          This is your Products Offered Price based on the <br />
          following criteria that you selected
        </Typography>

        <div className="mt-5 text-lg max-sm:text-sm">
          {Object.entries(state.deductionsByType).map(
            ([conditionName, conditionLabels]) => (
              <Section
                key={conditionName}
                conditionName={conditionName}
                // @ts-ignore
                conditionLabels={conditionLabels}
              />
            )
          )}
        </div>
      </div>

      <FlexBox className="w-full mt-5">
        <FAQ />
      </FlexBox>
    </FlexBox>
  );
};

const Section: FC<{
  conditionName: string;
  conditionLabels: IConditionLabels[];
}> = ({ conditionName, conditionLabels }) => {
  return (
    <div className="mb-5">
      <h2 className="py-1 text-xl max-sm:text-sm text-green-600 font-bold">
        {conditionName}
      </h2>
      <ul className="">
        {conditionLabels.map((cl, i: number) => (
          <li>
            <strong>{i + 1}</strong>. {cl.conditionLabel}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Pricing Component
const ProductPricingContainer: FC<{
  selectedProduct: IProductResponse;
  getUpTo: { variantName: string };
  setShowLocation: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}> = ({ selectedProduct, getUpTo, setShowLocation, productId }) => {
  // @ts-ignore
  const { state, dispatch } = useContext(StateContext);

  return (
    <div
      className={`${
        state.coupon.couponCodeApplied ? ` max-h-[700px]` : ` max-h-[640px]`
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
        <Typography variant="h5" className="pb-2 border-b font-semibold">
          Price Summary
        </Typography>

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
            <FlexBox gap={1}>
              <Typography variant="h5">Coupon</Typography>
              <Typography className="flex gap-1 items-center text-green-600">
                {state.coupon.couponCode} Applied
                <PartyPopperIcon size={16} />
              </Typography>
            </FlexBox>
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
          variant="caption"
          align="center"
          className="bg-yellow-300 text-red-500 px-2 py-1"
        >
          Final price will be quoted after full inspection!
        </Typography>

        <div className="w-full flex justify-center">
          {!state.recycleProduct ? (
            <Button
              variant="greenary"
              shape="square"
              onClick={() => setShowLocation(true)}
              className="w-3/4"
            >
              Sell
            </Button>
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
            <FlexBox gap={2}>
              <img
                src="/images/apply_coupon.webp"
                alt="applycoupon"
                className="size-5"
              />
              <Typography variant="h5">Apply Coupon</Typography>
            </FlexBox>
            <ArrowRightIcon />
          </div>
        </div>
      )}
    </div>
  );
};

const PricingDetail: FC<{
  children: ReactNode;
  free: boolean;
  price: number;
}> = ({ children, free, price }) => {
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

const RecycleProduct: FC<{ uniqueURL: string }> = ({ uniqueURL }) => {
  const navigate = useNavigate();
  return (
    <FlexBox direction="col">
      <Button
        variant="greenary"
        shape="square"
        onClick={() => {
          navigate(
            `/recycle/categories/brands/products/productDetails/${uniqueURL}`
          );
        }}
        className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
      >
        Recycle
      </Button>
      <Typography variant="caption" className="text-center text-wrap">
        Since your product has many issues price is lower then expected, You can
        recylce this product with us for the above price.
      </Typography>
    </FlexBox>
  );
};

const CouponModal: FC<{ submitCoupon: () => void }> = ({ submitCoupon }) => {
  // @ts-ignore
  const { state, dispatch } = useContext(StateContext);

  return (
    <Modal isOpen={state.coupon.couponView} onClose={() => {}}>
      <FormInput
        label="Add Coupon Code"
        type="text"
        name="coupon"
        placeholder="Enter Coupon Code"
        onChange={(e) => {
          dispatch({ type: "couponCode", value: e.target.value });
        }}
        required
      />

      <FlexBox className="flex gap-2 items-center justify-center my-4 text-sm">
        <Button
          variant="greenary"
          shape="square"
          onClick={() => submitCoupon()}
          disabled={state.coupon.couponCodeApplied}
        >
          Apply
        </Button>

        <Button
          variant="outline"
          shape="square"
          onClick={() => {
            dispatch({ type: "couponView", value: false });
          }}
        >
          Cancel
        </Button>
      </FlexBox>
      {state.coupon.couponCodeApplied && (
        <div className="w-full flex justify-center items-center text-sm max-sm:text-xs text-red-600 pb-3">
          Coupon Already Applied <CloseIcon />
        </div>
      )}
    </Modal>
  );
};
