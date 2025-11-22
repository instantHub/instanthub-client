import React, { useEffect, useRef, useReducer, useMemo } from "react";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "@api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "@components/admin";
import { Loading } from "@components/user";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general";
import { Button } from "@components/general";

// Optimized initial state
const initialState = {
  category: "",
  brand: "",
  prodName: "",
  uniqueURL: "",
  imageSelected: "",
  newImgSelected: false,
  status: "Active",
  oldVariants: [],
  variants: [],
  variantLen: 0,
  updatedVriantLen: 0,
};

// Optimized reducer with clearer logic
function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case "INITIALIZE":
      return { ...state, ...value };

    case "UPDATE_FIELD":
      return { ...state, [action.field]: value };

    case "UPDATE_VARIANT":
      const updatedVariants = state.variants.map((variant, idx) =>
        idx === value.index ? { ...variant, [value.key]: value.value } : variant
      );
      return { ...state, variants: updatedVariants };

    case "ADD_VARIANT":
      return {
        ...state,
        variants: [
          ...state.variants,
          { variantId: "New", name: "", price: "" },
        ],
        updatedVriantLen: state.updatedVriantLen + 1,
      };

    case "REMOVE_VARIANT":
      return {
        ...state,
        variants: state.variants.filter((_, idx) => idx !== value),
        updatedVriantLen: state.updatedVriantLen - 1,
      };

    default:
      return state;
  }
}

export const UpdateProduct_V2 = () => {
  const { productId, productSlug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: productData, isLoading: productDataLoading } =
    useGetProductDetailsQuery(productSlug);
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  // Memoize extracted variants
  const extractedVariants = useMemo(() => {
    return (
      productData?.variants?.map((variant) => ({
        variantId: variant.id,
        name: variant.name,
        price: variant.price,
      })) || []
    );
  }, [productData?.variants]);

  // Initialize form data
  useEffect(() => {
    if (productDataLoading || !productData) return;

    dispatch({
      type: "INITIALIZE",
      value: {
        prodName: productData.name,
        category: productData.category.id,
        brand: productData.brand.id,
        uniqueURL: productData.uniqueURL,
        imageSelected: productData.image,
        status: productData.status,
        newImgSelected: false,
        variants: extractedVariants,
        oldVariants: extractedVariants,
        variantLen: extractedVariants.length,
        updatedVriantLen: extractedVariants.length,
      },
    });
  }, [productData, productDataLoading, extractedVariants]);

  // Upload image handler
  const uploadFileHandler = async () => {
    const formData = new FormData();
    formData.append("image", state.imageSelected);

    try {
      const res = await uploadProductImage(formData).unwrap();
      return res.image;
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  // Validate variants
  const validateVariants = () => {
    return state.variants.every(
      (variant) => variant.name.trim() !== "" && variant.price !== ""
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVariants()) {
      toast.warning("Please fill out all variant fields");
      return;
    }

    try {
      let imageURL = state.imageSelected;

      if (state.newImgSelected) {
        imageURL = await uploadFileHandler();
      }

      const updatedProductData = {
        productID: productData.id,
        name: state.prodName,
        uniqueURL: state.uniqueURL,
        image: imageURL,
        category: state.category,
        brand: state.brand,
        status: state.status,
        variants: state.variants,
        oldVariants: state.oldVariants,
      };

      const updatedProduct = await updateProduct({
        productSlug,
        data: updatedProductData,
      }).unwrap();

      if (
        !updatedProduct.success &&
        updatedProduct.data === "Duplicate productName"
      ) {
        toast.error(updatedProduct.message);
        return;
      }

      toast.success("Product updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update product");
      console.error("Update error:", error);
    }
  };

  if (productDataLoading) return <Loading />;

  const isMobileCategory = productData?.category?.name === "Mobile";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <CardHeader
          location={ROUTES.admin.productsList}
          text="Update Product"
          source="update"
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Product Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Product Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update product information and settings
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Category & Brand Display */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium text-gray-900">
                      {productData?.category?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Brand</span>
                    <p className="font-medium text-gray-900">
                      {productData?.brand?.name}
                    </p>
                  </div>
                </div>

                {/* Product Name & Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="Enter product name"
                      value={state.prodName}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "prodName",
                          value: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Image
                    </label>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}${
                          state.imageSelected
                        }`}
                        alt={state.prodName}
                        className="max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Unique URL */}
                <div className="space-y-2">
                  <label
                    htmlFor="uniqueURL"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unique URL
                  </label>
                  <input
                    type="text"
                    id="uniqueURL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="product-url-slug"
                    value={state.uniqueURL}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "uniqueURL",
                        value: slugify(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label
                    htmlFor="productImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Change Image
                  </label>
                  <input
                    type="file"
                    id="productImage"
                    ref={fileInputRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "imageSelected",
                        value: e.target.files[0],
                      });
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "newImgSelected",
                        value: true,
                      });
                    }}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={state.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "status",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                {/* Current Variants Display */}
                {state.variants.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Current Variants
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {state.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                        >
                          <span className="font-medium">{variant.name}</span>
                          <span className="text-emerald-400">•</span>
                          <span>${variant.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="greenary"
                    loading={updateProductLoading}
                    fullWidth
                  >
                    Update Product
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Variants Section */}
          <div className="lg:col-span-1">
            <VariantSection
              title={isMobileCategory ? "Manage Variants" : "Update Price"}
              variants={state.variants}
              dispatch={dispatch}
              isEditable={isMobileCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimized Variant Section Component
const VariantSection = ({ title, variants, dispatch, isEditable }) => {
  const handleInputChange = (index, key, value) => {
    dispatch({
      type: "UPDATE_VARIANT",
      value: { index, key, value },
    });
  };

  const handleRemoveVariant = (index) => {
    dispatch({
      type: "REMOVE_VARIANT",
      value: index,
    });
  };

  const handleAddVariant = () => {
    dispatch({ type: "ADD_VARIANT" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {isEditable
            ? "Add or edit product variants"
            : "Update pricing information"}
        </p>
      </div>

      <div className="p-6 space-y-4">
        {variants?.map((variant, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3 hover:border-emerald-300 transition"
          >
            <div className="space-y-3">
              <input
                type="text"
                value={variant.name}
                placeholder="Variant name (e.g., 128GB, Blue)"
                onChange={(e) =>
                  isEditable && handleInputChange(index, "name", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={!isEditable}
              />
              <input
                type="number"
                value={variant.price}
                placeholder="Price"
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
                min="0"
                step="0.01"
              />
            </div>

            {isEditable && variants.length > 1 && (
              <button
                type="button"
                className="w-full px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                onClick={() => handleRemoveVariant(index)}
              >
                Remove Variant
              </button>
            )}
          </div>
        ))}

        {isEditable && (
          <button
            type="button"
            onClick={handleAddVariant}
            className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
          >
            + Add Variant
          </button>
        )}
      </div>
    </div>
  );
};
