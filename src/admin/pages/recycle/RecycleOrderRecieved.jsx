import React, { useRef, useState } from "react";
import {
  useRecycleOrderCompleteMutation,
  useUploadCustomerProofImageMutation,
} from "../../../features/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecycleOrderRecieved = ({ selectedOrder, setIsOpen }) => {
  const [uploadCustomerProof] = useUploadCustomerProofImageMutation();
  const [recycleOrderReceived, { isLoading: orderLoading }] =
    useRecycleOrderCompleteMutation();

  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [deviceInfo, setDeviceInfo] = useState();
  //   console.log("deviceInfo", deviceInfo);

  // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  //   console.log("pickedUpBy", pickedUpBy);

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const uploadFileHandler = async (image) => {
    const formData = new FormData();
    if (image === "front") {
      formData.append("image", imageSelected1);
    } else if (image === "back") {
      formData.append("image", imageSelected2);
    } else if (image === "optional1") {
      formData.append("image", imageSelected3);
    } else if (image === "optional2") {
      formData.append("image", imageSelected4);
    }
    // formData.append("image", imageSelected1);

    try {
      const res = await uploadCustomerProof(formData).unwrap();
      console.log("res.image", res.image);

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image upload handler call
    // const imageURL = await uploadFileHandler();
    const imageURL1 = await uploadFileHandler("front");
    const imageURL2 = await uploadFileHandler("back");

    let imageURL3, imageURL4;
    if (imageSelected3) {
      imageURL3 = await uploadFileHandler("optional1");
      console.log("imageURL3", imageURL3);
    }
    if (imageSelected4) {
      imageURL4 = await uploadFileHandler("optional2");
      console.log("imageURL4", imageURL4);
    }

    console.log("handlesubmit ", imageURL1, imageURL2);

    const formattedDate = {
      agentName: pickedUpBy,
      pickedUpDate: `${selectedDate.toLocaleString("en-US", {
        month: "long",
      })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`,
    };

    const formData = {
      recycleOrderId: selectedOrder.id,
      customerProofFront: imageURL1,
      customerProofBack: imageURL2,
      customerOptional1: imageURL3 ? imageURL3 : null,
      customerOptional2: imageURL4 ? imageURL4 : null,
      pickedUpDetails: formattedDate,
      deviceInfo,
      finalPrice,
      status: "received",
    };

    console.log("formData from OrderList handleSubmit", formData);

    try {
      const orderData = await recycleOrderReceived(formData);
      console.log("orderData", orderData);

      setIsOpen(false);

      // Clear the value of the file input
      fileInputRef1.current.value = "";
      fileInputRef2.current.value = "";
      fileInputRef3.current.value = "";
      fileInputRef4.current.value = "";
      // Mark the file input as required again
      fileInputRef1.current.required = true;
      fileInputRef2.current.required = true;
      setPickedUpBy("");
      setFinalPrice("");
      setDeviceInfo();
      setSelectedDate();
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Recycle Order Received</h2>
          <button
            onClick={() => setIsOpen(false)}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            x
          </button>
        </div>

        <table className="mx-auto border-collapse w-[90%]">
          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">
              Recycle Order ID
            </th>
            <td className="p-2 border font-semibold">
              {selectedOrder.recycleOrderId}
            </td>
          </tr>
          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">Product</th>
            <td className="p-2 border">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {selectedOrder.productDetails.productName}
                </span>

                {selectedOrder.productDetails.productCategory
                  .toLowerCase()
                  .includes("mobile") ? (
                  <div>
                    <span className="">Variant: </span>
                    <span className="font-semibold">
                      {selectedOrder.productDetails.productVariant}
                    </span>
                  </div>
                ) : null}
              </div>
            </td>
          </tr>
          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">
              Customer Details
            </th>
            <td className="p-2 border text-lg">
              <div className="flex flex-col">
                <div>
                  Customer Name:
                  <span className="text-lg font-semibold">
                    {selectedOrder.customerName}
                  </span>
                </div>
                <div>
                  Email:{" "}
                  <span className="text-lg font-semibold">
                    {selectedOrder.email}
                  </span>
                </div>
                <div>
                  Phone:{" "}
                  <span className="text-lg font-semibold">
                    {selectedOrder.phone}
                  </span>
                </div>
              </div>
            </td>
          </tr>

          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">
              Address Details
            </th>
            <td className="p-2 border text-lg">
              <div>
                <span className="text-lg font-semibold">
                  {selectedOrder.addressDetails.address},{" "}
                </span>
              </div>
              <div className="flex items-center">
                <div>
                  City:{" "}
                  <span className="text-lg font-semibold">
                    {selectedOrder.addressDetails.city},{" "}
                  </span>
                </div>
                <div>
                  State:{" "}
                  <span className="text-lg font-semibold">
                    {selectedOrder.addressDetails.state},{" "}
                  </span>
                </div>
                <div>
                  PinCode:
                  <span className="text-lg font-semibold">
                    {selectedOrder.addressDetails.pinCode}.
                  </span>
                </div>
              </div>
            </td>
          </tr>

          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">
              Schedule PickUp Date
            </th>
            <td className="p-2 border text-lg font-semibold">
              {selectedOrder.schedulePickUp}
            </td>
          </tr>

          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">Status</th>
            <td className="p-2 border text-lg font-semibold">
              {selectedOrder.status}
            </td>
          </tr>

          <tr className="border-b">
            <th className="text-right bg-slate-100 w-[30%] px-5">
              Recycle Price:
            </th>
            <td className="p-2 border text-lg font-semibold">
              {selectedOrder.recyclePrice}
            </td>
          </tr>
        </table>

        <hr />

        <div className="text-center mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Mandatory Images */}
            <div className="flex flex-col gap-1 items-center">
              <div className="">
                <h2 className="text-lg">
                  Required Documents<span className="text-red-600">*</span>
                </h2>
              </div>
              <div className="flex">
                {/* ID Front Image */}
                {/* <div> */}
                <label htmlFor="name">
                  Upload Front of Customer ID
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="name"
                  id=""
                  ref={fileInputRef1}
                  placeholder="Enter Name"
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected1(e.target.files[0]);
                  }}
                  required
                />
                {/* </div> */}

                {/* ID Back Image */}
                {/* <div> */}
                <label htmlFor="name">
                  Upload Back of Customer ID
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="name"
                  id=""
                  ref={fileInputRef2}
                  placeholder="Enter Name"
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected2(e.target.files[0]);
                  }}
                  required
                />
                {/* </div> */}
              </div>
            </div>
            <hr className="w-1/3 mx-auto" />
            {/* Optional Images */}
            <div className="flex flex-col gap-1">
              <div className="">
                <h2 className="text-lg">Optional Documents</h2>
              </div>
              <div className="flex items-center">
                {/* Optional Image 1 */}
                <label htmlFor="name">Upload Optional Doc 1</label>
                <input
                  type="file"
                  name="name"
                  id=""
                  ref={fileInputRef4}
                  placeholder=""
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected3(e.target.files[0]);
                  }}
                />

                {/* Optional Image 2 */}
                <label htmlFor="name">Upload Optional Doc 2</label>
                <input
                  type="file"
                  name="name"
                  id=""
                  ref={fileInputRef3}
                  placeholder=""
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected4(e.target.files[0]);
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="flex items-center">
                  <label htmlFor="pickedUpBy">
                    Order Picked Up By:
                    <span className="text-red-600">* </span>
                  </label>
                  <input
                    type="text"
                    name="pickedUpBy"
                    id=""
                    ref={fileInputRef3}
                    placeholder="Picked Up By Name"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setPickedUpBy(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>
                    <label htmlFor="finalPrice">
                      Recycle Offered Price:{" "}
                      <span className="font-bold">
                        {selectedOrder.recyclePrice}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="finalPrice">
                      Purchase Price:
                      <span className="text-red-600">* </span>
                    </label>
                    <input
                      type="number"
                      name="finalPrice"
                      id=""
                      placeholder="Purchase Price"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setFinalPrice(e.target.value);
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
                      Picket Up time: `
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
              <div className="flex justify-center mt-5 gap-2 items-center">
                <div>
                  <label htmlFor="finalPrice">Serial No:</label>
                  <input
                    type="text"
                    name="serialNo"
                    id=""
                    placeholder="Serial No"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setDeviceInfo({
                        ...deviceInfo,
                        serialNumber: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="finalPrice">IMEI No:</label>
                  <input
                    type="text"
                    name="IMEI"
                    id=""
                    placeholder="IMEI No"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setDeviceInfo({
                        ...deviceInfo,
                        imeiNumber: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {!orderLoading ? (
              <input
                type="submit"
                value="Mark Received"
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
  );
};

export default RecycleOrderRecieved;
