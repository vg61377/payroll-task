import React from "react";
import styles from "./Sidebar.module.scss";
import { combineClasses } from "../../../../utils/utils";
import { useSelector } from "react-redux";
import { sidebarNavigation } from "../../../../utils/sidebarNavigation";
import { NavLink } from "react-router-dom";

function Sidebar({ toggleSidebar }) {
  const openSidebar = useSelector((state) => state.globalSlice.sidebarOpen);
  return (
    <div
      className={combineClasses(
        styles.sidebarContainer,
        openSidebar ? styles.openSidebar : styles.closeSidebar
      )}
      onMouseOver={toggleSidebar(true)}
    >
      <div
        className={combineClasses(
          styles.logoContainer,
          openSidebar && styles.openLogoContainer
        )}
      >
        <img
          className={openSidebar ? styles.openImg : styles.closeImg}
          src="/smallLogo.png"
          alt="logo"
        />
        {openSidebar && <p>Field Force Connect</p>}
      </div>
      <div className={styles.sidebarNavigation}>
        {sidebarNavigation.map((item, index) => {
          const { icon: Icon } = item;
          const { activeIcon: ActiveIcon } = item;
          return (
            <NavLink
              className={({ isActive }) =>
                combineClasses(
                  styles.sidebarItem,
                  isActive ? styles.sidebarItemActive : "",
                  openSidebar && styles.openMenu
                )
              }
              key={item.id}
              to={item.path}
            >
              {({ isActive }) => {
                return (
                  <>
                    {isActive ? <ActiveIcon /> : <Icon />}
                    {openSidebar && item.pageName}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
