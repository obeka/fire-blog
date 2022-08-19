import React, { useEffect, useState } from "react";
import { Snackbar, Alert as MUIAlert } from "@mui/material";

export const Alert = (props) => {
  const { alertContent } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {

    setOpen(true);
  }, [alertContent]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MUIAlert
        onClose={handleClose}
        severity={alertContent?.content?.severity || "error"}
        sx={{ width: "100%" }}
      >
        {alertContent?.content?.message}
      </MUIAlert>
    </Snackbar>
  );
};
