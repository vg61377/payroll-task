import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./AutocompleteSelect.module.scss";
import { combineClass } from "../../../../../practice/practice_app/src/utils/constaint";

const AutocompleteSelect = ({
  label = "Select option",
  options = [],
  value,
  onChange,
  placeholder,
  getOptionLabel = (option) => option.label ?? option,
  isOptionEqualToValue = (option, value) => option.value === value?.value,
  disabled = false,
  className = "",
  ...rest
}) => {
  return (
    <Autocomplete
      className={combineClass(styles.autocomplete, className)}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      {...rest}
    />
  );
};

export default AutocompleteSelect;
