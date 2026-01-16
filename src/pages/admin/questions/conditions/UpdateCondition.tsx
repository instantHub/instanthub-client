import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateConditionMutation, useGetOneConditionQuery } from "@api";
import { ROUTES } from "@routes";
import { Button, FormInput } from "@components/general"; // Assuming you have a custom Button
import { useCustomNavigation } from "@hooks";
import { ArrowLeftIcon } from "@icons";

// Define the shape of our form state
interface ConditionFormState {
  category: string;
  conditionName: string;
  page: number | string;
  keyword: string;
  description: string;
  isYesNoType: boolean;
  isMandatory: boolean;
  multiSelect: boolean;
  showLabelsImage: boolean;
}

export const UpdateCondition: React.FC = () => {
  const { conditionId } = useParams<{ conditionId: string }>();
  if (!conditionId) return null;

  const { goBack } = useCustomNavigation();

  // const { data: conditionsData, isLoading: conditionsLoading } =
  //   useGetConditionsQuery();
  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetOneConditionQuery(conditionId!);
  const [updateCondition, { isLoading: isUpdating }] =
    useUpdateConditionMutation();

  const [form, setForm] = useState<ConditionFormState>({
    category: "",
    conditionName: "",
    page: 0,
    keyword: "",
    description: "",
    isYesNoType: false,
    isMandatory: false,
    multiSelect: false,
    showLabelsImage: false,
  });

  // Load existing data into form
  useEffect(() => {
    if (conditionsData) {
      setForm({
        category: conditionsData.category?._id || "",
        conditionName: conditionsData.conditionName || "",
        page: conditionsData.page || 0,
        keyword: conditionsData.keyword || "",
        description: conditionsData.description || "",
        isMandatory: conditionsData.isMandatory || false,
        multiSelect: conditionsData.multiSelect || false,
        isYesNoType: conditionsData.isYesNoType || false,
        showLabelsImage: conditionsData.showLabelsImage || false,
      });
    }
  }, [conditionsData, conditionId]);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!conditionId) return;

    try {
      await updateCondition({
        conditionId,
        data: form,
      }).unwrap();
      toast.success("Condition updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update condition");
    }
  };

  if (conditionsLoading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Condition Details...
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10 w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Update Condition</h1>
          <p className="text-sm text-gray-500">
            Modify existing condition configurations
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<ArrowLeftIcon />}
          onClick={goBack}
        >
          Back
        </Button>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormInput
            label="Condition Name"
            type="text"
            value={form.conditionName}
            placeholder="Enter Condition Name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, conditionName: e.target.value })
            }
            required
          />

          {/* Grid for Main Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Page No"
              type="number"
              value={form.page}
              placeholder="Enter Page No"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, page: e.target.value })
              }
              required
            />

            <FormInput
              label="Keyword"
              type="text"
              value={form.keyword}
              placeholder="Enter Keyword"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, keyword: e.target.value })
              }
              required
            />
          </div>

          <FormInput
            label="Description"
            type="text"
            value={form.description}
            placeholder="Enter Description"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          {/* Optimized Checkbox Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <label className="flex items-center gap-2 text-[11px] font-bold text-blue-900 cursor-pointer">
              <input
                type="checkbox"
                name="isMandatory"
                checked={form.isMandatory}
                onChange={handleCheckBox}
                className="w-4 h-4 rounded text-blue-600"
              />
              Mandatory
            </label>

            <label className="flex items-center gap-2 text-[11px] font-bold text-blue-900 cursor-pointer">
              <input
                type="checkbox"
                name="multiSelect"
                checked={form.multiSelect}
                onChange={handleCheckBox}
                className="w-4 h-4 rounded text-blue-600"
              />
              Multi-Select
            </label>

            <label
              className={`flex items-center gap-2 text-[11px] font-bold text-blue-900 cursor-pointer ${
                form.multiSelect ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                name="isYesNoType"
                disabled={form.multiSelect}
                checked={form.isYesNoType}
                onChange={handleCheckBox}
                className="w-4 h-4 rounded text-blue-600"
              />
              Yes/No Type
            </label>

            <label
              className={`flex items-center gap-2 text-[11px] font-bold text-blue-900 cursor-pointer ${
                form.isYesNoType ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                name="showLabelsImage"
                disabled={form.isYesNoType}
                checked={form.showLabelsImage}
                onChange={handleCheckBox}
                className="w-4 h-4 rounded text-blue-600"
              />
              Show Image
            </label>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="greenary"
              loading={isUpdating}
              fullWidth
              className="py-3 text-lg font-bold shadow-md"
            >
              Update Condition Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
