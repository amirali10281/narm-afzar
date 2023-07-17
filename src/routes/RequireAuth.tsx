
import { Navigate, } from "react-router-dom";
import { PATH_DASHBOARD } from "./paths";


interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  return localStorage.getItem("token") ? children : <Navigate to={PATH_DASHBOARD.login} />
}