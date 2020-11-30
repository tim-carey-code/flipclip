import React from "react";
import dayjs from "dayjs";
import { db } from "../firebase/config";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { useSession } from "../firebase/UserProvider";
import ReusableDialog from "../util/MyDialog";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "fill",
    height: 600,
    width: 600,
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
  return (
    <>
      <Card className={classes.root}>
        <Button onClick={deletePostClick}>Delete Post</Button>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          action={
            <ReusableDialog title="User Actions" listItem="Delete Post" />
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
