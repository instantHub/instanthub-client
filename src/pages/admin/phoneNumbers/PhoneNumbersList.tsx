import { FC, useCallback, memo, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
// @ts-ignore
import { saveAs } from "file-saver";
import { useDeletePhoneNumberMutation, useGetPhoneNumbersQuery } from "@api";
import { formatDate } from "@utils/general";
import { Button, FlexBox, Modal, Typography } from "@components/general";
import { IPhoneNumber } from "@features/api/OTPApi/types";
import {
  DeleteIcon,
  Eye,
  Loader,
  CheckCircle,
  Smartphone,
  X,
} from "lucide-react";

// ============================================================================
// 1. Memoized Card Component
// ============================================================================

interface PhoneNumberCardProps {
  number: IPhoneNumber;
  onDelete: (id: string | number, mobileNumber: string) => void;
  onViewDetails: (number: IPhoneNumber) => void;
}

const PhoneNumberCard: FC<PhoneNumberCardProps> = memo(
  ({ number, onDelete, onViewDetails }) => {
    return (
      <div className="flex flex-col shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white transition-all hover:shadow-lg hover:border-primary/20">
        <div className="p-5 flex-grow space-y-3">
          <FlexBox justify="between" align="center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Smartphone size={18} className="text-blue-600" />
            </div>
            {number?.orderPlaced ? (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                <CheckCircle size={10} /> Order Placed
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
                <X size={10} /> Order N/A
              </span>
            )}
          </FlexBox>

          <div>
            <Typography className="text-xs text-gray-400 font-medium uppercase">
              Mobile Number
            </Typography>
            <Typography className="text-lg font-bold text-gray-900">
              {number.mobileNumber}
            </Typography>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <Typography className="text-[10px] text-gray-400 uppercase">
                Price Offered
              </Typography>
              <Typography className="font-semibold text-gray-700">
                ₹{number?.offeredPrice ?? "0"}
              </Typography>
            </div>
            <div>
              <Typography className="text-[10px] text-gray-400 uppercase">
                Visits
              </Typography>
              <Typography className="font-semibold text-gray-700">
                {number.totalOTPsTaken}
              </Typography>
            </div>
          </div>

          <div className="pt-2 border-t border-dashed">
            <Typography className="text-[10px] text-gray-400 uppercase">
              Purpose
            </Typography>
            <Typography className="text-sm text-gray-600 truncate">
              {number.purpose || "General Inquiry"}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t bg-gray-50/50">
          <button
            onClick={() => onViewDetails(number)}
            className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-600 hover:bg-white hover:text-primary border-r transition-colors"
          >
            <Eye size={14} /> View
          </button>
          <button
            onClick={() => onDelete(number._id, number.mobileNumber)}
            className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <DeleteIcon size={14} /> Delete
          </button>
        </div>
      </div>
    );
  },
);

// ============================================================================
// 2. Main List Component
// ============================================================================

const FILENAME = "instant_hub_directory.xlsx";

export const PhoneNumbersList: FC = () => {
  const [page, setPage] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState<IPhoneNumber | null>(
    null,
  );

  // RTK Query
  const { data, isLoading, isFetching, isError } = useGetPhoneNumbersQuery({
    page,
  });
  console.log("data", data);

  const [deleteNumber] = useDeletePhoneNumberMutation();

  const phoneNumbers = data?.data || [];
  const meta = data?.meta;
  const hasMore = meta ? page < meta.lastPage : false;

  // Infinite Scroll Logic
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasMore],
  );

  const downloadAsXLSX = useCallback(() => {
    if (!phoneNumbers.length) return toast.info("No data loaded to download.");

    const worksheetData = phoneNumbers.map((num) => ({
      "Mobile Number": num.mobileNumber,
      "Price Offered": num.offeredPrice,
      Visits: num.totalOTPsTaken,
      "Order Placed": num.orderPlaced ? "Yes" : "No",
      Purpose: num.purpose ?? "N/A",
      "Updated At": formatDate(new Date(num.updatedAt)),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Directory");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      FILENAME,
    );
  }, [phoneNumbers]);

  const handleDelete = useCallback(
    async (id: string | number, mobile: string) => {
      if (window.confirm(`Delete ${mobile}?`)) {
        try {
          await deleteNumber(id).unwrap();
          toast.success("Deleted successfully");
        } catch {
          toast.error("Failed to delete");
        }
      }
    },
    [deleteNumber],
  );

  if (isLoading && page === 1) return <Loader />;

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <Typography
            variant="h3"
            className="font-extrabold text-gray-900 tracking-tight"
          >
            Phone Directory
          </Typography>
          <Typography className="text-gray-500 mt-1">
            Tracking {meta?.total || 0} collected contacts
          </Typography>
        </div>
        <Button
          onClick={downloadAsXLSX}
          variant="primary"
          className="shadow-md"
        >
          Export to Excel
        </Button>
      </header>

      {phoneNumbers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {phoneNumbers.map((number, index) => (
            <PhoneNumberCard
              key={`${number._id}-${index}`}
              number={number}
              onDelete={handleDelete}
              onViewDetails={setSelectedNumber}
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <Typography variant="h6" className="text-gray-400">
              No data records found
            </Typography>
          </div>
        )
      )}

      {/* Infinite Scroll Sentinel */}
      <div
        ref={lastElementRef}
        className="py-12 flex flex-col items-center justify-center gap-2"
      >
        {isFetching && (
          <>
            <Loader className="animate-spin text-primary" />
            <Typography className="text-xs text-gray-400 animate-pulse">
              Loading more records...
            </Typography>
          </>
        )}
        {!hasMore && phoneNumbers.length > 0 && (
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
            <Typography className="text-xs font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">
              All records loaded
            </Typography>
            <div className="h-[1px] bg-gray-200 flex-grow"></div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedNumber && (
        <Modal
          isOpen={!!selectedNumber}
          onClose={() => setSelectedNumber(null)}
        >
          <div className="p-2">
            <Typography
              variant="h5"
              className="mb-6 font-bold text-gray-800 border-b pb-4"
            >
              Contact Breakdown
            </Typography>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <Typography className="text-[10px] uppercase text-gray-400 mb-1">
                  Mobile
                </Typography>
                <Typography className="font-bold">
                  {selectedNumber.mobileNumber}
                </Typography>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Typography className="text-[10px] uppercase text-gray-400 mb-1">
                  Status
                </Typography>
                <Typography
                  className={`font-bold ${selectedNumber.orderPlaced ? "text-green-600" : "text-gray-600"}`}
                >
                  {selectedNumber.orderPlaced ? "Active Order" : "No Order"}
                </Typography>
              </div>
            </div>

            <Typography className="text-sm font-bold text-gray-700 mb-3">
              Selected Conditions
            </Typography>
            <div className="min-w-[450px] max-sm:min-w-fit bg-white border rounded-xl p-4 space-y-3 max-h-60 overflow-y-auto">
              {selectedNumber.selectedDeductionSet.length > 0 ? (
                selectedNumber.selectedDeductionSet.map((deduction, idx) => (
                  <div key={idx} className="pb-2 border-b last:border-0">
                    <Typography className="text-[10px] font-bold text-blue-500 uppercase">
                      {deduction.type}
                    </Typography>
                    {deduction.conditions?.map((c: any) => (
                      <Typography
                        key={c.conditionLabel}
                        className="text-sm text-gray-600 mt-1"
                      >
                        • {c.conditionLabel}
                      </Typography>
                    ))}
                  </div>
                ))
              ) : (
                <Typography className="text-sm text-gray-400 italic">
                  No specific conditions recorded.
                </Typography>
              )}
            </div>

            <Button
              onClick={() => setSelectedNumber(null)}
              className="w-full mt-8"
              variant="secondary"
            >
              Close Details
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
