import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { useEffect } from "react";
import firebase from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/auth/authSlice";
const Layout = ({ children }: { children?: any }) => {
  const dispatch = useDispatch();
  const { currentUser, isLoading, fetchError } = useSelector(
    (state: any) => state.auth
  );
  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const userData = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        console.log(userData.data());
        dispatch(setCurrentUser(userData.data()));
      } else {
        dispatch(setCurrentUser(null));
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
