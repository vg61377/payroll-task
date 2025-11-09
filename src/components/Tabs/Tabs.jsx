import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import styles from "./Tabs.module.scss";
import { combineClasses } from "../../utils/utils";

/**
 * Reusable Tabs for internal app
 *
 * @param {Array} tabs - List of tab labels
 * @param {number} value - Active tab index
 * @param {Function} onChange - Handles tab change
 * @param {string} className - Extra class
 */
export default function AppTabs({
  tabs = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <Box className={combineClasses(styles.tabsWrapper, className)}>
      <Tabs
        value={value}
        onChange={onChange}
        className={styles.tabs}
        TabIndicatorProps={{ className: styles.tabIndicator }}
      >
        {tabs.map((label, index) => (
          <Tab key={index} label={label} className={styles.tabItem} />
        ))}
      </Tabs>
    </Box>
  );
}
