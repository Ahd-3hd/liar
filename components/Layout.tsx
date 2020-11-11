import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { setCurrentUser, clearCurrentUser } from "../redux/actions/authActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Layout = ({ children }: { children?: any }) => {
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
      console.log(user);
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(clearCurrentUser());
      }
    });
    return () => unsubscribeFromAuth();
  }, [setCurrentUser, clearCurrentUser]);
  return (
    <Wrapper>
      <Container>{children}</Container>
      <Navbar />
    </Wrapper>
  );
};

export default Layout;
