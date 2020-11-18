import React, { useState, useEffect } from "react";
import { useSession } from "../firebase/UserProvider";

// MUI stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Notification from "../util/Notification";

// util
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import Copyright from "../util/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const { register, handleSubmit, reset, errors } = useForm({
    shouldFocusError: true,
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState(false);
  const { user } = useSession();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const onSubmit = async (data) => {
    let user;
    setLoading(true);

    try {
      user = await login(data);

      reset();
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setNotify({
          isOpen: true,
          message: "Please enter a valid e-mail address",
          type: "error",
        });
      } else {
        setNotify({
          isOpen: true,
          message: "Wrong Credentials, please try again",
          type: "error",
        });
      }
    }

    if (user) {
      props.history.push("/");
    } else {
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            inputRef={register({ required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            inputRef={register({ required: "Password is required" })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberme"
                inputRef={register}
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </form>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
