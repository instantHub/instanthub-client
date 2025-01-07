import React from "react";
import { useSelector } from "react-redux";

const ProdDeductionsRight = () => {
  const productsData = useSelector((state) => state.deductions);
  const laptopSlice = useSelector((state) => state.laptopDeductions);

  // console.log("productsData", productsData);
  const laptopDesktop = ["laptop", "desktop"];

  return (
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
              loading="lazy" // Native lazy loading
            />{" "}
          </div>
          <div className="text-sm">
            <h2>{productsData.productName}</h2>
            {productsData.productCategory === "Mobile" && (
              <span>{productsData.getUpTo.variantName}</span>
            )}
          </div>
        </div>
        <hr />

        <div>
          <div className="mt-6 mx-auto px-4">
            <div className="py-3 font-bold text-gray-400">
              <h2>Evaluation</h2>
            </div>

            <div>
              {/* Laptop selected items from laptopSlice */}
              {/* Laptop's Processor, HardDisk & Ram display */}
              {/* {productsData.productCategory === "Laptop" && ( */}
              {laptopDesktop.includes(
                productsData.productCategory.toLowerCase()
              ) && (
                <>
                  <div>
                    {laptopSlice.processor.conditionLabel ? (
                      <h2 className="font-bold">Laptop Configuration</h2>
                    ) : null}
                    <ul className="text-sm">
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
                      <h2 className="font-bold">Screen Size</h2>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2 text-sm">
                        {laptopSlice.screenSize.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Graphic */}
                  <div>
                    {laptopSlice.graphic.conditionLabel ? (
                      <h2 className="font-bold">Graphic</h2>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2 text-sm">
                        {laptopSlice.graphic.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Screen Condition */}
                  <div>
                    {laptopSlice.screenCondition.conditionLabel ? (
                      <h2 className="font-bold">Screen Condition</h2>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2 text-sm">
                        {laptopSlice.screenCondition.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Physical Condition */}
                  <div>
                    {laptopSlice.physicalCondition.conditionLabel ? (
                      <h2 className="font-bold">Physical Condition</h2>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2 text-sm">
                        {laptopSlice.physicalCondition.conditionLabel}
                      </li>
                    </ul>
                  </div>

                  {/* Model Launch Year */}
                  <div>
                    {laptopSlice.modelYear.conditionLabel ? (
                      <h2 className="font-bold">Model Launch Year</h2>
                    ) : null}
                    <ul>
                      <li className="py-1 pl-2 text-sm">
                        {laptopSlice.modelYear.conditionLabel}
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <ul>
                {/* Displaying all selected deduction */}
                {productsData.deductions.length !== 0 ? (
                  <h2 className="font-bold">Selected Conditions</h2>
                ) : null}
                {productsData.deductions.map((label, index) => (
                  <li key={index} className="py-1 pl-2 text-sm">
                    {label.conditionLabel}
                  </li>
                ))}

                {/* Products Age display when selected */}
                {productsData.productAge && (
                  <>
                    {productsData.productAge.conditionLabel ? (
                      <h2 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Age
                      </h2>
                    ) : null}
                    <li className="py-1 pl-2 text-sm">
                      {productsData.productAge.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products Physical Condition display when selected */}
                {productsData.productPhysicalCondition && (
                  <>
                    {productsData.productPhysicalCondition.conditionLabel ? (
                      <h2 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Physical Condition
                      </h2>
                    ) : null}
                    <li className="py-1 pl-2 text-sm">
                      {productsData.productPhysicalCondition.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products ScreenCondition */}
                {productsData.productAge && (
                  <>
                    {productsData.productScreenCondition.conditionLabel ? (
                      <h2 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Screen Condition
                      </h2>
                    ) : null}
                    <li className="py-1 pl-2 text-sm">
                      {productsData.productScreenCondition.conditionLabel}
                    </li>
                  </>
                )}

                {/* Products Display & Defect Condition display when selected */}
                {productsData.productDisplayDefect && (
                  <>
                    {productsData.productDisplayDefect.conditionLabel ? (
                      <h2 className="mt-2 mb-1 font-bold">
                        {productsData.productCategory} Display & Defect
                      </h2>
                    ) : null}
                    <li className="py-1 pl-2 text-sm">
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
  );
};

export default ProdDeductionsRight;
