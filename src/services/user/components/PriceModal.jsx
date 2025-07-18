import React from "react";

const PriceModal = ({ isModalOpen, setIsModalOpen }) => {
  const images = [
    "/images/priceimage.jpeg", // Replace with your image URLs
    "/images/priceimage.jpeg", // Replace with your image URLs
    "/images/priceimage.jpeg", // Replace with your image URLs
    "/images/priceimage.jpeg", // Replace with your image URLs
  ];

  //   console.log("isModalOpen, setIsModalOpen", isModalOpen, setIsModalOpen);

  return (
    <div className="relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Scrollable Images */}
          {/* <div className="relative bg-white w-4/5 h-3/4 rounded-lg shadow-lg p-4 overflow-y-scroll"> */}
          <div className="relative bg-white w-fit h-2/4 max-sm:h-[60%] rounded-lg shadow-lg p-4 overflow-y-scroll">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-sm max-sm:text-xs rounded hover:bg-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <div className="flex flex-col gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Price ${index + 1}`}
                  className=" w-fit h-fit rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceModal;
