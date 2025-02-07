import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";

const DateAndTime = ({ label = true, setSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const currentDate = new Date();
  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const handleTimeChange = (date) => {
    setSelectedDate(date);

    const formattedDate = `${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`;
    // console.log("formattedDate", formattedDate);
    setSchedule(formattedDate);
    setFormattedDate(formattedDate);
  };
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center">
        {label && <h2 className="max-sm:text-sm">Select Date and Time: </h2>}
        <DatePicker
          selected={selectedDate}
          onChange={handleTimeChange}
          showTimeSelect
          timeFormat="h:mm aa" // 12 hours
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="Time"
          minDate={currentDate}
          minTime={minTime}
          maxTime={maxTime}
          className="border ml-1 p-1 rounded max-sm:text-sm max-sm:px-1 max-sm:py-[2px]"
          placeholderText="Schedule Pickup"
          required
        />
      </div>

      {selectedDate && (
        <p className="text-sm max-sm:text-xs">
          Scheduled time:{" "}
          <span className="font-semibold max-sm:text-xs">{formattedDate}</span>{" "}
        </p>
      )}
    </div>
  );
};

export default DateAndTime;
