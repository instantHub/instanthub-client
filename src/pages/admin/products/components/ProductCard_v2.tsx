import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Edit,
  Trash2,
  DollarSign,
  Package,
  Tag,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useDeleteProductMutation } from "@api";
import { Button, FlexBox } from "@components/general";
import { ConfirmationModal } from "@components/admin";
import { ROUTES } from "@routes";
import { IProduct } from "@features/api/productsApi/types";

interface ProductCardProps {
  product: IProduct;
  isPricingPending?: any;
}

export const ProductCard2: React.FC<ProductCardProps> = ({
  product,
  isPricingPending,
}) => {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");

  const isMultiVariant = product.category.categoryType.multiVariants;

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = () => {
    // navigate(`${ROUTES.admin.updateProduct}/${product.uniqueURL}`);
    navigate(
      `${ROUTES.admin.updateProduct.replace(":productSlug", product.uniqueURL)}`
    );
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 ${
          isPricingPending ? "border-yellow-400" : "border-gray-200"
        }`}
      >
        {/* Pricing Alert */}
        {isPricingPending && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
            <FlexBox gap={2} align="center">
              <AlertTriangle
                className="text-yellow-600 flex-shrink-0"
                size={16}
              />
              <p className="text-xs text-yellow-800">
                <span className="font-semibold">Pricing needed:</span>{" "}
                {isPricingPending.variants.join(", ")}
              </p>
            </FlexBox>
          </div>
        )}

        <div className="p-4">
          {/* Header Section */}
          <FlexBox
            gap={3}
            align="start"
            className="pb-2 mb-4 max-md:flex-col border-b"
          >
            <FlexBox gap={2}>
              {/* Product Image */}
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${product.image}`}
                alt={product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-50 flex-shrink-0"
                loading="lazy"
              />

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-wrap sm:text-base font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">URL:</span> {product.uniqueURL}
                </p>
                <FlexBox gap={2} className="mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </FlexBox>
              </div>
            </FlexBox>

            {/* Category & Brand */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4">
              <InfoItem
                icon={Package}
                label="Category"
                value={product.category.name}
                image={product.category.image}
              />
              <InfoItem
                icon={Tag}
                label="Brand"
                value={product.brand.name}
                image={product.brand.image}
              />
            </div>
          </FlexBox>

          {/* Variants & Pricing */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={16} />
              {isMultiVariant ? "Variants & Pricing" : "Pricing"}
            </h4>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2">
              {product.variants.map((variant) => (
                <FlexBox
                  key={variant.id}
                  justify="between"
                  gap={2}
                  className="text-xs bg-gray-50 px-3 py-2 rounded"
                >
                  {isMultiVariant && (
                    <span className="text-gray-600">{variant.name}</span>
                  )}
                  <span className="font-semibold text-gray-900">
                    ₹{variant.price}
                  </span>
                </FlexBox>
              ))}
            </div>
          </div>

          {/* Price Drop Section */}
          <FlexBox className="gap-2 justify-evenly mb-4 pb-4 border-b">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Price Drop Configuration
            </h4>
            {isMultiVariant ? (
              <FlexBox gap={2} className="flex-wrap flex-1">
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Variant</option>
                  {product.variantDeductions.map((vd) => (
                    <option key={vd.id} value={vd.variantName}>
                      {vd.variantName}
                    </option>
                  ))}
                </select>
                {selectedVariant && (
                  <Link
                    to={`/admin/products/product-questions/mv/${product.uniqueURL}?variant=${selectedVariant}`}
                  >
                    <Button size="sm" variant="secondary">
                      Configure
                    </Button>
                  </Link>
                )}
              </FlexBox>
            ) : (
              <Link
                to={`/admin/products/product-questions/pb/${product.uniqueURL}?t=${product.category.name}`}
              >
                <Button size="sm" variant="secondary" fullWidth>
                  Configure Price Drop
                </Button>
              </Link>
            )}
          </FlexBox>

          {/* Actions */}
          <FlexBox gap={2} className="flex-wrap">
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              leftIcon={<Edit size={16} />}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="danger"
              size="sm"
              leftIcon={<Trash2 size={16} />}
              className="flex-1"
            >
              Delete
            </Button>
          </FlexBox>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={product.id}
        title="Delete Product"
        detail={`${product.name} - ${product.category.name}`}
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </>
  );
};

// Helper Component
interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  image: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  label,
  value,
  image,
}) => (
  <div>
    <FlexBox gap={1} align="center" className="mb-1">
      <Icon size={14} className="text-gray-400" />
      <p className="text-xs text-gray-500">{label}</p>
    </FlexBox>
    <FlexBox gap={2} align="center">
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL}${image}`}
        alt={value}
        className="w-8 h-8 object-contain rounded bg-gray-50"
        loading="lazy"
      />
      <span className="text-sm font-medium text-gray-900 truncate">
        {value}
      </span>
    </FlexBox>
  </div>
);
