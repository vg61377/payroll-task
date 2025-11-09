import React, { useState } from "react";
import MuiButton from "../../components/Button/Button";
import MuiModal from "../../components/Modal/MuiModal";
import { Box, Tab, Tabs } from "@mui/material";
import AssignToMe from "./AssignToMe";
import AssingToOthers from "./AssingToOthers";

function AddTaskModal({ open = true, onClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("task-form");
    if (form) form.requestSubmit();
  };

  return (
    <MuiModal
      size="md"
      open={open}
      onClose={onClose}
      title="New Task"
      footerContent={
        <>
          <MuiButton onClick={onClose} variant="outlined" size="small">
            Cancel
          </MuiButton>
          <MuiButton type="submit" size="small" onClick={handleSubmit}>
            Add
          </MuiButton>
        </>
      }
    >
      <Box sx={{ py: 2, px: 1 }}>
        <AssignToMe />
      </Box>
    </MuiModal>
  );
}

export default AddTaskModal;
