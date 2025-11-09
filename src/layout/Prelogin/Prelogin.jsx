import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Prelogin.module.scss";

function Prelogin() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
       <div className={styles.imageText}>
         <h2>Daily Employee attendance tracking</h2>
        <p>
          Application allows you to monitor your employee’s Check-In, Check-Out
          time and attendance from anywhere and at any time.
        </p>
       </div>
      </div>
      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  );
}

export default Prelogin;
