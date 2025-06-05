import React, { useEffect, useRef, useReducer } from "react";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "@api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitButton } from "@components/admin/SubmitButton";
// import BackButton from "@components/BackButton";
import CardHeader from "@components/admin/CardHeader";
import { Loading } from "@components/user";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general/slugify";

const initialState = {
  category: "",
  brand: "",
  prodName: "",
  uniqueURL: "",
  imageSelected: "",
  newImgSelected: false,
  status: "",
  oldVariants: [],
  variants: [],
  variantLen: 0,
  updatedVriantLen: 0,
};

function reducer(state, action) {
  // console.log("Reducer Function");
  const { type, value } = action;
  // console.log("type, value", type, value);
  switch (type) {
    case "initial":
      return { ...value };
    case "name":
      return { ...state, prodName: value };
    case "uniqueURL":
      return { ...state, [type]: value };
    case "imageSelected":
      return { ...state, [type]: value };
    case "newImgSelected":
      return { ...state, [type]: value };
    case "status":
      return { ...state, [type]: value };
    case "handleVariantChange":
      const updatedVariants = [...state.variants];
      updatedVariants[value.index][value.key] = value.value;
      return { ...state, variants: updatedVariants };
    case "addVariant":
      return {
        ...state,
        variants: value,
        updatedVriantLen: state.updatedVriantLen + 1,
      };
    case "removeVariant":
      return {
        ...state,
        variants: value,
        updatedVriantLen: state.updatedVriantLen - 1,
      };
    default:
      return state;
  }
}

