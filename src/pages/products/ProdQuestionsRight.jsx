import React from "react";
import { useSelector } from "react-redux";

const ProdDeductionsRight = () => {
  const productsData = useSelector((state) => state.deductions);
  const laptopSlice = useSelector((state) => state.laptopDeductions);

  // console.log("productsData", productsData);

  return (
    // <div>
    <div className="w-[25%] border rounded sm:h-[450px] max-h-[550px] overflow-y-auto scrollbar max-sm:w-[90%] max-2sm:w-[95%]">
      <>
        <div className="flex items-center justify-center gap-3 p-2">
          <div>
            <img
              src={
                import.meta.env.VITE_APP_BASE_URL + productsData.productImage
              }
              alt="ProductImg"
              className="size-20"
            />{" "}
          </div>
          <div className="text-sm">
            <h1>{productsData.productName}</h1>
            {productsData.productCategory === "Mobile" && (
              <span>{productsData.getUpTo.variantName}</span>
            )}
          </div>
        </div>
        <hr />

        <div>
          <div className="mt-6 mx-auto px-4">
            <div className="py-3 font-bold text-gray-400">
              <h1>Evaluation</h1>
            </div>

            <div>
              {/* Laptop selected items from laptopSlice */}
              {/* Laptop's Processor, HardDisk & Ram display */}
              {productsData.productCategory === "Laptop" && (
                <>
                  <div>
                    {laptopSlice.processor.conditionLabel ? (
                      <h1 className="font-bold">Laptop Configuration</h1>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2">
                        {laptopSlice.processor.conditionLabel}
                      </li>
                      <li className="py-1 pl-2">
                        {laptopSlice.hardDisk.conditionLabel}
                      </li>
                      <li className="py-1 pl-2">
                        {laptopSlice.ram.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Screen Size */}
                  <div>
                    {laptopSlice.screenSize.conditionLabel ? (
                      <h1 className="font-bold">Screen Size</h1>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2">
                        {laptopSlice.screenSize.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Graphic */}
                  <div>
                    {laptopSlice.graphic.conditionLabel ? (
                      <h1 className="font-bold">Graphic</h1>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2">
                        {laptopSlice.graphic.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Screen Condition */}
                  <div>
                    {laptopSlice.screenCondition.conditionLabel ? (
                      <h1 className="font-bold">Screen Condition</h1>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2">
                        {laptopSlice.screenCondition.conditionLabel}
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <ul>
                {/* Displaying all selected deduction */}
                {productsData.deductions.length !== 0 ? (
                  <h1 className="font-bold">Selected Conditions</h1>
                ) : null}
                {productsData.deductions.map((label, index) => (
                  <>
                    <li key={index} className="py-1 pl-2 text-md">
                      {label.conditionLabel}
                    </li>
                  </>
                ))}

                {/* Products Age display when selected */}
                {productsData.productAge && (
                  <>
                    {productsData.productAge.conditionLabel ? (
                      <h1 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Age
                      </h1>
                    ) : null}
                    <li className="py-1 pl-2 text-md">
                      {productsData.productAge.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products Physical Condition display when selected */}
                {productsData.productPhysicalCondition && (
                  <>
                    {productsData.productPhysicalCondition.conditionLabel ? (
                      <h1 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Physical Condition
                      </h1>
                    ) : null}
                    <li className="py-1 pl-2 text-md">
                      {productsData.productPhysicalCondition.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products ScreenCondition */}
                {productsData.productAge && (
                  <>
                    {productsData.productScreenCondition.conditionLabel ? (
                      <h1 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Screen Condition
                      </h1>
                    ) : null}
                    <li className="py-1 pl-2 text-md">
                      {productsData.productScreenCondition.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products Display & Defect Condition display when selected */}
                {productsData.productDisplayDefect && (
                  <>
                    {productsData.productDisplayDefect.conditionLabel ? (
                      <h1 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Display & Defect
                      </h1>
                    ) : null}
                    <li className="py-1 pl-2 text-md">
                      {productsData.productDisplayDefect.conditionLabel}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
    // </div>
  );
};

export default ProdDeductionsRight;
