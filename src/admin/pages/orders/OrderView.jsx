import React from "react";

const OrderView = ({ orderToView, setOrderViewOpen }) => {
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
          <h2 className="text-xl font-semibold mb-4">Order View</h2>
          <button
            onClick={() => setOrderViewOpen(false)}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            x
          </button>
        </div>

        <div className="text-center mb-2">
          <h2 className="text-xl">Order Detail:</h2>
          <div>
            <div className="flex justify-center">
              <h2 className="px-4 py-2">Order ID: {orderToView.orderId}</h2>
              <h2 className="px-4 py-2">
                Status: {orderToView?.status.toUpperCase()}
              </h2>
            </div>
            <div className="flex justify-center">
              <h2 className="px-4 py-2">
                Schedule PickUp:{" "}
                <span className="font-semibold">
                  {orderToView.schedulePickUp}
                </span>
              </h2>
              <h2 className="px-4 py-2">
                Picked Up By:{" "}
                <span className="font-semibold">
                  {orderToView.pickedUpDetails.agentName}
                </span>
              </h2>
              <h2 className="px-4 py-2">
                Picked Up On:{" "}
                <span className="font-semibold">
                  {orderToView.pickedUpDetails.pickedUpDate}
                </span>
              </h2>
            </div>
            <h2 className="px-4 py-2">
              <div className="flex flex-col items-center">
                <h2>Customer Name: {orderToView.customerName}</h2>

                <div className="flex items-center justify-center gap-3 border p-1 rounded">
                  <div>
                    <h2>Customer ID Front:</h2>
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        orderToView.customerProofFront
                      }
                      alt="ConditionLabel"
                      className="w-[100px] h-[100px] mx-auto "
                    />
                    {/* <button
                    onClick={() => {
                      openImageInNewWindow(
                        import.meta.env.VITE_APP_BASE_URL +
                          orderToView.customerProofFront
                      );
                    }}
                  >
                    View in New Window
                  </button> */}
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

                  <div>
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

                  <div>
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
                  <div>
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
              </div>
            </h2>
            <h2 className="px-4 py-2">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <h2 className="text-lg">Product:</h2>
                </div>
                <div className="">
                  {orderToView.productId?.name}{" "}
                  <div className="flex text-sm opacity-50 gap-2 justify-center">
                    {orderToView.category === "Mobile" ? (
                      <span>Variant {orderToView.variant?.variantName}</span>
                    ) : null}
                    <span>Price {orderToView.variant?.price}</span>
                  </div>
                </div>
              </div>
              {orderToView.deviceInfo ? (
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <h2 className="text-lg">Device Info:</h2>
                  </div>
                  <div className="">
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
                </div>
              ) : null}
            </h2>
            <h2 className="px-4 py-2 flex gap-4 items-center justify-center">
              Offered Price:
              <span className="font-bold"> {orderToView.offerPrice}</span>
              Final Price:
              <span className="font-bold"> {orderToView.finalPrice}</span>
            </h2>
            <div className="flex justify-center">
              <h2 className="px-4 py-2">Email: {orderToView.email}</h2>
              <h2 className="px-4 py-2">PH: {orderToView.phone}</h2>
            </div>
            <h2 className="px-4 py-2">
              Address: {orderToView.addressDetails.address} <br />
              State: {orderToView.addressDetails.state}, City:{" "}
              {orderToView.addressDetails.city}, PinCode:{" "}
              {orderToView.addressDetails.pinCode}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
