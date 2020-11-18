import React, { useState } from "react";
import "firebase/storage";
import "firebase/firestore";
import { db, storage, auth } from "../firebase/config";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import dayjs from "dayjs";
// import {imageUpload} from '../components/Image';
import relativeTime from "dayjs/plugin/relativeTime";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";

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
  const [value] = useDownloadURL(storage.ref(`images/${image?.name}`));
  const postQuery = postsRef.orderBy("postedAt", "desc");
  const [posts] = useCollectionData(postQuery, { idField: "id" });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  const classes = useStyles();

  dayjs.extend(relativeTime);

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      return null;
    }
  };

  const handleImageUpload = (e) => {
    if (!e.target.value) {
      return undefined;
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .then((url) => {
            reset();
            console.log(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  const onSubmit = async (e) => {
    const { uid, displayName, photoURL } = auth.currentUser;

    const newPost = {
      text: formValue,
      postedAt: new Date().toISOString(),
      uid,
      displayName,
      photoURL,
      imageURL: value,
    };
    try {
      reset();
      await postsRef.add(newPost);
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
          disableUnderline="true"
          onChange={handleImageChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleImageUpload}
        >
          Post
        </Button>
      </form>
      {posts &&
        posts.map((text) => <Post id="postImage" key={text.id} post={text} />)}
    </>
  );
};

export default PostsList;
