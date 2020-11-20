import Navbar from "./Navbar";
import { Wrapper, Container } from "../styles/Layout.style";
import { auth } from "../config/config";
import { useEffect } from "react";
import firebase from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/auth/authSlice";
import { ToastContainer } from "react-toastify";
const Layout = ({ children }: { children?: any }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const userData = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        dispatch(
          setCurrentUser({
            ...userData.data(),
            userId: user.uid,
          })
        );
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return () => unsubscribeFromAuth();
  }, []);
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Layout;
