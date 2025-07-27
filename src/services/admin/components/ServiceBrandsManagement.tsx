import { FC, useState } from "react";
import { Button, FlexBox, FormInput } from "@components/general";
import {
  useCreateServiceBrandMutation,
  useDeleteServiceBrandMutation,
  useGetServiceCategoriesQuery,
  useLazyGetServiceBrandByCategoryQuery,
  useUploadServiceImageMutation,
} from "@features/api";
import { IServiceBrand } from "@features/api/servicesApi/types";
import { DeleteForeverIcon, EditIcon } from "@icons";

export const ServiceBrandsManagement: FC = () => {
  const [getBrands, { data: brands, isLoading }] =
    useLazyGetServiceBrandByCategoryQuery();

  const [deleteBrand, { isLoading: isDeleting }] =
    useDeleteServiceBrandMutation();

  const { data: serviceCategories } = useGetServiceCategoriesQuery();
  const [createBrand] = useCreateServiceBrandMutation();

  const [uploadImage, { isLoading: isUploading }] =
    useUploadServiceImageMutation();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<IServiceBrand>({
    serviceCategoryId: "",
    name: "",
    uniqueURL: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this brand?")) {
      try {
        await deleteBrand(id).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.uniqueURL ||
      !formData.serviceCategoryId ||
      !imageFile
    ) {
      alert("All fields including image are required.");
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploaded = await uploadImage(uploadFormData).unwrap();

      await createBrand({
        ...formData,
        image: uploaded.image, // like "/uploads/services/myimage.png"
      });

      setFormData({
        serviceCategoryId: "",
        name: "",
        uniqueURL: "",
      });
    } catch (error) {
      console.log("Error while creating service brand!", error);
    }
  };

  if (isLoading) return <p>Loading brands...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white rounded-xl shadow"
      >
        <div className="flex flex-col items-start gap-1">
          <label>Category:</label>
          <select
            className="w-full py-2 border-2 p-1 rounded-lg text-lg max-sm:text-sm"
            value={formData.serviceCategoryId}
            onChange={async (e) => {
              const { value } = e.target;
              setFormData({
                ...formData,
                serviceCategoryId: value,
              });

              await getBrands(value);
            }}
            required
          >
            <option value="">Select a category</option>
            {serviceCategories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          label="Brand Name"
          placeholder="Brand Name"
          required
        />
        <FormInput
          name="uniqueURL"
          value={formData.uniqueURL}
          onChange={handleChange}
          className="input"
          label="Unique URL"
          placeholder="Unique URL"
          required
        />

        <div className="grid grid-cols-2 items-center">
          <label htmlFor="image" className="text-sm">
            Select Brand Image:
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="max-sm:text-xs"
            required
          />
        </div>

        <Button variant="greenary" type="submit">
          Add Brand
        </Button>
      </form>

      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Brand List</h2>
        {brands?.length === 0 ? (
          <p className="text-gray-500">No brands found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {brands?.map((brand: IServiceBrand) => (
              <li
                key={brand._id}
                className="flex items-center justify-between py-2"
              >
                <FlexBox gap={2}>
                  <p className="font-medium">{brand.name}</p>
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}${brand?.image}`}
                    alt={brand?.name}
                    className="w-[60px]"
                  />
                </FlexBox>

                <div className="flex gap-3">
                  <button
                    // onClick={() => setEditBrand(brand)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <EditIcon size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(brand._id!)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800"
                  >
                    <DeleteForeverIcon size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