const UpdateProduct = () => {
  const { productId, productSlug } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("Reducer state:", state, productSlug);

  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: productData, isLoading: productDataLoading } =
    useGetProductDetailsQuery(productSlug);
  console.log("productData", productData);
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const navigate = useNavigate();
  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  // File handler
  const uploadFileHandler = async () => {
    const formData = new FormData();
    formData.append("image", state.imageSelected);

    try {
      const res = await uploadProductImage(formData).unwrap();

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Handle Submit to create Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any variant fields are empty
    const isEmptyVariant = state.variants.some(
      (variant) => variant.name.trim() === "" || variant.price === ""
    );

    if (isEmptyVariant) {
      toast.warning("Please fill out all variant fields");
      return;
    }

    let imageURL;
    if (state.newImgSelected) {
      console.log("image changed");
      imageURL = await uploadFileHandler();
      dispatch({ type: "imageSelected", value: imageURL });
    }
    // console.log("after imageSelected", state.imageSelected);
    // console.log("after imageURL", state.imageURL);

    const updatedProductData = {
      productID: productData.id,
      name: state.prodName,
      uniqueURL: state.uniqueURL,
      //   image: imageSelected ? imageSelected : productData.image,
      image: state.newImgSelected ? imageURL : state.imageSelected,
      category: state.category,
      brand: state.brand,
      status: state.status,
      variants: state.variants,
      oldVariants: state.oldVariants,
    };

    console.log("updatedProductData: ", updatedProductData);

    try {
      const updatedProduct = await updateProduct({
        productSlug,
        data: updatedProductData,
      }).unwrap();

      // productId = product.id;
      console.log("updatedProduct", updatedProduct);
      navigate(-1);
      // productData = updateProduct;

      // Reducer
      // const extractedVariants = updatedProduct?.variants.map((variant) => ({
      //   variantId: variant.id,
      //   name: variant.name,
      //   price: variant.price,
      // }));

      // dispatch({
      //   type: "initial",
      //   value: {
      //     prodName: updatedProduct?.name,
      //     category: updatedProduct?.category.id,
      //     brand: updatedProduct?.brand.id,
      //     uniqueURL: updatedProduct?.uniqueURL,
      //     imageSelected: updatedProduct?.image,
      //     status: updatedProduct?.status,
      //     newImgSelected: false,
      //     variants: extractedVariants,
      //     oldVariants: extractedVariants,
      //     variantLen: extractedVariants?.length,
      //     updatedVriantLen: extractedVariants?.length,
      //   },
      // });

      if (
        !updatedProduct.success &&
        updatedProduct.data === "Duplicate productName"
      ) {
        // setErrorMessage(response.data);
        toast.error(updatedProduct.message);
        return;
      }

      //   console.log("Product created", productCreated);
      toast.success("Product updated successfull..!");
      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      fileInputRef.current.required = true;
    } catch (error) {
      toast.error(error);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (productDataLoading) return;

    const extractedVariants = productData?.variants.map((variant) => ({
      variantId: variant.id,
      name: variant.name,
      price: variant.price,
    }));

    // Reducer
    dispatch({
      type: "initial",
      value: {
        prodName: productData?.name,
        category: productData?.category.id,
        brand: productData?.brand.id,
        uniqueURL: productData?.uniqueURL,
        imageSelected: productData?.image,
        status: productData?.status,
        newImgSelected: false,
        variants: extractedVariants,
        oldVariants: extractedVariants,
        variantLen: extractedVariants?.length,
        updatedVriantLen: extractedVariants?.length,
      },
    });
  }, [productData]);

  if (productDataLoading) return <Loading />;

  return (
    <div className="px-2 pt-[2%] w-full">
      <CardHeader
        location={ROUTES.admin.productsList}
        text="Update Products"
        source="update"
      />

      <div className="flex justify-center max-md:flex-col max-sm:text-sm">
        {/* Product Details */}
        <div className="w-[70%] max-md:w-full grow-1 bg-white border rounded-md shadow-lg">
          {!productDataLoading && (
            <form
              //   method="post"
              className="flex flex-col gap-4 p-5 max-sm:p-3"
              onSubmit={handleSubmit}
            >
              <h2>
                <span>Update Product </span>
                <span className="text-lg max-sm:text-sm font-semibold">
                  {state.prodName}
                </span>
              </h2>
              <hr />

              <div className="grid grid-cols-2 gap-4 max-sm:gap-2 max-sm:grid-cols-1">
                {/* Category and Brand */}
                <div className="col-span-2 max-sm:col-span-1 grid grid-cols-2 max-sm:py-2">
                  <h2>
                    <span>Category </span>
                    <span className="text-lg font-semibold max-sm:text-sm">
                      {productData?.category?.name}
                    </span>
                  </h2>
                  <h2>
                    <span>Brand </span>
                    <span className="text-lg font-semibold max-sm:text-sm">
                      {productData?.brand?.name}
                    </span>
                  </h2>
                </div>

                {/* Product Name - Product Image - Variants */}
                <div className="flex flex-col">
                  {/* Product Name - Product Image */}
                  <div className="flex items-center gap-2 max-sm:flex-col">
                    {/* Product Name */}
                    <div>
                      <label htmlFor="productName">Product Name: </label>
                      <input
                        type="text"
                        id="productName"
                        className=" border p-2 rounded-sm max-sm:p-1"
                        placeholder="Enter Product Name"
                        // value={prodName}
                        value={state.prodName}
                        onChange={(e) => {
                          dispatch({ type: "name", value: e.target.value });
                        }}
                        required
                      />
                    </div>
                    {/* Product Image */}
                    <div className="flex items-center grow-0">
                      <img
                        src={
                          import.meta.env.VITE_APP_BASE_URL +
                          state.imageSelected
                        }
                        alt="ConditionLabel"
                        className="w-[100px] h-[100px] mx-auto"
                      />
                    </div>
                  </div>
                  {/* Variants */}
                  <div className="flex gap-2 text-sm max-sm:text-xs w-full">
                    {state.variants?.map((variant, index) => (
                      <div
                        key={index}
                        className="flex gap-1 border px-1 m-1 rounded-lg"
                      >
                        <span className="opacity-50">{variant.name}</span>
                        <span>-</span>
                        <span className="opacity-50">{variant.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unique URL */}
                <div className="flex flex-col">
                  <label htmlFor="productName">Make Unique URL :</label>
                  <input
                    type="text"
                    id="productName"
                    className=" border p-2 rounded-sm max-sm:p-1"
                    placeholder="Enter Unique URL"
                    value={state.uniqueURL}
                    onChange={(e) => {
                      dispatch({
                        type: "uniqueURL",
                        value: slugify(e.target.value),
                      });
                    }}
                    required
                  />
                </div>

                {/* File Select */}
                <div className="p-2">
                  <label htmlFor="fileInput">File Input :</label>
                  <div className="flex">
                    <div className="flex flex-wrap grow shrink basis-auto w-[1%] items-center">
                      <input
                        type="file"
                        name="productImage"
                        ref={fileInputRef}
                        id="productImage"
                        onChange={(e) => {
                          dispatch({
                            type: "imageSelected",
                            value: e.target.files[0],
                          });
                          dispatch({
                            type: "newImgSelected",
                            value: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label htmlFor="status">Status :</label>
                  <select
                    id="status"
                    name="status"
                    value={state.status}
                    className="border rounded-sm p-2 max-sm:p-1"
                    onChange={(e) => {
                      dispatch({ type: "status", value: e.target.value });
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>
              <div className=" py-3 px-2">
                <SubmitButton loading={updateProductLoading}>
                  Update Product
                </SubmitButton>
              </div>
            </form>
          )}
        </div>

        {/* Variants Data */}
        {/* <div className="w-fit">
          {!productDataLoading && productData?.category.name === "Mobile" ? (
            <div className="m-2 flex flex-col items-center justify-center">
              <h3 className="text-xl inline-block">Add Variants:</h3>
              {state?.variants.map((variant, index) => (
                <div
                  key={index}
                  className="my-2 bg-white flex items-center gap-2 border rounded-md shadow-lg p-2"
                >
                  <div>
                    <input
                      type="text"
                      value={variant.name}
                      placeholder="variant name"
                      onChange={(e) => {
                        dispatch({
                          type: "handleVariantChange",
                          value: {
                            index,
                            key: "name",
                            value: e.target.value,
                          },
                        });
                      }}
                      className="m-1 p-2 border rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      value={variant.price}
                      placeholder="variant price"
                      onChange={(e) => {
                        dispatch({
                          type: "handleVariantChange",
                          value: {
                            index,
                            key: "price",
                            value: e.target.value,
                          },
                        });
                      }}
                      className="m-1 p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    {state.variants.length != 1 && (
                      <button
                        className="bg-red-600 px-2 py-1 text-white rounded-md"
                        onClick={() => {
                          const newVariants = [...state.variants];
                          newVariants.splice(index, 1);
                          dispatch({
                            type: "removeVariant",
                            value: newVariants,
                          });
                        }}
                      >
                        remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  dispatch({
                    type: "addVariant",
                    value: [
                      ...state.variants,
                      { variantId: "New", name: "", price: "" },
                    ],
                  });
                }}
                className="px-3 py-1 bg-emerald-500 text-white rounded-lg"
              >
                Add Variant
              </button>
            </div>
          ) : (
            <div className="m-1 flex flex-col items-center justify-center">
              <h3 className="text-xl inline-block">Add Price:</h3>
              {state.variants.map((variant, index) => (
                <div
                  key={index}
                  className="my-2 bg-white flex items-center gap-2 border rounded-md shadow-lg p-2"
                >
                  <div>
                    <input
                      type="text"
                      value={variant.name}
                      placeholder="variant name"
                      className="m-1 p-2 border rounded-lg"
                      required
                      disabled
                    />
                    <input
                      type="number"
                      value={variant.price}
                      placeholder="variant price"
                      onChange={(e) => {
                        dispatch({
                          type: "handleVariantChange",
                          value: {
                            index,
                            key: "price",
                            value: e.target.value,
                          },
                        });
                      }}
                      className="m-1 p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}

        <div className="w-fit">
          {!productDataLoading && productData?.category.name === "Mobile" ? (
            <VariantSection
              title="Add Variants"
              variants={state.variants}
              dispatch={dispatch}
              isEditable={true}
            />
          ) : (
            <VariantSection
              title="Add Price"
              variants={state.variants}
              dispatch={dispatch}
              isEditable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

const VariantSection = ({ title, variants, dispatch, isEditable }) => {
  const handleInputChange = (index, key, value) => {
    dispatch({
      type: "handleVariantChange",
      value: { index, key, value },
    });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    dispatch({
      type: "removeVariant",
      value: updatedVariants,
    });
  };

  const handleAddVariant = () => {
    dispatch({
      type: "addVariant",
      value: [...variants, { variantId: "New", name: "", price: "" }],
    });
  };

  return (
    <div className="m-2 flex flex-col items-center justify-center">
      <h3 className="text-xl inline-block">{title}:</h3>
      {variants?.map((variant, index) => (
        <div
          key={index}
          className="my-2 bg-white flex items-center gap-2 border rounded-md shadow-lg p-2"
        >
          <div>
            <input
              type="text"
              value={variant.name}
              placeholder="Variant Name"
              onChange={(e) =>
                isEditable && handleInputChange(index, "name", e.target.value)
              }
              className="m-1 p-2 border rounded-lg"
              required
              disabled={!isEditable}
            />
            <input
              type="number"
              value={variant.price}
              placeholder="Variant Price"
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              className="m-1 p-2 border rounded-lg"
              required
            />
          </div>
          {isEditable && variants.length > 1 && (
            <button
              className="bg-red-600 px-2 py-1 text-white rounded-md"
              onClick={() => handleRemoveVariant(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {isEditable && (
        <button
          onClick={handleAddVariant}
          className="px-3 py-1 bg-emerald-500 text-white rounded-lg"
        >
          Add Variant
        </button>
      )}
    </div>
  );
};
