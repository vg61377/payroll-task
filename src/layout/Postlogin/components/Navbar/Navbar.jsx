import React, { useEffect, useMemo, useState } from "react";
import styles from "./Navbar.module.scss";
import { Avatar, Popover, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { formatDate, formatTime } from "@/utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarNavigation } from "@/utils/sidebarNavigation";
import { getUser } from "@/utils/constants";
import MuiButton from "@/components/Button/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import routers from "../../../../router/router";
import toast from "react-hot-toast";

function Navbar() {
  const [now, setNow] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const user = getUser();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCurruntPage = useMemo(() => {
    return sidebarNavigation?.find((item) =>
      location?.pathname?.startsWith(item?.path)
    );
  }, [location?.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate(routers?.publicRoutes?.LOGIN?.path);
    toast.success("Sing Out Success")
  }

  const handleTaskClick = () => {
    setAnchorEl(null);
    navigate(routers?.privateRoutes?.MYTASK?.path);
  }

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <p className={styles.title}>{getCurruntPage?.pageName}</p>
      <div className={styles.rightSide}>
        <div className={styles.dateTime}>
          <p className={styles.time}>{formatTime(now)}</p>
          <p className={styles.date}>{formatDate(now)}</p>
        </div>
        <div onClick={handleClick} className={styles.profile}>
          <p>{user?.Name || "N/A"}</p>
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 28,
              height: 28,
              fontSize: 14,
            }}
          >
            {user?.Name?.[0] || "N/A"}
          </Avatar>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <div className={styles.popoverContent}>
            <div className={styles.profileDiv}>
              <p>Hello, {user?.Name || "Guest"}!</p>
            </div>

            <button
              className={styles.menuItem}
              onClick={handleTaskClick}
            >
              <p>My Task</p>
              <KeyboardArrowRightIcon />
            </button>

            <div className={styles.signOutWrapper}>
              <MuiButton
                variant="outlined"
                size="small"
                className={styles.signOutButton}
                onClick={handleSignOut}
                color="error"
                endIcon ={<LogoutIcon />}
              >
                SING OUT 
              </MuiButton>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
