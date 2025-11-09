import React from "react";
import styles from "./Button.module.scss";
import Button from "@mui/material/Button";
import { combineClasses } from "../../utils/utils";

/**
 * Reusable MUI Button for the entire app.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {"text" | "outlined" | "contained"} [props.variant="contained"] - The MUI variant of the button.
 * @param {"primary" | "secondary" | "error" | "success" | "info" | "warning"} [props.color="primary"] - The color of the button.
 * @param {"small" | "medium" | "large"} [props.size="medium"] - The size of the button.
 * @param {string} [props.className=""] - Additional CSS classes.
 * @param {any} [props.rest] - Any other props passed to MUI Button.
 */

export default function MuiButton({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  className = "",
  ...rest
}) {
  return (
    <Button
      className={combineClasses(styles.button, className)}
      variant={variant}
      size={size}
      color={color}
      {...rest}
    >
      {children}
    </Button>
  );
}
