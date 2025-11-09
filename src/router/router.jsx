import { lazy } from "react";

const Login = lazy(() => import("@/pages/Login/Login.jsx"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard.jsx"));
const MyTask = lazy(() => import("@/pages/Mytask/MyTask.jsx"));
const MyTeam = lazy(() => import("@/pages/MyTeam/MyTeam.jsx"));
const Setting = lazy(() => import("@/pages/Setting/Setting.jsx"));
const Billing = lazy(() => import("@/pages/Billing/Billing.jsx"));
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const routers = {
  publicRoutes: {
    LOGIN: {
      path: "/login",
      element: <Login />,
    },
    // FORGOT_PASSWORD: {
    //   path: "/login",
    //   element: "<Login/>",
    // },
    // SIGN_UP: {
    //   path: "/sing-up",
    //   element: "<SingUp/>",
    // },
    // RESET_PASSWORD: {
    //   path: "/reset-password",
    //   element: "<ResetPassword/>",
    // },
    // FORGOT_PASSWORD: {
    //   path: "/forgot-password",
    //   element: "<ForgotPassword/>",
    // },
  },
  privateRoutes: {
    DASHBOARD: {
      path: "/dashboard",
      element: <Dashboard />,
      pageName: "Dashboard",
      sidebar: {
        show: true,
        icon: DashboardOutlinedIcon,
        activeIcon: DashboardIcon,
      },
      //permissionName: "permission",
    },
    SETTING: {
      path: "/setting",
      element: <Setting />,
      pageName: "Setting",
      sidebar: {
        show: true,
        icon: SettingsOutlinedIcon,
        activeIcon: SettingsIcon,
      },
      //permissionName: "permission",
    },
    MYTASK: {
      path: "/mytask",
      element: <MyTask />,
      pageName: "My Task",
      sidebar: {
        show: true,
        icon: AssignmentTurnedInOutlinedIcon,
        activeIcon: AssignmentTurnedInIcon,
      },
      // permissionName: "permission",
    },
    MYTEAM: {
      path: "/myteam",
      element: <MyTeam />,
      pageName: "My Team",
      sidebar: {
        show: true,
        icon: GroupsOutlinedIcon,
        activeIcon: GroupsIcon,
      },
      // permissionName: "permission",
    },
    BILLING: {
      path: "/billing",
      element: <Billing />,
      pageName: "Billing",
      sidebar: {
        show: true,
        icon: AccountBalanceWalletOutlinedIcon,
        activeIcon: AccountBalanceWalletIcon,
      },
      //permissionName: "permission",
    },
  },
};

export default routers;
