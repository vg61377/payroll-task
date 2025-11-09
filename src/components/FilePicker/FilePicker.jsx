import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const HiddenFileInput = styled("input")({
  display: "none",
});

const FilePicker = ({
  onChange,
  value,
  label = "Choose file",
  accept = "*",
  error,
  required,
  variant = "outlineda",
  ...props
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files?.length > 0) {
      onChange(event.target.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTextFieldClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TextField
        fullWidth
        label={
          label ? (
            <>
              {label}
              {required ? <span style={{ color: "red" }}> *</span> : ""}
            </>
          ) : undefined
        }
        value={value?.name || ""}
        onClick={handleTextFieldClick}
        error={!!error}
        variant={variant}
        InputProps={{
          readOnly: true,
          endAdornment: value ? (
            <IconButton
              onClick={handleRemoveFile}
              sx={{ color: "error.main" }}
              size="small"
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          ) : null,
        }}
        inputProps={{
          "aria-label": "File selection",
        }}
        {...props}
      />

      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default FilePicker;
