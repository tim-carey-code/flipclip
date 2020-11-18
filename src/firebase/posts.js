import { db, auth } from "./config";
import "firebase/firestore";

const getPosts = () => {
  postsRef.onSnapshot((doc) => {
    return doc.data();
  });
};
