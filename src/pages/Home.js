import React, { useState } from "react";
import PostsList from "./AllPosts";
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
    <Grid
      alignItems="center"
      direction="column"
      justify="center"
      container
      spacing={0}
    >
      <Grid item xs={12} sm={8}>
        <PostsList />
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
};

export default Home;
