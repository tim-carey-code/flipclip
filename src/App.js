import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

// Util
import { PrivateRoute } from "./router/PrivateRoute";
import "./App.css";

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
    [setAuthState]
  );

  return (
    <UserProvider>
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
            path="/dashboard"
            component={Dashboard}
          />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
