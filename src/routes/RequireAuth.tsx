import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "./paths";
import axiosInstance from "../api/APIClient";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_BASE_URL}/user/profile/me`)
      .catch(() => {
        navigate(PATH_DASHBOARD.login);
      });
  }, []);
  return children;
}
