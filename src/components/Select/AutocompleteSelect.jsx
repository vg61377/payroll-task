import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./AutocompleteSelect.module.scss";
import { combineClasses } from "../../utils/utils";

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
      className={combineClasses(styles.autocomplete, className)}
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
