import React from "react";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import Logo from "../../../assets/FFC-logo.png";
import { sidenavbar } from "../../../utils/sidenavbar";



const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      {/* ✅ Logo */}
      <div className={styles.logoContainer}>
        
        <img src={Logo} alt="App Logo" className={styles.logo} />
      </div>

      {/* ✅ Navigation */}
      <Stack className={styles.navList}>
        {sidenavbar?.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.route}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <img src={menu.icon} alt={menu.title} className={styles.navIcon} />
            <span className={styles.navText}>{menu.title}</span>
          </NavLink>
        ))}
      </Stack>
    </aside>
  );
};

export default Sidebar;
