import React from "react";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import styles from "./DatePicker.module.scss";
import { combineClasses } from "../../utils/utils";

/**
 * Reusable DatePicker component based on MUI, styled like Input.jsx
 *
 * @param {string} label - Label for the input.
 * @param {string} variant - MUI variant: "outlined" | "standard".
 * @param {boolean} fullWidth - Should input take full width.
 * @param {boolean} error - Whether error styling is applied.
 * @param {string} helperText - Helper text shown below input.
 * @param {boolean} required - Marks the input as required.
 * @param {boolean} disabled - Disables the field.
 * @param {string} size - "small" | "medium"
 * @param {Date | null} value - Controlled value.
 * @param {Function} onChange - Called when date changes.
 * @param {Function} onBlur - On blur event.
 * @param {Function} onFocus - On focus event.
 * @param {any} name - Input name.
 * @param {any} id - Input id.
 * @param {Date} minDate - Min selectable date.
 * @param {Date} maxDate - Max selectable date.
 * @param {string} className - Extra class for wrapper.
 * @param {any} rest - Any extra props passed.
 */

export default function DatePicker({
  label = "",
  variant = "outlined",
  fullWidth = true,
  error = false,
  helperText,
  required = false,
  disabled = false,
  size = "medium",
  onBlur,
  onFocus,
  name,
  id,
  minDate,
  maxDate,
  className = "",
  ...rest
}) {
  return (
    <div className={combineClasses(styles.datePickerWrapper, className)}>
      <MUIDatePicker
        onError={(e) => {}}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        format="D-MMM-YYYY"
        slotProps={{
          textField: {
            label: (
              <>
                {label}
                {required && <span style={{ color: "red" }}> *</span>}
              </>
            ),
            variant,
            fullWidth,
            error,
            helperText,
            size,
            onBlur,
            onFocus,
            name,
            id,
            disabled,
          },
        }}
        {...rest}
      />
    </div>
  );
}
