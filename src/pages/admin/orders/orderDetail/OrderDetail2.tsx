import React, { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Trash2,
  UserPlus,
  Package,
  User,
  MapPin,
  CheckCircle,
  Smartphone,
  Image as ImageIcon,
  XCircle,
  Clock,
  PhoneOutgoing,
} from "lucide-react";

import {
  useGetOrderDetailQuery,
  useGetExecutiveOrderDetailsQuery,
  useDeleteOrderMutation,
} from "@api";
import { useAuth } from "@hooks";
import { ORDER_STATUS } from "@features/api/orders/types";
import { Loading } from "@components/user";
import {
  Button,
  FlexBox,
  Modal,
  StatusBox,
  Typography,
} from "@components/general";
import { ConfirmationModal, AssignAgent } from "@components/admin";
import { OrderCompleteForm } from "./OrderCompleteForm";
import { OrderInfoCard } from "./OrderInfoCard";
import { CustomerProofGallery } from "./CustomerProofGallery";
import { formatDate } from "@utils/general";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

interface ICollapseContextType {
  openCards: Set<string>;
  toggleCard: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

const CollapseContext = createContext<ICollapseContextType | null>(null);

export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context)
    throw new Error("useCollapse must be used within CollapseProvider");
  return context;
};

export enum CARDS {
  DEVICE_INFORMATION = "device-information",
  ORDER_DETAILS = "order-details",
  PRODUCT_DETAILS = "product-details",
  CUSTOMER_DETAILS = "customer-details",
  ADDRESS_DETAILS = "address-details",
  SELECTED_CONDITIONS = "selected-conditions",
  COMPLETION_DETAILS = "completion-details",
  CUSTOMER_PROOFS = "customer-proofs",
  CANCELLATION_DETAILS = "cancellation-details",
}
export type TCard = keyof typeof CARDS;

