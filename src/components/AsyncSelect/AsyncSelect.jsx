import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import useDebounce from "../../hooks/useDebounce";

export default function AsyncSelect({
  label,
  fetchOptions,
  value,
  onChange,
  multiple = false,
  onSelectOption,
  onClearAll,
  getOptionLabel = (option) => option?.label || "",
  isOptionEqualToValue = (opt, val) => opt?.value === val?.value,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedInput = useDebounce({ value: inputValue, delay: 500 });

  useEffect(() => {
    setLoading(true);
    fetchOptions(debouncedInput)
      .then((res) => setOptions(res || []))
      .catch((err) => console.error("fetchOptions failed:", err))
      .finally(() => setLoading(false));
  }, [debouncedInput, fetchOptions]);

  const handleChange = (event, newValue, reason, details) => {
    onChange(newValue);

    if (multiple) {
      if (reason === "selectOption" && details?.option) {
        onSelectOption?.(details.option);
      }

      if (reason === "clear" || newValue.length === 0) {
        onClearAll?.();
      }
    } else {
      if (reason === "selectOption" && newValue) {
        onSelectOption?.(newValue);
      }

      if (reason === "clear" || !newValue) {
        onClearAll?.();
      }
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, val) => setInputValue(val)}
      options={options}
      loading={loading}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
