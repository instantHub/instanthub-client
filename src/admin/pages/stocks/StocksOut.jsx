import React from "react";
import { useGetStocksQuery } from "../../../features/api";
import Table from "../../components/TableView";

export default function StocksIn() {
  const { data: stocksData, isLoading: stocksDataLoading } =
    useGetStocksQuery();

  if (!stocksDataLoading) {
    console.log("stocksData", stocksData);
  }

  const headers = [
    // "SL No",
    "Order ID",
    "Product Info",
    "PickUp By",
    "Purchased Price",
    "Sold By",
    "Sold Price",
    "Status",
    // "Stock Sold",
  ];

  const rowRenderer = (stock) => (
    <>
      {/* <td className="px-4 py-2">{product.category.name}</td> */}
      {/* <td className="px-4 py-2">{index + 1}</td> */}
      <td className="px-4 py-2 text-lg max-sm:text-xs">{stock.orderId}</td>
      {/* Product Details */}
      <td className="px-4 py-2 text-lg max-sm:text-xs">
        <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
          <span className="opacity-60">Category:</span>
          <span>{stock.productDetails.productCategory}</span>
        </div>

        <div className="flex items-center justify-start">
          <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
            <span className="opacity-60">Product Name:</span>
            <span>{stock.productDetails.productName}</span>
          </div>
          {stock.productDetails.productCategory === "Mobile" ? (
            <span className="pl-1 text-sm opacity-50">
              Variant {stock.productDetails.productVariant}
            </span>
          ) : null}
        </div>
        {/* Serial & IMEI Numebr */}
        <div className="">
          <div className="text-xs">
            {stock.productDetails.imeiNumber ? (
              <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
                <span className="opacity-60">IMEI Number: </span>
                <span className="text-sm max-sm:text-xs">
                  {stock.productDetails.imeiNumber}
                </span>
              </div>
            ) : null}
          </div>
          <div className="text-xs">
            {stock.productDetails.serialNumber ? (
              <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
                <span className="opacity-60">Serial Number: </span>
                <span className="text-sm max-sm:text-xs">
                  {stock.productDetails.serialNumber}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </td>

      {/* Purchased By Details */}
      <td className="px-1 py-2 text-lg max-sm:text-xs">
        <div className="flex flex-col justify-center ">
          <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
            <span className="opacity-60">Agent Name:</span>
            <span className="">{stock.pickedUpDetails.agentName}</span>
          </div>
          <div className="flex max-sm:flex-col gap-1 items-center text-sm max-sm:text-xs">
            <span className="opacity-60">Time:</span>
            <span className="">{stock.pickedUpDetails.pickedUpDate}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-2">{stock.purchasePrice}</td>

      {/* Stock Sold By Details */}
      <td className="px-4 py-2">
        {stock.soldByDetails ? (
          <div className="flex flex-col justify-center">
            <h1 className="text-sm max-sm:text-xs">
              Agent Name:
              <span className="font-bold">{stock.soldByDetails.agentName}</span>
            </h1>
            <h1 className="text-sm  max-sm:text-xs">
              Time:
              <span className="font-bold ">{stock.soldByDetails.soldDate}</span>
            </h1>
          </div>
        ) : (
          `PENDING`
        )}
      </td>
      <td className="px-4 py-2 text-lg max-sm:text-xs">
        {stock.soldPrice ? stock.soldPrice : `PENDING`}
      </td>
      <td className="px-4 py-2 text-lg max-sm:text-xs">
        <h2>{stock.stockStatus}</h2>
      </td>
    </>
  );

  return (
    <>
      <div className="p-4">
        <h2 className=" text-lg font-bold mb-4">Stocks Out Table</h2>

        {!stocksDataLoading && (
          <Table
            headers={headers}
            data={stocksData.filter((s) =>
              s.stockStatus.toLowerCase().includes("out")
            )}
            keyExtractor={(item) => item.id}
            rowRenderer={rowRenderer}
          />
        )}
      </div>
    </>
  );
}

{
  /* <table className="w-full">
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
  </tr>
</thead>

<tbody className="text-center">
  {!stocksDataLoading &&
    stocksData
      .filter((s) => s.stockStatus.toLowerCase().includes("out"))
      .map((stock, index) => (
        <tr
          key={`${stock._id}-${index}`}
          className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
        >
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{stock.orderId}</td>

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
            <h2>{stock.stockStatus}</h2>
          </td>
        </tr>
      ))}
</tbody>
</table> */
}
