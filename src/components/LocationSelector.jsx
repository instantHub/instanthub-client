import { useEffect, useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationSelector = () => {
  const [showLocations, setShowLocations] = useState(false);
  const dropdownRef = useRef(null); // Ref to the dropdown
  const iconRef = useRef(null); // Ref to the icon button

  const handleToggle = () => setShowLocations(!showLocations);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setShowLocations(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center bg-white text-black p-4 max-sm:p-0 font-serif">
      {/* Mobile view icon */}
      <div className="block md:hidden">
        <button
          ref={iconRef}
          onClick={handleToggle}
          className={`p-2 rounded-full ${showLocations && "p-0"}`}
        >
          <IoLocationSharp
            className={`text-lg ${
              showLocations &&
              "text-xl bg-secondary text-secondary-light rounded-full p-[2px]"
            }`}
          />
        </button>
      </div>

      {/* Location selection dropdown (Desktop) */}
      <div className="hidden md:block">
        <select className="w-full bg-white text-black border border-gray-300 rounded-md p-2">
          <option defaultValue="bangalore">Bangalore</option>
          <option value="delhi" disabled>
            Delhi
          </option>
          <option value="mumbai" disabled>
            Mumbai
          </option>
          <option value="chennai" disabled>
            Chennai
          </option>
          <option value="kolkata" disabled>
            Kolkata
          </option>
          <option value="pune" disabled>
            Pune
          </option>
          <option value="hyderabad" disabled>
            Hyderabad
          </option>
          {/* Add more states here */}
        </select>
      </div>

      {/* Large Screen view icon */}
      <div className="block max-sm:hidden">
        <button className="p-2 rounded-full">
          <IoLocationSharp className="text-lg max-sm:text-lg" />
        </button>
      </div>

      {/* Mobile dropdown (Visible when icon is clicked) */}
      {showLocations && (
        <div
          ref={dropdownRef}
          className="md:hidden top-[120%] bg-white text-black p-0 border border-secondary-light rounded-md absolute w-fit"
        >
          <select className="w-fit bg-white text-black border border-gray-300 rounded-md p-1">
            <option defaultValue="bangalore">Bangalore</option>
            <option value="delhi" disabled>
              Delhi
            </option>
            <option value="mumbai" disabled>
              Mumbai
            </option>
            <option value="chennai" disabled>
              Chennai
            </option>
            <option value="kolkata" disabled>
              Kolkata
            </option>
            <option value="pune" disabled>
              Pune
            </option>
            <option value="hyderabad" disabled>
              Hyderabad
            </option>
            {/* Add more states here */}
          </select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
