import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { setCurrentUser, clearCurrentUser } from "../redux/actions/authActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../config/config";
import { fetchPosts } from "../redux/actions/postsActions";
const Layout = ({ children }: { children?: any }) => {
  // current user can be used to prevent unnecessary refresh, TODO in the fucking future
  // const currentUser = useSelector(
  //   ({ auth }: { auth: any }) => auth.currentUser
  // );
  const dispatch = useDispatch();

  const fetchUser = async (user: any) => {
    if (user) {
      const userData = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userData.exists) {
        dispatch(
          setCurrentUser({
            avatar: userData?.data()?.avatar,
            userId: userData?.data()?.id,
            email: userData?.data()?.email,
            friends: userData?.data()?.friends,
          })
        );
      } else {
        firebase.firestore().collection("users").doc(user.uid).set({
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
          email: user.email,
          friends: [],
        });
        dispatch(
          setCurrentUser({
            userId: user.uid,
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
            email: user.email,
            friends: [],
          })
        );
      }
    } else {
      dispatch(clearCurrentUser());
    }
  };

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
      fetchUser(user);
      // if (user) {
      //   firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(user.uid)
      //     .get()
      //     .then((docSnapshot) => {
      //       if (docSnapshot.exists) {
      //         let loggedInUser = docSnapshot.data();
      //         dispatch(
      //           setCurrentUser({
      //             avatar: loggedInUser?.avatar,
      //             userId: docSnapshot.id,
      //             email: loggedInUser?.email,
      //             friends: loggedInUser?.friends,
      //           })
      //         );
      //       } else {
      //         firebase.firestore().collection("users").doc(user.uid).set({
      //           avatar:
      //             "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
      //           email: user.email,
      //           friends: [],
      //         });
      //         dispatch(
      //           setCurrentUser({
      //             userId: user.uid,
      //             avatar:
      //               "https://firebasestorage.googleapis.com/v0/b/liar-35d32.appspot.com/o/Group%2041.png?alt=media&token=49380a39-6c10-44bb-9481-eb7d7539a99f",
      //             email: user.email,
      //             friends: [],
      //           })
      //         );
      //       }
      //     })
      //     .catch((err) => console.log(err));
      // } else {
      //   dispatch(clearCurrentUser());
      // }
    });
    return () => unsubscribeFromAuth();
  }, []);
  return (
    <Wrapper>
      <Container>{children}</Container>
      <Navbar />
    </Wrapper>
  );
};

export default Layout;
