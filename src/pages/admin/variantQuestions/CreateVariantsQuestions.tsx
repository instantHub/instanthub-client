import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useLazyGetVariantsQuestionsQuery,
  useCreateVariantQuestionsMutation,
  useLazyGetProductByCategoryQuery,
  useDeleteVariantQuestionsMutation,
  useGetCategoriesQuery,
  useLazyGetProductsWithDeductionsByCategoryQuery,
} from "@api";

import { ConfirmationModal, Table } from "@components/admin";
import { generatePathWithParams } from "@utils/general";
import { ROUTES } from "@routes";
import { IVQResponse } from "@features/api/variantQuestionsApi/types";

export function CreateVariantsQuestions() {
  const [variantName, setVariantName] = useState<string>("");

  // @ts-ignore
  const [getProductByCategory, { data: product }] =
    useLazyGetProductByCategoryQuery();

  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetCategoriesQuery();

  const [
    getVariantsQuestions,
    { data: variantsQuestionsData, isLoading: variantsQuestionsDataLoading },
  ] = useLazyGetVariantsQuestionsQuery();

  const [getCBVQ, { data: CBVQ }] =
    useLazyGetProductsWithDeductionsByCategoryQuery();

  const [createVariantQuestions] = useCreateVariantQuestionsMutation();
  const [deleteVariantQuestions] = useDeleteVariantQuestionsMutation();

  const [categorySelected, setCategorySelected] = useState<string>("");

  // Modal State
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      await deleteVariantQuestions(id).unwrap();
      toast.success("Variant deleted successfully!");
    } catch (error) {
      console.error("Error deleting variant questions:", error);
      toast.error("Failed to delete variant.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const deductions = product.variantDeductions?.[0]?.deductions;
    if (!deductions) {
      toast.error("No deductions available");
      return;
    }

    try {
      const variantCreated = await createVariantQuestions({
        name: variantName,
        category: categorySelected,
        deductions: deductions,
      }).unwrap();

      if (variantCreated.message?.includes("Duplicate")) {
        toast.warning(variantCreated.message);
      } else {
        toast.success("Variant created successfully!");
      }

      setVariantName("");
    } catch (error) {
      console.error("Error creating variant:", error);
      toast.error("Failed to create variant.");
    }
  };

  const headers = ["Variant Name", "No of Deductions", "Update & Delete"];

  const rowRenderer = (variant: IVQResponse) => (
    <>
      <td className="text-sm max-sm:text-xs py-2">{variant.name}</td>
      <td className="text-sm max-sm:text-xs py-2">
        {variant.deductions.length} deductions
      </td>
      <td className="flex items-center justify-center gap-1 text-sm max-sm:text-xs py-2">
        <Link
          to={generatePathWithParams(
            ROUTES.admin.updateVariantQuestions,
            variant._id
          )}
        >
          <button className="bg-green-600 text-white px-2 py-1 border rounded hover:bg-green-700">
            Update
          </button>
        </Link>
        <button
          onClick={() => {
            setModalOpen(true);
            setItemToDelete(variant._id);
          }}
          className="bg-red-600 text-white text-sm max-sm:text-xs px-2 py-1 border rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </>
  );

  console.log("CBVQ", CBVQ);

  return (
    <div className="flex flex-col items-center justify-center mt-10 mx-auto text-sm max-sm:text-xs w-full max-w-4xl">
      {/* Create Variant Box */}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold text-lg max-sm:text-sm text-center">
          Create Variants Questions
        </h1>
        <div className="bg-white border rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <h2 className="text-base font-semibold">Add Variant Name</h2>
            <hr />
            <div className="flex flex-col">
              <label htmlFor="productName">Select Category :</label>

              <select
                className="border w-[40%] max-sm:w-full "
                value={categorySelected}
                onChange={(e) => {
                  const { value } = e.target;
                  setCategorySelected(value);
                  getProductByCategory(value);
                  getVariantsQuestions(value);
                  getCBVQ(value);
                }}
                required
              >
                <option value="">Select Category</option>
                {categoriesData
                  ?.filter((c) => c.categoryType.multiVariants)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
              <div className="flex flex-col">
                <label className="font-medium">Variant Name:</label>
                <input
                  type="text"
                  name="name"
                  className="border py-1 px-2 rounded text-sm mt-1"
                  placeholder="Enter Variant Name"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="w-[30%] max-sm:w-fit max-sm:px-3 max-sm:py-1 text-lg max-sm:text-sm bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
              >
                Create Variant
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Variant List */}
      <div className="mt-10 overflow-y-auto scrollbar w-full">
        <p className="font-serif text-2xl max-sm:text-lg text-center py-2 font-semibold">
          List of Variants Created
        </p>
        {!variantsQuestionsDataLoading && variantsQuestionsData && (
          <Table
            headers={headers}
            data={variantsQuestionsData}
            keyExtractor={(item: IVQResponse) => item._id}
            rowRenderer={rowRenderer}
          />
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete(itemToDelete)}
        itemToDelete={itemToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
