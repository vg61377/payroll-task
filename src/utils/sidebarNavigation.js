import routers from "../router/router";

export const sidebarNavigation = Object.values(routers.privateRoutes)
  .filter((ele) => ele?.sidebar?.show)
  .map((pageData, index) => ({
    id: index + 1,
    path: pageData.path,
    icon: pageData.sidebar.icon,
    activeIcon: pageData.sidebar.activeIcon,
    pageName: pageData.pageName,
  }));
