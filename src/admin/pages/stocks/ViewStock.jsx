import React, { useState } from "react";
import { useStockSoldMutation } from "../../../features/api/admin/stocks/stocksApi";
import DatePicker from "react-datepicker";

export default function ViewStock({ stock, setViewStock }) {
  console.log("stock", stock);

  const [stockSold, { isLoading: stockSoldLoading }] = useStockSoldMutation();
  console.log("stockSoldLoading", stockSoldLoading);

  const [soldBy, setSoldBy] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);
  };

  console.log("Selling Details:", soldBy, sellingPrice, selectedDate);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = {
      agentName: soldBy,
      soldDate: `${selectedDate.toLocaleString("en-US", {
        month: "long",
      })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`,
    };

    const formData = {
      stockId: stock.id,
      orderId: stock.orderId,
      soldByDetails: formattedDate,
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
              <div className="relative pb-7 grid grid-cols-2 items-center">
                <label htmlFor="datepicker">
                  Select Date and Time:
                  <span className="text-red-600">* </span>
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleTimeChange}
                  showTimeSelect
                  // timeFormat="HH:mm" // 24 hours
                  timeFormat="h:mm aa" // 12 hours
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="Time"
                  // minDate={schedulePickUpDate}
                  minDate={currentDate}
                  minTime={minTime}
                  maxTime={maxTime}
                  placeholderText="Select PickedUp Time"
                  className="border p-1 rounded"
                  required
                />

                {selectedDate && (
                  <p className="absolute bottom-0 left-10 text-sm max-sm:text-xs">
                    Sold On: `
                    {selectedDate.toLocaleString("en-US", {
                      month: "long",
                    })}{" "}
                    {selectedDate.getDate()}, {selectedDate.getFullYear()}{" "}
                    {selectedDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    `
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value="Submit"
                className="border rounded px-2 py-1 w-fit bg-green-600 text-white cursor-pointer mx-auto disabled:cursor-none disabled:bg-gray-400"
                disabled={stockSoldLoading}
              />
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
