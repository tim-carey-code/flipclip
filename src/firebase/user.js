import { db, storage } from "./config";

export const newUserDocument = async (user) => {
  const userRef = db.doc(`/users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };
  await userRef.set(userProfile);
};
