import React from "react";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export default Notification = (props) => {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify(false);
  };

  return (
    <Snackbar
      className={classes.root}
      onClose={handleClose}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert anchor={notify.anchor} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};
