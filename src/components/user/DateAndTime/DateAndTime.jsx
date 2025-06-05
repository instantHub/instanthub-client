import React, { memo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateAndTime = memo(({ label = true, showPreviousDate, setSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const timeSlots = [
    "10 AM - 12 PM",
    "1 PM - 3 PM",
    "4 PM - 7 PM",
    "7 PM - 9 PM",
  ];

  const handleTimeChange = (date) => {
    setSelectedDate(date);

    const formattedDate = `${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`;

    setSchedule(formattedDate);
  };

  console.log("selectedDate", selectedDate, selectedTimeSlot);

  return (
    <div className="flex max-sm:flex-col items-center gap-2 text-sm max-sm:text-xs">
      {label && <h2>Select Date and Time: </h2>}
      <div className="flex gap-2">
        <DatePicker
          selected={selectedDate}
          onChange={handleTimeChange}
          dateFormat="MMMM d, yyyy"
          minDate={showPreviousDate ? false : currentDate}
          className="border p-1 rounded max-sm:px-1 max-sm:py-[2px]"
          placeholderText="Select Date"
          required
        />

        <select
          value={selectedTimeSlot}
          onChange={(e) => {
            const { value } = e.target;
            setSelectedTimeSlot(value);
            setSchedule((prev) => `${prev}, ${value}`);
          }}
          className="text-gray-400 border p-1 rounded max-sm:px-1 max-sm:py-[2px]"
          required
        >
          <option value="" disabled>
            Select Time Slot
          </option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

// export default memo(DateAndTime);

// Old formatting with date and time
{
  // const [time, setTime] = useState(null);
  // const [formattedDate, setFormattedDate] = useState(null);
  // // Set the minimum time to 10:00 AM
  // const minTime = new Date();
  // minTime.setHours(10, 0, 0, 0);
  // // Set the maximum time to 10:00 PM
  // const maxTime = new Date();
  // maxTime.setHours(22, 0, 0, 0);
  // const formattedDate = `${date.toLocaleString("en-US", {
  //   month: "long",
  // })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
  //   "en-US",
  //   { hour: "numeric", minute: "numeric", hour12: true }
  // )}`;
}
