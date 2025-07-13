import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@api";
import { setCredentials } from "@features/userSlices/authSlice";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";

export const SignUp = () => {
  const [signUpData, setSignUpData] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.auth);
  const [register] = useRegisterMutation();
  //   If AdminInfo(logged In) is available navigate to Admin Dashboard
  useEffect(() => {
    if (adminInfo) {
      navigate(ROUTES.admin.dashboard);
    }
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, typeof password, confirmPassword);

    if (password === confirmPassword) {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Registered in successfull");
        navigate(ROUTES.admin.dashboard);
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
      <div className="mx-auto w-[30%] my-[10%] border rounded shadow-lg p-5">
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <h1 className="text-lg font-semibold">Create a New Admin</h1>
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
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Password"
              className="border rounded px-2 py-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              className="border rounded px-2 py-1"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="">
              <input
                type="submit"
                value="Register"
                className="border rounded px-2 py-1 mt-3 w-[50%] bg-green-600 text-white hover:border-black hover:bg-green-700 cursor-pointer"
              />
            </div>
          </div>
        </form>
        <div className="text-end -mt-11">
          <Link to={ROUTES.admin.login}>
            <button className="text-sm bg-blue-500 px-2 py-1 mt-3 border rounded text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
