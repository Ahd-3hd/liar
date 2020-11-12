import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { setCurrentUser, clearCurrentUser } from "../redux/actions/authActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../config/config";
import { fetchPosts } from "../redux/actions/postsActions";
const Layout = ({ children }: { children?: any }) => {
  // const currentUser = useSelector(
  //   ({ auth }: { auth: any }) => auth.currentUser
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              let loggedInUser = docSnapshot.data();
              console.log("here", loggedInUser);
              console.log(docSnapshot.id);
              dispatch(
                setCurrentUser({
                  avatar: loggedInUser?.avatar,
                  userId: docSnapshot.id,
                  email: loggedInUser?.email,
                  friends: loggedInUser?.friends,
                })
              );
            } else {
              firebase.firestore().collection("users").doc(user.uid).set({
                avatar: "https://picsum.photos/200",
                email: user.email,
                friends: [],
              });
              dispatch(
                setCurrentUser({
                  userId: user.uid,
                  avatar: "https://picsum.photos/200",
                  email: user.email,
                  friends: [],
                })
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        dispatch(clearCurrentUser());
      }
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
