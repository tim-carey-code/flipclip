import React from "react";
import Grid from "@material-ui/core/Grid";
import { useSession } from "../firebase/UserProvider";

const Profile = () => {
  const { user } = useSession();

  return <div>Hello, {user.displayName}</div>;
};

export default Profile;
