import React from "react";
import dayjs from "dayjs";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Dialog from "@material-ui/core/Dialog";
import DiaglogTitle from "@material-ui/core/DialogTitle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    marginTop: 30,
  },
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
  const classes = useStyles();

  const { text, displayName, postedAt, imageURL } = props.post;

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
