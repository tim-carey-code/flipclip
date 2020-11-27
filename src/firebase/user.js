import { db, storage } from "./config";

export const newUserDocument = async (user) => {
  const userRef = db.doc(`/users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    country: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    userName: "",
    bio: "",
  };
  await userRef.set(userProfile);
};
