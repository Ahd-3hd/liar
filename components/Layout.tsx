import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { setCurrentUser, clearCurrentUser } from "../redux/actions/authActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children?: any }) => {
  const currentUser = useSelector(
    ({ auth }: { auth: any }) => auth.currentUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth: any = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
      if (user) {
        dispatch(
          setCurrentUser({
            userId: user.uid,
            email: user.email,
            username: user.email,
          })
        );
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
