import React, { useState, useRef, useEffect } from "react";
import {
  useGetConditionsQuery,
  useGetCategoryQuery,
  useCreateConditionLabelsMutation,
  useUploadConditionLabelsImageMutation,
} from "../../../features/api";
import { toast } from "react-toastify";
import ListButton from "../../components/ListButton";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, filterCondition } from "../../features/filterSlice";

const CreateConditionLabels = () => {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();

  const [uploadConditionLabelsImage] = useUploadConditionLabelsImageMutation();
  const [createConditionLabels, { isLoading: createConditionLabelsLoading }] =
    useCreateConditionLabelsMutation();

  const [processorId, setProcessorId] = useState(null);

  const filterData = useSelector((state) => state.filter.conditionLabelsList);
  // console.log("filterData from ConditionLabels", filterData);

  const dispatch = useDispatch();

  // console.log(brandsData && brandsData );

  // Create a ref to store the reference to the file input element
  const fileInputRef = useRef(null);

  // const [imageSelected, setImageSelected] = useState();
  const [conditionSelection, setConditionSelection] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    brand: "",
    conditionNameId: "",
    conditionLabel: "",
    conditionLabelImg: undefined,
  });
  // console.log("formData from conditionLabel", formData);

  // console.log("condition label formData", formData);

  // File handler
  const uploadFileHandler = async () => {
    const imageData = new FormData();
    // formData.append("image", imageSelected);
    imageData.append("image", formData.conditionLabelImg);

    try {
      const res = await uploadConditionLabelsImage(imageData).unwrap();

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");

    if (formData.conditionLabelImg) {
      formData.conditionLabelImg = await uploadFileHandler();
    }

    // console.log("conditionLabelData: ", formData);

    try {
      const conditionLabel = await createConditionLabels(
        JSON.stringify(formData)
      ).unwrap();
      // productId = product.id;
      console.log("conditionLabel created", conditionLabel);
      if (conditionLabel.message?.toLowerCase().includes("duplicate")) {
        toast.warning(`${conditionLabel.message}`);
      } else if (conditionLabel.message?.includes("Create atleast one")) {
        toast.warning(conditionLabel.message);
        return;
      } else {
        toast.success("conditionLabel created successfully..!");
      }
      // Clear the value of the file input
      fileInputRef.current.value = "";
      // Mark the file input as required again
      // fileInputRef.current.required = true;
      formData.conditionLabelImg = undefined;

      // setFormData({
      //   category: "",
      //   conditionNameId: "",
      //   conditionLabel: "",
      //   conditionLabelImg: undefined,
      // });
    } catch (error) {
      console.log(
        "Error while creating conditionLabel using API call: ",
        error
      );
      toast.error("Error while creating conditionLabel..!");
    }
  };

  // useEffect To set processorId
  useEffect(() => {
    // console.log("useEffect To set processorId");
    if (conditionsData) {
      // console.log(conditionsData);
      let processor = conditionsData.find(
        (condition) =>
          condition.conditionName === "Processor" &&
          condition.category.id === formData.category
      );
      // console.log(processor);
      setProcessorId(processor?.id);
    }
  }, [conditionsData, formData]);

  // Use Effect To set clear brand from formData
  useEffect(() => {
    // console.log("Form Data useEffect");

    if (formData.conditionNameId !== processorId) {
      // console.log("Processor not selected");
      setFormData({
        ...formData,
        brand: "",
      });
    }
  }, [conditionSelection, processorId]);

  // console.log("processorId", processorId);
  // console.log("conditionsData", conditionsData);

  // console.log("TEST", conditionsLabelsData && conditionsLabelsData);

  return (
    // <div className="flex gap-4 w-full">
    // <div className="flex flex-col max-sm:w-svw">
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="bold text-sm max-sm:text-xs mb-2">
          Create ConditionLabels
        </h1>
        <ListButton
          location={"/admin/conditionLabelsList"}
          text={"ConditionLabels List"}
        />
      </div>
      <div className="flex">
        <div className="bg-white w-full flex border rounded-md shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  gap-4 p-5 w-full"
          >
            <div>
              <h2 className="">Add ConditionLabels</h2>
            </div>
            <hr />

            <div className="flex">
              <div className="grid grid-cols-2 items-center gap-2 max-sm:grid-cols-1">
                {/* Select Category */}
                <div className="flex flex-col text-lg max-sm:text-sm">
                  <label>Category:</label>
                  <select
                    value={formData.category}
                    className="border p-1 rounded"
                    onChange={(e) => {
                      let cat = categoryData.find(
                        (c) => c.id === e.target.value
                      );
                      setSelectedCategory(cat);

                      dispatch(
                        filterCategory({
                          category: e.target.value,
                          from: "conditionLabelsList",
                        })
                      );

                      setFormData({
                        ...formData,
                        category: e.target.value,
                      });
                    }}
                    required
                  >
                    <option value="">Select a category</option>
                    {!categoryLoading &&
                      categoryData?.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          name="category"
                          className=""
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>{" "}
                </div>

                {/* Select Condition */}
                <div className="flex flex-col text-lg max-sm:text-sm">
                  <label>Condition:</label>
                  <select
                    className="border p-1 rounded"
                    onChange={(e) => {
                      setConditionSelection(e.target.value);
                      setFormData({
                        ...formData,
                        conditionName: e.target.name,
                        conditionNameId: e.target.value,
                      });
                      dispatch(
                        filterCondition({
                          condition: e.target.value,
                          from: "conditionLabelsList",
                        })
                      );
                    }}
                    required
                  >
                    <option value="">Select a condition</option>
                    {!conditionsLoading &&
                      conditionsData
                        ?.filter(
                          (cond) => cond.category.id === formData.category
                        )
                        .map((condition) => (
                          // condition.category.id == formData.category && (
                          <option
                            key={condition.id}
                            value={condition.id}
                            name={condition.conditionName}
                          >
                            {condition.conditionName}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Select Brand */}
                {formData.conditionNameId === processorId && (
                  <div className="flex flex-col text-lg max-sm:text-sm">
                    <label>Brand:</label>
                    <select
                      name=""
                      id=""
                      value={formData.brand}
                      className="border p-1 rounded"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          brand: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select a Brand</option>
                      <option value={`Apple`}>Apple</option>
                      {/* <option
                          value={`${
                            (selectedCategory.name === "Laptop" && "Apple") ||
                            (selectedCategory.name === "Desktop" && "iMac")
                          }`}
                        >
                          {(selectedCategory.name === "Laptop" && "Apple") ||
                            (selectedCategory.name === "Desktop" && "iMac")}
                        </option> */}
                    </select>
                  </div>
                )}

                {/* Enter ConditionLabel */}
                <div className="flex flex-col justify-start py-2 text-lg max-sm:text-sm">
                  <label>ConditionLabel:</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.conditionLabel.label}
                    className="border py-1 px-2 max-sm:px-1 rounded text-[15px]"
                    placeholder="Enter Condition Label"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        conditionLabel: e.target.value,
                      });
                    }}
                    required
                  />
                </div>

                <div className="py-2">
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        conditionLabelImg: e.target.files[0],
                      });
                    }}
                    // onChange={(e) => setImageSelected(e.target.files[0])}
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="py-3 px-2">
              <button
                type="submit"
                className={`w-fit px-4 bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
                disabled={createConditionLabelsLoading}
              >
                {!createConditionLabelsLoading
                  ? "Create ConditionLabel"
                  : "Loading..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreateConditionLabels);
