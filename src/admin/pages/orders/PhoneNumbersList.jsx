import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useGetSlidersListQuery,
  useDeleteSliderMutation,
  useGetPhoneNumbersQuery,
} from "../../../features/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SlidersList = () => {
  const { data: slidersList, isLoading: slidersLoading } =
    useGetSlidersListQuery();
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useGetPhoneNumbersQuery();

  const [deleteSlider] = useDeleteSliderMutation();

  if (!slidersLoading) {
    console.log(slidersList);
  }
  if (!phoneNumbersLoading) {
    console.log(phoneNumbers);
  }

  const handleDelete = async (sliderId) => {
    console.log("delete slider", sliderId);
    const deletedSlider = await deleteSlider(sliderId);
    toast.success(deletedSlider.message);
  };

  const convertUTCToIST = (dateString) => {
    const utcDate = new Date(dateString);
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    // const istDate = new Date(utcDate.getTime() + istOffset);
    const istDate = new Date(utcDate.getTime());

    // Format the date as needed, e.g., YYYY-MM-DD HH:mm:ss
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return istDate.toLocaleString("en-IN", options).replace(",", "");
  };

  const downloadPhoneNumbersAsXLSX = (phoneNumbers) => {
    console.log("phoneNumbers", phoneNumbers);
    const data = phoneNumbers.map((number, index) => ({
      "Mobile Number": number.mobileNumber,
      // "Total OTPs Taken": number.totalOTPsTaken,
      // "Updated At": convertUTCToIST(number.updatedAt),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Numbers");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, "phone_numbers.xlsx");
  };

  return (
    <>
      <div className="flex mt-[5%] w-[80%] mx-auto">
        <div className="grow">
          <div className="flex justify-between items-center">
            <h1 className="bold text-[1.4rem] mb-2">Phone Numbers List</h1>
            <button
              onClick={() =>
                downloadPhoneNumbersAsXLSX(phoneNumbers.phoneNumbers)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
            >
              Download as XLSX
            </button>
          </div>

          <div className="bg-white border rounded-md shadow-lg">
            <form className="flex flex-col gap-4 p-5 ">
              <div className="flex gap-2 items-center">
                <h1 className="text-xl opacity-75">Numebrs</h1>
              </div>
              <hr />

              <table className="w-full">
                <thead>
                  <tr className="px-4 py-2 text-white bg-gray-800">
                    <th>Phone Numbers</th>
                    <th className="py-5">Total Visits to FinalPrice</th>
                    <th>Last Visited On</th>
                    {/* <th className="px-4 py-2 text-black">Delete</th> */}
                  </tr>
                </thead>

                <tbody className="text-center border">
                  {!phoneNumbersLoading &&
                    phoneNumbers.phoneNumbers.map((number, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                      >
                        <td className="px-4 py-2">{number.mobileNumber}</td>
                        <td className="px-4 py-2">{number.totalOTPsTaken}</td>
                        <td className="px-4 py-2">
                          {convertUTCToIST(number.updatedAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidersList;
