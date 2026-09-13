import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ShowSnackbar({
  open,
  message,
  severity = "success",
  handleClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor:
            severity === "success"
              ? "#80bb40"
              : severity === "info"
                ? "#2196f3"
                : "#f44336",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
