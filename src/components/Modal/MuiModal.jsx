import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    minWidth: 400,
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
  },
}));

const Header = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

const Footer = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

const ScrollableContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  overflowY: "auto",
  flex: "1 1 auto",
  minHeight: 0,
}));

const MuiModal = ({
  open,
  onClose,
  title,
  children,
  footerContent,
  size = "medium",
  maxWidth,
  fullWidth = true,
}) => {
  const sizeToMaxWidth = {
    small: "xs",
    medium: "sm",
    large: "md",
    xlarge: "lg",
    full: false,
  };

  const resolvedMaxWidth = maxWidth || sizeToMaxWidth[size] || "sm";
  const resolvedFullWidth = size === "full" ? true : fullWidth;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={resolvedMaxWidth}
      fullWidth={resolvedFullWidth}
    >
      <Header>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Header>

      <ScrollableContent dividers>{children}</ScrollableContent>

      {footerContent && (
        <Footer>
          {footerContent || (
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          )}
        </Footer>
      )}
    </StyledDialog>
  );
};

export default MuiModal;
