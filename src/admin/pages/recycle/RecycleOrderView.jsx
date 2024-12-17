import React from "react";

const RecycleOrderView = ({ orderToView, setOrderViewOpen }) => {
  const downloadImage = (imageUrl, imageName) => {
    console.log(imageName);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        // link.setAttribute("download", "image.jpg"); // Change the filename if needed
        link.setAttribute("download", `${imageName}.jpg`); // Change the filename if needed
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Recycle Order Received</h2>
          <button
            onClick={() => setOrderViewOpen(false)}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            x
          </button>
        </div>

        <div className="mb-2">
          {/* <h2 className="text-xl">Order Detail:</h2> */}
          <table className="mx-auto border-collapse w-[90%]">
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Recycle Order ID
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.recycleOrderId}
              </td>
            </tr>
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">Product</th>
              <td className="p-2 border">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {orderToView.productDetails.productName}
                  </span>

                  {orderToView.productDetails.productCategory
                    .toLowerCase()
                    .includes("mobile") ? (
                    <div>
                      <span className="">Variant: </span>
                      <span className="font-semibold">
                        {orderToView.productDetails.productVariant}
                      </span>
                    </div>
                  ) : null}
                </div>
              </td>
            </tr>
            {orderToView.deviceInfo ? (
              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Device Info
                </th>
                <td className="p-2 border">
                  <div className="flex items-center justify- gap-4">
                    <div className="flex text-sm opacity-70 gap-2 justify-center">
                      {orderToView.deviceInfo.serialNumber ? (
                        <p>
                          Serial Number:{" "}
                          <span className="font-bold">
                            {orderToView.deviceInfo.serialNumber}
                          </span>
                        </p>
                      ) : null}

                      {orderToView.deviceInfo.imeiNumber ? (
                        <p>
                          IMEI Number:{" "}
                          <span className="font-bold">
                            {orderToView.deviceInfo.imeiNumber}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}

            {/* Customer Details */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Customer Details
              </th>
              <td className="p-2 border">
                <div className="flex flex-col">
                  <div>
                    Customer Name:{" "}
                    <span className="font-semibold">
                      {orderToView.customerName}
                    </span>
                  </div>
                  <div>
                    Email:{" "}
                    <span className="font-semibold">{orderToView.email}</span>
                  </div>
                  <div>
                    Phone:{" "}
                    <span className="font-semibold">{orderToView.phone}</span>
                  </div>
                </div>
              </td>
            </tr>

            {/* Customer Proof */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Cusomer Proof
              </th>
              <td className="p-2 border font-semibold">
                <div className="flex items-center justify-center gap-2 p-1 rounded">
                  <div className="flex flex-col items-center gap-1">
                    <h2>Customer ID Front:</h2>
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        orderToView.customerProofFront
                      }
                      alt="ConditionLabel"
                      className="w-[100px] h-[100px] mx-auto "
                    />
                    <button
                      onClick={() => {
                        downloadImage(
                          import.meta.env.VITE_APP_BASE_URL +
                            orderToView.customerProofFront,
                          `${orderToView.customerName}-customerProofFront`
                        );
                      }}
                      className="bg-green-600 px-2 rounded text-white"
                    >
                      Download
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <h2>Customer ID Back:</h2>
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        orderToView.customerProofBack
                      }
                      alt="ConditionLabel"
                      className="w-[100px] h-[100px] mx-auto "
                      onClick={() => downloadImage()}
                    />
                    <button
                      onClick={() => {
                        downloadImage(
                          import.meta.env.VITE_APP_BASE_URL +
                            orderToView.customerProofBack,
                          `${orderToView.customerName}-customerProofBack`
                        );
                      }}
                      className="bg-green-600 px-2 rounded text-white"
                    >
                      Download
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {orderToView.customerOptional1 ? (
                      <>
                        <h2>Optional Proof1:</h2>
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            orderToView.customerOptional1
                          }
                          alt="ConditionLabel"
                          className="w-[100px] h-[100px] mx-auto "
                          onClick={() => downloadImage()}
                        />
                        <button
                          onClick={() => {
                            downloadImage(
                              import.meta.env.VITE_APP_BASE_URL +
                                orderToView.customerOptional1,
                              `${orderToView.customerName}-customerOptional1`
                            );
                          }}
                          className="bg-green-600 px-2 rounded text-white"
                        >
                          Download
                        </button>
                      </>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {orderToView.customerOptional2 ? (
                      <>
                        <h2>Optional Proof2</h2>
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            orderToView.customerOptional2
                          }
                          alt="ConditionLabel"
                          className="w-[100px] h-[100px] mx-auto "
                          onClick={() => downloadImage()}
                        />
                        <button
                          onClick={() => {
                            downloadImage(
                              import.meta.env.VITE_APP_BASE_URL +
                                orderToView.customerOptional2,
                              `${orderToView.customerName}-customerOptional2`
                            );
                          }}
                          className="bg-green-600 px-2 rounded text-white"
                        >
                          Download
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </td>
            </tr>

            {/* Address */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Address Details
              </th>
              <td className="p-2 border">
                <div>
                  <span className="font-semibold">
                    {orderToView.addressDetails.address},{" "}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    City:{" "}
                    <span className="font-semibold">
                      {orderToView.addressDetails.city},
                    </span>
                  </div>
                  <div>
                    State:{" "}
                    <span className="font-semibold">
                      {orderToView.addressDetails.state},
                    </span>
                  </div>
                  <div>
                    PinCode:
                    <span className="font-semibold">
                      {orderToView.addressDetails.pinCode}.
                    </span>
                  </div>
                </div>
              </td>
            </tr>

            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Schedule PickUp Date
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.schedulePickUp}
              </td>
            </tr>
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Picked Up By
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.pickedUpDetails.agentName}
              </td>
            </tr>
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Picked Up Date
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.pickedUpDetails.pickedUpDate}
              </td>
            </tr>

            {/* status */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">Status</th>
              <td className="p-2 border font-semibold">
                {orderToView?.status.toUpperCase()}
              </td>
            </tr>

            {/* Recycle Price */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Recycle Price
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.recyclePrice}
              </td>
            </tr>

            {/* Final Price */}
            <tr className="border-b">
              <th className="text-right bg-slate-100 w-[30%] px-5">
                Final Price
              </th>
              <td className="p-2 border font-semibold">
                {orderToView.finalPrice}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecycleOrderView;
