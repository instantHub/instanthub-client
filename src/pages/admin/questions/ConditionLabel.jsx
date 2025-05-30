// import React, { useState, useRef, useEffect } from "react";
// import { useGetCategoriesQuery } from "@api/categoriesApi";
// import { useGetConditionsQuery } from "@api/conditionsApi";
// import {
//   useCreateConditionLabelsMutation,
//   useUploadConditionLabelsImageMutation,
// } from "@api/conditionLabelsApi";
// import { toast } from "react-toastify";
// import ListButton from "@components/admin/ListButton";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   filterCategory,
//   filterCondition,
// } from "@features/adminSlices/filterSlice";
// import { ROUTES } from "@routes";

// const CreateConditionLabels = () => {
//   const { data: categoryData, isLoading: categoryLoading } =
//     useGetCategoriesQuery();
//   const { data: conditionsData, isLoading: conditionsLoading } =
//     useGetConditionsQuery();

//   const [uploadConditionLabelsImage] = useUploadConditionLabelsImageMutation();
//   const [createConditionLabels, { isLoading: createConditionLabelsLoading }] =
//     useCreateConditionLabelsMutation();

//   const [processorId, setProcessorId] = useState(null);

//   const dispatch = useDispatch();

//   // Create a ref to store the reference to the file input element
//   const fileInputRef = useRef(null);

//   // const [imageSelected, setImageSelected] = useState();
//   const [conditionSelection, setConditionSelection] = useState(null);

//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [formData, setFormData] = useState({
//     category: "",
//     brand: "",
//     conditionNameId: "",
//     conditionLabel: "",
//     conditionLabelImg: undefined,
//   });
//   // console.log("formData from conditionLabel", formData);

//   // console.log("condition label formData", formData);

//   // File handler
//   const uploadFileHandler = async () => {
//     const imageData = new FormData();
//     // formData.append("image", imageSelected);
//     imageData.append("image", formData.conditionLabelImg);

//     try {
//       const res = await uploadConditionLabelsImage(imageData).unwrap();

//       return res.image;
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("handle submit");

//     if (formData.conditionLabelImg) {
//       formData.conditionLabelImg = await uploadFileHandler();
//     }

//     // console.log("conditionLabelData: ", formData);

//     try {
//       const conditionLabel = await createConditionLabels(
//         JSON.stringify(formData)
//       ).unwrap();
//       // productId = product.id;
//       console.log("conditionLabel created", conditionLabel);
//       if (conditionLabel.message?.toLowerCase().includes("duplicate")) {
//         toast.warning(`${conditionLabel.message}`);
//       } else if (conditionLabel.message?.includes("Create atleast one")) {
//         toast.warning(conditionLabel.message);
//         return;
//       } else {
//         toast.success("conditionLabel created successfully..!");
//       }
//       // Clear the value of the file input
//       fileInputRef.current.value = "";
//       // Mark the file input as required again
//       // fileInputRef.current.required = true;
//       formData.conditionLabelImg = undefined;

//       // setFormData({
//       //   category: "",
//       //   conditionNameId: "",
//       //   conditionLabel: "",
//       //   conditionLabelImg: undefined,
//       // });
//     } catch (error) {
//       console.log(
//         "Error while creating conditionLabel using API call: ",
//         error
//       );
//       toast.error("Error while creating conditionLabel..!");
//     }
//   };

//   // useEffect To set processorId
//   useEffect(() => {
//     // console.log("useEffect To set processorId");
//     if (conditionsData) {
//       // console.log(conditionsData);
//       let processor = conditionsData.find(
//         (condition) =>
//           condition.conditionName === "Processor" &&
//           condition.category.id === formData.category
//       );
//       // console.log(processor);
//       setProcessorId(processor?.id);
//     }
//   }, [conditionsData, formData]);

//   // Use Effect To set clear brand from formData
//   useEffect(() => {
//     // console.log("Form Data useEffect");

//     if (formData.conditionNameId !== processorId) {
//       // console.log("Processor not selected");
//       setFormData({
//         ...formData,
//         brand: "",
//       });
//     }
//   }, [conditionSelection, processorId]);

//   // console.log("processorId", processorId);
//   // console.log("conditionsData", conditionsData);

//   // console.log("TEST", conditionsLabelsData && conditionsLabelsData);

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center">
//         <h1 className="bold text-sm max-sm:text-xs mb-2">
//           Create ConditionLabels
//         </h1>
//         <ListButton
//           location={ROUTES.admin.conditionLabelsList}
//           text={"ConditionLabels List"}
//         />
//       </div>
//       <div className="flex">
//         <div className="bg-white w-full flex border rounded-md shadow-lg">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col  gap-4 p-5 w-full"
//           >
//             <div>
//               <h2 className="">Add ConditionLabels</h2>
//             </div>
//             <hr />

