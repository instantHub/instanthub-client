import { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateSeriesMutation,
  useGetAllBrandQuery,
} from "@api";
import { toast } from "react-toastify";
import { SeriesList } from "./SeriesList";

export const CreateSeries = () => {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const { data: BrandData, isLoading: BrandLoading } = useGetAllBrandQuery();
  const [createSeries] = useCreateSeriesMutation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [seriesName, setSeriesName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCategory, selectedBrand, seriesName);

    const seriesData = {
      category: selectedCategory,
      brand: selectedBrand,
      name: seriesName,
    };

    try {
      const seriesCreated = await createSeries(seriesData).unwrap();
      // productId = product.id;
      console.log(seriesCreated);
      if (
        !seriesCreated.success &&
        seriesCreated.data === "Duplicate SeriesName"
      ) {
        // setErrorMessage(response.data);
        toast.error(seriesCreated.message);
        return;
      }

      console.log("Series created", seriesCreated);
      toast.success("Series created successfull..!");
      //   setSelectedCategory("");
      //   setSelectedBrand("");
      //   setSeriesName("");
    } catch (error) {
      toast.error(error);
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center mt-5 max-sm:text-sm">
        <div className="bg-white border rounded-md shadow-lg w-fit max-sm:w-[98%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 ">
            <h2 className="text-lg max-sm:text-sm">
              Add / Create Series for the Product
            </h2>
            <hr />

            <div className="flex justify-around items-center max-sm:flex-col gap-4">
              {/* select Category */}
              <div className="flex items-center max-sm:items-start gap-2 text-lg max-sm:text-sm">
                <label htmlFor="category">Select Category :</label>
                <select
                  id="category"
                  name="category"
                  className="border rounded-sm p-1 text-sm"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Category</option>
                  {!categoryLoading &&
                    categoryData.map((category) => (
                      <option
                        key={category?.id}
                        value={category?.id}
                        name="category"
                        className=""
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                        }}
                      >
                        {category?.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* select Brand */}
              <div className="flex items-center max-sm:items-start gap-2 text-lg max-sm:text-sm">
                <label htmlFor="productType">Select Brand :</label>
                <select
                  id="productType"
                  name="productType"
                  className="border rounded-sm p-1 text-sm"
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                  }}
                  required
                >
                  <option value="">Select Category</option>
                  {!BrandLoading &&
                    BrandData.map((brand) => {
                      if (selectedCategory == brand?.category?.id) {
                        return (
                          <option
                            key={brand?.id}
                            value={brand?.id}
                            name="category"
                            className=""
                          >
                            {brand?.name}
                          </option>
                        );
                      }
                    })}
                </select>
              </div>
            </div>

            {/* <div className="flex gap-4 items-center mx-auto"> */}
            {/* Series Name */}
            <div className="flex items-center mx-auto w-fit text-lg max-sm:text-sm gap-2">
              <label htmlFor="seriesName">Enter Series Name :</label>
              <input
                type="text"
                id="seriesName"
                value={seriesName}
                className=" border px-2 py-1 max-sm:px-1 rounded text-lg max-sm:text-sm"
                placeholder="Series Name"
                onChange={(e) => setSeriesName(e.target.value)}
                required
              />
            </div>
            {/* </div> */}

            {/* Create Button */}
            <div className="px-2">
              <button
                type="submit"
                className="bg-green-600 text-white text-lg max-sm:text-sm rounded-md w-fit px-4 py-2 max-sm:px-2 max-sm:py-1 cursor-pointer hover:bg-green-700"
              >
                Create Series
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <SeriesList />
      </div>
    </>
  );
};
