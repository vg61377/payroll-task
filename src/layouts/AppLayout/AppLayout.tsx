import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.scss";
import { Box, Button, Stack, Typography } from "@mui/material";
import { sidenavbar, SideNavItem } from "../../utils/sidenavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/utils";
import toast from "../../utils/toast";
import Sidebar from "./Sidebar/Sidebar";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("Dashboard");
  const [punchedIn, setPunchedIn] = useState<boolean>(false);

  const handleLogout = (): void => {
    toast.success("Logged out successfully");
    removeToken();
    window.location.reload();
  };

  const punchInPunchOut = (): void => {
    setPunchedIn((prev) => !prev);
    if (!punchedIn) {
      toast.success("Punched in successfully");
    } else {
      toast.success("Punched out successfully");
    }
  };

  useEffect(() => {
    const updateDateTime = (): void => {
      const now = new Date();

      // Format time
      let hours: number = now.getHours();
      const minutes: number = now.getMinutes();
      const ampm: string = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12
      const timeStr: string = `${hours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

      
      const dateOptions: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const dateStr: string = now.toLocaleDateString("en-US", dateOptions);

      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateDateTime(); 
    const interval = setInterval(updateDateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className={styles.AppLayout}>
      <div className={styles.sideNav}>
     <Sidebar/>
      </div>

      {/* RIGHT SIDE SECTION */}
      <Box className={styles.rightSide}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={styles.Navbar}
        >
          <Typography variant="body1">{pageTitle}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" gap={1.5}>
              <span>{currentTime}</span>
              {" | "}
              <span>{currentDate}</span>
            </Box>

            {punchedIn ? (
              <Button
                onClick={punchInPunchOut}
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Punch out
              </Button>
            ) : (
              <Button
                onClick={punchInPunchOut}
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Punch In
              </Button>
            )}

            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <Outlet />
      </Box>
    </div>
  );
};

export default AppLayout;
