import { db, auth } from "./config";
import "firebase/firestore";

const getPosts = () => {
  postsRef.onSnapshot((doc) => {
    return doc.data();
  });
};

export const deletePost = async () => {
  db.collection("posts").doc().delete();
  await console.log("document deleted successfully");
};
