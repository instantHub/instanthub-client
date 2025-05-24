import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "@components/admin/ConfirmationModal";
import { useDeleteProductMutation } from "@api/productsApi";
import ActionButton from "@components/admin/ActionButton";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";

const ProductCard = ({ data, pendingPricingMobiles }) => {
  //   console.log(data);
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  const [deductionSelected, setDeductionSelected] = useState("");
  const MOBILE_CATEGORY = data.category.name === "Mobile";

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    btnStyle:
      "w-fit flex justify-center items-center gap-1 font-bold py-2 max-sm:py-1 px-4 max-sm:px-2 text-sm max-sm:text-xs border-t",
    detailText: "text-sm ",
    priceDropBtn:
      "bg-blue-500 hover:bg-blue-700 text-white p-2 max-sm:p-1 rounded",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricingNeeded, setPricingNeeded] = useState(false);
  const [pricingNeededFor, setPricingNeededFor] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (productId) => {
    console.log("handledelete", productId);
    await deleteProduct(productId);
  };

  function handleEdit() {
    navigate(
      generatePathWithParams(ROUTES.admin.updateProduct, data.uniqueURL)
    );
  }
  function openDeleteModel() {
    setIsModalOpen(true);
  }

  // async function checkPendingPrices() {
  //   console.log("pendingPricingMobiles",pendingPricingMobiles);
  //   return pendingPricingMobiles.find((product) => {
  //     console.log("checkPendingPrices :-", product.productName, ":", data.name);
  //     if (product.productName === data.name) return product.variants;
  //     return [];
  //   });
  // }

  const checkPendingPrices = async () => {
    // console.log("pendingPricingMobiles", pendingPricingMobiles);

    const product = pendingPricingMobiles.find((product) => {
      return product.productName === data.name;
    });

    return product ? product.variants : [];
  };

  useEffect(() => {
    async function checkPricing() {
      if (MOBILE_CATEGORY) {
        let check = await checkPendingPrices();
        // console.log("check", check);
        setPricingNeededFor(check);
        if (check?.length > 0) setPricingNeeded(true);
      }
    }

    checkPricing();
  }, [data, pendingPricingMobiles]);

  // console.log(pricingNeeded, pricingNeededFor);

  return (
    <>
      <div
        className={`relative w-full shadow flex flex-col justify-center items-center cursor-pointer rounded-md pt-3 max-sm:pt-2 
              text-center text-sm max-sm:text-[10px] border ${
                pricingNeeded && "border-yellow-500"
              }`}
      >
        {pricingNeeded && (
          <div className="w-full border-b pb-2 text-yellow-500 flex justify-center items-center gap-1">
            <p className="font-extrabold">WARNING:- </p>
            <p>Pricing needed for Variants </p>
            {pricingNeededFor.map((item, i) => (
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
            {/* Category Name and Image */}
            <ItemWithImage
              label={"Category"}
              text={data.category.name}
              image={data.category.image}
              product={false}
            />

            {/* Brand Name and Image */}
            <ItemWithImage
              label={"Brand"}
              text={data.brand.name}
              image={data.brand.image}
              product={false}
            />
          </div>

          {/* Product Name and Image */}
          <ItemWithImage
            label={"Product"}
            text={data.name}
            image={data.image}
            product={true}
            status={data.status}
          />

          {/* Variant & Price */}
          <div className="w-full flex flex-col items-center gap-1">
            <p className="max-sm:text-[10p">
              {MOBILE_CATEGORY ? "Variant & Price" : "Price"}
            </p>
            {data.variants.map((variant, i) => (
              <div
                key={`${variant.id}-${i}`}
                className={`flex ${
                  data.category.name === "Mobile" ? "gap-2 justify-center" : ""
                }`}
              >
                {data.category.name === "Mobile" ? (
                  <>
                    <VariantDetail label="Name" value={variant.name} />
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
            {data.category.name === "Mobile" ? (
              <div className="flex flex-col items-center gap-2 max-sm:gap-1">
                <div>
                  <select
                    onChange={(e) =>
                      setDeductionSelected({
                        [data.id]: e.target.value,
                      })
                    }
                    className="border-2 border-blue-500 rounded"
                  >
                    <option value="">Variant</option>
                    {data.variantDeductions.map((variantDeduction, index) => (
                      <option
                        key={`${variantDeduction.id}-${index}`}
                        value={variantDeduction.variantName}
                      >
                        {variantDeduction.variantName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {deductionSelected[data.id] && (
                    <Link
                      to={`/admin/products/product-questions/${
                        data.uniqueURL
                      }?variant=${deductionSelected[data.id]}`}
                    >
                      <button className={`${style.priceDropBtn}`}>
                        Price Drop
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to={`/admin/products/product-questions/${data.uniqueURL}?t=${data.category.name}`}
              >
                <button className={`${style.priceDropBtn}`}>Price Drop</button>
              </Link>
            )}
          </div>
        </div>

        <div className="m-2 text-[14px]">
          Uniqur URL:
          <strong className="text-[16px]"> {data.uniqueURL}</strong>
        </div>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Edit"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={openDeleteModel}
          name={data.name.slice(0, 16)}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        itemToDelete={data.id}
        title="Confirm Deletion"
        detail={`You are about to delete ${data.name}, ${data?.category?.name} Product.`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default ProductCard;

const ItemWithImage = ({ label, image, text, product, status }) => (
  <div className="w-full flex flex-col items-center gap-1">
    <p>{label}</p>
    <img
      src={import.meta.env.VITE_APP_BASE_URL + image}
      alt={text}
      className={`w-[60px] h-fit mx-auto max-sm:w-[30px] ${
        !product && "max-sm:hidden"
      }`}
      loading="lazy" // Native lazy loading
    />
    <span
      className={`font-semibold m-0 p-0 ${
        text.length > 16 && "max-sm:text-[8.5px]"
      }`}
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

// Helper Component for Rendering Variant Details
const VariantDetail = ({ label, value }) => (
  <div>
    <p className="max-sm:hidden text-xs max-sm:text-[10p text-gray-500">
      {label}
    </p>
    <span className="max-sm:text-[9px]">{value}</span>
  </div>
);

// edit & delete
{
  //   <div className="w-full h-fit flex justify-around items-center">
  //   <button
  //     className={`w-full ${style.btnStyle} text-blue-600 border-r`}
  //     onClick={() => {
  //       navigate();
  //     }}
  //   >
  //     <span className="tracking-[5px] max-sm:tracking-[4px] max-sm:text-[10px]">
  //       Edit {data.name.slice(0, 16)}
  //     </span>
  //     <span>
  //       <FaEdit />
  //     </span>
  //   </button>
  //   <button
  //     className={`${style.btnStyle} text-red-600 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-1000`}
  //     onClick={() => {}}
  //   >
  //     <span className="tracking-widest">Delete</span>
  //     <span>
  //       <MdDeleteForever />
  //     </span>
  //   </button>
  // </div>
}
