import React, { useState, useEffect } from "react";
import {
  useAcknowledgeComplaintMutation,
  useDeleteComplaintMutation,
  useGetComplaintsQuery,
} from "../../../features/api";
import Loading from "../../../components/user/loader/Loading";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

const Complaints = () => {
  const { data: complaints, isLoading: complaintsLoading } =
    useGetComplaintsQuery();

  console.log("complaints", complaints);

  if (complaintsLoading) return <Loading />;

  return (
    <div>
      {/* Orders Cards */}
      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="my-2 text-lg max-sm:text-sm font-serif font-semibold">
          All Complaints
        </div>
        <div className="w-full grid grid-cols-5 gap-4 max-sm:gap-2 max-md:grid-cols-2 max-sm:grid-cols-2 px-5 max-sm:px-1 mx-auto">
          {complaints?.map((complaint) => {
            return <ComplaintCard key={complaint.id} complaint={complaint} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Complaints;

function ComplaintCard({ complaint }) {
  //   console.log("complaint", complaint);
  const [deleteComplaint] = useDeleteComplaintMutation();

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState("");

  const [readComplaint, setReadComplaint] = useState(false);

  const handleDelete = async (complaintId) => {
    console.log("handledelete", complaintId);
    await deleteComplaint(complaintId);
  };

  const complaintStatus = (status) => {
    if (status.pending) return <span className="">Pending</span>;
    if (status.acknowledge) return <span className="">Acknowledged</span>;
    return "Unknown";
  };

  return (
    <>
      <div
        className={`cursor-pointer shadow rounded-md px-4 max-sm:px-2 py-2 border text-sm max-sm:text-xs bg-white ${
          complaint.status.pending
            ? "border-red-500 text-red-600"
            : "border-green-500 text-green-600"
        }`}
        onClick={() => {
          setReadComplaint(true);
        }}
      >
        {/* Name */}
        <div>
          <b>Name: </b>
          <span>{complaint.name}</span>
        </div>

        {/* Email - large screen */}
        <div className="max-sm:hidden">
          <b>Email: </b>
          <span>{complaint.email}</span>
        </div>
        {/* Email - small screen */}
        <div className="sm:hidden">
          <b>Email: </b>
          <span>{complaint.email.slice(0, 14)}...</span>
        </div>

        {/* Status */}
        <div className="">
          <b>Status: </b>
          <span>{complaintStatus(complaint.status)}</span>
        </div>

        {/* Complaint - large screen */}
        <div className="max-sm:hidden">
          <b>Complaint: </b>
          <span>{complaint.complaint.slice(0, 25)}...</span>
        </div>
        {/* Complaint - small screen */}
        <div className="sm:hidden">
          <b>Complaint: </b>
          <span>{complaint.complaint.slice(0, 12)}...</span>
        </div>
      </div>

      {readComplaint && (
        <ComplaintReader
          complaint={complaint}
          onClose={() => setReadComplaint(false)}
          deleteConfirmation={() => {
            setReadComplaint(false);
            setModalOpen(true);
            setComplaintToDelete(complaint.id);
          }}
        />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setReadComplaint(true);
        }}
        onConfirm={handleDelete}
        itemToDelete={complaintToDelete}
        title="Confirm Deletion"
        detail={`You are about to delete a complaint from ${complaint.name}`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

const ComplaintReader = ({ complaint, onClose, deleteConfirmation }) => {
  const [acknowledgeComplaint, { isLoading: acknowledgeComplaintLoading }] =
    useAcknowledgeComplaintMutation();

  const { pending, acknowledge: acknowledged } = complaint.status;

  const style = {
    detailDiv: "flex items-center max-sm:items-start gap-2 ",
    detailLabel: "",
    detailText: "text-lg max-sm:text-sm",
  };

  const complaintStatus = (status) => {
    if (status.pending) return <span className="text-blue-600">Pending</span>;
    if (status.acknowledge)
      return <span className="text-green-600">Acknowledged</span>;
    return "Unknown";
  };

  async function acknowledgeHandler() {
    try {
      const formData = { status: { pending: false, acknowledge: true } };
      const complaintAcknowledged = await acknowledgeComplaint({
        complaintId: complaint.id,
        data: formData,
      }).unwrap();
      console.log("complaintAcknowledged", complaintAcknowledged);
    } catch (error) {
      console.log("Error while acknowledging complaint", error);
    }
  }

  console.log("complaint", complaint);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white flex flex-col gap-2 w-fit max-w-4xl max-sm:w-[95%] rounded shadow-lg p-6 max-sm:p-3">
        <div className={`${style.detailDiv}`}>
          <p className="">Complaint By:</p>
          <b className={`${style.detailText}`}>{complaint.name}</b>
        </div>

        <div className={`${style.detailDiv}`}>
          <p className="">Email ID:</p>
          <b className={`${style.detailText}`}>{complaint.email}</b>
        </div>

        <div className={`${style.detailDiv}`}>
          <p className="">Status:</p>
          <b className={`${style.detailText}`}>
            {complaintStatus(complaint.status)}
          </b>
        </div>

        <div className={`${style.detailDiv}`}>
          <p className="">Complaint:</p>
          <b className={`${style.detailText}`}>{complaint.complaint}</b>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded disabled:bg-gray-300"
            onClick={acknowledgeHandler}
            disabled={acknowledged}
          >
            Acknowledge
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
            onClick={deleteConfirmation}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
