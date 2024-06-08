import React, { useState, useEffect, useRef } from "react";
import { useGetStocksQuery, useStockSoldMutation } from "../../../features/api";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

export default function StocksIn() {
  const { data: stocksData, isLoading: stocksDataLoading } =
    useGetStocksQuery();
  const [stockSold, { isLoading: stockSoldLoading }] = useStockSoldMutation();

  const [openSellModal, setOpenSellModal] = useState();
  const [selectedStock, setSelectedStock] = useState();
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

  const handleSellView = (stockId) => {
    const stock = stocksData.find((stock) => stock.id === stockId);
    setSelectedStock(stock);
    setOpenSellModal(true);
    console.log("handleSellView", stock);
  };

  console.log("selectedStock", selectedStock);

  if (!stocksDataLoading) {
    console.log("stocksData", stocksData);
  }

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
      stockId: selectedStock.id,
      orderId: selectedStock.id,
      soldByDetails: formattedDate,
      soldPrice: sellingPrice,
      stockStatus: "Out",
    };

    console.log("formData from StockIn handleSubmit", formData);

    try {
      const stockData = await stockSold(formData);
      console.log("stockData", stockData);
      setOpenSellModal(false);
      setSoldBy("");
      setSellingPrice("");
      setSelectedDate();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="p-4">
        <h2 className=" text-lg font-bold mb-4">Stocks In Table</h2>
        {/* <div className="mb-4">
          <h1>Orders List</h1>
        </div> */}
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-gray-800">SL No</th>
              <th className="px-4 py-2 text-white bg-gray-800">Order ID</th>
              <th className="px-4 py-2 text-white bg-gray-800">Product Info</th>
              <th className="px-4 py-2 text-white bg-gray-800">PickUp By</th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Purchased Price
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">Sold By</th>
              <th className="px-4 py-2 text-white bg-gray-800">Sold Price</th>
              <th className="px-4 py-2 text-white bg-gray-800">Status</th>
              <th className="px-4 py-2 text-white bg-gray-800">Stock Sold</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Products when Category is selected */}
            {!stocksDataLoading &&
              stocksData
                .filter((s) => s.stockStatus.toLowerCase().includes("in"))
                .map((stock, index) => (
                  <tr
                    key={`${stock._id}-${index}`}
                    className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                  >
                    {/* <td className="px-4 py-2">{product.category.name}</td> */}
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{stock.orderId}</td>

                    {/* Product Details */}
                    <td className="px-4 py-2">
                      <div>
                        <span>
                          Category: {stock.productDetails.productCategory}
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <span>{stock.productDetails.productName}</span>
                        {stock.productDetails.productCategory === "Mobile" ? (
                          <span className="pl-1 text-sm opacity-50">
                            Variant {stock.productDetails.productVariant}
                          </span>
                        ) : null}
                      </div>
                      {/* Serial & IMEI Numebr */}
                      <div>
                        <div className="text-xs">
                          {stock.productDetails.imeiNumber ? (
                            <>
                              <span>IMEI Number </span>
                              <span className="text-sm font-bold">
                                {stock.productDetails.imeiNumber}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div className="text-xs">
                          {stock.productDetails.serialNumber ? (
                            <>
                              <span>Serial Number </span>
                              <span className="text-sm font-bold">
                                {stock.productDetails.serialNumber}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </td>

                    {/* Purchased By Details */}
                    <td className="w-[10%] px-1 py-2">
                      <div className="flex flex-col justify-center">
                        <h1 className="text-sm">
                          Agent Name:
                          <span className="font-bold">
                            {stock.pickedUpDetails.agentName}
                          </span>
                        </h1>
                        <h1 className="text-sm">
                          Time:
                          <span className="font-bold">
                            {stock.pickedUpDetails.pickedUpDate}
                          </span>
                        </h1>
                      </div>
                    </td>
                    <td className="px-4 py-2">{stock.purchasePrice}</td>
                    <td className="px-4 py-2">
                      {stock.soldByDetails ? (
                        <div className="flex flex-col justify-center">
                          <h1 className="text-sm">
                            Agent Name:
                            <span className="font-bold">
                              {stock.soldByDetails.agentName}
                            </span>
                          </h1>
                          <h1 className="text-sm">
                            Time:
                            <span className="font-bold">
                              {stock.soldByDetails.soldDate}
                            </span>
                          </h1>
                        </div>
                      ) : (
                        `PENDING`
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {stock.soldPrice ? stock.soldPrice : `PENDING`}
                    </td>
                    <td className="px-4 py-2">
                      <h1>{stock.stockStatus}</h1>
                    </td>

                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleSellView(stock.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                      >
                        Mark Sold
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {openSellModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Stock Sold</h2>
              <button
                onClick={() => setOpenSellModal(false)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>

            <div className="text-center mb-2">
              <h1 className="text-xl">Stock Detail:</h1>
              <ul>
                <li className="px-4 py-2">Order ID: {selectedStock.orderId}</li>
                <li className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <h1 className="text-lg">Product:</h1>
                    </div>
                    <div className="">
                      {selectedStock.productDetails.productName}{" "}
                      <div className="flex text-sm opacity-50 gap-2 justify-center">
                        <span>
                          Variant {selectedStock.productDetails.productVariant}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="px-4 py-2">
                  Purchased Price: {selectedStock.purchasePrice}
                </li>

                <li className="px-4 py-2">
                  Stock PickUp By: {selectedStock.pickedUpDetails.agentName}
                </li>
                <li className="px-4 py-2">
                  Stock PickUp On: {selectedStock.pickedUpDetails.pickedUpDate}
                </li>
              </ul>
            </div>

            <hr />

            <div onSubmit={handleSubmit} className="text-center mt-4">
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <div className="flex items-center">
                      <label htmlFor="pickedUpBy">
                        Stock Sold By:
                        <span className="text-red-600">* </span>
                      </label>
                      <input
                        type="text"
                        name="soldBy"
                        id=""
                        placeholder="Sold By Name"
                        className="border rounded px-1 mx-auto"
                        onChange={(e) => {
                          setSoldBy(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      {/* <div>
                        <label htmlFor="purchasePrice">
                          Purchased Price:{" "}
                          <span className="font-bold">
                            {selectedStock.purchasePrice}
                          </span>
                        </label>
                      </div> */}

                      <div className="flex items-center">
                        <label htmlFor="sellingPrice">
                          Selling Price:
                          <span className="text-red-600">* </span>
                        </label>
                        <input
                          type="number"
                          name="sellingPrice"
                          id=""
                          placeholder="Sold Price"
                          className="border rounded px-1 mx-auto"
                          onChange={(e) => {
                            setSellingPrice(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div>
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
                        className="border px-1 rounded"
                        required
                      />

                      {selectedDate && (
                        <p className="py-2 text-xl">
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
                  </div>
                </div>

                {!stocksDataLoading ? (
                  <input
                    type="submit"
                    value="Stock Sold"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Loading"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-green-300 text-white cursor-none mx-auto"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
