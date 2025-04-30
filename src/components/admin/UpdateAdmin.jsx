import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateAdminMutation } from "../../features/api/admin/authApi/authApi";
import { setCredentials } from "../../features/slices/authSlice";
import { BiSolidHide, BiShow } from "react-icons/bi";

const UpdateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.auth);

  const [updateAdmin] = useUpdateAdminMutation();

  //   console.log(adminInfo);

  useEffect(() => {
    if (adminInfo) {
      setName(adminInfo.name);
      setEmail(adminInfo.email);
      setAdminId(adminInfo._id);
    }
  }, [adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword, adminId);

    if (password === confirmPassword) {
      try {
        const res = await updateAdmin({
          _id: adminId,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res.updatedAdmin));
        toast.success(res.message);
        navigate("/admin/dashboard");
      } catch (err) {
        console.log("catch error");
        console.log(err?.data?.message || err.error);
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Passwords did not match..!");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <div className="mx-auto w-[40%] max-md:w-full my-[10%] border rounded shadow-lg p-5">
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <h1 className="text-lg font-semibold">Update Admin</h1>
          <hr />
          <div className="flex flex-col gap-2 mx-10">
            <label htmlFor="adminname">Enter Admin Name</label>
            <input
              type="text"
              value={name}
              name="adminname"
              id="adminname"
              placeholder="Name"
              className="border rounded px-2 py-1"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="adminemail">Enter Admin Email</label>
            <input
              type="email"
              value={email}
              name="adminemail"
              id="adminemail"
              placeholder="Email"
              className="border rounded px-2 py-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Enter Password</label>
            <div className="flex justify-between items-center border rounded">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="px-2 text-xl"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <span>
                    <BiShow />
                  </span>
                ) : (
                  <span>
                    <BiSolidHide />
                  </span>
                )}
              </button>
            </div>
            <label htmlFor="confirmpassword">Confirm Password</label>

            <div className="flex justify-between items-center border rounded">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="px-2 text-xl"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword((prev) => !prev);
                }}
              >
                {showConfirmPassword ? (
                  <span>
                    <BiShow />
                  </span>
                ) : (
                  <span>
                    <BiSolidHide />
                  </span>
                )}
              </button>
            </div>
            <div className="">
              <input
                type="submit"
                value="Update"
                className="border rounded px-2 py-1 mt-3 w-[50%] max-md:w-full bg-green-600 text-white hover:border-black hover:bg-green-700 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdmin;
