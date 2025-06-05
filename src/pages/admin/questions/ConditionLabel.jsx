import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useGetConditionsQuery,
  useCreateConditionLabelsMutation,
  useUploadConditionLabelsImageMutation,
} from "@api";

import ListButton from "@components/admin/ListButton";
import {
  filterCategory,
  filterCondition,
} from "@features/adminSlices/filterSlice";
import { ROUTES } from "@routes";

const initialFormState = {
  category: "",
  brand: "",
  conditionNameId: "",
  conditionLabel: "",
  conditionLabelImg: undefined,
};

const CreateConditionLabels = () => {
  const { data: categoryData = [], isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const { data: conditionsData = [], isLoading: conditionsLoading } =
    useGetConditionsQuery();

  const [uploadImage] = useUploadConditionLabelsImageMutation();
  const [createConditionLabel, { isLoading: isSubmitting }] =
    useCreateConditionLabelsMutation();

  const [formData, setFormData] = useState(initialFormState);
  const [conditionSelection, setConditionSelection] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const processorId = useMemo(() => {
    return conditionsData.find(
      (cond) =>
        cond.conditionName === "Processor" &&
        cond.category.id === formData.category
    )?.id;
  }, [conditionsData, formData.category]);

  // Reset brand when condition is not Processor
  useEffect(() => {
    if (formData.conditionNameId !== processorId) {
      setFormData((prev) => ({ ...prev, brand: "" }));
    }
  }, [formData.conditionNameId, processorId]);

  const handleImageUpload = useCallback(async () => {
    try {
      const form = new FormData();
      form.append("image", formData.conditionLabelImg);
      const response = await uploadImage(form).unwrap();
      return response.image;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
    }
  }, [formData.conditionLabelImg, uploadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let labelImg = formData.conditionLabelImg;

    if (labelImg instanceof File) {
      labelImg = await handleImageUpload();
    }

    const payload = {
      ...formData,
      conditionLabelImg: labelImg,
    };

    try {
      const result = await createConditionLabel(
        JSON.stringify(payload)
      ).unwrap();

      if (result.message?.toLowerCase().includes("duplicate")) {
        toast.warning(result.message);
      } else if (result.message?.includes("Create atleast one")) {
        toast.warning(result.message);
      } else {
        toast.success("Condition label created successfully!");
        fileInputRef.current.value = "";
        setFormData(initialFormState);
      }
    } catch (error) {
      console.error("Create failed:", error);
      toast.error("Failed to create condition label");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = categoryData.find((c) => c.id === selectedId);
    dispatch(
      filterCategory({ category: selectedId, from: "conditionLabelsList" })
    );
    setFormData((prev) => ({ ...prev, category: selectedId }));
  };

  const handleConditionChange = (e) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setConditionSelection(id);
    setFormData((prev) => ({
      ...prev,
      conditionName: name,
      conditionNameId: id,
    }));
    dispatch(filterCondition({ condition: id, from: "conditionLabelsList" }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sm max-sm:text-xs mb-2">
          Create ConditionLabels
        </h1>
        <ListButton
          location={ROUTES.admin.conditionLabelsList}
          text="ConditionLabels List"
        />
      </div>

      <div className="flex">
        <div className="bg-white w-full border rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <h2>Add ConditionLabels</h2>
            <hr />

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              {/* Category */}
              <div className="flex flex-col text-sm">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="border p-1 rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {!categoryLoading &&
                    categoryData.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Condition */}
              <div className="flex flex-col text-sm">
                <label htmlFor="condition">Condition:</label>
                <select
                  id="condition"
                  value={formData.conditionNameId}
                  onChange={handleConditionChange}
                  className="border p-1 rounded"
                  required
                >
                  <option value="">Select a condition</option>
                  {!conditionsLoading &&
                    conditionsData
                      .filter((c) => c.category.id === formData.category)
                      .map((condition) => (
                        <option key={condition.id} value={condition.id}>
                          {condition.conditionName}
                        </option>
                      ))}
                </select>
              </div>

              {/* Brand (if Processor) */}
              {formData.conditionNameId === processorId && (
                <div className="flex flex-col text-sm">
                  <label htmlFor="brand">Brand:</label>
                  <select
                    id="brand"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        brand: e.target.value,
                      }))
                    }
                    className="border p-1 rounded"
                  >
                    <option value="">Select a Brand</option>
                    <option value="Apple">Apple</option>
                  </select>
                </div>
              )}

              {/* Condition Label Text */}
              <div className="flex flex-col text-sm">
                <label htmlFor="label">Condition Label:</label>
                <input
                  id="label"
                  type="text"
                  className="border p-1 rounded"
                  value={formData.conditionLabel}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      conditionLabel: e.target.value,
                    }))
                  }
                  placeholder="Enter condition label"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col text-sm">
                <label htmlFor="image">Label Image:</label>
                <input
                  id="image"
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      conditionLabelImg: e.target.files[0],
                    }))
                  }
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
              >
                {isSubmitting ? "Loading..." : "Create ConditionLabel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreateConditionLabels);
