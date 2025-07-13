import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@features/adminSlices/adminAuthSlice";
import { useValidateTokenQuery } from "@features/api";

export const useAuthInitialize = () => {
  console.log("useAuthInitialize hook called");
  const dispatch = useDispatch();

  const { data: admin, isSuccess: tokenValidated } = useValidateTokenQuery();

  useEffect(() => {
    if (admin) {
      dispatch(setCredentials({ admin }));
    }
  }, [dispatch, admin]);

  return { tokenValidated };
};
