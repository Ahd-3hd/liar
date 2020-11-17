import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";
import { auth } from "../config/config";
import { useEffect } from "react";
import firebase from "../config/config";
const Layout = ({ children }: { children?: any }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
      <Navbar />
    </Wrapper>
  );
};

export default Layout;
