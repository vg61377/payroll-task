import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import styles from "./MultiSelect.module.scss";

const MultiSelect = ({
  label = "Select Options",
  options = [],
  value = [],
  onChange,
  placeholder = "Choose...",
  disabled = false,
  clearable = true,
  ...rest
}) => {
  return (
    <Autocomplete
      multiple
      {...rest}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      disableCloseOnSelect
      clearOnEscape={clearable}
      disabled={disabled}
      getOptionLabel={(option) => option.label || option}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      renderMultipleValues={(selected) =>
        selected.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={option.label || option}
            className={styles.chip}
          />
        ))
      }
      className={styles.select}
    />
  );
};

export default MultiSelect;
