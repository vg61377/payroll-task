import { createBrowserRouter, Navigate } from "react-router-dom";
import routes from "./routes";
import ConditionalRoute from "@/components/ConditionalRoute/ConditionalRoute";
// import HomeLayout from './components/layouts/postlogin/HomeLayout';
import PreLogin from "@/layouts/PreLogin/PreLogin";
import PostLogin from "@/layouts/PostLogin/PostLogin";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";

const buildRoutes = (routesObj) => {
  return Object.values(routesObj).map(({ path, element, children }) => ({
    path,
    element,
    ...(children ? { children: buildRoutes(children) } : {}),
  }));
};

const router = createBrowserRouter([
  // Redirect root to login
  {
    path: "/",
    element: (
      <Navigate
        to={routes?.publicRoutes ? routes.publicRoutes.LOGIN.path : "/"}
        replace
      />
    ),
  },

  // Open routes
  ...buildRoutes(routes.routes),

  // Public routes
  {
    path: "/",
    element: <ConditionalRoute component={PreLogin} />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={routes?.publicRoutes ? routes.publicRoutes.LOGIN.path : "/"}
          />
        ),
      },
      ...buildRoutes(routes.publicRoutes),
    ],
  },

  // Private routes
  {
    path: "/",
    element: <ConditionalRoute isPrivate component={PostLogin} />,
    children: [
      ...buildRoutes(routes.privateRoutes),
      {
        index: true,
        element: <Navigate to={routes.privateRoutes.DASHBOARD.path} />,
      },
    ],
  },

  // Catch-all
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
