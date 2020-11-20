import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { auth } from "../../config/config";

import { useRouter } from "next/router";
import firebase from "../../config/config";
import { setCurrentUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function Signup() {
  const { currentUser, isUserLoading, isUserFetchError } = useSelector(
    (state: any) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      await firebase
        .firestore()
        .collection("users")
        .doc(newUser.user?.uid)
        .set({
          userId: newUser.user?.uid,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
          email: newUser.user?.email,
          friends: [],
          friendRequestsSent: [],
          friendRequestsReceived: [],
        });
      if (newUser) {
        dispatch(
          setCurrentUser({
            userId: newUser.user?.uid,
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
            email: newUser.user?.email,
            friends: [],
            friendRequestsSent: [],
            friendRequestsReceived: [],
          })
        );
      } else {
        dispatch(setCurrentUser(null));
      }
    } catch (error) {
      toast("something went wrong; try again or use a differnt email");
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/login/");
    }
  });

  return <></>;
}
