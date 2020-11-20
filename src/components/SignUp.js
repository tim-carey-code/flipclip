import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Copyright from "../util/Copyright";
import Notifiation from "../util/Notification";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { signup } from "../firebase/auth";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useSession } from "../firebase/UserProvider";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: {
    color: "red",
    fontWeight: "bold",
  },
}));

const SignUp = (props) => {
  const { user } = useSession();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { register, handleSubmit, reset, errors } = useForm({
    shouldFocusError: true,
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      props.history.push("/");
    }
  }, [props.history, user]);

  const onSubmit = async (data) => {
    let newUser;

    setLoading(true);

    try {
      setNotify({
        isOpen: true,
        message: "Sign up success",
        type: "success",
      });
      newUser = await signup(data);

      reset();
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/argument-error"
      ) {
        setNotify({
          isOpen: true,
          message: "Please enter a valid e-mail address",
          type: "error",
        });
      }
    }

    if (newUser) {
      props.history.push(`/`);
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors.firstName}
                helperText={errors.firstName ? "First name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={errors.lastName}
                helperText={errors.lastName ? "Last name is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="uname"
                error={errors.userName}
                helperText={errors.userName ? "User Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.email}
                helperText={errors.email ? "Email is required" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
        <Notifiation notify={notify} setNotify={setNotify} />
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
