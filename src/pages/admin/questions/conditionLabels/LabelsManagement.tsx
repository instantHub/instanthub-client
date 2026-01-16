import {
  filterCategory,
  filterCondition,
} from "@features/adminSlices/filterSlice";
import {
  useCreateConditionLabelsMutation,
  useGetCategoriesQuery,
  useLazyGetConditionLabelsByConditionQuery,
  useLazyGetConditionsQuery,
} from "@features/api";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SideList } from "../components";
import { Button } from "@components/general";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";
import { toast } from "react-toastify";

export const LabelsManagement: React.FC = () => {
  const dispatch = useDispatch();
  const filterLabel = useSelector(
    (state: any) => state.filter.conditionLabelsList
  );

  const navigate = useNavigate();

  const { data: categoryData } = useGetCategoriesQuery();
  const [
    getConditionsByCategory,
    { data: conditionsData = [], isLoading: fetchingConditions },
  ] = useLazyGetConditionsQuery();

  const [
    getConditionsLabelsByCondition,
    { data: labelsData = [], isLoading: fetchingConditionLabels },
  ] = useLazyGetConditionLabelsByConditionQuery();

  const [createConditionLabel, { isLoading: creationLoading }] =
    useCreateConditionLabelsMutation();

  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [labelForm, setLabelForm] = useState({
    category: filterLabel.category || "",
    conditionNameId: filterLabel.condition || "",
    conditionLabel: "",
    isMacOSProcessor: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", labelForm.category);
      formData.append("conditionNameId", labelForm.conditionNameId);
      formData.append("conditionLabel", labelForm.conditionLabel);
      formData.append(
        "isMacOSProcessor",
        labelForm.isMacOSProcessor ? "true" : "false"
      );

      if (imageSelected) {
        formData.append("conditionLabelImg", imageSelected);
      }
      console.log("ConditionLabel payload formData", [...formData.values()]);

      await createConditionLabel(formData).unwrap();
      toast.success("Condition Label created..!");
      setLabelForm({
        category: "",
        conditionNameId: "",
        conditionLabel: "",
        isMacOSProcessor: false,
      });
      setImageSelected(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to create label");
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-8">
      {/* Form Area */}
      <div className="w-full space-y-4">
        <header className="flex justify-between border-b pb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Condition Labels
            </h2>
            <p className="text-xs text-gray-500">
              Define possible answers for conditions
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate(ROUTES.admin.conditionLabelsList)}
          >
            Conditions Lists
          </Button>
        </header>

        {/* <div className="space-y-3"> */}
        <form
          method="post"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <select
            className="w-full p-2 border rounded-md text-sm"
            value={labelForm.category}
            onChange={(e) => {
              const categoryId = e.target.value;
              getConditionsByCategory(categoryId);
              dispatch(
                filterCategory({
                  category: categoryId,
                  from: "conditionLabelsList",
                })
              );
              setLabelForm({ ...labelForm, category: categoryId });
            }}
          >
            <option value="">Select Category</option>
            {categoryData?.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-md text-sm"
            value={labelForm.conditionNameId}
            onChange={(e) => {
              const conditionId = e.target.value;
              getConditionsLabelsByCondition({ conditionId });

              dispatch(
                filterCondition({
                  condition: conditionId,
                  from: "conditionLabelsList",
                })
              );
              setLabelForm({ ...labelForm, conditionNameId: conditionId });
            }}
            disabled={!labelForm.category}
          >
            <option value="">Select Condition</option>
            {conditionsData.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.conditionName}
              </option>
            ))}
          </select>

          <input
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Label Text (e.g. Broken, Scratched)"
            value={labelForm.conditionLabel}
            onChange={(e) =>
              setLabelForm({ ...labelForm, conditionLabel: e.target.value })
            }
          />

          {conditionsData
            .find((c) => c._id === labelForm.conditionNameId)
            ?.conditionName.toLowerCase()
            .includes("processor") && (
            <label className="w-fit flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={labelForm.isMacOSProcessor}
                onChange={(e) =>
                  setLabelForm({
                    ...labelForm,
                    isMacOSProcessor: e.target.checked,
                  })
                }
              />
              Is MacOS Processor
            </label>
          )}

          {/* File Input */}
          <div className="w-fit flex flex-col cursor-pointer">
            <label htmlFor="fileInput">File Input :</label>
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImageSelected(e.target.files?.[0] || null)
              }
            />
            {imageSelected && <p>Selected file: {imageSelected.name}</p>}
          </div>

          <button className="w-full py-2 bg-green-600 text-white rounded-md font-bold hover:bg-green-700">
            Add Label
          </button>
        </form>
        {/* </div> */}
      </div>

      {/* Responsive Table Area */}
      <div className="w-full border-l lg:pl-6 max-h-[450px] overflow-y-auto">
        {!labelForm.conditionNameId && !fetchingConditionLabels ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Select a specific condition to see its labels
          </div>
        ) : (
          <SideList
            headers={["Category", "Condition", "Condition Label"]}
            data={labelsData}
            keyExtractor={(item: any) => item._id}
            rowRenderer={(item: any, idx: number) => (
              <>
                <td className="p-3 text-xs text-gray-400">
                  {item.category?.name}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {item.conditionNameId?.conditionName}
                </td>
                <td className="p-3 text-sm font-semibold text-gray-700">
                  {item.conditionLabel}
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};
