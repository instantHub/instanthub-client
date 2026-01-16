import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateConditionLabelMutation,
  useGetOneConditionLabelQuery,
} from "@api";
import { Button } from "@components/general";
import { ArrowLeftIcon } from "@icons";
import { useCustomNavigation } from "@hooks";

// --- Types ---
interface ConditionLabelFormData {
  conditionLabel: string;
  conditionLabelImg: string | File;
}

export function UpdateConditionLabel() {
  const { conditionLabelId } = useParams<{ conditionLabelId: string }>();
  const { goBack } = useCustomNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries & Mutations
  const { data: conditionLabelsData, isLoading: conditionLabelsLoading } =
    useGetOneConditionLabelQuery(conditionLabelId!);

  const [updateConditionLabel, { isLoading: isUpdating }] =
    useUpdateConditionLabelMutation();

  const [formData, setFormData] = useState<ConditionLabelFormData>({
    conditionLabel: "",
    conditionLabelImg: "",
  });

  useEffect(() => {
    if (conditionLabelsData) {
      setFormData({
        conditionLabel: conditionLabelsData.conditionLabel || "",
        conditionLabelImg: conditionLabelsData.conditionLabelImg || "",
      });
    }
  }, [conditionLabelsData, conditionLabelsData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, conditionLabel: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        conditionLabelImg: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const submitData = new FormData();
    submitData.append("conditionLabel", formData.conditionLabel);

    // If it's a File object (newly selected), append it.
    // If it's a string, the BE knows no change occurred or handles it accordingly.
    if (formData.conditionLabelImg instanceof File) {
      submitData.append("conditionLabelImg", formData.conditionLabelImg);
    }

    console.log("ConditionLabel payload formData", [...submitData.values()]);

    try {
      await updateConditionLabel({
        conditionLabelId: conditionLabelId!,
        data: submitData,
      }).unwrap();

      toast.success("Condition Label updated successfully!");

      // Reset file input UI
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  if (conditionLabelsLoading)
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex mt-[5%] w-[80%] max-md:w-full mx-auto">
      <div className="grow">
        <div className="flex items-center justify-between">
          <h1 className="bold text-lg mb-2">Update Condition Label</h1>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
            className="ml-4"
          >
            Back
          </Button>
        </div>

        <div className="bg-white border rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-2">
              <span className="text-xl opacity-75">Update</span>
              <h1 className="text-2xl font-bold">
                {conditionLabelsData?.category?.name}
              </h1>
              <span className="text-xl opacity-75">ConditionLabel</span>
            </div>
            <hr />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <label className="font-medium">Condition Name:</label>
                  <span className="text-2xl text-red-700 font-semibold">
                    {conditionLabelsData?.conditionNameId?.conditionName}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Condition Label Name
                  </label>
                  <input
                    type="text"
                    className="border py-2 px-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Enter Label Name"
                    value={formData.conditionLabel}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 p-4 border-l max-md:border-l-0 max-md:border-t">
                <label className="text-sm font-medium">Label Image</label>
                <div className="relative group">
                  <img
                    src={
                      formData.conditionLabelImg instanceof File
                        ? URL.createObjectURL(formData.conditionLabelImg)
                        : `${import.meta.env.VITE_APP_BASE_URL}${
                            formData.conditionLabelImg
                          }`
                    }
                    alt="Preview"
                    className="w-32 h-32 object-contain border rounded-md p-1"
                  />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="text-xs"
                  onChange={handleFileChange}
                />
                <p className="text-[10px] text-gray-400">
                  Leave empty to keep current image
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 disabled:bg-gray-300 transition-colors"
              >
                {isUpdating ? "Saving Changes..." : "Update Condition Label"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
