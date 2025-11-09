import { createBrowserRouter, Navigate } from "react-router-dom";
import routers from "./router";
import PublicRoute from "./Hoc/PublicRoute";
import Prelogin from "../layout/Prelogin/Prelogin";
import PrivateRoute from "./Hoc/PrivateRoute";
import Postlogin from "../layout/Postlogin/Postlogin";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={routers.publicRoutes.LOGIN.path} replace />,
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <Prelogin />
      </PublicRoute>
    ),
    children: [
      ...Object.values(routers.publicRoutes).map((route) => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Postlogin />
      </PrivateRoute>
    ),
    children: [
      ...Object.values(routers.privateRoutes).map((route) => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
