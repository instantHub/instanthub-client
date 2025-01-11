import React, { useState } from "react";
import { useCreateComplaintMutation } from "../features/api";
import { toast } from "react-toastify";

const ComplaintBox = ({ setOpenComplaintBox }) => {
  const [createComplaint, { isLoading: createComplaintLoading }] =
    useCreateComplaintMutation();

  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const maxLength = 100;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setComplaint(e.target.value);
    }
  };

  const toggleHandler = () => {
    setDarkMode(!darkMode);
  };
  const style = {
    light: "bg-secondary-light text-secondary",
    dark: "bg-secondary text-secondary-light",
    inputStyle: `bg-white text-secondary rounded shadow px-2 py-1 max-sm:text-sm w-full ${
      !darkMode && "border border-secondary"
    }`,
    transition: "transition-all ease-linear duration-700",
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      //   console.log(name, email, complaint);
      const formData = {
        name,
        email,
        complaint,
        status: { pending: true, acknowledge: false },
      };
      const complaintCreated = await createComplaint(formData);
      console.log("complaint raised", complaintCreated);
      toast.success("Complaint Raised. Thank You!");
    } catch (error) {
      console.log("Error while submitting complaint:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative w-full max-sm:w-5/6 max-w-md rounded-xl shadow-xl py-6 max-sm:py-4
                    ${style.transition} ${darkMode ? style.dark : style.light}`}
      >
        {/* Toggle */}
        <div className="absolute top-2 right-2 text-xs flex flex-col items-center justify-center rounded">
          <button
            onClick={toggleHandler}
            className={`w-7 h-4 flex items-center rounded-full transition-colors duration-300 ${
              darkMode ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-3" : ""
              }`}
            ></div>
          </button>
          <p>{darkMode ? "Dark" : "Light"}</p>
          {/* </div> */}
        </div>
        <h2 className="text-lg max-sm:text-sm font-semibold p-4 mb-4">
          Drop Your Complaint Below!
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 max-sm:gap-3 px-4 max-sm:px-4"
        >
          {/* Name */}
          <div className="grid grid-cols-4 place-items-center items-center max-sm:items-center gap-2 max-sm:gap-1 w-full">
            <label
              htmlFor="name"
              id="name"
              className="col-span-1 max-sm:text-xs"
            >
              Name:
            </label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={`col-span-3 ${style.inputStyle}`}
              required
            />
          </div>

          {/* Email */}
          {/* <div className="flex max-sm:flex-col items-start max-sm:items-center gap-2 max-sm:gap-1"> */}
          <div className="grid grid-cols-4 place-items-center items-center max-sm:items-center gap-2 max-sm:gap-1 w-full">
            <label
              htmlFor="email"
              id="email"
              className="col-span-1 max-sm:text-xs"
            >
              Email ID:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={`col-span-3 ${style.inputStyle}`}
              required
            />
          </div>

          {/* <div className="flex max-sm:flex-col items-start max-sm:items-center gap-2 max-sm:gap-1 w-full"> */}
          <div className="grid grid-cols-4 place-items-center items-start gap-2 max-sm:gap-1 w-full">
            <label
              htmlFor="complaint"
              id="complaint"
              className="w-fit col-span-1 max-sm:text-xs"
            >
              Complaint:
            </label>
            <div className="col-span-3 flex flex-col items-end max-sm:w-full w-full">
              <textarea
                type="textarea"
                value={complaint}
                name="complaint"
                placeholder="Complaint Message..."
                onChange={handleChange}
                className={`${style.inputStyle} `}
                required
              />
              <p
                className={`text-xs mt-[2px] ${style.transition} ${
                  darkMode ? style.dark : style.light
                }`}
              >
                {complaint.length}/{maxLength} characters
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-around space-x-4 mt-5">
            <button
              className={`px-4 py-2 max-sm:px-2 max-sm:py-1 rounded ${
                darkMode
                  ? "border border-secondary-light"
                  : "border border-secondary"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenComplaintBox(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 max-sm:px-2 max-sm:py-1 text-white bg-red-600 hover:bg-red-700 rounded `}
            >
              Send Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintBox;
