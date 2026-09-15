import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCallback } from "react";

export default function ShowSnackbar({ setSnackbar, snackbar }) {
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, [setSnackbar]);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "#80bb40",
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
