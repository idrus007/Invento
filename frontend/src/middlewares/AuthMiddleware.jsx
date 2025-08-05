import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
};
