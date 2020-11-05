import { Wrapper, Container } from "../styles/Layout.style";
import Navbar from "./Navbar";

const Layout = ({ children }: { children?: any }) => {
  return (
    <Wrapper>
      <Container>
        {children}
        <Navbar />
      </Container>
    </Wrapper>
  );
};

export default Layout;
