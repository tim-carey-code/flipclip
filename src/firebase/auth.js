import firebase from "firebase/app";
import "firebase/auth";
import { newUserDocument } from "./user";

export const signup = async ({ firstName, lastName, email, password }) => {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const user = res.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await newUserDocument(user);
  return user;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password);

  return res.user;
};

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser;
  if (!user) return null;
  return {};
};
