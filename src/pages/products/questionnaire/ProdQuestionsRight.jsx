import React from "react";
import { useSelector } from "react-redux";
import { LAPTOP_DESKTOP } from "../../../utils/constants";

const ProdDeductionsRight = () => {
  const productsData = useSelector((state) => state.deductions);
  const laptopSlice = useSelector((state) => state.laptopDeductions);

  const deductionSlice = useSelector((state) => state.deductions);

  // console.log("productsData", productsData);

  return (
    <div className="w-[25%] border rounded sm:h-[450px] max-h-[550px] overflow-y-auto scrollbar max-sm:w-[90%] max-2sm:w-[95%]">
      <div className="flex items-center justify-center gap-3 p-2">
        <img
          src={import.meta.env.VITE_APP_BASE_URL + productsData.productImage}
          alt="ProductImg"
          className="size-20"
          loading="lazy" // Native lazy loading
        />
        <div className="flex flex-col gap-1 text-sm">
          <h2>{productsData.productName}</h2>
          {productsData.productCategory === "Mobile" && (
            <p>{productsData.getUpTo.variantName}</p>
          )}
        </div>
      </div>
      <hr />

      <div>
        <div className="my-6 mx-auto px-4">
          <h2 className="py-3 font-bold text-gray-400">Evaluation</h2>

          <div className="flex flex-col gap-2">
            {Object.entries(deductionSlice.singleDeductions).map(
              ([keyword, label]) => {
                return (
                  <DisplayData
                    key={keyword}
                    keyword={keyword}
                    label={label.conditionLabel}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDeductionsRight;

function DisplayData({ keyword, label }) {
  return (
    label && (
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{keyword}</h2>
        <p className="pl-2 text-sm">{label}</p>
      </div>
    )
  );
}

// function DisplayData({ label, show, items }) {
//   return (
//     show && (
//       <div className="flex flex-col gap-2">
//         <h2 className="font-bold">{label}</h2>
//         {items?.map((item) => (
//           <p key={item} className="pl-2 text-sm">
//             {item}
//           </p>
//         ))}
//       </div>
//     )
//   );
// }

// Old Displaying Selected Data
{
  // <div className="flex flex-col gap-2">
  //   {/* Laptop Configurations */}
  //   <DisplayData
  //     label="Laptop Configuration"
  //     show={laptopSlice.processor.conditionLabel}
  //     items={[
  //       laptopSlice.processor.conditionLabel,
  //       laptopSlice.hardDisk.conditionLabel,
  //       laptopSlice.ram.conditionLabel,
  //     ]}
  //   />
  //   {/* Screen Size */}
  //   <DisplayData
  //     label="Screen Size"
  //     show={laptopSlice.screenSize.conditionLabel}
  //     items={[laptopSlice.screenSize.conditionLabel]}
  //   />
  //   {/* Graphic */}
  //   <DisplayData
  //     label="Graphics"
  //     show={laptopSlice.graphic.conditionLabel}
  //     items={[laptopSlice.graphic.conditionLabel]}
  //   />
  //   {/* Screen Condition */}
  //   <DisplayData
  //     label="Screen Condition"
  //     show={laptopSlice.screenCondition.conditionLabel}
  //     items={[laptopSlice.screenCondition.conditionLabel]}
  //   />
  //   {/* Physical Condition */}
  //   <DisplayData
  //     label="Physical Condition"
  //     show={laptopSlice.physicalCondition.conditionLabel}
  //     items={[laptopSlice.physicalCondition.conditionLabel]}
  //   />
  //   {/* Model Launch Year */}
  //   <DisplayData
  //     label="Model Launch Year"
  //     show={laptopSlice.modelYear.conditionLabel}
  //     items={[laptopSlice.modelYear.conditionLabel]}
  //   />
  //   {/* Selected Conditions */}
  //   <DisplayData
  //     label="Selected Conditions"
  //     show={productsData.deductions.length > 0}
  //     items={productsData.deductions.map((label) => label.conditionLabel)}
  //   />
  //   {/* Accessories */}
  //   <DisplayData
  //     label="Bill"
  //     show={productsData.productBill.conditionLabel}
  //     items={[productsData.productBill.conditionLabel]}
  //   />
  //   <DisplayData
  //     label="Box"
  //     show={productsData.productBox.conditionLabel}
  //     items={[productsData.productBox.conditionLabel]}
  //   />
  //   <DisplayData
  //     label="Charger"
  //     show={productsData.productCharger.conditionLabel}
  //     items={[productsData.productCharger.conditionLabel]}
  //   />
  //   {/* Products Age display */}
  //   <DisplayData
  //     label={"Age"}
  //     show={productsData.productAge.conditionLabel}
  //     items={[productsData.productAge.conditionLabel]}
  //   />
  //   {/* Products Physical Condition */}
  //   <DisplayData
  //     label={"Physical Condition"}
  //     show={productsData.productPhysicalCondition.conditionLabel}
  //     items={[productsData.productPhysicalCondition.conditionLabel]}
  //   />
  //   {/* Products ScreenCondition */}
  //   <DisplayData
  //     label={"Screen Condition"}
  //     show={productsData.productScreenCondition.conditionLabel}
  //     items={[productsData.productScreenCondition.conditionLabel]}
  //   />
  //   {/* Products Display & Defect Condition */}
  //   <DisplayData
  //     label={"Display & Defect"}
  //     show={productsData.productDisplayDefect.conditionLabel}
  //     items={[productsData.productDisplayDefect.conditionLabel]}
  //   />
  // </div>;
}
