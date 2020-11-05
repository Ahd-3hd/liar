import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";

const Layout = ({ children }: { children?: any }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
      <Navbar />
    </Wrapper>
  );
};

export default Layout;
