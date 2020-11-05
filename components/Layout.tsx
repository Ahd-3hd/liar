import { Wrapper, Container } from "../styles/Layout.style";

const Layout = ({ children }: { children?: any }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Layout;
