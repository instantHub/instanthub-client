import { FC, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button, CustomSelect, FlexBox, Typography } from "@components/general";
import { ORDER_STATUS } from "@features/api/orders/types";
import { selectAdminState } from "@features/slices";

// --- Constants for maintainability ---
const CANCELLATION_REASONS = [
  { id: 1, label: "On Call - Customer asked to cancel" },
  { id: 2, label: "Doorstep - Customer changed mind/not interested" },
  { id: 3, label: "Wrong Product" },
  { id: 4, label: "Roadside Pickup/Station Address" },
  { id: 5, label: "Sold Outside" },
  { id: 6, label: "Wrong Pincode" },
  { id: 7, label: "Device on EMI" },
  { id: 8, label: "Missing fake invoice" },
  { id: 9, label: "Dealer Lead" },
  { id: 10, label: "Duplicate lead" },
  { id: 11, label: "Customer not available for pickup" },
  { id: 12, label: "Not interested due to delay Pickup" },
  { id: 13, label: "Incorrect lead details (Name/Product)" },
  { id: 14, label: "Pickup denied - restricted pincode" },
  { id: 15, label: "Customer sold at another store" },

  { id: 16, label: "Price mismatched" },
  { id: 17, label: "Display Issue" },
  { id: 18, label: "Out of service location" },
  { id: 19, label: "Customer expectations are high" },
  { id: 20, label: "Box & Bill not available" },
  { id: 22, label: "Device has problems & price expectations are high" },
  { id: 23, label: "Wrong configurations mentioned" },
  { id: 24, label: "Damaged panel or display" },
  { id: 25, label: "Customer enquiry" },
];

// --- Type Definitions for Props ---
interface OrderCancellationProps {
  orderId: string | number;
  cancelOrder: (payload: any) => Promise<any>;
  cancelLoading?: boolean;
  closeModal: () => void;
}

export const OrderCancellation: FC<OrderCancellationProps> = ({
  orderId,
  cancelOrder,
  cancelLoading = false,
  closeModal,
}) => {
  const [selectedReason, setSelectedReason] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const { admin } = useSelector(selectAdminState);

  const handleCancelOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedReason?.label) {
      toast.warn("Please select a reason for cancellation.");
      return;
    }

    try {
      const payload = {
        orderId,
        data: {
          status: ORDER_STATUS.CANCELLED,
          cancellationDetails: {
            cancelReason: selectedReason.label,
            cancelledBy: admin?.name || "Unknown",
            cancelledAt: new Date().toISOString(),
          },
        },
      };

      const result = await cancelOrder(payload);
      toast.success(result.message || "Order cancelled successfully!");
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel order.");
      console.error("Cancellation Error: ", error);
    }
  };

  return (
    <div className="">
      <div className="mb-4 text-center text-gray-600">
        Please select a reason to cancel this order.
      </div>
      <form
        onSubmit={handleCancelOrder}
        className="flex flex-col items-center gap-5 w-full"
      >
        <CustomSelect
          label="Cancellation Reason"
          options={CANCELLATION_REASONS}
          value={selectedReason}
          onChange={setSelectedReason}
          displayKey="label"
          valueKey="id"
          placeholder="-- select a reason --"
          className="min-w-[350px] w-full"
          clearable
          searchable
          required
        />

        <Button
          type="submit"
          variant="danger"
          loading={cancelLoading}
          disabled={!selectedReason || cancelLoading}
        >
          Confirm Cancellation
        </Button>
      </form>

      <FlexBox className="mt-8">
        {selectedReason?.label ? (
          <FlexBox direction="col" gap={2}>
            <Typography variant="h6">Selected Cancellation Reason:</Typography>
            <Typography variant="h5">{selectedReason?.label}</Typography>
          </FlexBox>
        ) : (
          <Typography className="text-gray-500">
            No reason selected yet.
          </Typography>
        )}
      </FlexBox>
    </div>
  );
};
