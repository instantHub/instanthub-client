import React, { useEffect, useState } from "react";

import {
  useGetVariantsQuestionsQuery,
  useCreateVariantQuestionsMutation,
  useGetSingleProductQuery,
  useDeleteVariantQuestionsMutation,
} from "@api";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmationModal, Table } from "@components/admin";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { data } from "autoprefixer";

function CreateVariantsQuestions() {
  const [deductionSelected, setDeductionSelected] = useState("");
  console.log("deductionSelected", deductionSelected);

  const { data: product, isLoading: productLoading } =
    useGetSingleProductQuery();

  const {
    data: variantsQuestionsData,
    isLoading: variantsQuestionsDataLoading,
  } = useGetVariantsQuestionsQuery();

  const [createVariantQuestions] = useCreateVariantQuestionsMutation();

  const [deleteVariantQuestions] = useDeleteVariantQuestionsMutation();

  const [variantName, setVariantName] = useState("");
  console.log("variantName", variantName);

  const handleDelete = async (id) => {
    console.log("Handle Delete");
    try {
      const deletedVariant = await deleteVariantQuestions(id);
      console.log("deletedVariant");
    } catch (error) {
      console.log("Error occured while deleting variantQuestions", error);
    }
  };

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemoDelete] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: variantName,
      deductions: deductionSelected,
    };
    const variantCreated = await createVariantQuestions(formData).unwrap();
    console.log("variant created", variantCreated);

    if (variantCreated.message.includes("Duplicate")) {
      toast.warning(variantCreated.message);
      return;
    }

    toast.success("variant created successfull..!");
  };

  const headers = ["Variant Name", "No of Deductions", "Update & Delete"];

  const rowRenderer = (variant) => (
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
          <button className="bg-green-600 text-white px-2 py-1 border rounded">
            Update
          </button>
        </Link>
        <button
          onClick={() => {
            // handleDelete(variant._id);
            setModalOpen(true);
            setItemoDelete(variant._id);
          }}
          className="bg-red-600 text-white text-sm max-sm:text-xs px-2 py-1 border rounded"
        >
          Delete
        </button>
      </td>
    </>
  );

  useEffect(() => {
    if (product) {
      const deductions = product.variantDeductions[0].deductions;
      setDeductionSelected(deductions);
    }
  }, [product]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[5%] mx-auto text-sm max-sm:text-xs">
        {/* Create Condition BOX */}
        <div className="flex flex-col gap-4">
          <h1 className="bold text-lg max-sm:text-sm">
            Create Variants Questions
          </h1>
          <div className="bg-white flex border rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 ">
              <h2 className="">Add Variant Name</h2>
              <hr />

              <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
                <div className="flex items-center">
                  <div className="">
                    <label>Variant Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="border mx-2 py-1 px-2 rounded text-[15px]"
                      placeholder="Enter Variant Name"
                      value={variantName}
                      onChange={(e) =>
                        //   handleChange(event, "name", "conditionName")
                        setVariantName(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="py-3 px-2">
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

        {/* condition List */}
        <div className="mt-[5%] overflow-y-auto scrollbar mx-5">
          <p className="font-serif text-2xl max-sm:text-lg text-center py-2 font-semibold">
            List of Variants Created
          </p>

          {!variantsQuestionsDataLoading && (
            <Table
              headers={headers}
              data={variantsQuestionsData}
              keyExtractor={(item) => item.id}
              rowRenderer={rowRenderer}
            />
          )}
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDelete}
          itemToDelete={itemToDelete}
          title="Confirm Deletion"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </>
  );
}

export default CreateVariantsQuestions;
