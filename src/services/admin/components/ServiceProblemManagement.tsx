import { FC, useState } from "react";
import { Button, FlexBox, FormInput } from "@components/general";
import {
  useCreateServiceProblemMutation,
  useDeleteServiceProblemMutation,
  useGetServiceCategoriesQuery,
  useLazyGetServiceProblemsByCategoryQuery,
  useUploadServiceImageMutation,
} from "@features/api";
import { IServiceProblem } from "@features/api/servicesApi/types";
import { DeleteForeverIcon, EditIcon } from "@icons";

export const ServiceProblemManagement: FC = () => {
  const [getProblems, { data: problems, isLoading }] =
    useLazyGetServiceProblemsByCategoryQuery();
  const [deleteProblem, { isLoading: isDeleting }] =
    useDeleteServiceProblemMutation();

  const { data: serviceCategories } = useGetServiceCategoriesQuery();
  const [createServiceProblem] = useCreateServiceProblemMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadServiceImageMutation();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<IServiceProblem>({
    serviceCategoryId: "",
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      try {
        await deleteProblem(id).unwrap();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !imageFile) {
      alert("All fields including image are required.");
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploaded = await uploadImage(uploadFormData).unwrap();

      await createServiceProblem({
        ...formData,
        image: uploaded.image, // like "/uploads/services/myimage.png"
      });

      setFormData({
        serviceCategoryId: "",
        name: "",
        description: "",
        price: 0,
      });
    } catch (error) {
      console.log("Error while creating service brand!", error);
    }
  };

  if (isLoading) return <p>Loading problems...</p>;

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
              await getProblems(value);
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
          label="Problem Name"
          placeholder="Problem Name"
          required
        />

        <FormInput
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          label="Description"
          placeholder="Description"
          required
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
          Add Problem
        </Button>
      </form>

      <div className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Problems List</h2>
        {problems?.length === 0 ? (
          <p className="text-gray-500">No problems found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {problems?.map((problem: IServiceProblem) => (
              <li
                key={problem._id}
                className="flex items-center justify-between py-2"
              >
                <FlexBox gap={2}>
                  <p className="font-medium">{problem.name}</p>
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}${
                      problem?.image
                    }`}
                    alt={problem?.name}
                    className="w-[60px]"
                  />
                </FlexBox>

                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <EditIcon size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(problem._id!)}
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
