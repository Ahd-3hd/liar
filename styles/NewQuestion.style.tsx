import styled from "styled-components";

export const Form = styled.form`
  padding: ${({ theme: { spaces } }) => spaces.md};
  display: flex;
  flex-direction: column;
`;
export const QuestionGroup = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme: { spaces } }) => spaces.sm + " 0"};
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  > img {
    ${({ reverse }) => (reverse ? "margin-right:1rem;" : "margin-left:1rem;")};
  }
`;
export const TextArea = styled.textarea`
  flex: 3;
  resize: none;
  height: 4em;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme: { colors } }) => colors.grey + "77"};
  padding: ${({ theme: { spaces } }) => spaces.sm};
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.bold};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.md};

  :focus {
    outline: none;
    border: 1px solid ${({ theme: { colors } }) => colors.blue + "77"};
    box-shadow: 0px 0px 10px ${({ theme: { colors } }) => colors.blue + "22"};
    transition: 0.3s;
  }
`;
export const QuestionImg = styled.img`
  width: 60px;
  flex: 1;
  max-width: 60px;
`;
