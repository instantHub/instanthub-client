export const SubmitButton = ({ loading, type, children }) => {
  const BG_COLOR =
    type === "secondary"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <div className="mt-5 max-sm:mt-3">
      <button
        type="submit"
        className={`w-full ${BG_COLOR} px-2 max-md:w-full text-white rounded-md p-1 cursor-pointer disabled:cursor-none disabled:bg-gray-300`}
        disabled={loading}
      >
        {!loading ? `${children}` : "Loading..."}
      </button>
    </div>
  );
};
