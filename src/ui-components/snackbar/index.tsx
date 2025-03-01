import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notification = ({
  open,
  message,
  severity = "success",
  duration = 4000,
  setSnackbar,
  handleClose,
}: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSnackbar({
        open: false,
        message: "",
        severity: "",
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
