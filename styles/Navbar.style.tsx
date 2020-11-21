import styled from "styled-components";
import { colors } from "../utils/theme";

export const Wrapper = styled.nav`
  position: fixed;
  bottom: ${({ theme: { spaces } }) => spaces.md};
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;
export const Container = styled.div`
  /* background: ${({ theme: { colors } }) => colors.white}; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme: { spaces } }) => spaces.lg};
  width: 100%;
  max-width: 450px;
`;
export const NavLink = styled.a<{ center?: boolean }>`
  margin: 0 ${({ theme: { spaces } }) => spaces.lg};
  padding: ${({ theme: { spaces } }) => spaces.md};
  background: ${({ theme: { colors } }) => colors.primary};
  border-radius: 10px;
  transform: translateY(${({ center }) => (center ? "-1rem" : "0")});
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  svg {
    fill: ${({ theme: { colors } }) => colors.white};
    height: 20px;
  }
  :hover {
    span {
      bottom: -1.3rem;
      opacity: 1;
    }
  }
`;
export const NavSpan = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.sm};
  color: ${({ theme: { colors } }) => colors.dark + "dd"};
  opacity: 0;
  transition: 0.4s;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;

export const NavButton = styled.button`
  margin: 0 ${({ theme: { spaces } }) => spaces.lg};
  padding: ${({ theme: { spaces } }) => spaces.md};
  background: none;
  border: none;
  background: ${({ theme: { colors } }) => colors.primary};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative;
  svg {
    fill: ${({ theme: { colors } }) => colors.white};
    height: 20px;
  }
  :hover {
    span {
      bottom: -1.3rem;
      opacity: 1;
    }
  }
`;
