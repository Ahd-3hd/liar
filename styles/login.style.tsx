import styled from "styled-components";

export const Wrapper = styled.div``;
export const LoginForm = styled.form`
  padding: ${({ theme: { spaces } }) => spaces.md};
  border: 1px solid ${({ theme: { colors } }) => colors.grey};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
export const LoginTitle = styled.h1`
  text-align: center;
  color: ${({ theme: { colors } }) => colors.primary};
`;

export const Input = styled.input`
  height: 3em;
  margin-bottom: ${({ theme: { spaces } }) => spaces.md};
  border-radius: 5px;
  border: 1px solid ${({ theme: { colors } }) => colors.dark + "15"};
  outline: none;
  transition: all 0.5s;
  background: ${({ theme: { colors } }) => colors.grey};
  font-family: inherit;
  padding-left: ${({ theme: { spaces } }) => spaces.md};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.dark};

  ::placeholder {
    font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
    color: ${({ theme: { colors } }) => colors.dark + "70"};
  }
  :focus {
    box-shadow: 0 0 2px ${({ theme: { colors } }) => colors.primary};
    border-color: ${({ theme: { colors } }) => colors.primary + "15"};
  }
`;
export const Button = styled.button`
  height: 3em;
  background: ${({ theme: { colors } }) => colors.primary};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
  color: ${({ theme: { colors } }) => colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 14px ${({ theme: { colors } }) => colors.dark + "40"};
  transition: all 0.3s;
  outline: none;
  :hover {
    background: ${({ theme: { colors } }) => colors.primary + "99"};
  }
  :active {
    box-shadow: 0 2px 4px ${({ theme: { colors } }) => colors.dark + "40"};
  }
`;
export const SignupLink = styled.a`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.primary};
  display: inline-block;
  text-align: center;
  margin-top: ${({ theme: { spaces } }) => spaces.md};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
`;
