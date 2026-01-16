import { FC, useCallback, memo, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
// @ts-ignore
import { saveAs } from "file-saver";
import { useDeletePhoneNumberMutation, useGetPhoneNumbersQuery } from "@api";
import { formatDate } from "@utils/general";
import { Button, FlexBox, Modal, Typography } from "@components/general";
import { IPhoneNumber } from "@features/api/OTPApi/types";
import { DeleteIcon, Eye, Loader, MapPin } from "lucide-react";
import { OrderInfoCard } from "../orders/orderDetail/OrderInfoCard";

// ============================================================================
// 1. Child Component: PhoneNumberCard
// ============================================================================

interface PhoneNumberCardProps {
  number: IPhoneNumber;
  onDelete: (id: string | number, mobileNumber: string) => void;
  // Add a new prop to handle the "View Detail" click
  onViewDetails: (number: IPhoneNumber) => void;
}

const PhoneNumberCard: FC<PhoneNumberCardProps> = ({
  number,
  onDelete,
  onViewDetails, // Destructure the new prop
}) => {
  return (
    <div className="flex flex-col shadow rounded-lg border text-sm overflow-hidden bg-white transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <div>
          <span className="font-semibold text-gray-800">Number: </span>
          <span>{number.mobileNumber}</span>
        </div>
        {number.purpose && (
          <div>
            <span className="font-semibold text-gray-800">Purpose: </span>
            <span className="text-gray-600">{number.purpose}</span>
          </div>
        )}
        <div>
          <span className="font-semibold text-gray-800">Offered Price: </span>
          <span>{number.offeredPrice ?? "N/A"}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Total Visits: </span>
          <span>{number.totalOTPsTaken}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Last Updated: </span>
          <span className="text-gray-600">
            {formatDate(new Date(number.updatedAt))}
          </span>
        </div>
      </div>
      <FlexBox justify="around" className="border-t">
        {/* Call onViewDetails prop with the current number object */}
        <Button
          leftIcon={<Eye />}
          size="xs"
          onClick={() => onViewDetails(number)}
          variant="secondary"
        >
          View Detail
        </Button>

        <Button
          leftIcon={<DeleteIcon />}
          variant="danger"
          size="xs"
          onClick={() => onDelete(number._id, number.mobileNumber)}
        >
          Delete
        </Button>
      </FlexBox>
    </div>
  );
};

const MemoizedPhoneNumberCard = memo(PhoneNumberCard);

// ============================================================================
// 2. Parent Component: PhoneNumbersList
// ============================================================================

const FILENAME = "phone_numbers.xlsx";

export const PhoneNumbersList: FC = () => {
  const { data: phoneNumbers, isLoading, isError } = useGetPhoneNumbersQuery();

  const [deleteNumber] = useDeletePhoneNumberMutation();

  const [selectedNumber, setSelectedNumber] = useState<IPhoneNumber | null>(
    null
  );

  const handleCloseModal = () => {
    setSelectedNumber(null);
  };

  const downloadAsXLSX = useCallback(() => {
    if (phoneNumbers && !phoneNumbers.length) {
      toast.info("No data available to download.");
      return;
    }
    const worksheetData =
      phoneNumbers?.map(
        ({ mobileNumber, totalOTPsTaken, purpose, updatedAt }) => ({
          "Mobile Number": mobileNumber,
          "Total Visits": totalOTPsTaken,
          "Last Seen Purpose": purpose ?? "N/A",
          "Last Updated On": formatDate(new Date(updatedAt)),
        })
      ) ?? [];
    // (XLSX generation logic remains the same)
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Numbers");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, FILENAME);
  }, [phoneNumbers]);

  const handleDelete = useCallback(
    async (id: string | number, mobileNumber: string) => {
      if (
        window.confirm(
          `Are you sure you want to delete ${mobileNumber}? This action cannot be undone.`
        )
      ) {
        try {
          await deleteNumber(id).unwrap();
          toast.success(`Number ${mobileNumber} deleted successfully!`);
        } catch (error) {
          toast.error(`Failed to delete ${mobileNumber}. Please try again.`);
        }
      }
    },
    [deleteNumber]
  );

  if (isLoading) return <Loader />;
  if (isError) return <FlexBox>Failed to load data. Please refresh.</FlexBox>;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Typography variant="h4" className="font-bold text-gray-800">
          Phone Number Directory
        </Typography>
        <div className="flex items-center gap-4">
          <Typography variant="body" className="text-gray-600">
            Total:{" "}
            <span className="font-bold text-black">{phoneNumbers?.length}</span>
          </Typography>
          <Button
            onClick={downloadAsXLSX}
            disabled={phoneNumbers?.length === 0}
            variant="primary"
          >
            Download as XLSX
          </Button>
        </div>
      </header>

      {/* Content Grid */}
      {phoneNumbers && phoneNumbers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {phoneNumbers?.map((number) => (
            <MemoizedPhoneNumberCard
              key={number._id}
              number={number}
              onDelete={handleDelete}
              onViewDetails={setSelectedNumber}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow">
          <Typography variant="h6">No Phone Numbers Found</Typography>
        </div>
      )}

      {/* Modal - Rendered conditionally based on 'selectedNumber' */}
      {selectedNumber && (
        <Modal isOpen={!!selectedNumber} onClose={handleCloseModal}>
          <div>
            <Typography variant="h5" className="mb-4 font-semibold">
              Phone Number Details
            </Typography>
            <div className="space-y-2">
              <Typography variant="body">
                <span className="font-semibold">Mobile Number:</span>{" "}
                {selectedNumber.mobileNumber}
              </Typography>
              <Typography variant="body">
                <span className="font-semibold">Purpose:</span>{" "}
                {selectedNumber.purpose ?? "Not available"}
              </Typography>

              <FlexBox direction="col" align="start">
                <Typography
                  variant="body"
                  className="mb-2 font-medium border-b-2 border-secondary"
                >
                  Conditions Chosen by this Number:
                </Typography>

                <FlexBox direction="col" align="start" className="pl-2">
                  {selectedNumber.selectedDeductionSet.length > 0 ? (
                    selectedNumber.selectedDeductionSet?.map((deduction) =>
                      deduction?.conditions?.map((condition) => (
                        <div
                          className="flex gap-1 lg:gap-4 mb-1"
                          key={condition.conditionLabel}
                        >
                          <span className="text-xs lg:text-sm text-gray-500 font-medium">
                            {deduction.type}:
                          </span>
                          <span className="text-xs lg:text-sm text-gray-900 sm:text-right break-words">
                            {condition.conditionLabel}
                          </span>
                        </div>
                      ))
                    )
                  ) : (
                    <p className="text-gray-500 text-[16px] max-sm:text-sm">
                      Data not available
                    </p>
                  )}
                </FlexBox>
              </FlexBox>

              <Typography variant="body">
                <span className="font-semibold">Total Visits:</span>{" "}
                {selectedNumber.totalOTPsTaken}
              </Typography>
              <Typography variant="body">
                <span className="font-semibold">Last Visit:</span>{" "}
                {formatDate(new Date(selectedNumber.updatedAt))}
              </Typography>
            </div>
            <Button onClick={handleCloseModal} className="mt-6">
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