export const OrderDetail2: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { isAdmin, adminData } = useAuth();

  const isExecutive = adminData?.role === ADMIN_ROLE_ENUM.EXECUTIVE;

  const { data: orderDetail, isLoading } = isExecutive
    ? useGetExecutiveOrderDetailsQuery(
        { orderId: orderId! },
        { skip: !orderId || !adminData }
      )
    : useGetOrderDetailQuery(
        { orderId: orderId! },
        { skip: !orderId || !adminData }
      );

  const [deleteOrder] = useDeleteOrderMutation();

  // Modal states
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAssignAgentOpen, setAssignAgentOpen] = useState(false);

  // Handlers
  const handleGoBack = () => window.history.back();

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully");
      navigate("/admin/orders");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete order");
    }
  };

  const [openCards, setOpenCards] = useState<Set<string>>(
    new Set([
      CARDS.ORDER_DETAILS,
      CARDS.PRODUCT_DETAILS,
      CARDS.CUSTOMER_DETAILS,
      CARDS.ADDRESS_DETAILS,
      CARDS.SELECTED_CONDITIONS,
      CARDS.COMPLETION_DETAILS,
      CARDS.CANCELLATION_DETAILS,
      CARDS.DEVICE_INFORMATION,
    ])
  );

  const toggleCard = (id: string) => {
    setOpenCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenCards(
      new Set([
        CARDS.DEVICE_INFORMATION,
        CARDS.ORDER_DETAILS,
        CARDS.PRODUCT_DETAILS,
        CARDS.CUSTOMER_DETAILS,
        CARDS.ADDRESS_DETAILS,
        CARDS.COMPLETION_DETAILS,
        CARDS.CUSTOMER_PROOFS,
        CARDS.CANCELLATION_DETAILS,
        CARDS.SELECTED_CONDITIONS,
        CARDS.COMPLETION_DETAILS,
        CARDS.CANCELLATION_DETAILS,
      ])
    );
  };

  const collapseAll = () => {
    setOpenCards(new Set());
  };

  if (isLoading) return <Loading />;

  if (!orderDetail) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const isAssigned = orderDetail.assignmentStatus?.assigned;
  const isCompleted = orderDetail.status === ORDER_STATUS.COMPLETED;
  const isCancelled = orderDetail.status === ORDER_STATUS.CANCELLED;
  const isPending = orderDetail.status === ORDER_STATUS.PENDING;

  return (
    <CollapseContext.Provider
      value={{ openCards, toggleCard, expandAll, collapseAll }}
    >
      <div className="min-h-screen bg-gray-50 pb-8">
        {/* Header Actions */}
        <FlexBox gap={2}>
          <Button onClick={expandAll} variant="secondary" size="sm">
            Expand All
          </Button>
          <Button onClick={collapseAll} variant="secondary" size="sm">
            Collapse All
          </Button>
        </FlexBox>
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <FlexBox justify="between" className="flex-wrap gap-3">
              <Button
                onClick={handleGoBack}
                variant="secondary"
                size="sm"
                leftIcon={<ArrowLeft size={18} />}
              >
                Back
              </Button>

              <FlexBox gap={2} className="flex-wrap">
                {isAdmin() && !isCompleted && !isCancelled && (
                  <Button
                    onClick={() => setAssignAgentOpen(true)}
                    variant="greenary"
                    size="sm"
                    leftIcon={<UserPlus size={18} />}
                  >
                    <span className="hidden sm:inline">Assign Agent</span>
                    <span className="sm:hidden">Assign</span>
                  </Button>
                )}

                <Button
                  onClick={() => setDeleteModalOpen(true)}
                  variant="danger"
                  size="sm"
                  leftIcon={<Trash2 size={18} />}
                >
                  Delete
                </Button>
              </FlexBox>
            </FlexBox>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Assignment & Reschedule Alerts */}
          {isAssigned && (
            <StatusBox
              color="green"
              icon={
                <CheckCircle className="text-green-600 shrink-0" size={20} />
              }
              text={
                <>
                  Assigned to:{" "}
                  <strong>
                    {orderDetail.assignmentStatus.assignedTo?.name}
                  </strong>
                </>
              }
            />
          )}

          {orderDetail.rescheduleStatus?.rescheduled &&
            orderDetail.status !== ORDER_STATUS.COMPLETED && (
              <StatusBox
                color="yellow"
                icon={<Clock className="text-yellow-600 shrink-0" size={20} />}
                text={
                  <Typography>
                    Rescheduled:
                    {orderDetail.rescheduleStatus.rescheduleCount} time(s) (
                    {orderDetail.rescheduleStatus.rescheduleReason})
                  </Typography>
                }
              />
            )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Information */}
            <OrderInfoCard
              id={CARDS.ORDER_DETAILS}
              icon={Package}
              title="Order Details"
              borderColor="border-secondary"
            >
              <InfoRow label="Order ID" value={orderDetail.orderId} />
              <InfoRow
                label="Offered Price"
                value={`₹${orderDetail.offerPrice}`}
              />
              <InfoRow
                label="Scheduled Pickup"
                value={`${formatDate(orderDetail.schedulePickUp?.date)} - ${
                  orderDetail.schedulePickUp?.timeSlot
                }`}
              />
              <InfoRow
                label="Status"
                value={
                  <StatusBadge status={orderDetail.status}>
                    {orderDetail.status}
                  </StatusBadge>
                }
              />
            </OrderInfoCard>

            {/* Product Information */}
            <OrderInfoCard
              id={CARDS.PRODUCT_DETAILS}
              icon={Smartphone}
              title="Product Details"
              borderColor="border-secondary"
            >
              <InfoRow
                label="Product"
                value={orderDetail.productDetails?.productName}
              />
              <InfoRow
                label="Variant"
                value={orderDetail.productDetails?.variant?.variantName}
              />
              <InfoRow
                label="Variant Price"
                value={`₹${orderDetail.productDetails?.variant?.price}`}
              />
            </OrderInfoCard>

            {/* Customer Information */}
            <OrderInfoCard
              id={CARDS.CUSTOMER_DETAILS}
              icon={User}
              title="Customer Details"
              borderColor="border-secondary"
            >
              <InfoRow label="Name" value={orderDetail.customerDetails?.name} />
              <InfoRow
                label="Phone"
                value={
                  <FlexBox gap={1} justify="start">
                    <PhoneOutgoing size={16} />
                    <a
                      className="text-blue-700 underline"
                      href={`tel: ${orderDetail.customerDetails?.phone}`}
                    >
                      {orderDetail.customerDetails?.phone}
                    </a>
                  </FlexBox>
                }
                // value={orderDetail.customerDetails?.phone}
              />
              <InfoRow
                label="Email"
                value={orderDetail.customerDetails?.email}
              />
            </OrderInfoCard>

            {/* Address Information */}
            <OrderInfoCard
              id={CARDS.ADDRESS_DETAILS}
              icon={MapPin}
              title="Address Details"
              borderColor="border-secondary"
            >
              <InfoRow
                label="Address"
                value={orderDetail.customerDetails?.addressDetails?.address}
              />
              <InfoRow
                label="City"
                value={orderDetail.customerDetails?.addressDetails?.city}
              />
              <InfoRow
                label="State"
                value={orderDetail.customerDetails?.addressDetails?.state}
              />
              <InfoRow
                label="Pin Code"
                value={orderDetail.customerDetails?.addressDetails?.pinCode}
              />
            </OrderInfoCard>

            <OrderInfoCard
              id={CARDS.SELECTED_CONDITIONS}
              icon={MapPin}
              title="Selected Conditions"
              borderColor="border-secondary"
            >
              {orderDetail.finalDeductionSet.length > 0 ? (
                orderDetail.finalDeductionSet?.map((deduction) =>
                  deduction.conditions.map((condition) => (
                    <InfoRow
                      key={condition.conditionLabel}
                      label={deduction.type}
                      value={condition.conditionLabel}
                    />
                  ))
                )
              ) : (
                <p className="text-gray-500 text-[16px] max-sm:text-sm">
                  Data not available
                </p>
              )}
            </OrderInfoCard>

            {/* Completion Details (if completed) */}
            {isCompleted && (
              <>
                <OrderInfoCard
                  id={CARDS.COMPLETION_DETAILS}
                  icon={CheckCircle}
                  title="Completion Details"
                  borderColor="border-secondary"
                >
                  <InfoRow
                    label="Agent"
                    value={orderDetail.assignmentStatus?.assignedTo?.name}
                  />
                  <InfoRow
                    label="Completed On"
                    value={formatDate(orderDetail.completedAt)}
                  />
                  <InfoRow
                    label="Final Price"
                    value={`₹${orderDetail.finalPrice || "N/A"}`}
                  />
                </OrderInfoCard>

                <OrderInfoCard
                  id={CARDS.DEVICE_INFORMATION}
                  icon={Smartphone}
                  title="Device Information"
                  borderColor="border-secondary"
                >
                  <InfoRow
                    label="Serial Number"
                    value={orderDetail.deviceInfo?.serialNumber || "N/A"}
                  />
                  <InfoRow
                    label="IMEI Number"
                    value={orderDetail.deviceInfo?.imeiNumber || "N/A"}
                  />
                </OrderInfoCard>

                {/* Customer Proof Gallery */}
                {orderDetail.customerIDProof && (
                  <div className="lg:col-span-2">
                    <CustomerProofGallery
                      proofs={orderDetail.customerIDProof}
                      customerName={orderDetail.customerDetails?.name}
                    />
                  </div>
                )}
              </>
            )}

            {/* Cancellation Details */}
            {isCancelled && orderDetail.cancellationDetails?.cancelReason && (
              <OrderInfoCard
                id={CARDS.CANCELLATION_DETAILS}
                icon={XCircle}
                title="Cancellation Details"
                borderColor="border-secondary"
              >
                <InfoRow
                  label="Reason"
                  value={orderDetail.cancellationDetails.cancelReason}
                />
                <InfoRow
                  label="Cancelled By"
                  value={orderDetail.cancellationDetails.cancelledBy || "N/A"}
                />
              </OrderInfoCard>
            )}
          </div>

          {/* Order Complete Form (for pending orders) */}
          {isPending && (
            <div className="mt-8">
              <OrderCompleteForm orderDetail={orderDetail} />
            </div>
          )}
        </div>

        {/* Modals */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          itemToDelete={orderDetail.id}
          title="Confirm Deletion"
          description="Are you sure you want to delete this order? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Modal
          isOpen={isAssignAgentOpen}
          onClose={() => setAssignAgentOpen(false)}
        >
          <AssignAgent orderDetail={orderDetail} />
        </Modal>
      </div>
    </CollapseContext.Provider>
  );
};

// Helper Components
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <span className="text-sm text-gray-900 sm:text-right break-words">
      {value}
    </span>
  </div>
);

interface StatusBadgeProps {
  status: ORDER_STATUS;
  children: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
  const colorMap = {
    [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
    [ORDER_STATUS.COMPLETED]: "bg-green-100 text-green-800",
    [ORDER_STATUS.CANCELLED]: "bg-red-100 text-red-800",
    [ORDER_STATUS.IN_PROGRESS]: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colorMap[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {children}
    </span>
  );
};
