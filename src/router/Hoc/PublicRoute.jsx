import React from "react";
import { getToken } from "../../utils/constants";
import { Navigate } from "react-router-dom";
import routers from "../router";

function PublicRoute({ children }) {
  const token = getToken();
  if (token) return <Navigate to={routers.privateRoutes.DASHBOARD.path} replace />;
  return children;
}

export default PublicRoute;
