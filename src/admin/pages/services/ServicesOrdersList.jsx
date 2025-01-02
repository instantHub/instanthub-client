import React, { useState, useEffect } from "react";
import {
  useGetServicesQuery,
  useGetServicesOrdersQuery,
  useDeleteServiceOrderMutation,
  useServiceOrderCompleteMutation,
} from "../../../features/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Table from "../../components/TableView";
import { useNavigate } from "react-router-dom";
import { GiCardPickup } from "react-icons/gi";
import ConfirmationModal from "../../components/ConfirmationModal";

const ServicesOrdersList = () => {
  const { data: servicesOrders, isLoading: servicesOrdersLoading } =
    useGetServicesOrdersQuery();

  const [deleteServiceOrder, { isLoading: deleteLoading }] =
    useDeleteServiceOrderMutation();

  const [serviceOrderComplete, { isLoading: orderCompleteLoading }] =
    useServiceOrderCompleteMutation();

  const navigate = useNavigate();

  const [selectedServiceOrder, setSelectedServiceOrder] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);

  const [serviceFinalPrice, setServiceFinalPrice] = useState("");
  const [serviceAgent, setServiceAgent] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  // CALENDER
  const [selectedDate, setSelectedDate] = useState();
  const currentDate = new Date();
  const [serviceCompletedOn, setServiceCompletedOn] = useState();

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");
  const [orderIDToDelete, setOrderIDToDelete] = useState("");

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  // Additional Services Done
  const [additionalServices, setAdditionalServices] = useState([
    { name: "", price: 0 },
  ]);

  console.log("additionalServices", additionalServices);

  // Handler to add a new service entry
  const addService = () => {
    setAdditionalServices([...additionalServices, { name: "", price: "" }]);
  };

  // Handler to remove a service entry
  const removeService = (index) => {
    const newServices = additionalServices.filter((_, i) => i !== index);
    setAdditionalServices(newServices);
  };

  // Handler to update service details
  const handleServiceChange = (index, field, value) => {
    const newServices = [...additionalServices];
    newServices[index][field] = value;
    setAdditionalServices(newServices);
  };

  const handleTimeChange = (date) => {
    setSelectedDate(date);

    const formattedDate = `${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`;
    // console.log("formattedDate", formattedDate);
    setServiceCompletedOn(formattedDate);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (serviceOrderId) => {
    console.log("handleDelete serviceOrderId", serviceOrderId);
    try {
      await deleteServiceOrder(serviceOrderId);
      toast.success("Service Order deleted successfully");
    } catch (error) {
      toast.error("Service Order couldn't be deleted..!!");
    }
  };

  const handleServiceComplete = async (
    selectedServiceOrderId,
    selectedServiceOrder
  ) => {
    // console.log("handleServiceComplete", selectedServiceOrderId);
    // console.log("selectedServiceOrder", selectedServiceOrder);
    console.log(
      serviceFinalPrice,
      serviceAgent,
      serviceCompletedOn,
      additionalServices
    );

    let formData = {
      // serviceOrderId: selectedServiceOrderId,
      serviceFinalPrice,
      serviceAgent,
      serviceCompletedOn,
      // additionalServices,
      status: "Completed",
    };

    if (selectedServiceOrder.serviceType.toLowerCase().includes("brand")) {
      // let blankService = additionalServices.find((as) => as.name.length <= 0);
      let blankService = additionalServices[0].name.length <= 0;
      if (!blankService) {
        formData.additionalServices = additionalServices;
      }
    }

    console.log("formData from handleServiceComplete", formData);

    try {
      // const updatedBrand = await updateBrand({
      //   brandId: brandId,
      //   data: formData,
      // }).unwrap();

      const serviceOrderCompleted = await serviceOrderComplete({
        serviceOrderId: selectedServiceOrderId,
        data: formData,
      }).unwrap();

      console.log("serviceOrderCompleted", serviceOrderCompleted);
      setIsOpen(false);
      setServiceFinalPrice("");
      setServiceAgent("");
      setServiceCompletedOn("");
      setSelectedDate();
      setAdditionalServices[{ name: "", price: 0 }];
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log("selected service", selectedServiceOrder);

  const handleOrderStatus = (order) => {
    if (order.status.pending) {
      return (
        <p className="px-4 py-1 bg-blue-600 text-white shadow rounded w-full flex items-center justify-center gap-1">
          Pickup Pending <GiCardPickup />
        </p>
      );
    }

    if (order.status.completed) {
      return (
        <p className="flex flex-col border shadow rounded overflow-hidden bg-green-600 w-full">
          <span className="px-2 py-1 text-white">Order Completed On:</span>
          <span className="bg-white px-2">
            {order.pickedUpDetails.pickedUpDate}
          </span>
        </p>
      );
    }

    if (order.status.cancelled) {
      return (
        <p className="px-4 py-1 bg-red-600 text-white shadow rounded w-full flex items-center justify-center gap-1">
          Order Cancelled <GiCardPickup />
        </p>
      );
    }

    // Return null or some default content if none of the conditions match
    return null;
  };

  const orderCurrentStatus = (status) => {
    if (status?.pending) return <span className="text-blue-600">Pending</span>;
    if (status?.completed)
      return <span className="text-green-600">Completed</span>;
    if (status?.cancelled)
      return <span className="text-red-600">Cancelled</span>;
    return "Unknown";
  };

  const handleViewBtnColor = (status) => {
    if (status.pending) return "bg-blue-500 hover:bg-blue-700";
    if (status.completed) return "bg-green-600 hover:bg-green-700";
    if (status.cancelled) return "bg-red-600 hover:bg-red-700";
    return "bg-black text-white";
  };

  const headers = [
    "Service Order Details",
    "Customer Details",
    "Service Detail",
    "Schedule Time",
    "Status",
    "Update Order",
    "Delete Order",
  ];

  const rowRenderer = (servicesOrder) => (
    <>
      <td className=" py-2">
        <div>{servicesOrder.serviceOrderId}</div>

        {/* Serve Detail */}
        <div className="flex flex-col">
          {servicesOrder.serviceType !== "DirectService" ? (
            <span className="font-semibold">
              {servicesOrder.selectedService.serviceCategoryId.name}
            </span>
          ) : null}
          <span>{servicesOrder.selectedService.name}</span>
        </div>
      </td>
      <td className=" py-2">
        <div className="flex flex-col">
          <span>{servicesOrder.customerName}</span>
          <span>{servicesOrder.email}</span>
          <span>{servicesOrder.phone}</span>
        </div>
      </td>

      {/* Serve Detail */}
      {/* <td className="py-2"></td> */}

      {/* Problems */}
      {/* <td className="flex flex-col py-2">
        {servicesOrder.problems.length > 0 ? (
          servicesOrder.problems.map((p, i) => (
            <span key={i}>{p.serviceProblem}</span>
          ))
        ) : (
          <p className="text-red-500">-</p>
        )}
      </td> */}
      {/* <td className=" py-2">{servicesOrder.inspectionCharges}</td> */}
      <td className=" py-2">{servicesOrder.address}</td>
      <td className=" py-2">
        <div className="flex flex-col">
          <span>{servicesOrder.scheduleDate}</span>
          <span>{servicesOrder.scheduleTime}</span>
        </div>
      </td>
      <td className=" py-2">{orderCurrentStatus(servicesOrder.status)}</td>
      <td className="text-white py-2">
        <button
          className={`${handleViewBtnColor(servicesOrder.status)} p-1 rounded`}
          onClick={() => {
            // setSelectedServiceOrder(servicesOrder);
            // setIsOpen(true);
            navigate(`/admin/serviceOrder-detail/${servicesOrder.id}`);
          }}
        >
          View Order
        </button>

        {/* {servicesOrder.status.toLowerCase().includes("pending") && (
          <div className="text-sm">
            <button
              className="bg-blue-600 px-3 py-1 rounded-md"
              onClick={() => {
                // setSelectedServiceOrder(servicesOrder);
                // setIsOpen(true);
                navigate(`/admin/serviceOrder-detail/${servicesOrder.id}`);
              }}
            >
              Mark <br /> Completed
            </button>
          </div>
        )}
        {servicesOrder.status.toLowerCase().includes("complete") && (
          <div className="text-sm">
            <button
              className="bg-green-600 px-3 py-1 rounded-md"
              onClick={() => {
                // setSelectedServiceOrder(servicesOrder);
                // setViewOrder(true);
                navigate(`/admin/serviceOrder-detail/${servicesOrder.id}`);
              }}
            >
              View Service
            </button>
          </div>
        )} */}
      </td>
      <td className="text-white py-2">
        <div className="flex gap-2 justify-center">
          <button
            className="bg-red-600 px-3 py-1 rounded-md"
            onClick={() => {
              // handleDelete(servicesOrder.id);
              setModalOpen(true);
              setOrderToDelete(servicesOrder.id);
              setOrderIDToDelete(servicesOrder.serviceOrderId);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </>
  );

  return (
    <>
      <div className="p-4">
        {/* Service Orders List */}

        {!servicesOrdersLoading && (
          <Table
            headers={headers}
            data={servicesOrders}
            keyExtractor={(item) => item.id}
            rowRenderer={rowRenderer}
          />
        )}
      </div>

      {isOpen && (
        <td>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[65%]">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Mark Service Completed.
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <span>Service OrderID</span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.serviceOrderId}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Customer Details</span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.customerName}
                  </span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.email}
                  </span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.phone}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span>Inspection Price</span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.inspectionCharges}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Status</span>
                  <span className="text-lg font-semibold">
                    {selectedServiceOrder.status}
                  </span>
                </div>
                {/* Selected Service Details */}
                <div className="py-2">
                  <div className="flex flex-col">
                    {selectedServiceOrder.serviceType !== "DirectService" ? (
                      <span className="font-semibold">
                        Service Name:{" "}
                        {
                          selectedServiceOrder.selectedService.serviceCategoryId
                            .name
                        }
                      </span>
                    ) : null}
                    {selectedServiceOrder.serviceType === "DirectService" && (
                      <span>
                        Service Name:{" "}
                        {selectedServiceOrder.selectedService.name}
                      </span>
                    )}
                    {selectedServiceOrder.serviceType === "Brand" && (
                      <span>
                        Service Brand:{" "}
                        {selectedServiceOrder.selectedService.name}
                      </span>
                    )}
                    {selectedServiceOrder.serviceType ===
                      "ServiceSubCategory" && (
                      <>
                        <span>
                          <span className="font-semibold">
                            Selected{" "}
                            {
                              selectedServiceOrder.selectedService
                                .serviceCategoryId.name
                            }
                          </span>
                          : {selectedServiceOrder.selectedService.name}
                        </span>
                        <span>
                          <span className="font-semibold">
                            {
                              selectedServiceOrder.selectedService
                                .serviceCategoryId.name
                            }{" "}
                            Price:{" "}
                          </span>
                          {selectedServiceOrder.price}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Selected Service Problems */}
                <div className="flex flex-col py-2">
                  {selectedServiceOrder.problems.length > 0 && (
                    <p className="font-semibold">Services Requested</p>
                  )}
                  {selectedServiceOrder.problems.length > 0
                    ? selectedServiceOrder.problems.map((p, i) => (
                        <span key={i}>{p.serviceProblem}</span>
                      ))
                    : // <p className="text-red-500">-</p>
                      null}
                </div>
              </div>

              {/* Additional details after service complete */}
              <div className="grid grid-cols-2 mx-auto items-center gap-4 mt-5">
                <div className="flex gap-2">
                  <label htmlFor="">Service Final Price</label>
                  <input
                    type="number"
                    value={serviceFinalPrice}
                    onChange={(e) => setServiceFinalPrice(e.target.value)}
                    className="border px-2"
                    placeholder="Enter Service Price"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="">Serviced By</label>
                  <input
                    type="text"
                    value={serviceAgent}
                    onChange={(e) => setServiceAgent(e.target.value)}
                    className="border px-2"
                    placeholder="Agent Name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor="datepicker">
                      Service Completed On:
                      <span className="text-red-600">* </span>
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      // selected={schedulePickUpDate}
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
                  </div>

                  {/* {schedulePickUpDate && ( */}
                  <p className="py-2 text-xl">{serviceCompletedOn}</p>
                  {/* )} */}
                </div>

                {/* Additional Service */}
                {selectedServiceOrder.serviceType === "Brand" && (
                  <div className="flex flex-col gap-2">
                    <p className="mx-auto border-b">
                      Additional Service Details
                    </p>
                    {additionalServices.map((service, index) => (
                      <div
                        key={index}
                        // className="grid grid-cols-3 w-full items-center gap-4"
                        className="flex w-full items-center gap-4"
                      >
                        <div className="grid grid-cols-2 items-center">
                          <label htmlFor="">Service Name</label>
                          <input
                            type="text"
                            className="border px-2"
                            placeholder="Service Name"
                            value={service.name}
                            onChange={(e) =>
                              handleServiceChange(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 items-center">
                          <label htmlFor="">Service Price</label>
                          <input
                            type="number"
                            className="border px-2"
                            placeholder="Service Price"
                            value={service.price}
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {index === additionalServices.length - 1 && (
                          <div>
                            <button
                              className="px-2 py-1 bg-red-500 rounded text-white"
                              onClick={() => removeService(index)}
                            >
                              X
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <div>
                      <button
                        className="px-2 py-1 bg-blue-500 rounded text-white"
                        onClick={addService}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <label htmlFor="">Status</label>
                  <input type="text" placeholder="COMPLETED" />
                </div>
              </div>

              <div className="flex justify-around mt-8">
                <button
                  onClick={() =>
                    handleServiceComplete(
                      selectedServiceOrder.id,
                      selectedServiceOrder
                    )
                  }
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Completed
                </button>

                <button
                  onClick={closeModal}
                  className="bg-red-700 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </td>
      )}

      {viewOrder && (
        <div>
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg px-5 py-10 w-[70%]">
              <div className="flex justify-center">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Completed Service Detail
                </h2>
              </div>
              <table className="mx-auto border-collapse  w-[90%]">
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Service OrderID
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.serviceOrderId}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Customer Details
                  </th>
                  <td className="p-2 border text-lg">
                    <div className="flex flex-col">
                      <div>
                        Customer Name:{" "}
                        <span className="text-lg font-semibold">
                          {selectedServiceOrder.customerName}
                        </span>
                      </div>
                      <div>
                        Email:{" "}
                        <span className="text-lg font-semibold">
                          {selectedServiceOrder.email}
                        </span>
                      </div>
                      <div>
                        Phone:{" "}
                        <span className="text-lg font-semibold">
                          {selectedServiceOrder.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">Status</th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.status}
                  </td>
                </tr>

                {/* Selected Service Details */}
                {/* Service Name */}
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Service Name
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.serviceType === "DirectService" &&
                      selectedServiceOrder.selectedService.name}
                    {selectedServiceOrder.serviceType !== "DirectService" &&
                      selectedServiceOrder.selectedService.serviceCategoryId
                        .name}
                  </td>
                </tr>

                {/* Service Brand in Electronic Items */}
                {selectedServiceOrder.serviceType === "Brand" && (
                  <tr className="border-b">
                    <th className="text-left bg-gray-300 w-[30%] px-5">
                      Service Brand
                    </th>
                    <td className="p-2 border text-lg font-semibold">
                      {selectedServiceOrder.selectedService.name}
                    </td>
                  </tr>
                )}

                {/* Selected Service Problems */}
                {selectedServiceOrder.serviceType
                  .toLowerCase()
                  .includes("brand") && (
                  <tr className="border-b">
                    <th className="text-left bg-gray-300 w-[30%] px-5">
                      <p className="font-semibold">Services Requested</p>
                    </th>
                    <td className="p-2 border flex flex-col text-lg font-semibold">
                      <ol>
                        {selectedServiceOrder.problems.map((p, i) => (
                          <li key={i}>{p.serviceProblem}</li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                )}

                {/* Additional SERVICES */}
                {selectedServiceOrder.serviceType
                  .toLowerCase()
                  .includes("brand") &&
                  selectedServiceOrder.additionalServices.length > 0 && (
                    <tr className="border-b">
                      <th className="text-left bg-gray-300 w-[30%] px-5">
                        Additional Service Provided
                      </th>

                      <td className="p-2 flex flex-col border text-lg">
                        {selectedServiceOrder.additionalServices.map((s, i) => (
                          <div className="flex items-center justify-evenly">
                            <span key={i}>
                              Service Name:
                              <span className="font-semibold">{s.name}</span>
                            </span>
                            <span key={i}>
                              Service Price:
                              <span className="font-semibold">{s.price}</span>
                            </span>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}

                {/* Sub Services */}
                {selectedServiceOrder.serviceType === "ServiceSubCategory" && (
                  <>
                    <tr className="border-b">
                      <th className="text-left bg-gray-300 w-[30%] px-5">
                        Selected{" "}
                        {
                          selectedServiceOrder.selectedService.serviceCategoryId
                            .name
                        }
                      </th>
                      <td className="p-2 border text-lg font-semibold">
                        {selectedServiceOrder.selectedService.name}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="text-left bg-gray-300 w-[30%] px-5">
                        {
                          selectedServiceOrder.selectedService.serviceCategoryId
                            .name
                        }{" "}
                        Price
                      </th>
                      <td className="p-2 border text-lg font-semibold">
                        {selectedServiceOrder.price}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Service Agent
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.serviceAgent}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Service Completed On
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.serviceCompletedOn}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Inspection Price
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.inspectionCharges}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left bg-gray-300 w-[30%] px-5">
                    Final Price
                  </th>
                  <td className="p-2 border text-lg font-semibold">
                    {selectedServiceOrder.serviceFinalPrice}
                  </td>
                </tr>
              </table>
              <div className="mx-auto text-center mt-8">
                <button
                  onClick={() => setViewOrder(false)}
                  className="bg-red-700 text-white px-4 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={orderToDelete}
        title="Confirm Deletion"
        detail={`You are about to delete an Service Order: ${orderIDToDelete}`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default ServicesOrdersList;
