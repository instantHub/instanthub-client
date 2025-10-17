import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CheckCircle,
  Smartphone,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";

import {
  useCompleteOrderMutation,
  useRescheduleOrderMutation,
  useOrderCancelMutation,
} from "@api";
import {
  Button,
  FlexBox,
  FormInput,
  ReusableDatePicker,
  Dropdown,
  Modal,
} from "@components/general";
import { IOrder, IDeviceInfo, ORDER_STATUS } from "@features/api/orders/types";
import { ITimeSlot, timeSlots } from "@utils/constants";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderCancellationForm } from "@components/admin";
import { CARDS } from "./OrderDetail2";

interface ImageSelection {
  front: File | null;
  back: File | null;
  optional1: File | null;
  optional2: File | null;
}

interface OrderCompleteFormProps {
  orderDetail: IOrder;
}

export const OrderCompleteForm: React.FC<OrderCompleteFormProps> = ({
  orderDetail,
}) => {
  const navigate = useNavigate();

  // Mutations
  const [completeOrder, { isLoading: completing }] = useCompleteOrderMutation();
  const [rescheduleOrder, { isLoading: rescheduling }] =
    useRescheduleOrderMutation();
  const [cancelOrder, { isLoading: cancelling }] = useOrderCancelMutation();

  // Form states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [finalPrice, setFinalPrice] = useState("");
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({});
  const [images, setImages] = useState<ImageSelection>({
    front: null,
    back: null,
    optional1: null,
    optional2: null,
  });

  // Reschedule states
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<ITimeSlot | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");

  // Cancel states
  const [showCancel, setShowCancel] = useState(false);

  // Handlers
  const handleImageChange =
    (type: keyof ImageSelection) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setImages((prev) => ({ ...prev, [type]: e.target.files![0] }));
      }
    };

  const handleDeviceInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeviceInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !finalPrice) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!images.front || !images.back) {
      toast.error("Front and back ID proofs are required");
      return;
    }

    if (!deviceInfo.serialNumber && !deviceInfo.imeiNumber) {
      toast.error("Please provide either Serial Number or IMEI Number");
      return;
    }

    const formData = new FormData();
    formData.append("orderId", orderDetail.id);
    formData.append("completedAt", selectedDate.toISOString());
    formData.append("finalPrice", finalPrice);
    formData.append("deviceInfo", JSON.stringify(deviceInfo));
    formData.append("status", ORDER_STATUS.COMPLETED);
    formData.append("customerProofFront", images.front);
    formData.append("customerProofBack", images.back);
    if (images.optional1)
      formData.append("customerOptional1", images.optional1);
    if (images.optional2)
      formData.append("customerOptional2", images.optional2);

    try {
      await completeOrder(formData).unwrap();
      toast.success("Order completed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Complete error:", error);
      toast.error("Failed to complete order");
    }
  };

  const handleReschedule = async () => {
    if (!rescheduleDate || !rescheduleSlot || !rescheduleReason) {
      toast.error("Please fill all reschedule fields");
      return;
    }

    try {
      await rescheduleOrder({
        id: orderDetail.id,
        body: {
          newDate: rescheduleDate,
          newTimeSlot: rescheduleSlot.value,
          rescheduleReason,
        },
      }).unwrap();
      toast.success("Order rescheduled successfully");
      window.location.reload();
    } catch (error) {
      console.error("Reschedule error:", error);
      toast.error("Failed to reschedule order");
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Complete Order</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the required details to complete this order
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion Details */}
          <OrderInfoCard
            id={CARDS.COMPLETION_DETAILS}
            icon={CheckCircle}
            title="Completion Details"
            borderColor="border-green-200"
          >
            <FormField label="Assigned To" required>
              <FormInput
                value={orderDetail.assignmentStatus?.assignedTo?.name || ""}
                disabled
                size="sm"
              />
            </FormField>

            <FormField label="Pickup Date & Time" required>
              <FlexBox gap={2} className="flex-col sm:flex-row">
                <ReusableDatePicker
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                  required
                />
              </FlexBox>
            </FormField>

            <FormField label="Final Purchase Price" required>
              <FormInput
                type="number"
                placeholder="Enter final price"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                required
                size="sm"
                // leftIcon={<DollarSign size={16} />}
              />
            </FormField>
          </OrderInfoCard>

          {/* Device Info */}
          <OrderInfoCard
            id={CARDS.DEVICE_INFORMATION}
            icon={Smartphone}
            title="Device Information"
            borderColor="border-blue-200"
          >
            <FormField label="Serial Number">
              <FormInput
                name="serialNumber"
                placeholder="Enter serial number"
                onChange={handleDeviceInfoChange}
                size="sm"
              />
            </FormField>

            <FormField label="IMEI Number">
              <FormInput
                name="imeiNumber"
                placeholder="Enter IMEI number"
                onChange={handleDeviceInfoChange}
                size="sm"
              />
            </FormField>

            <p className="text-xs text-gray-500 mt-2">
              * At least one of the above is required
            </p>
          </OrderInfoCard>

          {/* Required Documents */}
          <OrderInfoCard
            id={CARDS.CUSTOMER_PROOFS}
            icon={ImageIcon}
            title="Required Documents"
            borderColor="border-red-200"
          >
            <ImageUpload
              label="ID Front *"
              onChange={handleImageChange("front")}
              required
            />
            <ImageUpload
              label="ID Back *"
              onChange={handleImageChange("back")}
              required
            />
          </OrderInfoCard>

          {/* Optional Documents */}
          <OrderInfoCard
            id={CARDS.CUSTOMER_PROOFS}
            icon={ImageIcon}
            title="Optional Documents"
            borderColor="border-gray-200"
          >
            <ImageUpload
              label="Additional Proof 1"
              onChange={handleImageChange("optional1")}
            />
            <ImageUpload
              label="Additional Proof 2"
              onChange={handleImageChange("optional2")}
            />
          </OrderInfoCard>
        </div>

        {/* Action Buttons */}
        <FlexBox justify="center" gap={3} className="pt-6 border-t flex-wrap">
          <Button
            type="submit"
            variant="greenary"
            loading={completing}
            leftIcon={<CheckCircle size={18} />}
          >
            Complete Order
          </Button>

          <Button
            type="button"
            variant="instanthub"
            onClick={() =>
              navigate(
                `re-quote?product=${orderDetail.productId?.uniqueURL}&variant=${orderDetail.productDetails?.variant?.variantName}`
              )
            }
          >
            Re-Quote
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowReschedule(!showReschedule)}
            leftIcon={<Calendar size={18} />}
          >
            Reschedule
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => setShowCancel(true)}
          >
            Cancel Order
          </Button>
        </FlexBox>
      </form>

      {/* Reschedule Section */}
      {showReschedule && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Reschedule Order</h3>
          <FlexBox gap={3} className="flex-col sm:flex-row mb-4">
            <ReusableDatePicker
              selectedDate={rescheduleDate}
              onChange={setRescheduleDate}
              required
            />
            <Dropdown
              options={timeSlots}
              value={rescheduleSlot}
              onChange={setRescheduleSlot}
              getOptionLabel={(option) => option.label}
              placeholder="Select slot"
            />
          </FlexBox>
          <FormInput
            placeholder="Reason for rescheduling"
            value={rescheduleReason}
            onChange={(e) => setRescheduleReason(e.target.value)}
            className="mb-4"
          />
          <Button
            onClick={handleReschedule}
            loading={rescheduling}
            variant="greenary"
          >
            Confirm Reschedule
          </Button>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancel && (
        <Modal isOpen={showCancel} onClose={() => setShowCancel(false)}>
          <OrderCancellationForm
            orderId={orderDetail.id}
            cancelOrder={cancelOrder}
            cancelLoading={cancelling}
            closeModal={() => setShowCancel(false)}
          />
        </Modal>
      )}
    </div>
  );
};

// Helper Components
interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

interface ImageUploadProps {
  label: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required,
  onChange,
}) => (
  <FormField label={label} required={required}>
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      required={required}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
    />
  </FormField>
);
