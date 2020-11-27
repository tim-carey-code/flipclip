import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// MUI stuff
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "./firebase/config";
import { UserProvider } from "./firebase/UserProvider";

// Components
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

// Pages
import Profile from "./pages/Profile";
import Home from "./pages/Home";

// Util
import { PrivateRoute } from "./router/PrivateRoute";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#d1c4e9",
      main: "#673ab7",
      dark: "#311b92",
      contrastText: "#fbe9e7",
    },
    secondary: {
      light: "#b388ff",
      main: "#7c4dff",
      dark: "#651fff",
      contrastText: "#f3e5f5",
    },
  },
});

function App() {
  const auth = firebase.auth();
  const [authentication, setAuthState] = useState({
    authenticated: false,
  });

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthState({
            authenticated: true,
          });
        } else {
          setAuthState({
            authenticated: false,
          });
        }
      }),
    [setAuthState, auth]
  );

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute
              authed={authentication.authenticated}
              exact
              path="/"
              component={Home}
            />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute
              authed={authentication.authenticated}
              exact
              path="/profile"
              component={Profile}
            />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
