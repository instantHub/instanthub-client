import { FC, useState } from "react";
import {
  Button,
  FlexBox,
  FormInput,
  Modal,
  Typography,
} from "@components/general";
import {
  useCreateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
  useGetServiceCategoriesQuery,
  useUploadServiceImageMutation,
} from "@features/api";
import { IServiceCategory } from "@features/api/servicesApi/types";
import { DeleteForeverIcon, EditIcon } from "@icons";

export const ServiceCategoryManagement = () => {
  const [createCategory] = useCreateServiceCategoryMutation();
  const { data: categories, isLoading } = useGetServiceCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteServiceCategoryMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadServiceImageMutation();

  const [formData, setFormData] = useState<Partial<IServiceCategory>>({
    name: "",
    inspectionCharges: 0,
    status: "active",
    uniqueURL: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<IServiceCategory | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this Category?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const showModal = (): void => {
    setIsEditing(true);
  };

  const closeModal = (): void => {
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.uniqueURL || !imageFile) {
      alert("All fields including image are required.");
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploaded = await uploadImage(uploadFormData).unwrap();

      await createCategory({
        ...formData,
        image: uploaded.image, // like "/uploads/services/myimage.png"
      });

      setFormData({
        name: "",
        inspectionCharges: 0,
        status: "active",
        uniqueURL: "",
      });
    } catch (error) {
      console.log("Error while creating service brand!", error);
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-white rounded-xl shadow"
        >
          <FormInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            label="Category Name"
            placeholder="Category Name"
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
          <FormInput
            name="inspectionCharges"
            type="number"
            value={formData.inspectionCharges || ""}
            onChange={handleChange}
            className="input"
            label="Inspection Charges"
            placeholder="Inspection Charges"
          />

          <div className="grid grid-cols-2 items-center">
            <label htmlFor="image" className="text-sm">
              Select Category Image:
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
            Add Category
          </Button>
        </form>

        <div className="border p-4 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">Categories List</h2>
          {categories?.length === 0 ? (
            <p className="text-gray-500">No categories found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories?.map((category: IServiceCategory) => (
                <li
                  key={category._id}
                  className="flex items-center justify-between py-2"
                >
                  <FlexBox gap={2}>
                    <p className="font-medium">{category.name}</p>
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}${
                        category?.image
                      }`}
                      alt={category?.name}
                      className="w-[60px]"
                    />
                  </FlexBox>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        showModal();
                        setSelectedCategory(category);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <EditIcon size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id!)}
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

      <Modal isOpen={isEditing} onClose={closeModal}>
        <ServiceCategoryForm category={selectedCategory} />
      </Modal>
    </>
  );
};

interface IServiceCategoryFormProps {
  category: IServiceCategory | null;
}

// TODO: Need to validate update func and update the data - Currently not used
export const ServiceCategoryForm: FC<IServiceCategoryFormProps> = ({
  category,
}) => {
  const [createCategory] = useCreateServiceCategoryMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadServiceImageMutation();

  const [formData, setFormData] = useState<Partial<IServiceCategory>>({
    name: category ? category.name : "",
    inspectionCharges: category ? category.inspectionCharges : 0,
    status: category ? category.status : "active",
    uniqueURL: category ? category.uniqueURL : "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.uniqueURL || !imageFile) {
      alert("All fields including image are required.");
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploaded = await uploadImage(uploadFormData).unwrap();

      await createCategory({
        ...formData,
        image: uploaded.image, // like "/uploads/services/myimage.png"
      });

      setFormData({
        name: "",
        inspectionCharges: 0,
        status: "active",
        uniqueURL: "",
      });
    } catch (error) {
      console.log("Error while creating service brand!", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Edit Category</Typography>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white rounded-xl shadow"
      >
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          label="Category Name"
          placeholder="Category Name"
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
        <FormInput
          name="inspectionCharges"
          type="number"
          value={formData.inspectionCharges || ""}
          onChange={handleChange}
          className="input"
          label="Inspection Charges"
          placeholder="Inspection Charges"
        />
        <div className="grid grid-cols-2 items-center">
          <label htmlFor="image" className="text-sm">
            Select Category Image:
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
          Add Category
        </Button>
      </form>
    </div>
  );
};
