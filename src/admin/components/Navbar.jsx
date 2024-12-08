import React, { useDebugValue, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAdminLogoutMutation,
  useAdminProfileQuery,
} from "../../features/adminApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { toast } from "react-toastify";
import { FiAlignLeft } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const { adminProfile, isLoading } = useAdminProfileQuery();
  // console.log("adminInfo", adminInfo);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { toggleSidebar, isSidebarOpen } = props;

  const [adminLogout] = useAdminLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await adminLogout();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {}
  };

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default behavior
    startTransition(() => {
      window.history.pushState({}, "", to); // Programmatic navigation
    });
  };
  return (
    <nav className="flex justify-end p-4 w-full">
      <div className="flex items-center ">
        {adminInfo && (
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <button
                onClick={toggleDropdown}
                className="group ml-4 text-black focus:outline-none flex items-center gap-1"
              >
                <span>{adminInfo.name}</span>
                <FiAlignLeft className="group-hover:animate-bounce" />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute mt-32 bg-white rounded-lg shadow-lg">
                <div className="py-1">
                  <Link to={"/admin/update-profile"}>
                    <h2 className="px-4 py-2 text-gray-800 hover:bg-gray-300 flex items-center gap-1">
                      <span>Profile</span>
                      <CgProfile />
                    </h2>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex gap-1 items-center px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    <span>Logout</span>
                    <IoLogOut />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
