import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "@api";
import { ActionButton, ConfirmationModal } from "@components/admin";
import { generatePathWithParams } from "@utils/general";
import { ROUTES } from "@routes";
import { IProductResponse } from "@features/api/productsApi/types";
import { IPendingPricingMobile } from "../ProductsList";

interface IProductCardProps {
  data: IProductResponse;
  isPricingPending: IPendingPricingMobile | undefined;
  // pendingPricingMobiles: PendingPricingMobile[];
}

export const ProductCard: React.FC<IProductCardProps> = ({
  data,
  isPricingPending,
}) => {
  console.log("ProductCard - isPricingPending", isPricingPending);
  // console.log("data", data);

  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  const [deductionSelected, setDeductionSelected] = useState<
    Record<string, string>
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MultiVariantProduct = data?.category?.categoryType?.multiVariants;

  const handleDelete = useCallback(
    async (productId: string) => {
      await deleteProduct(productId);
    },
    [deleteProduct]
  );

  const handleEdit = useCallback(() => {
    navigate(
      generatePathWithParams(ROUTES.admin.updateProduct, data.uniqueURL)
    );
  }, [navigate, data.uniqueURL]);

  const openDeleteModel = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        className={`relative w-full shadow flex flex-col justify-center items-center cursor-pointer 
          rounded-md pt-3 max-sm:pt-2 text-center text-sm max-sm:text-[10px] border 
          ${isPricingPending ? "border-yellow-500" : ""}`}
      >
        {isPricingPending && (
          <div className="w-full border-b pb-2 text-yellow-500 flex justify-center items-center gap-1">
            <p className="font-extrabold">WARNING:- </p>
            <p>Pricing needed for Variants</p>
            {isPricingPending.variants.map((item, i) => (
              <span key={i} className="font-semibold">
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Data Display */}
        <div className="w-full h-full grid grid-cols-5 max-sm:grid-cols-4 place-items-center gap-2 px-2 max-sm:px-1">
          {/* Category & Brand */}
          <div className="col-span-2 max-md:col-span-1 w-full flex max-sm:flex-col justify-around max-sm:gap-2">
            <ItemWithImage
              label="Category"
              text={data.category.name}
              image={data.category.image}
              product={false}
            />
            <ItemWithImage
              label="Brand"
              text={data.brand.name}
              image={data.brand.image}
              product={false}
            />
          </div>

          {/* Product */}
          <ItemWithImage
            label="Product"
            text={data.name}
            image={data.image}
            product
            status={data.status}
          />

          {/* Variants & Prices */}
          <div className="w-full flex flex-col items-center gap-1">
            <p className="max-sm:text-[10px]">
              {MultiVariantProduct ? "Variant & Price" : "Price"}
            </p>
            {data.variants.map((variant) => (
              <div
                key={variant.id}
                className={`flex 
                  ${MultiVariantProduct && "gap-2 justify-center"} `}
              >
                {MultiVariantProduct ? (
                  <>
                    <VariantDetail label="Name" value={variant.name ?? ""} />
                    <VariantDetail label="Price" value={variant.price} />
                  </>
                ) : (
                  <VariantDetail label="Price" value={variant.price} />
                )}
              </div>
            ))}
          </div>

          {/* Price Drop */}
          <div className="w-full flex flex-col items-center gap-1">
            <p>Price Drop</p>
            {MultiVariantProduct ? (
              <div className="flex flex-col items-center gap-2 max-sm:gap-1">
                <select
                  onChange={(e) =>
                    setDeductionSelected({
                      [data.id]: e.target.value,
                    })
                  }
                  className="border-2 border-blue-500 rounded px-2 py-1 text-sm"
                >
                  <option value="">Variant</option>
                  {data.variantDeductions.map((variantDeduction) => (
                    <option
                      key={variantDeduction.id}
                      value={variantDeduction.variantName}
                    >
                      {variantDeduction.variantName}
                    </option>
                  ))}
                </select>

                {deductionSelected[data.id] && (
                  <Link
                    to={`/admin/products/product-questions/mv/${
                      data.uniqueURL
                    }?variant=${deductionSelected[data.id]}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      Price Drop
                    </button>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to={`/admin/products/product-questions/pb/${data.uniqueURL}?t=${data.category.name}`}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                  Price Drop
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="m-2 text-[14px]">
          Unique URL:
          <strong className="text-[16px]"> {data.uniqueURL}</strong>
        </div>

        {/* Actions */}
        <ActionButton
          actionOne="Edit"
          actionOneHandler={handleEdit}
          actionTwo="Delete"
          actionTwoHandler={openDeleteModel}
          name={data.name.slice(0, 16)}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => handleDelete(data.id)}
        itemToDelete={data.id}
        title="Confirm Deletion"
        detail={`You are about to delete ${data.name}, ${data.category.name} Product.`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

// -------------------- Helper Components --------------------
interface ItemWithImageProps {
  label: string;
  image: string;
  text: string;
  product: boolean;
  status?: string;
}

const ItemWithImage: React.FC<ItemWithImageProps> = ({
  label,
  image,
  text,
  product,
  status,
}) => (
  <div className="w-full flex flex-col items-center gap-1">
    <p>{label}</p>
    <img
      src={`${import.meta.env.VITE_APP_BASE_URL}${image}`}
      alt={`${label} - ${text}`}
      className={`w-[60px] h-fit mx-auto max-sm:w-[30px] ${
        !product ? "max-sm:hidden" : ""
      }`}
      loading="lazy"
    />
    <span
      className={`font-semibold ${text.length > 16 && "max-sm:text-[8.5px]"}`}
    >
      {text}
    </span>
    {product && (
      <span className="max-sm:text-[9px]">
        Status: <b>{status}</b>
      </span>
    )}
  </div>
);

interface VariantDetailProps {
  label: string;
  value: string | number;
}

const VariantDetail: React.FC<VariantDetailProps> = ({ label, value }) => (
  <div>
    <p className="max-sm:hidden text-xs text-gray-500">{label}</p>
    <span className="max-sm:text-[9px]">{value}</span>
  </div>
);
