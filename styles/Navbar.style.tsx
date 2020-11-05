import styled from "styled-components";
import Navbarbg from "../utils/svg/Navbg.svg";
import NewQuestionIcon from "../utils/svg/NewQuestion.svg";

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
`;
export const SvgContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    position: absolute;
    bottom: -1.5rem;
    width: 80%;
    height: 100%;
  }
  .bg1 {
    transform: translateX(-5px);
    fill: ${({ theme: { colors } }) => colors.blue};
  }
  .bg2 {
    transform: translateX(5px);
    fill: ${({ theme: { colors } }) => colors.red};
  }
  .bg3 {
    fill: ${({ theme: { colors } }) => colors.black};
  }
`;
export const NewQuestionButton = styled.button`
  background: ${({ theme: { colors } }) => colors.black};
  width: 8vw;
  max-width: 60px;
  max-height: 60px;
  min-height: 50px;
  min-width: 50px;
  height: 8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8vw;
  padding: ${({ theme: { spaces } }) => spaces.sm};
  border: none;
  margin-bottom: -1rem;
  > svg {
    width: 90%;
  }
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    width: 35px;
    height: 35px;
    min-height: 35px;
    min-width: 35px;
    margin-bottom: -1rem;
  }
`;
export default function NavContainer() {
  return (
    <Nav>
      <SvgContainer>
        <Navbarbg className="bg1" />
        <Navbarbg className="bg2" />
        <Navbarbg className="bg3" />
        <NewQuestionButton>
          <NewQuestionIcon />
        </NewQuestionButton>
      </SvgContainer>
    </Nav>
  );
}
