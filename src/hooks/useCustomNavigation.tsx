import { useNavigate } from "react-router-dom";

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (
    path: string,
    options?: { replace?: boolean; state?: any }
  ) => {
    navigate(path, options);
  };

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return {
    navigateTo,
    goBack,
    goForward,
  };
};
