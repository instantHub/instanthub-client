import React from "react";
import { BiSolidCity } from "react-icons/bi";

const cities = [
  {
    city: "Bangalore",
    state: "Karnataka",
    icon: <BiSolidCity />,
    available: true,
  },
  {
    city: "Mysore",
    state: "Karnataka",
    icon: <BiSolidCity />,
    available: true,
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    icon: <BiSolidCity />,
    available: false,
  },
  { city: "Delhi", state: "Delhi", icon: <BiSolidCity />, available: false },
  {
    city: "Hyderabad",
    state: "Telangana",
    icon: <BiSolidCity />,
    available: false,
  },
];

function LocationSelector({ handleAddress, setShowLocation, setIsOpen }) {
  const handleSelectCity = (city, state) => {
    handleAddress(state, city);
    setShowLocation(false); // Close the modal
    setIsOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="relative bg-white p-4 rounded w-fit max-sm:w-[90%]">
        <h2 className="text-lg max-sm:text-sm font-bold mb-4">Select a City</h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-5 flex-wrap space-y-2">
          {cities.map(({ city, state, icon, available }) => (
            <div
              key={city}
              onClick={() => {
                if (available) handleSelectCity(city, state);
              }}
              className={`relative flex flex-col justify-center items-center w-full cursor-pointer p-2 rounded 
                          ${
                            available
                              ? "hover:bg-gray-200"
                              : "cursor-not-allowed bg-black/40"
                          }`}
            >
              {!available && (
                <p className="absolute top-6 text-xs max-sm:text-[10px] text-white">
                  Coming Soon
                </p>
              )}
              <p className="text-3xl text-green-600"> {icon}</p>
              <div className="flex flex-col">
                <p className="font-semibold max-sm:text-sm">{city}</p>
                <p className="text-sm max-sm:text-xs text-gray-500">{state}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-0 right-0 text-sm px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => setShowLocation(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LocationSelector;
