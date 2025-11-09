import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import styles from "./Postlogin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../../Store/Slices/globalSlice";
import { sidebarNavigation } from "../../utils/sidebarNavigation";
import { Outlet } from "react-router-dom";

function Postlogin() {
  const sidebarOpen = useSelector((state) => state.globalSlice.sidebarOpen);
  const dispatch = useDispatch();

  const toggleSidebar = (flag) => (e) => {
    e.stopPropagation();
    sidebarOpen !== flag && dispatch(setSidebarOpen(flag));
  };

  return (
    <div className={styles.postlogin}>
      <Sidebar toggleSidebar={toggleSidebar} />
      <div onMouseEnter={toggleSidebar(false)} className={styles.rightSide}>
        <Navbar />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Postlogin;
