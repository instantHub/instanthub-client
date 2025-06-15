import ReactDOM from "react-dom";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemToDelete,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  detail = "",
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-sm:w-[95%] max-w-md rounded shadow-lg p-6 max-sm:px-3 max-sm:py-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-800 mb-2">{detail && detail}</p>
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
    </div>,
    document.getElementById("modal-root")
  );
};
