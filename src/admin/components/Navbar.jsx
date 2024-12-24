import React, { useContext, useDebugValue, useEffect, useState } from "react";
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
import { IoMdMenu } from "react-icons/io";
import { setCurrentPage } from "../features/adminPanelSlice";
import { SideBarContext } from "../pages/layout/Layout";

const Navbar = () => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const { adminProfile, isLoading, isError } = useAdminProfileQuery();
  // console.log("adminInfo", adminInfo);

  const adminPanelData = useSelector((state) => state.adminPanel);
  // console.log("adminPanelData", adminPanelData);

  // const { toggleSidebar, isSidebarOpen } = props;
  const { isSidebarOpen, toggleSidebar } = useContext(SideBarContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  if (isError) {
    console.log("Error in Admin Profile mainfly fro JWT Token Expiry", isError);
    dispatch(logout());
  }

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default behavior
    startTransition(() => {
      window.history.pushState({}, "", to); // Programmatic navigation
    });
  };

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage");
    // console.log("data from localStorage:", currentPage);
    dispatch(setCurrentPage({ currentPage }));
  }, []);

  return (
    // <nav className="sticky flex justify-between items-center p-4 w-full  top-0 z-50">
    <nav
      className={`bg-white flex items-center py-3 max-sm:py-3 w-full sticky top-0 z-20 border-b max-14inch:py-0 max-2sm:mx-1
              ${isSidebarOpen ? "justify-between" : "justify-between"}
    `}
    >
      {/* SideBar Open Toggle */}
      <button
        className={`${isSidebarOpen ? "" : " pl-5 text-3xl max-sm:text-xl"}`}
        onClick={() => {
          toggleSidebar();
        }}
      >
        <IoMdMenu />
      </button>

      {/* Current Page Name */}
      <div>
        <p className="text-xl max-sm:text-xs font-serif font-semibold">
          {adminPanelData?.currentPage?.toUpperCase()}
        </p>
      </div>

      {/* Admin Profile DropDown */}
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
