import React from "react";

export const Time = ({ setTime }) => {
  const timings = [
    "9 AM - 11 AM",
    "11 AM - 1 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
    "6 PM - 8 PM",
  ];
  return (
    <div>
      <select
        name="time"
        onChange={(e) => setTime(e.target.value)}
        className="text-gray-400 border ml-1 p-1 rounded max-sm:text-sm max-sm:px-1 max-sm:py-[2px]"
        required
      >
        <option value="">Time</option>
        {/* <span className="text-red-500">*</span> */}
        {timings.map((time, i) => (
          <option key={i} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};
