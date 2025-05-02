import { FaTimes } from "react-icons/fa";

const SeriesButton = ({ series, isSelected, onClick }) => (
  <div
    key={series.id}
    className="relative col-span-1 max-h-44 sm:max-h-56 sm:rounded border-b border-r border-solid sm:border-0 max-sm:border-gray-300"
  >
    <button onClick={onClick} className="w-full h-full">
      <div
        className={`${
          isSelected ? "bg-secondary text-white" : "bg-gray-200 max-sm:bg-white"
        } flex flex-col items-center justify-center cursor-pointer w-full h-full p-2 sm:p-2 sm:min-w-full rounded sm:rounded-md sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
      >
        <span className="text-center mt-2 flex-1 line-clamp-3 flex items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
          <div className="text-sm max-sm:text-[10px] max-sm:leading-3">
            {series.name}
          </div>
        </span>
      </div>
    </button>
    {isSelected && (
      <button onClick={onClick} className="absolute top-1 right-1 text-white">
        <FaTimes />
      </button>
    )}
  </div>
);

export default SeriesButton;
