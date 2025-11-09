import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Input.module.scss";
import { combineClasses } from "../../utils/utils";

/**
 * Custom Input component wrapping MUI's TextField.
 *
 * Supports standard props plus custom `large` size and `contained` variant.
 *
 * @param {string} [label=""] - The label displayed above the input.
 * @param {string} [type="text"] - HTML input type (e.g., "text", "password").
 * @param {"outlined" | "standard" | "contained"} [variant="outlined"] - Input style. "contained" is a custom variant.
 * @param {string} [placeholder=""] - Placeholder text inside the input.
 * @param {string} [className=""] - Additional CSS class for the root element.
 * @param {boolean} [fullWidth=true] - Whether the input should take full width.
 * @param {boolean} [error=false] - Whether to display error styling.
 * @param {string} [helperText] - Text to show below the input.
 * @param {boolean} [required=false] - Marks the input as required.
 * @param {boolean} [disabled=false] - Disables the input.
 * @param {boolean} [multiline=false] - Renders as a multiline text area.
 * @param {number} [rows] - Fixed number of visible rows for multiline.
 * @param {number} [maxRows] - Maximum number of rows for multiline.
 * @param {number} [minRows] - Minimum number of rows for multiline.
 * @param {"small" | "medium" | "large"} [size="medium"] - Input size. "large" is custom.
 * @param {object} [InputProps] - Props passed to MUI's `InputProps`.
 * @param {object} [inputProps] - Native input element props.
 * @param {any} [value] - Controlled value of the input.
 * @param {function} [onChange] - Callback fired on input value change.
 * @param {function} [onBlur] - Callback fired when input loses focus.
 * @param {function} [onFocus] - Callback fired when input gains focus.
 * @param {string} [name] - Input `name` attribute.
 * @param {string} [id] - Input `id` attribute.
 * @param {string} [autoComplete] - HTML autocomplete attribute.
 * @param {boolean} [autoFocus=false] - Whether to autofocus on mount.
 * @param {"primary" | "secondary"} [color="primary"] - Color theme from MUI.
 * @param {any} [defaultValue] - Default value for uncontrolled inputs.
 * @param {boolean} [showPasswordToggle=false] - If true and type is "password", shows toggle for visibility.
 * @param {any} [rest] - Additional props passed to TextField.
 */

const Input = ({
  label = "",
  type = "text",
  variant = "outlined",
  placeholder = "",
  className = "",
  fullWidth = true,
  error = false,
  helperText,
  required = false,
  disabled = false,
  multiline = false,
  rows,
  maxRows,
  minRows,
  size = "medium",
  InputProps,
  inputProps,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  autoComplete,
  autoFocus = false,
  color = "primary",
  defaultValue,
  showPasswordToggle = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const endAdornment = type === "password" && showPasswordToggle && (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        edge="end"
      >
        {showPassword ? (
          <VisibilityOff fontSize="small" />
        ) : (
          <Visibility fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      className={combineClasses(styles.input, className)}
      placeholder={placeholder}
      type={inputType}
      label={
        label ? (
          <>
            {label}
            {required ? <span style={{ color: "red" }}> *</span> : ""}
          </>
        ) : undefined
      }
      variant={variant}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      size={size}
      InputProps={{
        ...InputProps,
        endAdornment: endAdornment || InputProps?.endAdornment,
      }}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      id={id}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      color={color}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default Input;
