import React, { useState } from "react";
import { useStockSoldMutation } from "../../../features/api/admin/stocks/stocksApi";
import DateAndTime from "../../../components/DateAndTime/DateAndTime";
import { SubmitButton } from "../../components/SubmitButton";

export default function ViewStock({ stock, setViewStock }) {
  // console.log("stock", stock);

  const [stockSold, { isLoading: stockSoldLoading }] = useStockSoldMutation();
  // console.log("stockSoldLoading", stockSoldLoading);

  const [soldBy, setSoldBy] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  console.log("Selling Details:", soldBy, sellingPrice, selectedDate);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      stockId: stock.id,
      orderId: stock.orderId,
      soldByDetails: { agentName: soldBy, soldDate: selectedDate },
      soldPrice: sellingPrice,
      status: {
        in: false,
        out: true,
        lost: false,
      },
    };

    console.log("formData from StockIn handleSubmit", formData);

    try {
      const stockData = await stockSold(formData);
      console.log("stockData", stockData);
      setSoldBy("");
      setSellingPrice("");
      setSelectedDate();
      setViewStock(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 max-sm:p-4 rounded-lg shadow-lg w-fit text-sm max-sm:text-xs font-serif">
        {/* Model Header & Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Stock Detail</h2>
          <button
            onClick={() => setViewStock(false)}
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            close
          </button>
        </div>

        {/* Stock Detail */}
        <div className="flex flex-col gap-2 text-center mb-2">
          <Detail label={"Order ID"} text={stock.orderId} />
          <Detail
            label={"Product"}
            text={`${stock.productDetails.productName} ${stock.productDetails.productVariant}`}
          />

          <div className="flex items-center gap-4 max-sm:gap-2">
            <Detail
              label={"Purchased By"}
              text={stock.pickedUpDetails.agentName}
            />
            <Detail label={"Purchased Price"} text={stock.purchasePrice} />
          </div>
          <Detail
            label={"Purchased On"}
            text={stock.pickedUpDetails.pickedUpDate}
          />

          {stock.status.out && (
            <>
              <div className="flex items-center gap-4 max-sm:gap-2">
                <Detail
                  label={"Sold By"}
                  text={stock.soldByDetails.agentName}
                />
                <Detail label={"Sold Price"} text={stock.soldPrice} />
              </div>
              <Detail label={"Sold On"} text={stock.soldByDetails.soldDate} />
            </>
          )}
        </div>

        {/* Stock Selling Form */}
        {stock.status.in && (
          <div onSubmit={handleSubmit} className="text-center border-t pt-2">
            <p className="pb-4 font-semibold">Have you sold this stock?</p>
            <form className="grid grid-cols-1 gap-4">
              {/* Sold by */}
              <div className="grid grid-cols-2 items-center">
                <label htmlFor="pickedUpBy">
                  Stock Sold By:
                  <span className="text-red-600">* </span>
                </label>
                <input
                  type="text"
                  name="soldBy"
                  placeholder="Sold By Name"
                  className="border rounded p-1 mx-auto"
                  onChange={(e) => {
                    setSoldBy(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Selling Price */}
              <div className="grid grid-cols-2 items-center">
                <label htmlFor="sellingPrice">
                  Selling Price:
                  <span className="text-red-600">* </span>
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  id=""
                  placeholder="Sold Price"
                  className="border rounded p-1 mx-auto"
                  onChange={(e) => {
                    setSellingPrice(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Date picker */}
              <div>
                <DateAndTime
                  showPreviousDate={true}
                  setSchedule={setSelectedDate}
                />
              </div>

              {/* Submit Button */}
              <SubmitButton loading={stockSoldLoading} type="primary">
                Stock Sold
              </SubmitButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, text }) {
  return (
    <div className="flex items-center gap-1">
      <span>{label}:</span>
      <b>{text}</b>
    </div>
  );
}
