import React, { useState } from "react";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import Notification from "../util/Notification";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
        <Posts />
      </Grid>
      <Grid item sm={3} xs={6}>
        <Profile />
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
};

export default Home;
