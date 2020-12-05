import React, { useState } from "react";
import dayjs from "dayjs";
import { db } from "../firebase/config";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { useSession } from "../firebase/UserProvider";
import MyDialog from "../util/MyDialog";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 40,
  },

  img: {
    objectFit: "fill",
    height: 700,
    width: 700,
  },

  avatar: {
    backgroundColor: "red",
  },
  imageNone: {
    display: "none",
  },
}));

const Post = (props) => {
  const { user } = useSession();
  const [open, setOpen] = useState();
  const classes = useStyles();
  const postsRef = db.collection("posts");
  const { text, displayName, postedAt, imageURL, id, uid } = props.post;

  const deletePostClick = () => {
    if (user.uid === uid) {
      postsRef
        .doc(id)
        .delete()
        .then(() => {
          console.log(`document ${id} deleted successfully`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("unauthorized deletion");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    // onClose(value);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          action={
            <>
              <IconButton onClick={handleClickOpen} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
              <MyDialog
                title={`Post Actions`}
                listItem="Delete Post"
                open={open}
                onClose={handleClose}
                dialogClick={deletePostClick}
              />
            </>
          }
          title={displayName}
          subheader={dayjs(postedAt).fromNow()}
        />
        {imageURL ? <img className={classes.img} src={imageURL} alt="" /> : ""}

        <CardContent>
          {text}
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
