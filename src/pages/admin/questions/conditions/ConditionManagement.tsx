import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useCreateConditionsMutation,
  useLazyGetConditionsQuery,
} from "@api";
import { filterCategory } from "@features/adminSlices/filterSlice";
import { SideList } from "../components/SideList";
import { toast } from "react-toastify";
import { Button, FormInput } from "@components/general";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";

export const ConditionManagement: React.FC = () => {
  const dispatch = useDispatch();
  const filterData = useSelector((state: any) => state.filter.conditionsList);

  // Logic: Only fetch conditions list if a category is selected
  const { data: categoryData } = useGetCategoriesQuery();
  const [
    getConditionsByCategory,
    { data: conditionsData = [], isLoading: fetchingConditions },
  ] = useLazyGetConditionsQuery();

  const [createConditions, { isLoading: isCreating }] =
    useCreateConditionsMutation();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: filterData.category || "",
    conditionName: "",
    page: "",
    keyword: "",
    description: "",
    isMandatory: false,
    multiSelect: false,
    showLabelsImage: false,
    isYesNoType: false,
  });

  const handleCategoryChange = (id: string) => {
    setForm((prev) => ({ ...prev, category: id }));
    dispatch(filterCategory({ category: id, from: "conditionsList" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createConditions(form).unwrap();
      toast.success("Condition added!");
    } catch (err) {
      console.log("Failed to create condition", err);

      toast.error("Failed to create condition");
    }
  };

  console.log("conditionsData", conditionsData);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Create Form Section */}
      <div className="w-full space-y-4">
        <header className="flex justify-between border-b pb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Conditions</h2>
            <p className="text-xs text-gray-500">
              Add and manage item conditions
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate(ROUTES.admin.conditionsList)}
          >
            Conditions Lists
          </Button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Category</label>
            <select
              value={form.category}
              onChange={(e) => {
                const categoryId = e.target.value;
                handleCategoryChange(categoryId);
                getConditionsByCategory(categoryId);
              }}
              className="p-2 border rounded-md bg-gray-50"
              required
            >
              <option value="">Select Category</option>
              {categoryData?.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
            {/* Condition Name */}
            <FormInput
              startIcon={<Mail size={16} />}
              size="sm"
              label="Condition Name"
              type="text"
              name="ConditionName"
              value={form.conditionName}
              placeholder={"Enter Condition Name"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, conditionName: e.target.value }))
              }
              required
            />

            {/* Page No */}
            <FormInput
              startIcon={<Mail size={16} />}
              size="sm"
              label="Page No"
              type="number"
              name="PageNo"
              value={form.page}
              placeholder={"Enter Page No"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, page: e.target.value }))
              }
              required
            />

            {/* Keyword */}
            <FormInput
              startIcon={<Mail size={16} />}
              size="sm"
              label="Condition Keyword"
              type="text"
              name="ConditionKeyword"
              value={form.keyword}
              placeholder={"Enter Condition Keyword"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, keyword: e.target.value }))
              }
              required
            />

            {/* Description */}
            <FormInput
              startIcon={<Mail size={16} />}
              size="sm"
              label="Condition Description"
              type="text"
              name="ConditionDescription"
              value={form.description}
              placeholder={"Enter Condition Description"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex justify-evenly gap-4 p-2 bg-blue-50 rounded-md">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={form.isMandatory}
                onChange={(e) =>
                  setForm({ ...form, isMandatory: e.target.checked })
                }
              />
              Mandatory
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={form.multiSelect}
                onChange={(e) =>
                  setForm({ ...form, multiSelect: e.target.checked })
                }
              />
              Multi-select
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={form.isYesNoType}
                onChange={(e) =>
                  setForm({ ...form, isYesNoType: e.target.checked })
                }
              />
              Is Yes/No Type
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={form.showLabelsImage}
                onChange={(e) =>
                  setForm({ ...form, showLabelsImage: e.target.checked })
                }
              />
              Show Labels Image
            </label>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isCreating ? "Saving..." : "Create Condition"}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="w-full border-l lg:pl-6 max-h-[450px] overflow-y-auto">
        {!form.category ? (
          <div className="h-full flex items-center justify-center text-gray-400 italic text-sm">
            Select a category on the left to view conditions
          </div>
        ) : (
          <SideList
            headers={["Category", "Name", "Keyword", "Description", "Configs"]}
            data={conditionsData}
            keyExtractor={(item: any) => item._id}
            rowRenderer={(item: any) => (
              <>
                <td className="p-3 text-sm font-medium">
                  {item.category.name}
                </td>
                <td className="p-3 text-sm font-medium">
                  {item.conditionName}
                </td>
                <td className="p-3 text-sm">{item.keyword}</td>
                <td className="p-3 text-sm">{item.description}</td>
                <td className="flex flex-col gap-1 p-3">
                  <span>Page: {item.page}</span>
                  <span
                    className={`px-2 py-1 rounded text-[10px] ${
                      item.isMandatory
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.isMandatory ? "Required" : "Optional"}
                  </span>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};
