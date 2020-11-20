import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme: { colors } }) => colors.dark + "15"};
  padding: ${({ theme: { spaces } }) => spaces.md};
  border-radius: 16px;
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
