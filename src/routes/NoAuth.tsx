import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "./paths";
import axiosInstance from "../api/APIClient";

interface NoAuthProps {
  children: JSX.Element;
}

export function NoAuth({ children }: NoAuthProps) {
  return children;
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_BASE_URL}/user/profile/me`)
      .then(() => {
        navigate(PATH_DASHBOARD.splash);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
}
