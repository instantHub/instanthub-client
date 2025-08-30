import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useLazyGetBrandSeriesQuery,
  useLazyGetBrandsByCategoryQuery,
} from "@api";
import { toast } from "react-toastify";
import { FormCardContainer, FormFooterWrapper } from "@components/admin";
import { ROUTES } from "@routes";
import { slugify } from "@utils/general";
import {
  Button,
  CustomSelect,
  FlexBox,
  FormInput,
  Typography,
} from "@components/general";
import { ICategoryResponse } from "@features/api/categoriesApi/types";
import { IBrandResponse } from "@features/api/brandsApi/types";
import { useNavigate } from "react-router-dom";
import { ISeriesResponse } from "@features/api/seriesApi/types";

// ---------- Types ----------
interface Variant {
  name: string;
  price: string;
}

type TStatus = "Active" | "Blocked";

const StatusData: { name: TStatus }[] = [
  { name: "Active" },
  { name: "Blocked" },
];

export const CreateProduct = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryResponse | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<IBrandResponse | null>(
    null
  );
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [prodName, setProdName] = useState<string>("");
  const [uniqueURL, setUniqueURL] = useState<string>("");
  const [status, setStatus] = useState<any>({ name: "Active" });
  const [selectedSeries, setSelectedSeries] = useState<ISeriesResponse | null>(
    null
  );
  const [seriesYes, setSeriesYes] = useState<boolean>(false);

  const [variants, setVariants] = useState<Variant[]>([
    { name: "", price: "" },
  ]);

  const { data: categoryData } = useGetCategoriesQuery();
  const [getBrandsByCategory, { data: brandData }] =
    useLazyGetBrandsByCategoryQuery();
  const [getSeriesByBrand, { data: seriesData }] = useLazyGetBrandSeriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct, { isLoading: productCreationLoading }] =
    useCreateProductMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleVariantChange = (
    index: number,
    key: keyof Variant,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [key]: value } : v))
    );
  };

  const addVariant = () =>
    setVariants((prev) => [...prev, { name: "", price: "" }]);

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- File Upload ----------
  const uploadFileHandler = async (): Promise<string | null> => {
    if (!imageSelected) return null;
    const formData = new FormData();
    formData.append("image", imageSelected);

    try {
      const res = await uploadProductImage(formData).unwrap();
      return res.image as string;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !selectedBrand) {
      toast.warning("Please Select Category & Brand To Proceed..!");
      return;
    }

    // Validation: ensure variants filled
    const isEmptyVariant = selectedCategory?.categoryType?.multiVariants
      ? variants.some((v) => !v.name.trim() || !v.price.trim())
      : variants.some((v) => !v.price.trim());

    if (isEmptyVariant) {
      toast.warning("Please fill out all variant fields");
      return;
    }

    if (!status) {
      toast.warning("Please Select Status To Proceed..!");
      return;
    }

    const imageURL = await uploadFileHandler();
    if (!imageURL) return;

    const productsData = {
      name: prodName,
      uniqueURL,
      image: imageURL,
      category: selectedCategory.id,
      brand: selectedBrand.id,
      series: seriesYes ? selectedSeries?.id : null,
      variants,
      status: status.name,
    };
    console.log("productsData handle submit:", productsData);

    try {
      const productCreated = await createProduct(
        JSON.stringify(productsData)
      ).unwrap();

      if (
        !productCreated.success &&
        productCreated.data === "Duplicate productName"
      ) {
        toast.error(productCreated.message);
        return;
      }

      toast.success("Product created successfully!");

      // Reset form
      setImageSelected(null);
      setVariants([{ name: "", price: "" }]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.required = true;
      }
    } catch (error: any) {
      toast.error(error?.message || "Error creating product");
    }
  };

  // ---------- Effects ----------
  useEffect(() => {
    if (!selectedSeries) setSeriesYes(false);
    else setSeriesYes(true);
  }, [selectedSeries]);

  useEffect(() => {
    if (selectedCategory) getBrandsByCategory(selectedCategory.uniqueURL);
    if (selectedBrand) getSeriesByBrand(selectedBrand.uniqueURL);
  }, [selectedCategory, selectedBrand]);

  return (
    <FormCardContainer
      title="Create Product"
      description="Fill in the details to add a new product."
      headerAction={
        <Button
          shape="square"
          onClick={() => navigate(ROUTES.admin.productsList)}
        >
          Product List
        </Button>
      }
    >
      <form
        method="post"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <CustomSelect
            label="Category"
            options={categoryData}
            value={selectedCategory}
            onChange={setSelectedCategory}
            displayKey="name"
            valueKey="id"
            placeholder="Choose a category..."
            clearable
            required
          />

          {/* Brand */}
          <CustomSelect
            label="Brand"
            options={brandData}
            value={selectedBrand}
            onChange={setSelectedBrand}
            displayKey="name"
            valueKey="id"
            placeholder="Choose a brand..."
            clearable
            required
          />

          {/* Series */}
          <CustomSelect
            label="Series"
            options={seriesData}
            value={selectedSeries}
            onChange={setSelectedSeries}
            displayKey="name"
            valueKey="id"
            placeholder="Choose a series..."
          />

          {/* Product Name */}
          <FormInput
            name="uniqueURL"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            label="Product Name :"
            placeholder="Enter Product Name"
            required
          />

          {/* Unique URL */}
          <FormInput
            name="uniqueURL"
            value={uniqueURL}
            onChange={(e) => setUniqueURL(slugify(e.target.value))}
            label="Make Unique URL :"
            placeholder="Enter Unique URL"
            required
          />

          {/* File Input */}
          <div className="flex flex-col">
            <label htmlFor="fileInput">File Input :</label>
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImageSelected(e.target.files?.[0] || null)
              }
              required
            />
            {imageSelected && <p>Selected file: {imageSelected.name}</p>}
          </div>
        </div>

        <CustomSelect
          label="Status"
          options={StatusData}
          value={status}
          onChange={setStatus}
          displayKey="name"
          valueKey="name"
          placeholder="Choose a status..."
          clearable
          required
        />

        {selectedCategory?.categoryType?.multiVariants ? (
          <FlexBox direction="col" align="start">
            <Typography variant="h4">Add Variants:</Typography>
            {variants.map((variant, index) => (
              <FlexBox key={index} gap={2} className="my-2">
                <FormInput
                  label="Variant Name"
                  type="text"
                  value={variant.name}
                  placeholder="Variant name"
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                  required
                />
                <FormInput
                  label="Variant Price"
                  type="number"
                  value={variant.price}
                  placeholder="Variant price"
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  required
                />
                {variants.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    shape="square"
                    size="sm"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Remove
                  </Button>
                )}
              </FlexBox>
            ))}
            <Button type="button" shape="square" size="sm" onClick={addVariant}>
              Add Variant
            </Button>
          </FlexBox>
        ) : (
          <FlexBox direction="col" justify="start">
            <Typography variant="h4">Add Price:</Typography>
            {variants?.map((variant, index) => (
              <FlexBox key={index} gap={2}>
                <FormInput type="text" value="Price" disabled />
                <FormInput
                  type="number"
                  value={variant.price}
                  placeholder="Enter price"
                  onChange={(e) => {
                    handleVariantChange(index, "price", e.target.value);
                    handleVariantChange(index, "name", "Price");
                  }}
                  required
                />
              </FlexBox>
            ))}
          </FlexBox>
        )}

        <FormFooterWrapper>
          <Button
            type="submit"
            variant="greenary"
            shape="square"
            loading={productCreationLoading}
          >
            Create Product
          </Button>
        </FormFooterWrapper>
      </form>

      {/* Variants Section */}
      {/* <div className="grow-0">
        {selectedCategory?.categoryType?.multiVariants ? (
          <FlexBox className="m-1 flex flex-col items-center">
            <Typography variant="h4">Add Variants:</Typography>
            {variants.map((variant, index) => (
              <FlexBox key={index} gap={2} className="my-2">
                <FormInput
                  label="Variant Name"
                  type="text"
                  value={variant.name}
                  placeholder="Variant name"
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                  required
                />
                <FormInput
                  label="Variant Price"
                  type="number"
                  value={variant.price}
                  placeholder="Variant price"
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  required
                />
                {variants.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    shape="square"
                    size="sm"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Remove
                  </Button>
                )}
              </FlexBox>
            ))}
            <Button
              type="button"
              variant="greenary"
              shape="square"
              size="md"
              onClick={addVariant}
            >
              Add Variant
            </Button>
          </FlexBox>
        ) : (
          <FlexBox direction="col" className="gap-2">
            <Typography variant="h4">Add Price:</Typography>
            {variants?.map((variant, index) => (
              <FlexBox key={index} gap={2}>
                <FormInput type="text" value="Price" disabled />
                <FormInput
                  type="number"
                  value={variant.price}
                  placeholder="Enter price"
                  onChange={(e) => {
                    handleVariantChange(index, "price", e.target.value);
                    handleVariantChange(index, "name", "Price");
                  }}
                  required
                />
              </FlexBox>
            ))}
          </FlexBox>
        )}
      </div> */}
    </FormCardContainer>
  );
};
