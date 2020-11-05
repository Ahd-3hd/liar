import styled from "styled-components";

export const Button = styled.button`
  align-self: center;
  padding: ${({ theme: { spaces } }) => `${spaces.sm} ${spaces.lg}`};
  margin-top: ${({ theme: { spaces } }) => spaces.sm};
  background: ${({ theme: { colors } }) => colors.black};
  border: none;
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  position: relative;
  transform-style: preserve-3d;
  border-radius: 0.3rem;
  cursor: pointer;
  ::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -4px;
    background: ${({ theme: { colors } }) => colors.blue};
    transform: translateZ(-1px);
    border-radius: 0.3rem;
    transition: 0.4s;
  }
  ::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: -4px;
    background: ${({ theme: { colors } }) => colors.red};
    transform: translateZ(-1px);
    border-radius: 0.3rem;
    transition: 0.4s;
  }
  :hover {
    ::after {
      right: 4px;
    }
    ::before {
      left: 4px;
    }
  }
`;