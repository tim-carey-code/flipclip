import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Firebase and auth
import { logout } from "../firebase/auth";
import { useSession } from "../firebase/UserProvider";

// MUI stuff
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
  button: {
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const { user } = useSession();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            Flip Clip
          </Typography>

          {user ? (
            <>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
            </>
          ) : (
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
