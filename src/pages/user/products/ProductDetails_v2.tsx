import { Breadcrumbs } from "@components/user";
import SellContent from "@components/user/static/SellContent";
import { useGetProductDetailsQuery } from "@features/api";
import { IVariants } from "@features/api/productsApi/types";
import { ArrowRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const ProductDetails2 = () => {
  const { productUniqueURL } = useParams<{ productUniqueURL: string }>();

  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productUniqueURL!);

  const [selectedVariant, setSelectedVariant] = useState<IVariants | null>(
    null
  );

  // Auto-select variant based on category type
  useEffect(() => {
    if (productDetails) {
      const isMultiVariant = productDetails.category.categoryType.multiVariants;

      if (!isMultiVariant && productDetails.variants.length > 0) {
        // Auto-select first variant for non-multiVariant products
        setSelectedVariant(productDetails?.variants[0]);
      }
    }
  }, [productDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-red-600">
              Sorry, we couldn't load the product details.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isMultiVariant = productDetails.category.categoryType.multiVariants;
  const isButtonEnabled = selectedVariant !== null;

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="w-[80%] mx-auto my-5 max-md:w-[98%] max-sm:my-5">
      {/* Hero Section with Breadcrumb */}

      <p className="pb-5 max-sm:px-2 text-xl font-bold text-wrap max-sm:text-sm max-sm:font-semibold">
        <span>
          Sell your{" "}
          {`${productDetails?.brand?.name} ${name} ${productDetails?.category?.name} `}{" "}
          for Instant Cash
        </span>
      </p>

      <Breadcrumbs />

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-5">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Section */}
            {/* <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 flex items-center justify-center"> */}
            <div className="bg-white relative p-8 md:p-12 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-600/1 blur-3xl rounded-full"></div>
                <img
                  src={
                    import.meta.env.VITE_APP_BASE_URL + productDetails?.image
                  }
                  alt={productDetails.name}
                  className="relative z-10 w-full max-w-sm h-auto object-contain drop-shadow-2x"
                />
              </div>

              {/* Brand Badge */}
              <div className="z-20 absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <p className="text-sm font-semibold text-gray-800">
                  {productDetails.brand.name}
                </p>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              {/* Product Name & Category */}
              <div className="mb-6">
                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {productDetails.category.name}
                </div>
                <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {productDetails.name}
                </h1>
                <p className="text-gray-600 text-sm">
                  Sell your device and get instant cash
                </p>
              </div>

              {/* Price Display */}
              {selectedVariant && (
                <div className="mb-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Up to</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-4xl font-bold text-emerald-600">
                      ₹{selectedVariant.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-lg">/-</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    *Click on Get Exact Value to calculate your product's price
                  </p>
                </div>
              )}

              {/* Variant Selection */}
              {isMultiVariant ? (
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Select Configuration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {productDetails.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedVariant?.id === variant.id
                            ? "border-emerald-600 bg-emerald-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-gray-900">
                            {variant.name}
                          </p>
                          {selectedVariant?.id === variant.id && (
                            <div className="bg-emerald-600 rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Configuration</p>
                    <p className="font-semibold text-gray-900">
                      Select in the next steps
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="space-y-4">
                {isButtonEnabled ? (
                  <Link
                    to={`/sell/deductions?product=${productDetails.uniqueURL}&variant=${selectedVariant.name}`}
                    className="flex items-center justify-center gap-2 w-full text-lg font-semibold bg-emerald-600 text-white px-6 py-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Exact Value
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full text-lg font-semibold bg-gray-300 text-gray-500 px-6 py-4 rounded-xl cursor-not-allowed"
                  >
                    Select a variant to continue
                  </button>
                )}

                <div className="mx-auto py-1 mt-2 px-2 w-3/4 bg-yellow-200 max-sm:w-full">
                  <p className="text-xs max-sm:text-[10px] opacity-70">
                    The above pricing is subject to change based on the
                    product's condition. The final pricing offer will be
                    provided after the entire product has been inspected.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {[
                    { icon: "💰", text: "Best Price" },
                    { icon: "⚡", text: "Instant Payment" },
                    { icon: "🔒", text: "100% Safe" },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl mb-1">{feature.icon}</div>
                      <p className="text-xs text-gray-600 font-medium">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Free Pickup",
              desc: "We'll pick up from your doorstep at no extra cost",
              icon: "🚚",
            },
            {
              title: "Instant Payment",
              desc: "Get paid immediately after device verification",
              icon: "💳",
            },
            {
              title: "Data Security",
              desc: "Your data is completely erased safely",
              icon: "🛡️",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <SellContent />
    </div>
  );
};
