import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "./paths";
import axiosInstance from "../api/APIClient";

interface NoAuthProps {
  children: JSX.Element;
}

export function NoAuth({ children }: NoAuthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_BASE_URL}/user/profile/me`)
      .then(() => {
        navigate(PATH_DASHBOARD.checkout);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return children;
}
