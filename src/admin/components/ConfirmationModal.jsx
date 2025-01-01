import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemToDelete,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
            onClick={() => {
              onConfirm(itemToDelete);
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
