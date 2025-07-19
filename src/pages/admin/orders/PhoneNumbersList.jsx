import { useState } from "react";
import { useDeletePhoneNumberMutation, useGetPhoneNumbersQuery } from "@api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ConfirmationModal } from "@components/admin";
import { DeleteForeverIcon } from "@icons";

export const PhoneNumbersList = () => {
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useGetPhoneNumbersQuery();

  const [deleteNumber] = useDeletePhoneNumberMutation();

  console.log("phoneNumbers", !phoneNumbersLoading && phoneNumbers);

  // Delete Number
  const [isModalOpen, setModalOpen] = useState(false);
  const [numberToDelete, setNumberToDelete] = useState("");

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
    return istDate?.toLocaleString("en-IN", options).replace(",", "");
  };

  const downloadPhoneNumbersAsXLSX = (phoneNumbers) => {
    console.log("phoneNumbers", phoneNumbers);
    const data = phoneNumbers.map((number, index) => ({
      "Mobile Number": number.mobileNumber,
      "Total OTPs Taken": number.totalOTPsTaken,
      // "Updated At": convertUTCToIST(number.updatedAt),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Numbers");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, "phone_numbers.xlsx");
  };

  const handleDelete = async (numberId) => {
    console.log("handledelete", numberId);
    await deleteNumber(numberId);
  };

  return (
    <>
      <div className="flex flex-col gap-5 max-sm:gap-2 mt-5 max-sm:mt-2 px-5 max-sm:px-2">
        {/* <div className="grow"> */}
        <div className="flex justify-between items-center text-lg max-sm:text-xs">
          {/* <h1 className="bold  mb-2">Phone Numbers List</h1> */}
          <p className="flex gap-1">
            Total
            <b>{phoneNumbers?.phoneNumbers?.length}</b>
            Phone Numbers
          </p>
          <button
            onClick={() =>
              downloadPhoneNumbersAsXLSX(phoneNumbers.phoneNumbers)
            }
            className="bg-blue-600 text-white px-4 max-sm:px-2 py-2 rounded-md"
          >
            Download as XLSX
          </button>
        </div>

        {/* Phone Numbers Cards */}
        <div className="w-full mx-auto grid grid-cols-5 gap-4 max-sm:gap-2 max-md:grid-cols-3 max-sm:grid-cols-2">
          {phoneNumbers?.phoneNumbers?.map((number) => (
            <div
              key={number.id}
              className="flex flex-col gap-2 max-sm:gap-1 shadow rounded-md pt-2 border text-sm max-sm:text-xs overflow-hidden"
            >
              <div className="flex flex-col gap-2 px-4 max-sm:px-2">
                {/* Schedule time */}
                <div>
                  <b>Number: </b>
                  <span>{number.mobileNumber}</span>
                </div>
                <div>
                  <b>Purpose: </b>
                  <span>{number?.purpose}</span>
                </div>

                {/* Pin Code */}
                <div>
                  <b>Total Visits: </b>
                  <span>{number.totalOTPsTaken}</span>
                </div>

                {/* Status */}
                <div className="flex max-sm:flex-col">
                  <b>Last Updated: </b>
                  <span>{convertUTCToIST(number.updatedAt)}</span>
                </div>
              </div>

              {/* Delete */}
              <div className="flex justify-center gap-2 mt-2 overflow-hidden">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setNumberToDelete(number.id);
                    // deleteNumber(number.id);
                  }}
                  className="w-full flex items-center justify-center border-t border-t-red-200 text-red-600 bg-white px-3 py-1"
                >
                  <span className="tracking-widest max-sm:text-[11px]">
                    Delete
                  </span>
                  <span>
                    <DeleteForeverIcon />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={numberToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};
