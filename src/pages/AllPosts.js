import React, { useState } from "react";
// Firebase
import "firebase/storage";
import "firebase/firestore";
import { db, storage, auth } from "../firebase/config";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Post from "../components/Post";
// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// react-firebase-hooks
import { useCollectionData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PostsList = () => {
  const [formValue, setFormVlue] = useState("");
  const [image, setImage] = useState(null);
  const postsRef = db.collection("posts");
  const postQuery = postsRef.orderBy("postedAt", "desc");
  const [posts] = useCollectionData(postQuery, { idField: "id" });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const classes = useStyles();

  dayjs.extend(relativeTime);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage(await fileRef.getDownloadURL());
  };

  const onSubmit = async (form, e) => {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;

    try {
      reset();
      await postsRef.doc().set({
        text: formValue,
        postedAt: new Date().toISOString(),
        uid,
        displayName,
        photoURL,
        imageURL: image,
      });
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={register}
              name="newPost"
              variant="outlined"
              fullWidth
              id="newPost"
              label="Make a new post"
              autoFocus
              onChange={(e) => setFormVlue(e.target.value)}
            />
          </Grid>
        </Grid>
        <Input
          name="imageUpload"
          id="imageInput"
          inputRef={register}
          type="file"
          disableUnderline={true}
          onChange={handleImageChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Post
        </Button>
      </form>
      {posts &&
        posts.map((text) => <Post id={posts.id} key={text.id} post={text} />)}
    </>
  );
};

export default PostsList;
