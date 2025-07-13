import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useValidateTokenQuery } from "@api";
import { setCredentials } from "@features/adminSlices/adminAuthSlice";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { ROUTES } from "@routes";

export const SignIn = () => {
  const [signInData, setSignInData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { refetch } = useValidateTokenQuery();

  // const { admin } = useSelector((state) => state.adminPanel);

  //   If AdminInfo(logged In) is available navigate to Admin Dashboard
  // useEffect(() => {
  //   if (admin) {
  //     navigate(ROUTES.admin.dashboard);
  //   }
  // }, [navigate, admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("handleSubmit login res", res);

      // dispatch(setCredentials(res));
      dispatch(setCredentials(res));

      toast.success("Logged in successfull");
      // navigate(ROUTES.admin.dashboard);

      // Manually trigger verify
      const result = await refetch();
      if (!result.error) {
        navigate("/admin/dashboard"); // ✅ push to dashboard
      }
    } catch (err) {
      console.log("catch error");
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mx-auto flex justify-center items-center w-[30%] max-md:w-full my-[10%] border rounded shadow-lg p-5 max-md:p-2">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <h1 className="text-lg font-semibold">Create a New Admin</h1>
        <hr />
        <div className="flex flex-col gap-2 mx-10 max-md:mx-4 my-2">
          <div className="grid grid-cols-2 place-content-baseline my-2">
            <label htmlFor="adminname">Admin</label>
            <input
              type="text"
              name="adminname"
              id="adminname"
              placeholder="Name"
              className="border rounded px-2 py-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 place-content-baseline my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border rounded px-2 py-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className="border rounded px-2 py-1 mt-3 w-full bg-green-600 text-white hover:border-black hover:bg-green-700 cursor-pointer"
            />
          </div>
        </div>
      </form>

      {/* Undo for new admin registration */}
      {/* <div className="text-end -mt-11">
          <Link to={ROUTES.admin.singup}>
            <button className="text-sm bg-blue-500 px-2 py-1 mt-3 border rounded text-white">
              Register
            </button>
          </Link>
        </div> */}
    </div>
  );
};