//             <div className="flex">
//               <div className="grid grid-cols-2 items-center gap-2 max-sm:grid-cols-1">
//                 {/* Select Category */}
//                 <div className="flex flex-col text-lg max-sm:text-sm">
//                   <label>Category:</label>
//                   <select
//                     value={formData.category}
//                     className="border p-1 rounded"
//                     onChange={(e) => {
//                       let cat = categoryData.find(
//                         (c) => c.id === e.target.value
//                       );
//                       setSelectedCategory(cat);

//                       dispatch(
//                         filterCategory({
//                           category: e.target.value,
//                           from: "conditionLabelsList",
//                         })
//                       );

//                       setFormData({
//                         ...formData,
//                         category: e.target.value,
//                       });
//                     }}
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     {!categoryLoading &&
//                       categoryData?.map((category) => (
//                         <option
//                           key={category.id}
//                           value={category.id}
//                           name="category"
//                           className=""
//                         >
//                           {category.name}
//                         </option>
//                       ))}
//                   </select>{" "}
//                 </div>

//                 {/* Select Condition */}
//                 <div className="flex flex-col text-lg max-sm:text-sm">
//                   <label>Condition:</label>
//                   <select
//                     className="border p-1 rounded"
//                     onChange={(e) => {
//                       setConditionSelection(e.target.value);
//                       setFormData({
//                         ...formData,
//                         conditionName: e.target.name,
//                         conditionNameId: e.target.value,
//                       });
//                       dispatch(
//                         filterCondition({
//                           condition: e.target.value,
//                           from: "conditionLabelsList",
//                         })
//                       );
//                     }}
//                     required
//                   >
//                     <option value="">Select a condition</option>
//                     {!conditionsLoading &&
//                       conditionsData
//                         ?.filter(
//                           (cond) => cond.category.id === formData.category
//                         )
//                         .map((condition) => (
//                           // condition.category.id == formData.category && (
//                           <option
//                             key={condition.id}
//                             value={condition.id}
//                             name={condition.conditionName}
//                           >
//                             {condition.conditionName}
//                           </option>
//                         ))}
//                   </select>
//                 </div>

//                 {/* Select Brand */}
//                 {formData.conditionNameId === processorId && (
//                   <div className="flex flex-col text-lg max-sm:text-sm">
//                     <label>Brand:</label>
//                     <select
//                       name=""
//                       id=""
//                       value={formData.brand}
//                       className="border p-1 rounded"
//                       onChange={(e) => {
//                         setFormData({
//                           ...formData,
//                           brand: e.target.value,
//                         });
//                       }}
//                     >
//                       <option value="">Select a Brand</option>
//                       <option value={`Apple`}>Apple</option>
//                     </select>
//                   </div>
//                 )}

//                 {/* Enter ConditionLabel */}
//                 <div className="flex flex-col justify-start py-2 text-lg max-sm:text-sm">
//                   <label>ConditionLabel:</label>
//                   <input
//                     type="text"
//                     name="label"
//                     value={formData.conditionLabel.label}
//                     className="border py-1 px-2 max-sm:px-1 rounded text-[15px]"
//                     placeholder="Enter Condition Label"
//                     onChange={(e) => {
//                       setFormData({
//                         ...formData,
//                         conditionLabel: e.target.value,
//                       });
//                     }}
//                     required
//                   />
//                 </div>

//                 <div className="py-2">
//                   <input
//                     type="file"
//                     name="image"
//                     ref={fileInputRef}
//                     onChange={(e) => {
//                       setFormData({
//                         ...formData,
//                         conditionLabelImg: e.target.files[0],
//                       });
//                     }}
//                     // onChange={(e) => setImageSelected(e.target.files[0])}
//                     // required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="py-3 px-2">
//               <button
//                 type="submit"
//                 className={`w-fit px-4 bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
//                 disabled={createConditionLabelsLoading}
//               >
//                 {!createConditionLabelsLoading
//                   ? "Create ConditionLabel"
//                   : "Loading..."}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(CreateConditionLabels);

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "@api/categoriesApi";
import { useGetConditionsQuery } from "@api/conditionsApi";
import {
  useCreateConditionLabelsMutation,
  useUploadConditionLabelsImageMutation,
} from "@api/conditionLabelsApi";
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
