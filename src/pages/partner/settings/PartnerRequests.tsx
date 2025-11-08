import {
  useApprovePartnerRequestMutation,
  useDeletePartnerRequestMutation,
  useGetPartnerRequestsQuery,
  useRejectPartnerRequestMutation,
} from "@features/api";
import {
  IPartnerRequest,
  RequestStatus,
} from "@features/api/partners_requests/types";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { CreatePartnerForm } from "./CreatePartnerForm";
import { Modal } from "@components/general";

// Reusable component for rejection input (to be used inside the main table)
interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string | null;
  onSubmit: (id: string, reason: string) => void;
}

const RejectionModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  requestId,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");

  if (!isOpen || !requestId) return null;

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(requestId, reason.trim());
      setReason("");
    }
  };

  // Assuming you wrap this in your existing Modal component for styling
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mx-2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Reject Partner Request</h3>
        <p className="mb-3">
          Please provide a reason for rejection. This will be emailed to the
          applicant.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border p-2 rounded mb-4 h-24 resize-none"
          placeholder="Enter rejection reason..."
        />
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className={`btn-danger ${
              !reason.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export const PartnerRequests: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<RequestStatus | undefined>(
    undefined
  );
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<IPartnerRequest>();
  const [rejectionMessage, setRejectionMessage] = useState("");

  // RTK Query Hooks
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useGetPartnerRequestsQuery({ status: filterStatus });
  const [approveRequest, { isLoading: isApproving }] =
    useApprovePartnerRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectPartnerRequestMutation();
  const [deleteRequest, { isLoading: isDeleting }] =
    useDeletePartnerRequestMutation();

  // --- Handlers ---

  const handleActionStatus = async (
    id: string,
    action: "approve" | "reject" | "delete"
  ) => {
    try {
      if (action === "approve") {
        await approveRequest(id).unwrap();
        alert("Request Approved successfully!");
      } else if (action === "delete") {
        if (
          !window.confirm(
            "Are you sure you want to permanently delete this request?"
          )
        )
          return;
        await deleteRequest(id).unwrap();
        alert("Request Deleted successfully!");
      }
      refetch(); // Manually refetch data after mutation
    } catch (err) {
      console.error(`Failed to ${action}:`, err);
      alert(`Action failed: See console for details.`);
    }
  };

  const handleOpenRejectModal = (id: string) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  const handleRejectSubmission = async (id: string, reason: string) => {
    try {
      await rejectRequest({ id, reason }).unwrap();
      alert("Request Rejected successfully!");
      setShowRejectModal(false);
      refetch();
    } catch (err) {
      console.error("Rejection failed:", err);
      alert("Rejection failed. Ensure the backend service is running.");
    }
  };

  // --- UI Rendering ---

  if (isLoading) return <Loader className="animate-spin" />;

  const getStatusClasses = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
    }
  };

  const handleOpenPartnerForm = (request: IPartnerRequest) => {
    setShowPartnerForm(true);
    setSelectedPartner(request);
  };

  const handleClosePartnerForm = () => {
    setShowPartnerForm(false);
    setSelectedPartner(undefined);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Partner Partnership Requests</h2>

      {/* Filter Controls */}
      <div className="mb-4 flex space-x-2">
        {["pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as RequestStatus | undefined)}
            className={`px-4 py-2 rounded text-sm font-medium transition ${
              filterStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setFilterStatus(undefined)}
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            !filterStatus
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No requests found matching the filter.
                </td>
              </tr>
            ) : (
              requests.map((request: IPartnerRequest) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.name} ({request.email})
                    <p className="text-xs text-gray-500">{request.phone}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.businessName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.address.street}, <br />
                    {request.address.city} - {request.address.pincode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        request.status
                      )}`}
                    >
                      {request.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            // handleActionStatus(request._id, "approve")
                            handleOpenPartnerForm(request)
                          }
                          disabled={isApproving || isRejecting || isDeleting}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                        >
                          {isApproving ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleOpenRejectModal(request._id)}
                          disabled={isApproving || isRejecting || isDeleting}
                          className="text-orange-600 hover:text-orange-900 disabled:opacity-50"
                        >
                          {isRejecting ? "..." : "Reject"}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleActionStatus(request._id, "delete")}
                      disabled={isApproving || isRejecting || isDeleting}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>

                    {/* Link to view full details (e.g., open a side panel) could go here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal Instance */}
      <RejectionModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        requestId={selectedRequestId}
        onSubmit={handleRejectSubmission}
      />

      {selectedPartner && (
        <Modal
          isOpen={showPartnerForm}
          onClose={handleClosePartnerForm}
          className="mx-2"
        >
          <CreatePartnerForm
            onClose={handleClosePartnerForm}
            request={selectedPartner}
          />
        </Modal>
      )}
    </div>
  );
};
