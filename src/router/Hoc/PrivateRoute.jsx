import React from "react";
import { getToken } from "../../utils/constants";
import { Navigate } from "react-router-dom";
import routers from "../router";

function PrivateRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to={routers.publicRoutes.LOGIN.path} replace />;
  return children;
}

export default PrivateRoute;
