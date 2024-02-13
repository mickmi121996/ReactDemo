import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storageAccessToken } from "../../data_services/CustomAxios";

const useAuth = (): boolean => {
  const accessToken: string | null = localStorage.getItem(storageAccessToken);
  return accessToken !== null;
};

function ProtectedRoutes(): React.JSX.Element | null {
  const isAuth: boolean = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
